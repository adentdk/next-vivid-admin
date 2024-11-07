import { array, boolean, InferType, mixed, number, object, string } from "yup";

const metaTitleSchema = object().shape({
  default: string().required(),
  template: string().required(),
  absolute: string().optional(),
});

const metaAuthorSchema = object().shape({
  name: string().required(),
  email: string().optional(),
  url: string().optional(),
});

const formatDetection = object().shape({
  email: boolean().optional(),
  address: boolean().optional(),
  telephone: boolean().optional(),
});

const metaImageSchema = object().shape({
  url: string().required(),
  width: string().optional(),
  height: string().optional(),
  alt: string().required(),
});

const openGraphSchema = object().shape({
  title: string().required(),
  description: string().required(),
  url: string().required(),
  siteName: string().required(),
  images: array().of(metaImageSchema).required().min(1),
  locale: string().optional(),
  type: string().required(),
});

const googleBotSchema = object().shape({
  index: boolean().optional(),
  follow: boolean().optional(),
  noimageindex: boolean().optional(),
  "max-video-preview": number().optional(),
  "max-mage-preview": string().optional(),
  masnippet: number().optional(),
});

const robotsSchema = object().shape({
  index: boolean().optional(),
  follow: boolean().optional(),
  nocache: boolean().optional(),
  googleBot: googleBotSchema.optional(),
});

const iconImageSchema = object().shape({
  url: string().required(),
  media: string().optional(),
  sizes: string().optional(),
  type: string().optional(),
});

const otherIconSchema = object().shape({
  rel: string().required(),
  url: string().required(),
});

const iconsSchema = object().shape({
  icon: array().of(iconImageSchema).optional(),
  shortcut: array().of(string()).optional(),
  apple: array().of(iconImageSchema).optional(),
  other: array().of(otherIconSchema).optional(),
});

const twitterCardSchema = object().shape({
  card: string().required(),
  title: string().required(),
  description: string().required(),
  siteId: string().optional(),
  creator: string().optional(),
  creatorId: string().optional(),
  images: metaImageSchema.optional(),
});

const verificationSchema = object().shape({
  google: string().optional(),
  yandex: string().optional(),
  yahoo: string().optional(),
  other: mixed().optional(),
});

const itunesSchema = object().shape({
  appId: string().required(),
  appArgument: string().optional(),
});

const appleWebAppSchema = object().shape({
  title: string().required(),
  statusBarStyle: string().optional(),
  startupImage: array().of(iconImageSchema).optional(),
});

const alternateSchema = object().shape({
  canonical: string().required(),
  languages: mixed().optional(),
  media: mixed().optional(),
  types: mixed().optional(),
});

const appLinksSchema = object().shape({
  ios: object()
    .shape({
      url: string().required(),
      app_store_id: string().required(),
    })
    .optional(),
  android: object()
    .shape({
      package: string().required(),
      app_name: string().required(),
    })
    .optional(),
  web: object().shape({
    url: string().required(),
    should_fallback: boolean().optional(),
  }),
});

export const metaSchema = object().shape({
  title: metaTitleSchema.required(),
  description: string().required(),
  generator: string().optional(),
  applicationName: string().optional(),
  referrer: string().optional(),
  keywords: array().of(string()).optional(),
  authors: metaAuthorSchema.optional(),
  creator: string().optional(),
  publisher: string().optional(),
  formatDetection: formatDetection.optional(),
  metadataBase: string().optional(),
  openGraph: openGraphSchema.optional(),
  robots: robotsSchema.optional(),
  icons: iconsSchema.optional(),
  manifest: string().optional(),
  twitter: twitterCardSchema.optional(),
  verification: verificationSchema.optional(),
  itunes: itunesSchema.optional(),
  appleWebApp: appleWebAppSchema.optional(),
  alternate: alternateSchema.optional(),
  appLinks: appLinksSchema.optional(),
  archives: array().of(string()).optional(),
  assets: array().of(string()).optional(),
  bookmarks: array().of(string()).optional(),
  category: array().of(string()).optional(),
  other: mixed().optional(),
});

export type MetaSchemaType = InferType<typeof metaSchema>;
