import { InferType, object, string } from 'yup';

export const siteSchema = object().shape({
  siteCompany: string().required('Company is required'),
  siteName: string().required('Name is required'),
  siteAbout: string().required('About is required'),
  siteSticky: string().required('Sticky is required'),
  siteWork: string().required('Work is required'),
  sitePhone: string().required('Phone is required'),
  siteFax: string().required('Fax is required'),
  siteEmail: string().required('Email is required'),
  siteAddress: string().required('Address is required'),
  embedMaps: string().optional(),
  embedCalculator: string().optional(),
  embedWebinar: string().optional(),
  embedCalendar: string().optional(),
  embedScript: string().optional(),
});

export type SiteSchemaType = InferType<typeof siteSchema>;
