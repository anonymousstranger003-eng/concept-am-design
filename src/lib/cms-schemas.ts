// Schema-driven content editor definitions.
// Each key maps to a row in the `content_blocks` table (jsonb `data`).

export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "image"
  | "url"
  | "number"
  | "list";

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  hint?: string;
  itemFields?: Field[]; // for type: "list"
  itemLabel?: string;
};

export type Section = {
  key: string;
  label: string;
  description: string;
  previewPath?: string;
  fields: Field[];
};

export const SECTIONS: Section[] = [
  {
    key: "home_hero",
    label: "Home — Hero",
    description: "The cover slideshow, headline and subheadline on the homepage.",
    previewPath: "/",
    fields: [
      { key: "eyebrow", label: "Eyebrow (small caps text)", type: "text" },
      {
        key: "heading",
        label: "Headline",
        type: "textarea",
        hint: "One line per row. Wrap words in *asterisks* for italics, **double** for the red accent.",
      },
      { key: "subheading", label: "Subheadline", type: "textarea" },
      { key: "primaryCtaLabel", label: "Primary button label", type: "text" },
      { key: "primaryCtaHref", label: "Primary button link", type: "url" },
      { key: "secondaryCtaLabel", label: "Secondary button label", type: "text" },
      { key: "secondaryCtaHref", label: "Secondary button link", type: "url" },
      {
        key: "slides",
        label: "Cover slideshow images",
        type: "list",
        itemLabel: "Slide",
        itemFields: [
          { key: "src", label: "Image", type: "image" },
          { key: "alt", label: "Alt text", type: "text" },
          {
            key: "position",
            label: "Image focus (mobile fit)",
            type: "text",
            hint: 'Optional CSS object-position, e.g. "center", "60% 50%", "center 30%".',
          },
          { key: "eyebrow", label: "Slide eyebrow (optional)", type: "text" },
          {
            key: "heading",
            label: "Slide headline (optional)",
            type: "textarea",
            hint: "Leave blank to reuse the main headline. *italics*, **red accent**.",
          },
          { key: "subheading", label: "Slide subheadline (optional)", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "services",
    label: "Services",
    description: "The service cards shown on the homepage and services page.",
    previewPath: "/services",
    fields: [
      {
        key: "items",
        label: "Services",
        type: "list",
        itemLabel: "Service",
        itemFields: [
          { key: "title", label: "Title", type: "text" },
          { key: "desc", label: "Description", type: "textarea" },
          { key: "img", label: "Image", type: "image" },
        ],
      },
    ],
  },
  {
    key: "stats",
    label: "Stats / Numbers",
    description: "The animated counters shown across the site.",
    previewPath: "/",
    fields: [
      {
        key: "items",
        label: "Stats",
        type: "list",
        itemLabel: "Stat",
        itemFields: [
          { key: "value", label: "Number", type: "number" },
          { key: "suffix", label: "Suffix (e.g. + or %)", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
    ],
  },
  {
    key: "faqs",
    label: "FAQ",
    description: "Frequently asked questions on the FAQ page.",
    previewPath: "/faq",
    fields: [
      {
        key: "items",
        label: "Questions",
        type: "list",
        itemLabel: "FAQ",
        itemFields: [
          { key: "q", label: "Question", type: "text" },
          { key: "a", label: "Answer", type: "richtext" },
        ],
      },
    ],
  },
  {
    key: "testimonials",
    label: "Testimonials",
    description: "Client reviews shown on the homepage.",
    previewPath: "/",
    fields: [
      { key: "heading", label: "Section heading", type: "text" },
      {
        key: "items",
        label: "Reviews",
        type: "list",
        itemLabel: "Review",
        itemFields: [
          { key: "name", label: "Client name", type: "text" },
          { key: "role", label: "Role / Project", type: "text" },
          { key: "quote", label: "Quote", type: "textarea" },
          { key: "photo", label: "Photo (optional)", type: "image" },
          { key: "rating", label: "Rating (1–5)", type: "number" },
          { key: "when", label: "When (e.g. 2 months ago)", type: "text" },
        ],
      },
    ],
  },
  {
    key: "about",
    label: "About Page",
    description: "The About page copy: mission, vision, philosophy, story.",
    previewPath: "/about",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "intro", label: "Intro paragraph", type: "richtext" },
      { key: "mission", label: "Mission", type: "richtext" },
      { key: "vision", label: "Vision", type: "richtext" },
      { key: "philosophy", label: "Design philosophy", type: "richtext" },
      { key: "image1", label: "About image 1", type: "image" },
      { key: "image2", label: "About image 2", type: "image" },
    ],
  },
  {
    key: "team",
    label: "Team / Founders",
    description: "Founder & team member profiles (homepage and About page).",
    previewPath: "/about",
    fields: [
      {
        key: "items",
        label: "Members",
        type: "list",
        itemLabel: "Member",
        itemFields: [
          { key: "name", label: "Name", type: "text" },
          { key: "role", label: "Role", type: "text" },
          { key: "photo", label: "Photo", type: "image" },
          { key: "quote", label: "Pull quote (optional)", type: "textarea" },
          { key: "bio", label: "Bio", type: "richtext" },
        ],
      },
    ],
  },
  {
    key: "portfolio",
    label: "Portfolio / Projects",
    description: "Project entries for the portfolio page and homepage grid.",
    previewPath: "/portfolio",
    fields: [
      {
        key: "items",
        label: "Projects",
        type: "list",
        itemLabel: "Project",
        itemFields: [
          { key: "title", label: "Title", type: "text" },
          {
            key: "category",
            label: "Category",
            type: "text",
            hint: "Use exactly: Plan & Exterior · Interior Design · 360° Virtual Experience",
          },
          { key: "location", label: "Location", type: "text" },
          { key: "img", label: "Cover image", type: "image" },
          { key: "description", label: "Description", type: "richtext" },
          { key: "link", label: "External link (optional)", type: "url" },
        ],
      },
    ],
  },
  {
    key: "gallery",
    label: "Gallery",
    description: "Standalone image gallery page.",
    previewPath: "/gallery",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      {
        key: "items",
        label: "Images",
        type: "list",
        itemLabel: "Image",
        itemFields: [
          { key: "src", label: "Image", type: "image" },
          { key: "caption", label: "Caption", type: "text" },
        ],
      },
    ],
  },
  {
    key: "blog",
    label: "Blog",
    description: "Blog articles shown at /blog.",
    previewPath: "/blog",
    fields: [
      {
        key: "items",
        label: "Posts",
        type: "list",
        itemLabel: "Post",
        itemFields: [
          { key: "slug", label: "Slug (url-safe)", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "excerpt", label: "Excerpt", type: "textarea" },
          { key: "cover", label: "Cover image", type: "image" },
          { key: "body", label: "Body", type: "richtext" },
          { key: "author", label: "Author", type: "text" },
          { key: "publishedAt", label: "Published date (YYYY-MM-DD)", type: "text" },
        ],
      },
    ],
  },
  {
    key: "navigation",
    label: "Navigation",
    description: "Header navigation links.",
    previewPath: "/",
    fields: [
      {
        key: "items",
        label: "Links",
        type: "list",
        itemLabel: "Link",
        itemFields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "URL", type: "url" },
        ],
      },
    ],
  },
  {
    key: "footer",
    label: "Footer",
    description: "Footer copy, links and credits.",
    previewPath: "/",
    fields: [
      { key: "tagline", label: "Tagline", type: "textarea" },
      { key: "credits", label: "Credits line", type: "text" },
      {
        key: "columns",
        label: "Link columns",
        type: "list",
        itemLabel: "Column",
        itemFields: [
          { key: "title", label: "Column title", type: "text" },
          {
            key: "links",
            label: "Links",
            type: "list",
            itemLabel: "Link",
            itemFields: [
              { key: "label", label: "Label", type: "text" },
              { key: "href", label: "URL", type: "url" },
            ],
          },
        ],
      },
    ],
  },
  {
    key: "seo",
    label: "SEO — Per Page",
    description: "Per-page SEO overrides (title / description / OG image).",
    previewPath: "/",
    fields: [
      {
        key: "pages",
        label: "Pages",
        type: "list",
        itemLabel: "Page",
        itemFields: [
          { key: "path", label: "Path (e.g. /about)", type: "text" },
          { key: "title", label: "Meta title", type: "text" },
          { key: "description", label: "Meta description", type: "textarea" },
          { key: "ogImage", label: "OG image", type: "image" },
        ],
      },
    ],
  },
];

export const SECTION_BY_KEY: Record<string, Section> = Object.fromEntries(
  SECTIONS.map((s) => [s.key, s]),
);
