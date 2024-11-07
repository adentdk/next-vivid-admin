import { Fragment } from "react";

import { PageHeader } from "@/components/page-header";

export default function Page() {
  return (
    <Fragment>
      <PageHeader
        title="List of Menus"
        breadcrumbs={[{ title: "Home", href: "" }]}
      />
    </Fragment>
  );
}
