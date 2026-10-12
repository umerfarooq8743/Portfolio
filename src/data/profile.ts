/**
 * Single source of truth for portfolio content.
 *
 * Everything here is taken from Umer's own brief, his public GitHub profile
 * README and his public repositories. Edit this file to update the site —
 * please keep it factual (no invented metrics, clients or links).
 */

export const profile = {
  name: 'Umer Farooq',
  shortName: 'Umer',
  title: 'Software Engineer',
  specialty: 'Full-Stack MEAN Stack Developer',
  location: 'Karachi, Pakistan',
  timezone: 'PKT · UTC+5',
  experience: '3+ years',
  currentRole: 'Software Engineer at i-Splendid',
  email: 's.m.umerfarooq8743@gmail.com',
  photo: '/umer-farooq.jpg',
  links: {
    linkedin: 'https://www.linkedin.com/in/umerfarooq-dev',
    github: 'https://github.com/umerfarooq8743',
    githubRepos: 'https://github.com/umerfarooq8743?tab=repositories',
  },
} as const

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectVisualKind = 'oms' | 'accounts' | 'pos' | 'health' | 'booking' | 'desktop'

export interface Project {
  id: string
  name: string
  kind: string
  context: string
  status?: string
  /** Featured projects get a large alternating case-study row. */
  featured?: boolean
  summary: string
  role: string
  stack: string[]
  highlights: string[]
  visual: ProjectVisualKind
  caseStudy: {
    overview: string
    contribution: string[]
    involves?: { title: string; body: string }[]
    note: string
  }
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    id: 'shipkardo',
    featured: true,
    name: 'ShipKardo',
    kind: 'Order Management System',
    context: 'Professional · i-Splendid',
    summary:
      'A full-stack order management platform that pulls orders in from every selling channel and ships them through 20+ courier integrations — with products and inventory kept in sync.',
    role: 'Full-stack — frontend and backend',
    stack: ['Angular', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API', 'REST APIs', 'SMTP'],
    highlights: [
      '20+ courier integrations, including BlueEx, TCS, Leopards, PostEx, M&P and Call Courier Trax',
      'Selling-channel integrations: Shopify, WooCommerce, Daraz and Splendid Accounts',
      'AI: natural-language reporting on the OpenAI API, and AI agents that act on instructions (in progress)',
    ],
    visual: 'oms',
    caseStudy: {
      overview:
        'Merchants who sell across several channels need one place to receive orders, manage their catalogue and dispatch parcels through local couriers. ShipKardo is the order management system i-Splendid builds for that workflow, and it is where I work across the entire stack.',
      contribution: [
        'Develop and maintain features on both the Angular frontend and the Node.js / Express.js backend, with MongoDB as the data layer.',
        'Integrated 20+ courier services — including BlueEx, TCS, Leopards, PostEx, M&P and Call Courier Trax — into the shipping workflow.',
        'Integrated selling channels — Shopify, WooCommerce, Daraz and Splendid Accounts — for automated order synchronization.',
        'Built product management features: product listings, product updates and inventory synchronization.',
        'Implemented SMTP-based email notifications.',
        'Built Natural Language Reporting (NLR) with the OpenAI API, so users can ask for reports in plain language instead of navigating filters.',
        'Worked on agentic AI across the project — and currently building AI agents inside ShipKardo that are given instructions for a task and make their own decisions to carry it out.',
        'Debug production issues and improve existing functionality together with the team.',
      ],
      involves: [
        {
          title: 'Many couriers, one workflow',
          body: 'Each courier exposes its own API, booking flow and shipment statuses. The job is to fold those differences into one consistent experience for the person dispatching orders.',
        },
        {
          title: 'Platforms that have to agree',
          body: 'Orders and product data originate in external selling channels. Keeping them aligned with the OMS means thinking carefully about when and how data moves between systems.',
        },
        {
          title: 'AI that has to be trusted',
          body: 'Reports generated from a plain-language question, and agents that decide their own next step, only help if their output is right — so the work is as much about guardrails and clear instructions as the model call.',
        },
        {
          title: 'Owning features end to end',
          body: 'Working on both sides of the API means a feature is designed once — from the MongoDB data it needs, through Express routes, to the Angular screens that use it.',
        },
      ],
      note: 'ShipKardo is a proprietary product. Source code, internal implementation details and customer data are intentionally not shown here.',
    },
    links: [],
  },
  {
    id: 'splendid-accounts',
    featured: true,
    name: 'Splendid Accounts',
    kind: 'Complete ERP Solution',
    context: 'Professional · i-Splendid',
    summary:
      'A complete online ERP for small and medium-sized businesses in Pakistan — sales, purchase, inventory, accounting, manufacturing, POS and financial reporting, with multi-currency support and real-time access from any device. I build its Angular frontend, including the role and permission system.',
    role: 'Frontend — Angular',
    stack: ['Angular', 'TypeScript', 'RxJS', 'HTML5', 'CSS3', 'REST APIs'],
    highlights: [
      'Sales & purchase invoices and returns, plus point of sale (POS)',
      'Inventory, CRM and financial reports such as profit & loss',
      'Role-based access control — granular permissions and rights across modules',
    ],
    visual: 'accounts',
    caseStudy: {
      overview:
        'Splendid Accounts is an online inventory management and accounting software — a complete ERP — designed for small and medium-sized businesses in Pakistan. It covers Sales, Purchase, Inventory, Accounting, Manufacturing and POS, with ledgers, trial balance, aging reports, income statement and balance sheet, plus multi-currency support. Users log in from a Mac, PC, tablet or phone to get a real-time view of their business. My role is on the Angular frontend that those users work in every day.',
      contribution: [
        'Sales modules: sale invoices and sale returns.',
        'Purchase modules: purchase invoices and purchase returns.',
        'Point of sale (POS) screens for fast, counter-side selling.',
        'Inventory modules for tracking stock across the business.',
        'Financial reports, including profit & loss (income statement).',
        'CRM screens for managing customers.',
        'Roles and permissions: role-based access control with granular rights, so each user only sees and does what their role allows.',
        'Maintaining and improving production features, debugging issues and collaborating with backend and product teammates.',
      ],
      involves: [
        {
          title: 'Numbers that must add up',
          body: 'Invoices, returns and reports all feed the same ledger. A frontend for accounting has to make correct data entry the easy path, because a mistake shows up in someone’s profit & loss.',
        },
        {
          title: 'Permissions everywhere',
          body: 'Roles and rights cut across every module — menus, screens, buttons and actions. Getting access control right is what lets a business safely hand the system to cashiers, accountants and managers alike.',
        },
        {
          title: 'Speed at the counter',
          body: 'POS is used under pressure, with customers waiting. Its screens need to be fast and forgiving in a way back-office forms don’t.',
        },
      ],
      note: 'Splendid Accounts is a proprietary product. Only my role is described here; source code and internal details are not shared.',
    },
    links: [{ label: 'Product website', href: 'https://splendidaccounts.com/' }],
  },
  {
    id: 'mounties',
    featured: true,
    name: 'Mounties',
    kind: 'Event & Play-Area Booking Portal',
    context: 'Professional · i-Splendid · Australian client',
    summary:
      'A detailed booking portal for a children’s play venue — birthday and kids’ parties, general-admission play sessions and drop-and-dine bookings.',
    role: 'Developer — Angular, .NET & SQL Server',
    stack: ['Angular', 'TypeScript', '.NET', 'SQL Server'],
    highlights: [
      'Kids’ party and event bookings',
      'General admission — leave a child in the play area for a set time',
      'Drop-and-dine bookings: children play while parents dine',
    ],
    visual: 'booking',
    caseStudy: {
      overview:
        'Mounties is a booking portal for an Australian children’s play venue. Parents can book a child’s party, buy general admission to leave their child in the play area for a while, or book “drop and dine”, where children play while the adults eat. Each booking type has its own rules, which makes it a fairly detailed portal.',
      contribution: [
        'Worked on the booking portal, built with an Angular frontend and a .NET backend on SQL Server.',
        'Booking flows for parties, general admission and drop-and-dine.',
      ],
      involves: [
        {
          title: 'Several products, one portal',
          body: 'Parties, timed play sessions and drop-and-dine look similar to a parent but behave differently — each with its own options, timing and pricing.',
        },
        {
          title: 'Time-based availability',
          body: 'Play sessions are time-boxed, so booking is about slots and capacity rather than simple orders.',
        },
      ],
      note: 'Client-specific details and source code are not shown.',
    },
    links: [],
  },
  {
    id: 'robeapp',
    name: 'RobeApp',
    kind: 'POS & Tailoring Management System',
    context: 'Personal project',
    status: 'In development',
    summary:
      'A point-of-sale and tailoring management system, built on the MEAN stack with Angular 18 on the frontend and a JWT-secured Node.js API.',
    role: 'Full-stack developer',
    stack: ['Angular 18', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT'],
    highlights: [
      'JWT-based authentication on an Express.js API',
      'Product, inventory, invoice, payment and customer modules',
      'Employee, vendor and reporting modules in scope',
    ],
    visual: 'pos',
    caseStudy: {
      overview:
        'RobeApp is a POS and tailoring management system I am building to cover the day-to-day running of a tailoring business — from selling and invoicing to tracking stock, customers and staff.',
      contribution: [
        'Angular 18 frontend backed by a Node.js / Express.js API.',
        'MongoDB with Mongoose models for the application’s data.',
        'JWT-based authentication.',
        'Planned module scope: products, inventory, invoices, payments, customers, employees, vendors and reporting.',
      ],
      note: 'RobeApp is still under development and is not publicly available yet, so there is no repository or demo link. Features are described as scope, not as finished production functionality.',
    },
    links: [],
  },
  {
    id: 'nursenova',
    name: 'NurseNova',
    kind: 'Healthcare Platform — Admin Panel & APIs',
    context: 'Professional · i-Splendid',
    summary:
      'A healthcare platform whose mobile app helps families find the right doctor, book appointments and stay on top of their medication. I built the admin panel and the APIs the mobile app consumes.',
    role: 'Admin panel & backend APIs',
    stack: ['Angular', 'TypeScript', 'Node.js', 'Express.js', 'MySQL', 'REST APIs'],
    highlights: [
      'Angular admin panel to manage doctors, doctor categories and medications',
      'Node.js / Express.js REST APIs on MySQL, consumed by the mobile app',
      'Product covers doctor suggestions, nearby doctors, appointments, medication reminders and family profiles',
    ],
    visual: 'health',
    caseStudy: {
      overview:
        'NurseNova is a medical app. A patient installs it, describes what they are suffering from and gets doctors suggested for that condition — or browses doctors near home — then books an appointment. Medication schedules come with alarms, and a single account can cover the whole family, which builds up a clear family medical history over time.',
      contribution: [
        'Built the Angular admin panel used to add and manage doctors, their categories and medications.',
        'Developed REST APIs with Node.js and Express.js on a MySQL database.',
        'Delivered the APIs that the mobile app consumes, so the data managed in the admin panel reaches patients in the app.',
      ],
      involves: [
        {
          title: 'One backend, two clients',
          body: 'The same API serves an internal admin panel and a patient-facing mobile app, each with very different needs from the same data.',
        },
        {
          title: 'Data that guides decisions',
          body: 'Doctor categories and medications aren’t just lists — they drive which doctors a patient is shown and what their reminders say, so they have to be accurate.',
        },
        {
          title: 'Family-shaped data',
          body: 'One account, several family members, each with their own appointments, medication and history — a structure that has to stay clear as it grows.',
        },
      ],
      note: 'My work covered the admin panel and the API layer; the mobile client consumed those APIs. Source code and patient data are not shown.',
    },
    links: [],
  },
  {
    id: 'winqo',
    name: 'WinQo',
    kind: 'Desktop WhatsApp Messaging App',
    context: 'Professional · i-Splendid',
    summary:
      'A desktop application installed on a local PC that sends WhatsApp messages on a business’s behalf — built with Electron on a local MySQL database.',
    role: 'Desktop app developer',
    stack: ['Electron', 'Node.js', 'JavaScript', 'MySQL'],
    highlights: [
      'Installs and runs locally on the user’s PC',
      'Sends WhatsApp messages from the desktop',
      'Local MySQL database for the app’s data',
    ],
    visual: 'desktop',
    caseStudy: {
      overview:
        'WinQo is a desktop app for sending WhatsApp messages. Instead of a hosted web service, it is installed on the user’s own computer and sends their messages from there, keeping its data in a local MySQL database.',
      contribution: [
        'Built as an Electron desktop application.',
        'Messaging workflow for sending WhatsApp messages from the desktop.',
        'Local MySQL database for storing the application’s data.',
      ],
      involves: [
        {
          title: 'Desktop, not web',
          body: 'Shipping software that installs and runs on someone else’s machine brings its own concerns: local setup, a local database and an app that must behave without a server behind it.',
        },
      ],
      note: 'Proprietary project — source code is not shown.',
    },
    links: [],
  },
]

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export interface Role {
  company: string
  title: string
  period: string
  start: string // ISO-ish for <time>
  current?: boolean
  summary?: string
  tracks?: { name: string; focus: string; points: string[] }[]
  shared?: string[]
  recognition?: string
  sites?: { name: string; url?: string; description: string; tags?: string[] }[]
}

export const experience: Role[] = [
  {
    company: 'i-Splendid',
    title: 'Software Engineer — MEAN Stack',
    period: 'Mar 2023 — Present',
    start: '2023-03',
    current: true,
    summary:
      'Developing and maintaining web, desktop and AI-powered applications across i-Splendid’s products and client projects — primarily on Angular, Node.js, Express.js and MongoDB, with .NET, SQL Server, MySQL and Electron where the project calls for it.',
    tracks: [
      {
        name: 'ShipKardo',
        focus: 'Full stack',
        points: [
          'Frontend and backend development of the order management system',
          '20+ courier integrations, including BlueEx, TCS, Leopards, PostEx, M&P and Call Courier Trax',
          'Selling channels: Shopify, WooCommerce, Daraz and Splendid Accounts',
          'Product listings, updates and inventory synchronization',
          'SMTP-based email notifications',
          'AI: natural-language reporting (OpenAI API) and autonomous AI agents — in progress',
        ],
      },
      {
        name: 'Splendid Accounts',
        focus: 'Frontend',
        points: [
          'Sale & purchase invoices and returns, and point of sale (POS)',
          'Inventory, CRM and financial reports including profit & loss',
          'Role-based access control: roles, permissions and rights across modules',
        ],
      },
      {
        name: 'Mounties',
        focus: 'Angular · .NET',
        points: [
          'Event and play-area booking portal for an Australian client',
          'Parties, general admission and drop-and-dine booking flows on SQL Server',
        ],
      },
      {
        name: 'NurseNova',
        focus: 'Admin & APIs',
        points: [
          'Angular admin panel for doctors, categories and medications',
          'Node.js / Express.js REST APIs on MySQL for the mobile app',
        ],
      },
      {
        name: 'WinQo',
        focus: 'Desktop',
        points: ['Electron desktop app for sending WhatsApp messages, on a local MySQL database'],
      },
    ],
    shared: [
      'Debugging application issues and improving existing functionality',
      'Collaborating with teammates to maintain production features',
    ],
    recognition: 'Employee of the Month — April 2024',
  },
  {
    company: '3DM Solutions',
    title: 'Web Developer',
    period: 'Nov 2022 — Mar 2023',
    start: '2022-11',
    summary:
      'Built WordPress websites for 3DM Solutions’ clients — product catalogues and company sites for laboratory, diagnostics and scientific-supply businesses, plus several other WordPress builds.',
    sites: [
      {
        name: 'Summit Diagnostix',
        url: 'https://summitdiagnostix.com/',
        description: 'Product site for a company developing specimen-collection systems for the clinical and veterinary industries.',
        tags: ['WordPress', 'WooCommerce', 'Elementor'],
      },
      {
        name: 'Laboratory Solutions',
        url: 'https://www.laboratory-solutions.com/',
        description: 'Website for a supplier of laboratory chemicals, reagents and scientific equipment, showcasing partner brands and quote requests.',
      },
      {
        name: 'Chem Tech Pakistan',
        url: 'https://chemtechpk.com/',
        description: 'Product catalogue for a Pakistan distributor of Merck and Sigma-Aldrich lab chemicals, glassware and instruments.',
        tags: ['WordPress', 'WooCommerce', 'Elementor'],
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const skillGroups: { title: string; caption: string; items: string[]; span?: string }[] = [
  {
    title: 'Core stack',
    span: 'sm:col-span-2',
    caption: 'What I use every day',
    items: ['Angular', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose'],
  },
  {
    title: 'Frontend & desktop',
    caption: 'Interfaces & tooling',
    items: ['HTML5', 'CSS3', 'Responsive UI', 'RxJS', 'Angular Material', 'AG Grid', 'Electron', 'WordPress', 'Elementor'],
  },
  {
    title: 'Backend & APIs',
    caption: 'Server-side work',
    items: ['REST API development', 'APIs for mobile apps', '.NET', 'JWT authentication', 'Roles & permissions (RBAC)', 'Third-party API integration'],
  },
  {
    title: 'AI & LLMs',
    span: 'sm:col-span-2',
    caption: 'Recent focus',
    items: ['OpenAI API', 'Natural-language reporting', 'AI agents', 'Agentic workflows'],
  },
  {
    title: 'Integrations',
    caption: 'Systems I’ve connected',
    items: ['Shopify', 'WooCommerce', 'Daraz', 'Splendid Accounts', '20+ courier APIs', 'SMTP email', 'SMS gateway'],
  },
  {
    title: 'Databases',
    caption: 'Data layer',
    items: ['MongoDB', 'MySQL', 'SQL Server', 'PostgreSQL'],
  },
  {
    title: 'Tools',
    span: 'sm:col-span-2 lg:col-span-1',
    caption: 'Workflow',
    items: ['Git', 'GitHub', 'npm', 'VS Code'],
  },
]

export const alsoExplored = ['React', 'Flutter', 'Python · Flask', 'PHP']

/* ------------------------------------------------------------------ */
/* Engineering approach                                                */
/* ------------------------------------------------------------------ */

export const approach: { title: string; body: string; wide?: boolean }[] = [
  {
    title: 'Bringing AI into business software',
    body: 'In ShipKardo I built natural-language reporting on the OpenAI API, and I’m now building AI agents that take an instruction, decide the steps themselves and carry the task out. The interesting part isn’t the model call — it’s giving the agent the right tools, the right limits and output a business can rely on.',
    wide: true,
  },
  {
    title: 'Integrating third-party services',
    body: 'Couriers, selling channels and email providers all speak slightly different languages. I map them into one consistent workflow, so the people using the app never have to think about which service is behind a button.',
  },
  {
    title: 'Keeping data in sync',
    body: 'Orders, products and stock move between selling channels and the order system. I think through what happens when an update arrives late, twice or not at all — before it becomes a support ticket.',
  },
  {
    title: 'Permission-aware Angular interfaces',
    body: 'Components, services and forms structured so features can grow without copy-paste — invoices, ledgers, POS and grids — with roles and permissions enforced consistently across every screen and action.',
  },
  {
    title: 'Features from database to screen',
    body: 'Comfortable taking a feature from a MongoDB model through Express routes to the Angular view that uses it — and debugging it across all three once it’s live.',
  },
]

/* ------------------------------------------------------------------ */
/* Public repositories (static — no runtime GitHub API dependency)     */
/* ------------------------------------------------------------------ */

export const repos: { name: string; title: string; description: string; tags: string[]; year: string }[] = [
  {
    name: 'Angular-FoodApp',
    title: 'Angular Food App',
    description:
      'Food ordering front end with routed detail pages, search, tag-based filtering and a cart service.',
    tags: ['Angular 14', 'TypeScript', 'Angular Router'],
    year: '2023',
  },
  {
    name: 'Angular_CoffeeCafe',
    title: 'Coffee Café CRUD',
    description:
      'List, add, edit and delete menu items through an Angular HttpClient service backed by a json-server REST API.',
    tags: ['Angular', 'Angular Material', 'HttpClient', 'json-server'],
    year: '2023',
  },
  {
    name: 'angularAG-Grid',
    title: 'Angular AG Grid',
    description:
      'Data grid exploration with sortable, filterable columns, custom cell renderers, quick search and pagination.',
    tags: ['Angular 15', 'AG Grid'],
    year: '2023',
  },
  {
    name: 'Book-Recommender',
    title: 'Book Recommender',
    description:
      'Flask app serving popular-book rankings and similar-book suggestions from similarity scores computed in a Jupyter notebook.',
    tags: ['Python', 'Flask', 'pandas', 'NumPy'],
    year: '2023',
  },
]

/* ------------------------------------------------------------------ */
/* Hero proof points — every number is countable from the content above */
/* ------------------------------------------------------------------ */

export const stats: { value: string; label: string }[] = [
  { value: '3+', label: 'Years of production experience' },
  { value: '20+', label: 'Courier integrations shipped' },
  { value: '6', label: 'Products & platforms worked on' },
  { value: 'Apr ’24', label: 'Employee of the Month' },
]

export const marqueeTech = [
  'Angular',
  'TypeScript',
  'Node.js',
  'Express.js',
  'MongoDB',
  'MySQL',
  '.NET',
  'SQL Server',
  'REST APIs',
  'RxJS',
  'Angular Material',
  'Electron',
  'Shopify',
  'WooCommerce',
  'Daraz',
  'JWT',
  'OpenAI API',
  'AI agents',
  'Git',
]
