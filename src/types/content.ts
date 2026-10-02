export type SiteSettings = {
  company_name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  website: string;
};

export type ContentSection = {
  id?: string;
  page_key: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  content_json: Record<string, unknown>;
  sort_order: number;
  is_published: boolean;
};

export type TeamMember = {
  id?: string;
  name: string;
  title: string;
  sort_order: number;
  is_published: boolean;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subject: string | null;
  message: string;
  created_at: string;
  is_read: boolean;
};
