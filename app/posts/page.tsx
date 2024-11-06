import { Fragment } from "react";

import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button-link";

export default function Page() {
  return (
    <Fragment>
      <PageHeader
        title="List of Posts"
        breadcrumbs={[
          { title: "Home", href: "" },
          {
            title: "Posts",
            href: "/posts",
          },
        ]}
        actions={
          <ButtonLink href="/posts/create" variant="default">
            Add new post
          </ButtonLink>
        }
      />
    </Fragment>
  );
}
