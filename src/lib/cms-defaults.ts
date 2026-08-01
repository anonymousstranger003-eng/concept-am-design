// Seed content for every CMS section, derived from the original hardcoded site.
// Used to (a) pre-fill the admin editors on first open and (b) render the public
// site before/without any rows in `content_blocks`.

import coverGreenSofa from "@/assets/cover-green-sofa.jpg.asset.json";
import coverGallery from "@/assets/cover-gallery.jpg.asset.json";
import coverMinimal from "@/assets/cover-minimal.jpg.asset.json";
import heroWarm from "@/assets/hero-interior-warm.jpg.asset.json";
import founderManoj from "@/assets/founder-manoj.jpg.asset.json";
import founderAswini from "@/assets/founder-aswini.jpg.asset.json";
import aboutBlueprints from "@/assets/about-blueprints.jpg.asset.json";
import aboutLounge from "@/assets/about-lounge.jpg.asset.json";
import plan1 from "@/assets/plan-exterior-1.jpg.asset.json";
import plan2 from "@/assets/plan-exterior-2.jpg.asset.json";
import plan3 from "@/assets/plan-exterior-3.jpg.asset.json";
import plan4 from "@/assets/plan-exterior-4.jpg.asset.json";
import plan5 from "@/assets/plan-exterior-5.jpg.asset.json";
import plan6 from "@/assets/plan-exterior-6.jpg.asset.json";
import interiorLuxe from "@/assets/interior-living-luxe.png.asset.json";
import intBedroom from "@/assets/interior-bedroom.jpg.asset.json";
import intKitchen from "@/assets/interior-kitchen.jpg.asset.json";
import intDining from "@/assets/interior-dining.jpg.asset.json";
import intStudy from "@/assets/interior-study.jpg.asset.json";
import intBath from "@/assets/interior-bath.jpg.asset.json";
import intFoyer from "@/assets/interior-foyer.jpg.asset.json";
import { services as staticServices, stats as staticStats, faqs as staticFaqs } from "@/lib/site-data";

export type HeroContent = {
  eyebrow: string;
  heading: string;
  subheading: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  slides: { src: string; alt: string }[];
};

export type ServiceItem = { title: string; desc: string; img: string };
export type StatItem = { value: number; suffix: string; label: string };
export type FaqItem = { q: string; a: string };
export type TestimonialItem = {
  name: string;
  role?: string;
  quote: string;
  photo?: string;
  rating?: number;
  when?: string;
};
export type AboutContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  mission: string;
  vision: string;
  philosophy: string;
  image1: string;
  image2: string;
};
export type TeamMember = { name: string; role: string; photo: string; bio: string; quote?: string };
export type PortfolioItem = {
  title: string;
  category: string;
  location: string;
  img: string;
  description?: string;
  link?: string;
};
export type GalleryContent = { heading: string; items: { src: string; caption: string }[] };
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  body: string;
  author: string;
  publishedAt: string;
};
export type NavContent = { items: { label: string; href: string }[] };
export type FooterContent = {
  tagline: string;
  credits: string;
  columns: { title: string; links: { label: string; href: string }[] }[];
};
export type SeoContent = {
  pages: { path: string; title: string; description: string; ogImage?: string }[];
};

export const HERO_DEFAULT: HeroContent = {
  eyebrow: "EST. 2020 · KERALA, INDIA",
  heading: "Architecture that *listens*.\nInteriors that **last**.",
  subheading:
    "At AM Concepts Architects & Interiors, we create timeless architecture and bespoke interiors that combine elegance, functionality, and exceptional craftsmanship.",
  primaryCtaLabel: "Book Free Consultation",
  primaryCtaHref: "/contact",
  secondaryCtaLabel: "View Projects",
  secondaryCtaHref: "/portfolio",
  slides: [
    {
      src: coverGreenSofa.url,
      alt: "Sculptural olive velvet sofa in a wainscoted living room — signature AM Concepts interior",
    },
    { src: coverGallery.url, alt: "Warm tan leather sofa with curated gallery wall and biophilic accents" },
    { src: coverMinimal.url, alt: "Minimalist Scandinavian living room with sage sofa and walnut coffee table" },
  ],
};

export const TESTIMONIALS_DEFAULT: { heading: string; items: TestimonialItem[] } = {
  heading: "Trusted by families and businesses across Kerala.",
  items: [
    {
      name: "Anoop Nalupurappattil",
      role: "Residential Client",
      rating: 5,
      when: "2 months ago",
      quote:
        "It is a very beautiful house — we liked it a lot. AM Concepts Architects and Interiors built exactly what we wanted. All the guests who came to the house warming gave great comments. We got the same house we dreamed of. Thank you AM Concepts team.",
      photo: "",
    },
    {
      name: "Sudheesh Krishnan, Kanhangad",
      role: "Interior Project",
      rating: 4,
      when: "8 months ago",
      quote:
        "I am really happy with the interior work done by AM Concepts. The team understood my requirements and delivered exactly what I wanted. The quality of work is excellent and the designs are modern yet timeless. Highly recommended.",
      photo: "",
    },
    {
      name: "Archana Sandesh",
      role: "Interior Project",
      rating: 5,
      when: "2 years ago",
      quote:
        "AM Concepts are undoubtedly one of the finest interior design firms I have come across. Their remarkable talent lies in listening to our ideas and skilfully transforming them into stunning designs. Truly impressed and thoroughly satisfied.",
      photo: "",
    },
  ],
};

export const ABOUT_DEFAULT: AboutContent = {
  eyebrow: "About the studio",
  heading: "A Kerala studio designing buildings that feel honest, calm and built to last.",
  intro:
    "<p>AM Concepts &amp; Architects has been quietly shaping homes, workplaces and public buildings across Kerala since 2020 — led by founder Manoj S Sunder &amp; Ar Aswini Manoj.</p>",
  mission:
    "<p>To deliver architecture and interiors of high quality with honesty and integrity — buildings that perform, weather and age beautifully.</p>",
  vision:
    "<p>To be Kerala's most trusted architecture and interior studio — known for restraint, craft and a deeply personal client relationship.</p>",
  philosophy:
    "<p>Site first. Material truth. Quiet detailing. We design slow, build precisely, and avoid trends that won't survive a decade.</p>",
  image1: aboutLounge.url,
  image2: aboutBlueprints.url,
};

export const TEAM_DEFAULT: { items: TeamMember[] } = {
  items: [
    {
      name: "Manoj S Sunder",
      role: "Chief Interior Designer · Founder",
      photo: founderManoj.url,
      quote: "",
      bio:
        "<p>Interior design is more than arranging furniture and selecting finishes — it is about creating spaces that enhance the way people live, work, and experience their surroundings. A B.Sc. Interior Designing graduate from Alagappa University with over 15 years of experience in interior design and execution, Manoj believes every project is unique and every client has a distinct vision. From concept development and space planning to custom furniture design and project execution, he is committed to delivering interiors that reflect each client's personality and lifestyle.</p>",
    },
    {
      name: "Ar. Aswini Manoj",
      role: "Principal Architect & Co-Founder",
      photo: founderAswini.url,
      quote:
        "Architecture, to me, is the art of creating spaces that quietly shape the way people live, work, and feel. I believe good design is not just seen — it is experienced through light, proportion, detail, and emotion.",
      bio:
        "<p>Graduated with a strong passion for architecture and design thinking, inspired by the academic foundation of Srinivas School of Architecture and enriched through years of experience in residential and commercial projects.</p>",
    },
  ],
};

export const PORTFOLIO_CATEGORIES = [
  "Plan & Exterior",
  "Interior Design",
  "360° Virtual Experience",
] as const;

export const PORTFOLIO_DEFAULT: { items: PortfolioItem[] } = {
  items: [
    { title: "Hillside Residence", category: "Plan & Exterior", location: "Calicut", img: plan1.url },
    { title: "Modern Twin Block", category: "Plan & Exterior", location: "Kasaragod", img: plan2.url },
    { title: "Kerala Contemporary", category: "Plan & Exterior", location: "Wayanad", img: plan3.url },
    { title: "Gable Roof Villa", category: "Plan & Exterior", location: "Kannur", img: plan4.url },
    { title: "Courtyard Residence", category: "Plan & Exterior", location: "Malappuram", img: plan5.url },
    { title: "Two-Storey Contemporary", category: "Plan & Exterior", location: "Kasaragod", img: plan6.url },
    { title: "Luxe Living Room", category: "Interior Design", location: "Calicut", img: interiorLuxe.url },
    { title: "Warm Wood Bedroom", category: "Interior Design", location: "Kannur", img: intBedroom.url },
    { title: "Modular Marble Kitchen", category: "Interior Design", location: "Kasaragod", img: intKitchen.url },
    { title: "Walnut Dining Hall", category: "Interior Design", location: "Calicut", img: intDining.url },
    { title: "Reading Study Room", category: "Interior Design", location: "Wayanad", img: intStudy.url },
    { title: "Marble Master Bath", category: "Interior Design", location: "Kozhikode", img: intBath.url },
    { title: "Foyer & Staircase", category: "Interior Design", location: "Malappuram", img: intFoyer.url },
    {
      title: "Mr. Abdul Salam Residence",
      category: "360° Virtual Experience",
      location: "360° Virtual Tour",
      img: plan1.url,
      link: "https://www.coohom.com/pub/tool/panorama/show?obsPlanId=3FO3B0Q4EKOS&utm_source=pano_share&uri=%2Fpub%2Ftool%2Fbim%2Fcloud%3Fdesignid%3D3FO3B0Q4EKOS%26redirecturl%3D%2Fpub%2Fsaas%2Fapps%2Fproject%2Flist%26em%3D0%26locale%3Den_IN&utm_content=3FO3B0Q4EKOS&utm_medium=linkcopy",
    },
    {
      title: "Mr. Rakesh Pakkam",
      category: "360° Virtual Experience",
      location: "360° Virtual Tour",
      img: plan2.url,
      link: "https://www.coohom.com/pub/tool/panorama/show?obsPlanId=3FO3B672D0PT&utm_source=light720_share&uri=%2Fpub%2Fsaas%2Fapps%2Fproject%2Fdetail%2F3FO3B672D0PT%3Fuid%3D3FO4L61D95FY&utm_content=3FO3B672D0PT&utm_medium=linkcopy",
    },
    {
      title: "Mr. Giri Nilambur Residence",
      category: "360° Virtual Experience",
      location: "360° Virtual Tour",
      img: plan3.url,
      link: "https://www.coohom.com/pub/tool/panorama/show?obsPlanId=3FO3MTIBJE13&locale=en_US&utm_source=light720_share&utm_medium=linkcopy&utm_content=3FO3MTIBJE13",
    },
    {
      title: "Mr. Sunil Residence",
      category: "360° Virtual Experience",
      location: "360° Virtual Tour",
      img: plan4.url,
      link: "https://www.coohom.com/pub/tool/panorama/show?obsPlanId=3FO3H0NQKIVO&locale=en_US&utm_source=light720_share&utm_medium=linkcopy&utm_content=3FO3H0NQKIVO",
    },
    {
      title: "Mr. Mustafa Residence",
      category: "360° Virtual Experience",
      location: "360° Virtual Tour",
      img: plan5.url,
      link: "https://www.coohom.com/pub/tool/panorama/show?obsPlanId=3FO3IDHK6845&utm_source=pano_share&uri=%2Fpub%2Ftool%2Fbim%2Fcloud%3Fdesignid%3D3FO3IDHK6845%26redirecturl%3D%2Fpub%2Fsaas%2Fworkbench%26em%3D0%26locale%3Den_IN&utm_content=3FO3IDHK6845&utm_medium=linkcopy",
    },
    {
      title: "Luxe Living Room Walkthrough",
      category: "360° Virtual Experience",
      location: "360° Virtual Tour · Available on request",
      img: interiorLuxe.url,
      link: "https://wa.me/919539458218?text=I%27d%20like%20access%20to%20the%20Luxe%20Living%20360%20tour",
    },
    {
      title: "Modular Kitchen 360°",
      category: "360° Virtual Experience",
      location: "360° Virtual Tour · Available on request",
      img: intKitchen.url,
      link: "https://wa.me/919539458218?text=I%27d%20like%20access%20to%20the%20Modular%20Kitchen%20360%20tour",
    },
    {
      title: "Master Bedroom 360°",
      category: "360° Virtual Experience",
      location: "360° Virtual Tour · Available on request",
      img: intBedroom.url,
      link: "https://wa.me/919539458218?text=I%27d%20like%20access%20to%20the%20Master%20Bedroom%20360%20tour",
    },
  ],
};

export const GALLERY_DEFAULT: GalleryContent = {
  heading: "A closer look at our built work.",
  items: [
    { src: interiorLuxe.url, caption: "Luxe living room, Calicut" },
    { src: intBedroom.url, caption: "Warm wood bedroom, Kannur" },
    { src: intKitchen.url, caption: "Modular marble kitchen, Kasaragod" },
    { src: intDining.url, caption: "Walnut dining hall, Calicut" },
    { src: intStudy.url, caption: "Reading study, Wayanad" },
    { src: intBath.url, caption: "Marble master bath, Kozhikode" },
    { src: intFoyer.url, caption: "Foyer & staircase, Malappuram" },
    { src: plan4.url, caption: "Gable roof villa, Kannur" },
    { src: plan6.url, caption: "Two-storey contemporary, Kasaragod" },
  ],
};

export const BLOG_DEFAULT: { items: BlogPost[] } = {
  items: [
    {
      slug: "choosing-an-architect-in-kerala",
      title: "How to choose an architect in Kerala (2026 guide)",
      excerpt:
        "Fees, drawings, approvals and timelines — what to ask before you sign, and the questions most homeowners forget.",
      cover: plan1.url,
      author: "Ar. Aswini Manoj",
      publishedAt: "2026-01-12",
      body:
        "<h2>Start with the site, not the style</h2><p>The best plan for your plot is written by the land itself — slope, access, sun path and breeze. Ask any architect how they will respond to those four before discussing elevations.</p><h2>Understand the drawing set</h2><p>A complete residential set includes concept plans, working drawings, structural details, electrical and plumbing layouts, and municipality submission drawings. Confirm what is included in the fee.</p><h2>Approvals and documentation</h2><p>Building permits, occupancy and completion certificates each need their own submission. A studio that handles this in-house saves months.</p>",
    },
    {
      slug: "climate-responsive-homes",
      title: "Climate-responsive homes: designing for Kerala's monsoon",
      excerpt:
        "Deep overhangs, cross ventilation, raised plinths and honest materials — passive design that lowers running costs for decades.",
      cover: plan3.url,
      author: "Manoj S Sunder",
      publishedAt: "2025-11-04",
      body:
        "<h2>Passive before mechanical</h2><p>Orientation, shading and ventilation do more for comfort than any air conditioner. We design the envelope first and let the services support it.</p><h2>Materials that age well</h2><p>Laterite, terracotta and regional hardwoods weather gracefully in high humidity and are available close to site.</p>",
    },
    {
      slug: "turnkey-interiors-what-to-expect",
      title: "Turnkey interiors: what to expect, stage by stage",
      excerpt:
        "From measurement drawings to final styling — a transparent look at how a turnkey interior project actually runs.",
      cover: interiorLuxe.url,
      author: "Manoj S Sunder",
      publishedAt: "2025-08-19",
      body:
        "<h2>Stage 1 — Brief and measurement</h2><p>We document the space precisely and agree on a room-by-room brief and budget.</p><h2>Stage 2 — Design and 360° review</h2><p>You walk the space in virtual reality before a single panel is cut.</p><h2>Stage 3 — Execution</h2><p>Carpentry, ceilings, electrical, lighting and furnishing are coordinated on one schedule with weekly site reviews.</p>",
    },
  ],
};

export const NAV_DEFAULT: NavContent = {
  items: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
};

export const FOOTER_DEFAULT: FooterContent = {
  tagline:
    "A professional architecture and interior design firm, led by founder Manoj S, delivering high-quality design with honesty and integrity. Crafting spaces with character across Kerala and beyond.",
  credits: "Designed by Mediators Labs",
  columns: [
    {
      title: "Navigate",
      links: [
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Gallery", href: "/gallery" },
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
};

export const SEO_DEFAULT: SeoContent = {
  pages: [
    {
      path: "/",
      title: "AM Concepts Architects & Interiors | Best Architects in Kerala 2026",
      description:
        "Award-winning architecture and interior design studio in Kerala. AM Concepts — led by Manoj S Sunder & Ar. Aswini Manoj — designs timeless homes, villas, offices and eco-conscious spaces.",
      ogImage: heroWarm.url,
    },
    {
      path: "/about",
      title: "About AM Concepts | Architecture & Interior Studio in Kerala",
      description:
        "Meet the studio behind AM Concepts — founders Manoj S Sunder and Ar. Aswini Manoj, our mission, vision and eco-conscious design philosophy.",
      ogImage: aboutLounge.url,
    },
    {
      path: "/services",
      title: "Architecture & Interior Design Services | AM Concepts Kerala",
      description:
        "Architectural planning, permits, interiors, renovation, landscape, 3D visualisation and turnkey execution across Kerala.",
      ogImage: plan1.url,
    },
    {
      path: "/portfolio",
      title: "Portfolio | AM Concepts Architects & Interiors — Kerala",
      description:
        "Residential plans & exteriors, bespoke interior design and immersive 360° virtual experiences by AM Concepts Architects.",
      ogImage: plan2.url,
    },
    {
      path: "/gallery",
      title: "Gallery | Built Work by AM Concepts Architects & Interiors",
      description: "A closer look at completed homes, interiors and exteriors designed by AM Concepts in Kerala.",
      ogImage: interiorLuxe.url,
    },
    {
      path: "/blog",
      title: "Journal | Architecture & Interior Insights — AM Concepts",
      description: "Practical guides on building in Kerala: choosing an architect, climate-responsive design and turnkey interiors.",
      ogImage: plan3.url,
    },
    {
      path: "/faq",
      title: "FAQ | Working with AM Concepts Architects & Interiors",
      description: "Fees, timelines, drawings, approvals and turnkey scope — answers before you reach out.",
    },
    {
      path: "/contact",
      title: "Contact AM Concepts | Architects in Calicut & Kasaragod",
      description: "Book a free consultation with AM Concepts Architects & Interiors — studios in Calicut and Kasaragod, Kerala.",
    },
  ],
};

export const DEFAULTS: Record<string, Record<string, unknown>> = {
  home_hero: HERO_DEFAULT as unknown as Record<string, unknown>,
  services: { items: staticServices as ServiceItem[] },
  stats: { items: staticStats as StatItem[] },
  faqs: { items: staticFaqs as FaqItem[] },
  testimonials: TESTIMONIALS_DEFAULT as unknown as Record<string, unknown>,
  about: ABOUT_DEFAULT as unknown as Record<string, unknown>,
  team: TEAM_DEFAULT as unknown as Record<string, unknown>,
  portfolio: PORTFOLIO_DEFAULT as unknown as Record<string, unknown>,
  gallery: GALLERY_DEFAULT as unknown as Record<string, unknown>,
  blog: BLOG_DEFAULT as unknown as Record<string, unknown>,
  navigation: NAV_DEFAULT as unknown as Record<string, unknown>,
  footer: FOOTER_DEFAULT as unknown as Record<string, unknown>,
  seo: SEO_DEFAULT as unknown as Record<string, unknown>,
};
