'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { Node } from '@tiptap/core';
import { PluginKey } from '@tiptap/pm/state';
import { ReactRenderer } from '@tiptap/react';
import Suggestion from '@tiptap/suggestion';
import scrollIntoView from 'scroll-into-view-if-needed';
import tippy from 'tippy.js';

import { getDynamicContentFlatAction } from '@/app/_libs/actions/admin/get-dynamic-content-flat';
import { cn } from '@/lib/utils/classnames';

export const EXTENSION_PRIORITY_HIGHEST = 200;

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    dynamicSuggestions: {
      setDynamicSuggestion: (token: string) => ReturnType;
    };
  }
}

export const DynamicSuggestionPluginKey = new PluginKey('dynamicSuggestions');

const renderSuggestions = (token: string) => {
  return `#{${token}}`;
};

export const DynamicSuggestion = Node.create({
  name: 'dynamicSuggestions',
  content: 'text*',

  priority: EXTENSION_PRIORITY_HIGHEST,

  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {},
      suggestion: {
        char: '#{',
        pluginKey: DynamicSuggestionPluginKey,
        command: ({ editor, range, props }: any) => {
          editor
            .chain()
            .focus()
            .insertContentAt(range, renderSuggestions(props))
            .run();
        },
      },
    };
  },

  addCommands() {
    return {
      setDynamicSuggestion:
        (token) =>
        ({ commands, editor }) => {
          return commands.insertContent(renderSuggestions(token));
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
}).configure({
  suggestion: {
    items: async ({ query }: any) => {
      return getDynamicContentFlatAction(query);
    },
    render: () => {
      let component: any;
      let popup: any;
      let isEditable: any;

      return {
        onStart: (props: any) => {
          isEditable = props.editor.isEditable;
          if (!isEditable) return;

          component = new ReactRenderer(DynamicSuggestionComponent, {
            props,
            editor: props.editor,
          });

          popup = tippy('body', {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
          });
        },

        onUpdate(props: any) {
          if (!isEditable) return;

          component.updateProps(props);
          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          });
        },

        onKeyDown(props: any) {
          if (!isEditable) return;

          if (props.event.key === 'Escape') {
            popup[0].hide();
            return true;
          }
          return component.ref?.onKeyDown(props);
        },

        onExit() {
          if (!isEditable) return;

          popup[0].destroy();
          component.destroy();
        },
      };
    },
  },
});

interface DynamicSuggestionComponentProps {
  items: string[];
  command: any;
}

const DynamicSuggestionComponent: React.FC<DynamicSuggestionComponentProps> =
  forwardRef((props, ref) => {
    const $container: any = useRef<HTMLDivElement>();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: any) => {
      const item = props.items[index];

      if (item) {
        props.command(item);
      }
    };

    const upHandler = () => {
      setSelectedIndex(
        (selectedIndex + props.items.length - 1) % props.items.length,
      );
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useEffect(() => {
      if (Number.isNaN(selectedIndex + 1)) return;
      const el = $container.current.querySelector(
        `span:nth-of-type(${selectedIndex + 1})`,
      );
      el && scrollIntoView(el, { behavior: 'smooth', scrollMode: 'if-needed' });
    }, [selectedIndex]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: any) => {
        if (event.key === 'ArrowUp') {
          upHandler();
          return true;
        }

        if (event.key === 'ArrowDown') {
          downHandler();
          return true;
        }

        if (event.key === 'Enter') {
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    return (
      <div className="w-[200px] max-h-[320px] overflow-x-hidden overflow-y-auto rounded-sm !border bg-popover p-1 text-popover-foreground shadow-md outline-none">
        <div ref={$container}>
          {props.items.length ? (
            props.items.map((item, index) => (
              <span
                className={cn(
                  'flex relative  cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground  hover:bg-accent',
                  index === selectedIndex ? 'bg-accent' : '',
                )}
                key={`token-list-code-${index}`}
                onClick={() => selectItem(index)}
              >
                #{`{${item}}`}
              </span>
            ))
          ) : (
            <div className="flex relative  cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors">
              <span>No results found</span>
            </div>
          )}
        </div>
      </div>
    );
  });
