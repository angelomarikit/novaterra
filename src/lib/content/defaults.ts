import type { BlogPost, NewsSectionHeader, SiteSettings, TeamMember } from "@/types/content";

export const SITE: SiteSettings = {
  company_name: "Novaterra Circular Economy Inc.",
  tagline: "From Waste to Progress: Building a Sustainable Future",
  phone: "0898-2001599",
  email: "info@novaterracircular.com",
  address: "B10 L14 Kroner Street, Villa Carolina 1, Tunasan, Muntinlupa City, 1773",
  website: "novaterracircular.com",
};

/** Default section images — editable via Admin CMS (image_url) */
export const SECTION_IMAGES = {
  home_hero: "/sections/circular-value.png",
  home_why_exists: "/sections/recovery.jpg",
  about_long_term_vision: "/sections/vision.jpg",
  technology_pyrolysis: "/sections/pyrolysis.jpg",
  sustainability_esg: "/sections/sustainability-by-design.png",
} as const;

export const NEWS_IMAGES = {
  circular: "/news/circular-infrastructure.jpg",
  pyrolysis: "/news/pyrolysis.jpg",
  partnership: "/news/partnership.jpg",
} as const;

export const NEWS_SECTION: NewsSectionHeader = {
  eyebrow: "News & insights",
  title: "News, Articles & Insights",
  subtitle:
    "Follow project milestones, technology explainers, and partnership updates as Novaterra develops responsible waste-to-resource infrastructure.",
};

const isoDaysAgo = (days: number) =>
  new Date(Date.now() - days * 86400000).toISOString();

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    slug: "scaling-circular-infrastructure",
    title: "Scaling responsible circular infrastructure in the Philippines",
    excerpt:
      "Novaterra is advancing integrated waste recovery facilities designed to divert suitable streams from landfills and return materials to productive use.",
    body: `Modern economies generate rising volumes of residual waste while industries still depend on energy and raw materials. Novaterra Circular Economy Inc. is developing infrastructure that converts selected waste streams into recovered fuels, syngas, and carbon-rich materials through controlled pyrolysis and complementary recovery steps.

Our approach prioritizes environmental safeguards, community engagement, and long-term operability — not one-off disposal projects. Each facility is planned as part of a broader network connecting municipalities, waste generators, logistics partners, and industrial off-takers.

As we progress site development and partnerships, we will share milestones on technology commissioning, feedstock qualification, and regional collaboration that supports a more circular resource system.`,
    category: "news",
    image_url: NEWS_IMAGES.circular,
    published_at: isoDaysAgo(12),
    sort_order: 1,
    is_published: true,
  },
  {
    slug: "understanding-pyrolysis-for-waste-recovery",
    title: "Understanding pyrolysis for waste-to-resource recovery",
    excerpt:
      "Pyrolysis thermally breaks down carbon-rich materials with limited oxygen, producing oils, gases, and solid carbon products instead of open burning or uncontrolled disposal.",
    body: `Pyrolysis is a core technology in Novaterra's recovery toolkit. Suitable organic or carbon-containing feedstocks are heated in a controlled environment where oxygen is limited. Complex molecules break into simpler compounds that can be captured as pyrolysis oil, syngas, and biochar or carbon black.

Unlike incineration focused on disposal, pyrolysis is oriented toward material and energy recovery — provided feedstocks are properly screened and emissions controls are engineered into the plant design.

Novaterra integrates pyrolysis with sorting, pre-treatment, and product handling so recovered outputs can meet industrial specifications.`,
    category: "article",
    image_url: NEWS_IMAGES.pyrolysis,
    published_at: isoDaysAgo(26),
    sort_order: 2,
    is_published: true,
  },
  {
    slug: "partnerships-for-regional-circular-systems",
    title: "Building partnerships for regional circular systems",
    excerpt:
      "Circular infrastructure succeeds when municipalities, industry, and communities align on feedstock, logistics, and shared environmental outcomes.",
    body: `Circular-economy infrastructure is inherently collaborative. Novaterra works with local governments, waste generators, logistics providers, and industrial users to design systems that are technically sound and economically viable.

Partnerships help define acceptable feedstock streams, collection routes, and product markets before capital is deployed. They also create transparency around environmental monitoring, safety, and community benefit — essential for long-term acceptance.

We welcome conversations with municipalities exploring alternatives to landfill dependence, companies seeking recovered materials or energy carriers, and investors interested in durable environmental infrastructure.`,
    category: "blog",
    image_url: NEWS_IMAGES.partnership,
    published_at: isoDaysAgo(40),
    sort_order: 3,
    is_published: true,
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/technology", label: "Technology" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/news", label: "News & Updates" },
  { href: "/contact", label: "Contact" },
] as const;

export const HERO = {
  eyebrow: "Circular Economy Infrastructure",
  lines: [
    "From Waste to Progress.",
    "Building a Sustainable Future.",
  ],
  description: [
    "Novaterra Circular Economy Inc. is an environmental sustainability and circular economy-focused company, transforming waste streams into valuable resources, energy products, and industrial feedstocks.",
    "Our core technology platform is pyrolysis, a controlled thermochemical conversion process capable of processing selected carbon-rich waste materials into liquid, gas, and solid outputs.",
    "Going far beyond conventional disposal, Novaterra's holistic, closed-loop framework turns waste liabilities into an integrated circular ecosystem.",
  ].join("\n\n"),
  imageUrl: SECTION_IMAGES.home_hero,
  primaryCta: { label: "Explore Our Cycle", href: "/technology" },
  secondaryCta: { label: "Partner With Us", href: "/contact" },
  tags: [
    "Environmental Infrastructure",
    "Circular Economy",
    "Resource Recovery",
    "Pyrolysis Technology",
  ],
};

export const WHY_EXISTS = {
  title: "Why Novaterra Exists",
  body: "Modern economies generate increasing volumes of waste while industries still require energy and raw materials. Many waste streams are difficult to manage via landfills or conventional recycling due to contamination, mixed materials, or economic barriers.",
  mission:
    "To develop responsible and sustainable solutions that enable waste materials to be recovered, converted, and returned to productive economic use.",
  highlight: "Novaterra exists to address this gap.",
};

export const WASTE_CHALLENGES = [
  {
    title: "Growing Waste Volumes",
    body: "Communities and industries continuously generate municipal, commercial, agricultural, plastic, rubber, and other residual waste.",
  },
  {
    title: "Difficult-to-Recycle Materials",
    body: "Certain materials are technically or economically challenging to recover through conventional recycling.",
  },
  {
    title: "Landfill Dependence",
    body: "Disposal consumes land and can create long-term environmental-management requirements.",
  },
  {
    title: "Loss of Embedded Resources",
    body: "Waste can contain carbon, hydrocarbons, energy, and other materials that may still have economic value.",
  },
  {
    title: "Increasing Sustainability Requirements",
    body: "Industries and communities are increasingly seeking more resource-efficient and environmentally responsible systems.",
  },
];

export const CYCLE_STEPS = [
  { label: "Waste Stream", detail: "Identify residual materials entering the system." },
  { label: "Assessment & Segregation", detail: "Evaluate suitability and prepare streams." },
  { label: "Feedstock Preparation", detail: "Size, dry, and condition materials for conversion." },
  { label: "Pyrolysis", detail: "Thermally convert carbon-rich waste under controlled conditions." },
  { label: "Product Recovery", detail: "Capture liquid, gas, and solid fractions." },
  { label: "Refining / Processing", detail: "Upgrade and stabilize recovered products." },
  { label: "Industrial Application", detail: "Route outputs to qualified end uses." },
  { label: "Resource Returns", detail: "Close the loop back into the economy." },
];

export const VALUE_CHAIN = [
  {
    title: "Waste",
    body: "We understand the feedstock problem.",
    image_url: "/sections/value-chain/01-waste.png",
  },
  {
    title: "Technology",
    body: "We identify appropriate conversion pathways.",
    image_url: "/sections/value-chain/02-technology.png",
  },
  {
    title: "Infrastructure",
    body: "We develop the physical system required to process the material.",
    image_url: "/sections/value-chain/03-infrastructure.png",
  },
  {
    title: "Recovery",
    body: "We seek to maximize useful outputs.",
    image_url: "/sections/value-chain/04-recovery.png",
  },
  {
    title: "Market",
    body: "We connect recovered products with potential end users.",
    image_url: "/sections/value-chain/05-market.png",
  },
  {
    title: "Sustainability",
    body: "We measure environmental, economic and social outcomes.",
    image_url: "/sections/value-chain/06-sustainability.png",
  },
];

export const VISION =
  "To build a future where waste is transformed into resources, materials remain in productive circulation, and communities and industries progress toward more sustainable and resilient economic systems.";

export const MISSION =
  "To develop, build and operate responsible circular-economy infrastructure that converts suitable waste streams into valuable energy, materials and industrial by-products through advanced pyrolysis and resource-recovery technologies, ultimately lowering our global carbon footprint.";

export const VALUES = [
  {
    title: "Innovation",
    body: "We pursue better ways to recover and utilize resources.",
  },
  {
    title: "Integrity",
    body: "We operate with transparency, accountability and professionalism.",
  },
  {
    title: "Collaboration",
    body: "We build partnerships across government, industry, technology and communities.",
  },
  {
    title: "Responsibility",
    body: "We recognize our responsibility to people, communities and the environment.",
  },
  {
    title: "Efficiency",
    body: "We seek to maximize useful resource recovery.",
  },
  {
    title: "Sustainability",
    body: "We pursue solutions that create long-term environmental, economic and social value.",
  },
];

export const COMMITMENTS = [
  {
    title: "Technical Integrity",
    body: "Technology must be matched to the actual feedstock and operating environment.",
  },
  {
    title: "Environmental Responsibility",
    body: "Projects must be developed and operated in accordance with applicable environmental requirements.",
  },
  {
    title: "Commercial Discipline",
    body: "Projects must have credible feedstock, product, operating and financial assumptions.",
  },
  {
    title: "Safety",
    body: "People, communities and workers must remain central to project design.",
  },
  {
    title: "Transparency",
    body: "Performance should be measurable, documented and responsibly communicated.",
  },
  {
    title: "Continuous Improvement",
    body: "Novaterra will continue to improve its technology, operations and sustainability practices.",
  },
];

export const TEAM: TeamMember[] = [
  {
    name: "Raymo Gino L. Palaca",
    title: "Chairman / CEO",
    photo_url: "/team/raymo-gino-palaca.jpg",
    sort_order: 1,
    is_published: true,
  },
  {
    name: "Engr. Cornelio Macapagal",
    title: "Chief-Technology-Officer",
    photo_url: "/team/cornelio-macapagal.jpg",
    sort_order: 2,
    is_published: true,
  },
  {
    name: "Engr. Ian Lorenz Agcamaran",
    title: "Chief-Management-Officer",
    photo_url: "/team/ian-lorenz-agcamaran.jpg",
    sort_order: 3,
    is_published: true,
  },
  {
    name: "Jared Alvin Valarao",
    title: "Chief-Finance-Officer",
    photo_url: "/team/jared-alvin-valarao.jpg",
    sort_order: 4,
    is_published: true,
  },
  {
    name: "Engr. Oscarlito Malveda",
    title: "Chief-Operating-Officer",
    photo_url: "/team/oscarlito-malveda.jpg",
    sort_order: 5,
    is_published: true,
  },
  {
    name: "Natalya Moldez-Palaca",
    title: "Administrative Officer",
    photo_url: "/team/natalya-moldez-palaca.jpg",
    sort_order: 6,
    is_published: true,
  },
  {
    name: "Aldrich Walther Alvarez",
    title: "Financial Adviser / Corporate Secretary",
    photo_url: "/team/aldrich-walther-alvarez.jpg",
    sort_order: 7,
    is_published: true,
  },
  {
    name: "Henry Klapproth",
    title: "Investment Relations",
    photo_url: "/team/henry-klapproth.jpg",
    sort_order: 8,
    is_published: true,
  },
  // Draft slots — publish from Admin → Team when ready
  {
    name: "Team Member",
    title: "Position Title",
    photo_url: null,
    sort_order: 9,
    is_published: false,
  },
  {
    name: "Team Member",
    title: "Position Title",
    photo_url: null,
    sort_order: 10,
    is_published: false,
  },
];

export const PYROLYSIS = {
  title: "What is Pyrolysis?",
  subtitle: "Converting carbon-rich waste into resources",
  body: "Pyrolysis is a controlled process in which suitable organic or carbon-containing materials are heated under conditions with little or no oxygen. Instead of simply combusting the material, the process thermally breaks down complex organic compounds. Depending on the feedstock and process configuration, pyrolysis can generate three principal by-product fractions:",
  products: [
    { title: "Pyro Oil | Bio Oil", body: "Liquid fractions suitable for further refining or industrial energy applications." },
    { title: "Syngas", body: "Process gas that can support energy recovery within the facility system." },
    { title: "Biochar | Carbon Black", body: "Solid carbon products with agricultural, industrial, or material applications." },
  ],
};

export const PYROLYSIS_MODEL = [
  {
    step: "01",
    title: "Feedstock",
    body: "Suitable waste materials are identified and characterized.",
    image_url: "/sections/pyrolysis-model/01-feedstock.png",
  },
  {
    step: "02",
    title: "Preparation",
    body: "Materials are sorted, prepared, sized, dried, or conditioned as required.",
    image_url: "/sections/pyrolysis-model/02-preparation.png",
  },
  {
    step: "03",
    title: "Thermal Conversion",
    body: "The prepared material enters a controlled pyrolysis process.",
    image_url: "/sections/pyrolysis-model/03-thermal-conversion.png",
  },
  {
    step: "04",
    title: "Product Separation",
    body: "Liquid, gas and solid fractions are separated and collected.",
    image_url: "/sections/pyrolysis-model/04-product-separation.png",
  },
  {
    step: "05",
    title: "Processing",
    body: "Recovered products may undergo purification, upgrading, stabilization or further processing.",
    image_url: "/sections/pyrolysis-model/05-processing.png",
  },
  {
    step: "06",
    title: "End Use",
    body: "Qualified products are directed toward appropriate industrial, agricultural, energy or commercial applications.",
    image_url: "/sections/pyrolysis-model/06-end-use.png",
  },
];

export const CORE_PRINCIPLES = {
  title: "Core Principles",
  subtitle: "Waste is not the end of the cycle",
  body: "Our objective is to keep materials and embedded resources productive for as long as technically, economically, and environmentally appropriate. Pyrolysis is one component of this system. It does not replace waste prevention, reuse or conventional recycling. Instead, it can provide an additional recovery pathway for appropriate residual waste streams that are difficult to manage through higher-priority methods.",
  stages: ["Use", "Recover", "Recycle", "Reuse", "Reintroduce"],
  imageUrl: "/sections/core-principles-cycle.png",
};

export const SUSTAINABILITY_BY_DESIGN = {
  title: "Sustainability by Design",
  body: "For Novaterra, sustainability is not limited to what happens inside the reactor.",
  imageUrl: "/sections/sustainability-by-design.png",
};

export const SUSTAINABILITY_PILLARS = {
  environmental: [
    "Waste diversion",
    "Resource recovery",
    "Energy efficiency",
    "Responsible emissions management",
    "Reduced dependence on disposal",
    "Material circularity",
  ],
  social: [
    "Local employment",
    "Skills development",
    "Community engagement",
    "Worker health and safety",
    "Responsible project development",
  ],
  economic: [
    "New resource streams",
    "Local infrastructure investment",
    "Product commercialization",
    "Employment",
    "Industrial development",
    "Long-term project viability",
  ],
  governance: [
    "Regulatory compliance",
    "Environmental monitoring",
    "Risk management",
    "Transparent reporting",
    "Responsible procurement",
    "Operational controls",
  ],
};

export const LONG_TERM_VISION = {
  title: "Our Long-Term Vision",
  subtitle: "Building a network of circular infrastructure",
  body: "Novaterra’s ambition extends beyond a single facility. We envision the development of regional circular-economy infrastructure capable of connecting:",
  network: [
    "Municipalities",
    "Waste Generators",
    "Collection & Logistics",
    "Novaterra Facilities",
    "Resource Recovery",
    "Industrial Markets",
    "New Economic Value",
  ],
  closing:
    "Over time, this network can create a more integrated system for managing residual waste and recovering resources.",
};

export const FUTURE_OF_CIRCULAR_ECONOMY = {
  eyebrow: "Future of",
  title: "Circular Economy",
  body: "The future is not a world without waste—it is a world where waste no longer represents the end of value. The circular economy will redefine how we produce, consume, recover, and reuse resources, transforming residual materials into new inputs for energy, industry, agriculture, and manufacturing. Through innovation, responsible technology, and integrated infrastructure, we can move from a linear economy of disposal toward a regenerative system where resources remain in circulation and value is continuously recovered. Novaterra is building toward that future—where waste becomes a resource, recovery becomes an opportunity, and sustainability becomes part of how the economy works.",
  imageUrl: "/sections/future-circular-economy.png",
};

/** @deprecated Prefer FUTURE_OF_CIRCULAR_ECONOMY.body */
export const FUTURE_STATEMENT = FUTURE_OF_CIRCULAR_ECONOMY.body;

export const PHILOSOPHY =
  "Technology creates the possibility. Integration creates the business. Sustainability creates the long-term value.";
