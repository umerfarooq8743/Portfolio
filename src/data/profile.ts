/**
 * Single source of truth for portfolio content.
 *
 * Everything here is taken from Umer's own brief and CV, his public GitHub
 * profile, the public product sites linked below and his own project
 * repositories. Edit this file to update the site — please keep it factual
 * (no invented metrics, clients or links).
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
  cv: '/Umer-Farooq-CV.pdf',
  links: {
    linkedin: 'https://www.linkedin.com/in/umerfarooq-dev',
    github: 'https://github.com/umerfarooq8743',
    githubRepos: 'https://github.com/umerfarooq8743?tab=repositories',
  },
} as const

export const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
] as const

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectVisualKind = 'oms' | 'accounts' | 'pos' | 'health' | 'booking' | 'desktop' | 'customs'

export interface Project {
  id: string
  name: string
  /** Previous product name, shown as "formerly …". */
  formerly?: string
  kind: string
  context: string
  period?: string
  status?: string
  /** Presentation tier: 'lead' = full-width case study, 'feature' = large two-up card, 'index' = compact row. */
  tier: 'lead' | 'feature' | 'index'
  /** The problem the product exists to solve — one sentence. */
  problem: string
  summary: string
  role: string
  stack: string[]
  highlights: string[]
  visual: ProjectVisualKind
  /** Countable facts shown as a stat row in the case study. */
  metrics?: { value: string; label: string }[]
  caseStudy: {
    overview: string
    /** Optional end-to-end workflow, rendered as an animated pipeline. */
    flow?: { title: string; steps: string[] }
    /** Optional grouped feature inventory ("What's inside"). */
    capabilities?: { title: string; items: string[] }[]
    contribution: string[]
    involves?: { title: string; body: string }[]
    note: string
  }
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    id: 'winqohub',
    tier: 'lead',
    name: 'WinqoHub',
    formerly: 'ShipKardo',
    kind: 'AI-powered E-commerce Order Management',
    context: 'Professional · i-Splendid',
    period: 'Sep 2023 — Present',
    problem:
      'Online sellers juggle orders, stock and a dozen courier portals separately — and lose money to overselling, late parcels and unreconciled COD.',
    summary:
      'An order management platform that pulls orders in from every selling channel, ships them through 20+ couriers and keeps products and stock in sync — with an AI layer on top. I work on it across the entire stack.',
    role: 'Full-stack — frontend and backend',
    stack: ['Angular', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API', 'REST APIs', 'SMTP', 'SMS gateway'],
    highlights: [
      '20+ courier integrations, including BlueEx, TCS, Leopards, PostEx, M&P and Call Courier Trax',
      'Selling-channel integrations: Shopify, WooCommerce / WordPress, Daraz and Splendid Accounts',
      'AI: natural-language reporting on the OpenAI API, and AI agents that act on instructions',
    ],
    visual: 'oms',
    metrics: [
      { value: '20+', label: 'Couriers connected' },
      { value: '5+', label: 'Selling channels' },
      { value: '5M', label: 'Orders processed on the platform*' },
      { value: '24/7', label: 'AI agent replies' },
    ],
    caseStudy: {
      overview:
        'WinqoHub (formerly ShipKardo) is the order management system i-Splendid builds for online sellers in Pakistan. Orders from every store land in one list, stock updates across channels when something sells, couriers are compared and booked in one click, parcels are tracked in one timeline and courier COD payments are matched back to orders. On top sits Winqo Agent, an AI that answers sales and support chats in English and Roman Urdu. I work across the whole stack — from MongoDB models and Express APIs to the Angular screens sellers use all day.',
      flow: {
        title: 'Order lifecycle',
        steps: ['Channel order', 'Order hub', 'Stock sync', 'Courier booking', 'Live tracking', 'COD reconciliation', 'Reports'],
      },
      capabilities: [
        { title: 'Orders & stock', items: ['Multi-store order inbox', 'Cross-channel stock sync', 'Product listings & updates', 'ERP sync with Splendid Accounts'] },
        { title: 'Shipping', items: ['20+ courier APIs', 'One-click & bulk booking', 'Label printing', 'Unified tracking timeline'] },
        { title: 'Notifications', items: ['SMTP email alerts', 'Transactional SMS (Monty Mobile)', 'Order status updates'] },
        { title: 'AI', items: ['Natural-language reporting', 'Autonomous AI agents', 'OpenAI API'] },
      ],
      contribution: [
        'Develop and maintain features on both the Angular frontend and the Node.js / Express.js backend, with MongoDB as the data layer.',
        'Integrated 20+ courier services — including BlueEx, TCS, Leopards, PostEx, M&P and Call Courier Trax — into the shipping workflow.',
        'Integrated selling channels — Shopify, WooCommerce / WordPress and Daraz — for automated order synchronization.',
        'Built the integration between WinqoHub and the Splendid Accounts inventory system for real-time inventory management.',
        'Built complete product management modules: product listings, product updates and inventory synchronization.',
        'Implemented SMTP email notifications and transactional SMS through Monty Mobile for order and system alerts.',
        'Built Natural Language Reporting (NLR) with the OpenAI API, so users can ask for reports in plain language instead of navigating filters.',
        'Building AI agents inside WinqoHub that are given a task and decide their own steps to carry it out.',
        'Take part in architecture planning, code reviews and performance optimization with the team.',
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
      note: 'WinqoHub is a proprietary product. *Platform figures are as published on the product website. Source code, internal implementation details and customer data are intentionally not shown here.',
    },
    links: [{ label: 'Visit WinqoHub', href: 'https://winqoai.com/hub/' }],
  },
  {
    id: 'clearport',
    tier: 'feature',
    name: 'ClearPort ERP',
    kind: 'Customs Clearing & Freight Forwarding ERP',
    context: 'Independent build',
    period: '2026',
    status: 'New',
    problem:
      'Clearing agents follow every shipment through a dozen documents — BL, GD, DO, NOC, gate passes, vouchers and bills — usually across paper files and spreadsheets.',
    summary:
      'A multi-tenant SaaS ERP for customs clearing and freight forwarding in Pakistan that carries a shipment from bill of lading to final bill — all linked by one job-file number.',
    role: 'Full-stack — architecture, API and web app',
    stack: ['React 18', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL 16', 'Prisma', 'TanStack Query', 'Tailwind CSS', 'Socket.IO', 'BullMQ', 'Docker'],
    highlights: [
      '12-stage clearing pipeline: ETA → job file → GD / DO / NOC → gate pass → delivery → billing → SOA',
      'Multi-tenant with company isolation, RBAC, rotating refresh tokens and TOTP 2FA',
      'Real-time alerts, background jobs, PDF documents and Excel exports',
    ],
    visual: 'customs',
    metrics: [
      { value: '12', label: 'Pipeline stages' },
      { value: '22', label: 'API modules' },
      { value: '3', label: 'Apps & packages in the monorepo' },
      { value: '2FA', label: 'TOTP, AES-256-GCM secrets' },
    ],
    caseStudy: {
      overview:
        'ClearPort is a multi-tenant ERP for customs-clearing and freight-forwarding companies in Pakistan. Each company gets its own isolated workspace; inside it, a shipment moves from bill of lading and ETA to job file, goods declaration, assessment, delivery order and NOC, gate pass, delivery, vouchers, bill and statement of account — every step linked by the same job-file number, so nothing has to be re-typed. I designed and built it end to end: the PostgreSQL schema, the Express API, the React web app and the shared validation and permission layer between them.',
      flow: {
        title: 'Shipment pipeline',
        steps: ['BL', 'ETA', 'Job file', 'GD / SO / Scanning', 'Assessment', 'DO + NOC', 'Gate pass', 'Delivery', 'Vouchers', 'Bill', 'SOA', 'Close'],
      },
      capabilities: [
        { title: 'Operations', items: ['ETA tracking', 'Job files', 'GD, DO & NOC pipeline', 'Transport & gate passes'] },
        { title: 'Finance', items: ['Vouchers & expenses', 'Billing & invoices', 'Payments', 'Statement of account'] },
        { title: 'Platform', items: ['Company onboarding & invitations', 'Roles & permissions', 'Activity log', 'Notifications'] },
        { title: 'Output', items: ['PDF documents (Puppeteer)', 'Excel exports', 'Reports & dashboards', 'Full-text search'] },
      ],
      contribution: [
        'Designed a multi-tenant data model on PostgreSQL 16 with Prisma, with every record scoped to a company and a separate platform super-admin area.',
        'Built a pnpm + Turborepo monorepo: Express API, React web app and a shared package of Zod schemas and the RBAC matrix used by both sides.',
        'Implemented authentication with 15-minute access tokens, hashed 7-day refresh tokens rotated on every use (reuse revokes the whole session family) and TOTP 2FA with AES-256-GCM encrypted secrets.',
        'Generated race-free customer codes, ETA references and job numbers from per-company sequence tables with ON CONFLICT and FOR UPDATE locking.',
        'Added full-text search with pg_trgm and GIN indexes, real-time notifications over Socket.IO and background jobs on BullMQ for email and daily expiry digests.',
        'Produced print-ready documents with Puppeteer and pdf-lib, and Excel exports with ExcelJS.',
        'Built structured logging: request IDs on every response and error, user and company context via AsyncLocalStorage, slow-query warnings, secret redaction and browser error reporting.',
        'Built the web app with React, TanStack Router / Query / Table, Tailwind CSS and shadcn/ui, with forms on React Hook Form and Zod.',
        'Containerised the stack with Docker Compose and wrote an idempotent seed with three demo companies and six months of realistic data.',
      ],
      involves: [
        {
          title: 'One number ties it together',
          body: 'Every document in a clearing job references the same job file. Making that link the backbone of the schema is what lets a voucher, a gate pass and a bill all trace back to one shipment.',
        },
        {
          title: 'Tenants that never leak',
          body: 'Several companies share one database. Company scoping has to be enforced everywhere — queries, files, sockets and logs — not just remembered in the UI.',
        },
        {
          title: 'Security as a feature',
          body: 'Rotating refresh tokens with reuse detection, encrypted 2FA secrets and a permission matrix shared between API and UI keep a multi-company system safe to hand to real staff.',
        },
        {
          title: 'Observable from day one',
          body: 'Request IDs, structured logs and an activity log mean every error a user reports can be traced to the exact request, user and company behind it.',
        },
      ],
      note: 'ClearPort ERP is in a private repository. Company names in the demo data are fictional.',
    },
    links: [],
  },
  {
    id: 'splendid-accounts',
    tier: 'feature',
    name: 'Splendid Accounts',
    kind: 'Complete ERP Solution',
    context: 'Professional · i-Splendid',
    period: 'Mar 2023 — Jun 2023',
    problem:
      'Small and medium-sized businesses need sales, purchasing, stock, accounting and POS in one place they can reach from any device.',
    summary:
      'A complete online ERP for small and medium-sized businesses in Pakistan — sales, purchase, inventory, accounting, manufacturing, POS and financial reporting, with multi-currency support and real-time access from any device. I worked on its Angular frontend, including the role and permission system.',
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
      capabilities: [
        { title: 'Sales', items: ['Sale invoices', 'Sale returns', 'Point of sale'] },
        { title: 'Purchase', items: ['Purchase invoices', 'Purchase returns'] },
        { title: 'Insight', items: ['Inventory', 'CRM', 'Profit & loss'] },
        { title: 'Access', items: ['Roles', 'Permissions', 'Rights per module'] },
      ],
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
    id: 'robeapp',
    tier: 'feature',
    name: 'RobeApp',
    kind: 'Tailoring Business Management & POS',
    context: 'Personal project · for a cloth & tailoring brand',
    status: 'Active development',
    problem:
      'A cloth and tailoring business has to track customer measurements, fabric sold by the meter, orders, staff wages and money owed — usually in registers that never add up.',
    summary:
      'A complete management system for a cloth & tailoring brand — customers with garment measurements, meter-based stock, sale and purchase invoices, payments, staff loans and wages, expenses and 14 reports — on Angular 18 and a Node.js API.',
    role: 'Full-stack developer',
    stack: ['Angular 18', 'Angular Material', 'Chart.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'PDFKit', 'ExcelJS', 'Jest'],
    highlights: [
      'Customer measurements per garment — shalwar kameez, kurta pajama, coat, waistcoat — with full history',
      'Sale & purchase invoices that keep stock, customer balances and payments in sync',
      'Roles & permissions, audit log, dashboard KPIs and 14 business reports',
    ],
    visual: 'pos',
    metrics: [
      { value: '14', label: 'Business reports' },
      { value: '16', label: 'API resources' },
      { value: '12', label: 'Data models' },
      { value: '26', label: 'Audit findings reviewed' },
    ],
    caseStudy: {
      overview:
        'RobeApp runs the day-to-day of a cloth and tailoring brand. A customer record holds structured measurements for each garment type with a complete history, and a single sale invoice can carry measurements for several family members. Fabric is stocked in meters with low-stock alerts, every sale, purchase and payment moves stock and balances automatically, and staff loans, wages and expenses sit in the same ledger. A dashboard and 14 reports — from daily sales to profit & loss — show the owner where the business stands.',
      capabilities: [
        { title: 'Customers', items: ['Garment measurements', 'Measurement history', 'Balances & ledgers'] },
        { title: 'Sales & stock', items: ['Sale & purchase invoices', 'Meter-based inventory', 'Low-stock alerts', 'PDF invoices'] },
        { title: 'People & money', items: ['Payments', 'Employee loans & wages', 'Expenses', 'Vendors'] },
        { title: 'Control', items: ['Roles & permissions', 'Activity log', 'Dashboard KPIs', '14 reports + Excel export'] },
      ],
      contribution: [
        'Built the Angular 18 frontend: 13 feature modules on a shared design system of reusable UI components, with light and dark themes.',
        'Built the Node.js / Express.js API on MongoDB with Mongoose — 16 resources and 12 data models.',
        'Made every money and stock movement symmetric: invoice edits and deletes revert the old stock and balances before applying the new ones, using atomic $inc updates.',
        'Recomputed invoice totals on the server, so client-side numbers are never trusted.',
        'Hardened security: per-request active-user checks, token versioning on password change, admin-only destructive routes and whitelisted query filters against operator injection.',
        'Added roles & permissions, an activity log on every key screen and a business-settings module that drives the invoice PDF.',
        'Built a dashboard with KPIs, sparklines and period switching, plus 14 reports with date-range presets and Excel export.',
        'Ran a full engineering review — 26 findings ranked by severity — and fixed them in phases, backed by Jest tests.',
      ],
      involves: [
        {
          title: 'Money that must balance',
          body: 'A sale touches stock, the customer’s balance and payments at once. If edits and deletes don’t undo exactly what they did, the books quietly drift.',
        },
        {
          title: 'Measurements are data',
          body: 'Tailoring depends on exact measurements per garment and per person. Modelling them as structured, versioned data is what makes repeat orders easy.',
        },
      ],
      note: 'RobeApp is in a private repository and is still being extended, so there is no public demo link.',
    },
    links: [],
  },
  {
    id: 'mounties',
    tier: 'index',
    name: 'Mounties',
    kind: 'Event & Play-Area Booking Portal',
    context: 'Professional · i-Splendid · Australian client',
    problem:
      'A children’s play venue sells parties, timed play sessions and drop-and-dine — each with its own rules — and needed one portal to book them all.',
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
    id: 'nursenova',
    tier: 'index',
    name: 'NurseNova',
    kind: 'Healthcare Platform — Admin Panel & APIs',
    context: 'Professional · i-Splendid',
    period: 'Jun 2023 — Sep 2023',
    problem:
      'Families need a simple way to find the right doctor, book appointments and keep track of everyone’s medication.',
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
    tier: 'index',
    name: 'WinQo',
    kind: 'Desktop WhatsApp Messaging App',
    context: 'Professional · i-Splendid',
    problem:
      'Businesses want to send WhatsApp messages from their own computer, without depending on a hosted web service.',
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
  points?: string[]
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
        name: 'WinqoHub',
        focus: 'Full stack',
        points: [
          'Frontend and backend of the order management system (formerly ShipKardo)',
          '20+ courier integrations, including BlueEx, TCS, Leopards, PostEx, M&P and Call Courier Trax',
          'Selling channels: Shopify, WooCommerce / WordPress, Daraz — and real-time inventory sync with Splendid Accounts',
          'Product listings, updates and inventory synchronization',
          'SMTP email notifications and transactional SMS via Monty Mobile',
          'AI: natural-language reporting (OpenAI API) and autonomous AI agents',
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
      'Architecture planning, code reviews and performance optimization',
      'Testing, debugging and continuous improvement of production features',
    ],
    recognition: 'Employee of the Month · Apr 2024',
  },
  {
    company: '3DM Solutions',
    title: 'Web Developer',
    period: 'Nov 2022 — Mar 2023',
    start: '2022-11',
    summary:
      'Built responsive websites for 3DM Solutions’ clients — WordPress product catalogues and company sites for laboratory, diagnostics and scientific-supply businesses — with HTML, CSS, Bootstrap and JavaScript, tuned for performance and SEO.',
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
  {
    company: 'Service4Digital',
    title: 'Software Engineer Intern',
    period: 'May 2022 — Nov 2022',
    start: '2022-05',
    summary:
      'Started out on real client projects: front-end features and UI improvements with HTML, CSS, Bootstrap and JavaScript, alongside senior developers.',
    points: [
      'Implemented new features, UI improvements and bug fixes across ongoing projects',
      'Debugging, testing and troubleshooting for stable application performance',
      'Hands-on with the full software development lifecycle — development, testing and deployment',
    ],
  },
]

export const education: { degree: string; school: string; period: string }[] = [
  { degree: 'BS in Computer Science', school: 'University of Karachi', period: '2019 — 2023' },
  { degree: 'Intermediate', school: 'Govt. Degree College, Malir Cantt', period: '2016 — 2018' },
]

export const credentials: { title: string; issuer: string; year?: string }[] = [
  { title: 'Employee of the Month', issuer: 'i-Splendid', year: 'Apr 2024' },
  { title: 'Intermediate JavaScript Development', issuer: 'Udemy' },
]

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const skillGroups: { title: string; caption: string; items: string[] }[] = [
  {
    title: 'Core stack',
    caption: 'What I use every day',
    items: ['Angular', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose'],
  },
  {
    title: 'Frontend & desktop',
    caption: 'Interfaces & tooling',
    items: ['React', 'RxJS', 'Angular Material', 'Tailwind CSS', 'TanStack Query', 'HTML5', 'CSS3', 'Bootstrap', 'Chart.js', 'AG Grid', 'Electron', 'WordPress'],
  },
  {
    title: 'Backend & APIs',
    caption: 'Server-side work',
    items: ['REST API development', 'APIs for mobile apps', '.NET', 'JWT & 2FA', 'Roles & permissions (RBAC)', 'Socket.IO', 'BullMQ & Redis', 'PDF & Excel generation'],
  },
  {
    title: 'AI & LLMs',
    caption: 'Recent focus',
    items: ['OpenAI API', 'Natural-language reporting', 'AI agents', 'Agentic workflows'],
  },
  {
    title: 'Integrations',
    caption: 'Systems I’ve connected',
    items: ['Shopify', 'WooCommerce', 'Daraz', 'Splendid Accounts', '20+ courier APIs', 'SMTP email', 'SMS (Monty Mobile)'],
  },
  {
    title: 'Databases',
    caption: 'Data layer',
    items: ['MongoDB', 'PostgreSQL', 'Prisma', 'MySQL', 'SQL Server'],
  },
  {
    title: 'Tools',
    caption: 'Workflow',
    items: ['Git', 'GitHub', 'npm & pnpm', 'Docker', 'Jest', 'VS Code'],
  },
]

export const alsoExplored = ['Flutter', 'Python · Flask', 'PHP']

/* ------------------------------------------------------------------ */
/* Engineering approach                                                */
/* ------------------------------------------------------------------ */

export const approach: { title: string; body: string; wide?: boolean }[] = [
  {
    title: 'Bringing AI into business software',
    body: 'In WinqoHub I built natural-language reporting on the OpenAI API, and I’m now building AI agents that take an instruction, decide the steps themselves and carry the task out. The interesting part isn’t the model call — it’s giving the agent the right tools, the right limits and output a business can rely on.',
    wide: true,
  },
  {
    title: 'Integrating third-party services',
    body: 'Couriers, selling channels, SMS and email providers all speak slightly different languages. I map them into one consistent workflow, so the people using the app never have to think about which service is behind a button.',
  },
  {
    title: 'Keeping data in sync',
    body: 'Orders, products, stock and balances move between systems. I think through what happens when an update arrives late, twice or not at all — and make every edit reversible — before it becomes a support ticket.',
  },
  {
    title: 'Permission-aware interfaces',
    body: 'Components, services and forms structured so features can grow without copy-paste — invoices, ledgers, POS and grids — with roles and permissions enforced consistently across every screen, action and API.',
  },
  {
    title: 'Features from database to screen',
    body: 'Comfortable taking a feature from a MongoDB or PostgreSQL model through Express routes to the Angular or React view that uses it — and debugging it across all three once it’s live.',
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
  { value: '7', label: 'Products & platforms built' },
  { value: 'Apr ’24', label: 'Employee of the Month' },
]
