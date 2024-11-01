import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { getSettingByGroupQuery } from '~/libs/prisma/queries/get-setting-by-group.query';
import { SettingGroupEnum } from '~/libs/types/enum';

import SiteSettingForm from './_components/site-setting-form';

export default async function Page() {
  const settings = await getSettingByGroupQuery(SettingGroupEnum.Site);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan Halaman</CardTitle>
        <CardDescription>~</CardDescription>
      </CardHeader>

      <CardContent>
        <SiteSettingForm defaultValues={settings} />
      </CardContent>
    </Card>
  );
}
