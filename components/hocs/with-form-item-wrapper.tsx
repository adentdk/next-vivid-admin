import { forwardRef } from "react";

import { FormItemWrapper } from "../ui/form";

export default function withFormItemWrapper<T>(
  WrappedComponent: React.ForwardRefExoticComponent<T>,
) {
  return forwardRef(
    (
      props: Omit<
        React.ComponentProps<typeof FormItemWrapper>,
        "children" | "onChange"
      > & T,
      ref: React.Ref<React.ElementType<typeof WrappedComponent>>,
    ) => {
      const {
        label,
        mandatory,
        optional,
        description,
        append,
        prepend,
        ...restProps
      } = props;

      return (
        <FormItemWrapper
          label={label}
          mandatory={mandatory}
          optional={optional}
          description={description}
          append={append}
          prepend={prepend}
        >
          <WrappedComponent ref={ref} {...(restProps as T)} />
        </FormItemWrapper>
      );
    },
  );
}
