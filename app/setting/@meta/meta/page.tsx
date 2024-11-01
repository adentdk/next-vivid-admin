import { Fragment } from 'react';

import { getSettingByGroupQuery } from '~/libs/prisma/queries/get-setting-by-group.query';
import { SettingGroupEnum } from '~/libs/types/enum';

import MetaSettingForm from './_components/meta-setting-form';

export default async function Page() {
  const settings = await getSettingByGroupQuery(SettingGroupEnum.Meta);
  return (
    <Fragment>
      <MetaSettingForm defaultValues={settings} />
    </Fragment>
  );
}
