import Link from "next/link";

import { Button } from "./button";

function ButtonLink(
  props: React.ComponentPropsWithoutRef<typeof Button> & { href: string },
) {
  const { href, className, children, ...rest } = props;

  return (
    <Button
      asChild
      className={className}
      type="button"
      variant="link"
      {...rest}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}

ButtonLink.displayName = "ButtonLink";

export { ButtonLink };
