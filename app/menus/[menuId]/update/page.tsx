import PageHeader from "@/components/commons/page-header";
import { getMenuDetailQuery } from "@/libs/prisma/queries/get-menu-detail.query";
import { MenuLinkTargetEnum, MenuLinkTypeEnum } from "@/libs/types/enum";

import UpdateMenuForm from "../../_components/update-menu-form";

export default async function Page({
  params,
}: {
  params: {
    menuId: string;
  };
}) {
  const menu = await getMenuDetailQuery(+params.menuId, {
    withChildrenCount: true,
  });

  if (!menu) {
    return null;
  }

  return (
    <main className="space-y-8">
      <PageHeader
        title="Update Menu"
        canGoBack
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "List of Menus", href: "/menu" },
          {
            title: "Update Menu",
            href: `/menus/${menu.id}/update`,
            disabled: true,
          },
        ]}
      />

      <UpdateMenuForm
        menuId={menu.id}
        defaultValues={{
          name: menu.name,
          description: menu.description ?? "",
          href: menu.href ?? "",
          i18nNameKey: menu.i18nNameKey ?? "",
          i18nDescriptionKey: menu.i18nDescriptionKey ?? "",
          status: menu.status,
          group: menu.group,
          linkType: menu.categoryId
            ? MenuLinkTypeEnum.Category
            : MenuLinkTypeEnum.Href,
          linkTarget: menu.hrefTarget ?? MenuLinkTargetEnum.CurrentTab,
          icon: menu.icon || undefined,
        }}
      />
    </main>
  );
}
