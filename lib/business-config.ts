export type ServiceIconKey =
  | 'compass'
  | 'share'
  | 'layers'
  | 'trending'
  | 'calendar'
  | 'globe'
  | 'target'
  | 'chart';

export interface ProposedService {
  id: string;
  index: string;
  title: string;
  shortDescription: string;
  scopeSummary: string;
  focusAreas: string[];
  icon: ServiceIconKey;
  confirmed: boolean;
}

export interface BusinessConfig {
  businessName: string;
  category: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappDigits: string;
  whatsappMessage: string;
  country: string;
  hours: string;
  email: string;
  services: ProposedService[];
}

export const DEFAULT_SERVICES: ProposedService[] = [
  {
    id: 'digital-marketing-strategy',
    index: '01',
    title: 'Digital Marketing Strategy',
    shortDescription:
      'Structured channel planning, audience positioning, and roadmap prioritization tailored to commercial objectives.',
    scopeSummary:
      'Proposed strategic planning engagement to evaluate your current digital footprint, define target segments, and align marketing channels with business growth priorities.',
    focusAreas: [
      'Market & audience positioning framework',
      'Channel prioritization and budget allocation roadmap',
      'Core messaging alignment across digital touchpoints',
    ],
    icon: 'compass',
    confirmed: false,
  },
  {
    id: 'social-media-marketing',
    index: '02',
    title: 'Social Media Marketing',
    shortDescription:
      'Consistent brand voice, content direction, and audience engagement frameworks across key social platforms.',
    scopeSummary:
      'Proposed social media advisory covering editorial calendars, platform-specific messaging, and structured audience engagement practices.',
    focusAreas: [
      'Platform selection and content pillar design',
      'Editorial cadence and campaign messaging themes',
      'Community interaction and visibility planning',
    ],
    icon: 'share',
    confirmed: false,
  },
  {
    id: 'brand-development',
    index: '03',
    title: 'Brand Development',
    shortDescription:
      'Clear brand identity systems, value proposition articulation, and cohesive visual and verbal direction.',
    scopeSummary:
      'Proposed brand consulting to sharpen how your business presents itself, differentiates from alternatives, and builds immediate credibility.',
    focusAreas: [
      'Brand narrative and value proposition clarity',
      'Visual identity and tone-of-voice guidelines',
      'Customer perception and trust alignment',
    ],
    icon: 'layers',
    confirmed: false,
  },
  {
    id: 'business-growth-consulting',
    index: '04',
    title: 'Business Growth Consulting',
    shortDescription:
      'Commercial advisory focused on identifying scalable revenue levers, market opportunities, and customer retention.',
    scopeSummary:
      'Proposed growth advisory partnering with leadership to uncover bottlenecks, refine go-to-market priorities, and structure repeatable expansion plans.',
    focusAreas: [
      'Go-to-market opportunity evaluation',
      'Customer acquisition and retention alignment',
      'Quarterly growth initiative prioritization',
    ],
    icon: 'trending',
    confirmed: false,
  },
  {
    id: 'marketing-campaign-planning',
    index: '05',
    title: 'Marketing Campaign Planning',
    shortDescription:
      'End-to-end campaign architecture from objective setting and creative briefs to launch coordination.',
    scopeSummary:
      'Proposed campaign planning framework designed to structure product launches, seasonal pushes, and targeted promotional initiatives.',
    focusAreas: [
      'Campaign goal definition and timeline mapping',
      'Offer framing and cross-channel creative alignment',
      'Launch readiness and coordination checklists',
    ],
    icon: 'calendar',
    confirmed: false,
  },
  {
    id: 'online-presence-optimization',
    index: '06',
    title: 'Online Presence Optimization',
    shortDescription:
      'Refining web experience, search discoverability, and digital touchpoints so prospects convert with confidence.',
    scopeSummary:
      'Proposed review and optimization of your website structure, messaging hierarchy, and discoverability fundamentals to reduce friction.',
    focusAreas: [
      'Website user journey and clarity audit',
      'Search visibility and structural SEO fundamentals',
      'Conversion path and inquiry flow refinement',
    ],
    icon: 'globe',
    confirmed: false,
  },
  {
    id: 'lead-generation-strategy',
    index: '07',
    title: 'Lead Generation Strategy',
    shortDescription:
      'Intent-driven acquisition funnels designed to attract qualified prospects and streamline inquiry capture.',
    scopeSummary:
      'Proposed lead generation architecture focused on connecting high-intent buyers with clear calls to action and structured follow-up workflows.',
    focusAreas: [
      'Prospect intent mapping and offer design',
      'Landing experience and inquiry capture flow',
      'Lead qualification and handoff structuring',
    ],
    icon: 'target',
    confirmed: false,
  },
  {
    id: 'marketing-performance-analysis',
    index: '08',
    title: 'Marketing Performance Analysis',
    shortDescription:
      'Clear KPI frameworks and regular reporting reviews to turn marketing activity into actionable decisions.',
    scopeSummary:
      'Proposed measurement and review discipline focused on tracking meaningful engagement, reach, and conversion signals without vanity clutter.',
    focusAreas: [
      'KPI hierarchy aligned with business goals',
      'Campaign performance evaluation and diagnostics',
      'Iterative optimization recommendations',
    ],
    icon: 'chart',
    confirmed: false,
  },
];

export const DEFAULT_BUSINESS_CONFIG: BusinessConfig = {
  businessName: 'Business USA',
  category: 'Marketing Consultant',
  phoneDisplay: '+1 248-550-1633',
  phoneHref: '+12485501633',
  whatsappDigits: '12485501633',
  whatsappMessage:
    'Hello Business USA! I visited your website and would like to learn more about your marketing consultancy services. Could you please assist me?',
  country: 'United States',
  hours: 'Open 24 Hours',
  email: '',
  services: DEFAULT_SERVICES,
};

export function buildWhatsAppUrl(
  whatsappDigits: string,
  customMessage?: string
): string {
  const digits = whatsappDigits.replace(/\D/g, '') || '12485501633';
  const text = encodeURIComponent(
    customMessage || DEFAULT_BUSINESS_CONFIG.whatsappMessage
  );
  return `https://wa.me/${digits}?text=${text}`;
}

export function buildTelUrl(phoneHref: string): string {
  const cleaned = phoneHref.replace(/[^\d+]/g, '');
  return `tel:${cleaned || '+12485501633'}`;
}
