import { cn } from '~/libs/utils/classnames';

export default function SidebarItemsWrapper(props: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { children, className } = props;
  return (
    <aside
      className={cn(
        'w-48 bg-card shadow-md border-r border-r-ring/5 z-20',
        className,
      )}
    >
      {children}
    </aside>
  );
}
