import { cn } from '~/libs/utils/classnames';

type FormLayoutProps = {
  children: React.ReactNode;
};

export default function FormLayout({ children }: FormLayoutProps) {
  return <div className="flex flex-col xl:flex-row gap-4">{children}</div>;
}

type FormLayoutMainProps = {
  children: React.ReactNode;
  className?: string;
};
FormLayout.Main = function Main({ children, className }: FormLayoutMainProps) {
  return (
    <div className={cn('flex flex-grow flex-col gap-4', className)}>
      {children}
    </div>
  );
};

type FormLayoutSidebarProps = {
  children: React.ReactNode;
  className?: string;
};
FormLayout.Sidebar = function Sidebar({
  children,
  className,
}: FormLayoutSidebarProps) {
  return (
    <div
      className={cn('xl:relative sticky bottom-0 xl:!bottom-auto', className)}
    >
      <div
        className={cn(
          'xl:sticky xl:top-0 flex flex-col lg:flex-row xl:flex-col',
          'gap-4',
        )}
      >
        {children}
      </div>
    </div>
  );
};
