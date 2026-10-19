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
    /** Optional "Under the hood" architecture rows: layer → what it runs on. */
    architecture?: { layer: string; tech: string; detail: string }[]
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
    kind: 'AI-powered Multi-tenant Order Management Platform',
    context: 'Professional · i-Splendid',
    period: 'Sep 2023 — Present',
    problem:
      'Online sellers juggle orders from several stores, a dozen courier portals, stock spread across warehouses and cash-on-delivery money that never quite reconciles — and lose money to overselling, late parcels and unmatched COD.',
    summary:
      'A multi-tenant SaaS platform that runs an online seller’s whole operation: orders from every channel in one place, stock reserved per warehouse, 20+ couriers booked and tracked automatically, every document synced to the ERP — and AI agents that confirm orders on WhatsApp and answer business questions in plain language. I work on it across the entire stack.',
    role: 'Full-stack engineer — frontend, backend & AI',
    stack: [
      'Angular',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'ag-Grid',
      'Chart.js',
      'Socket.IO',
      'Puppeteer',
      'OpenAI API',
      'LLM tool-calling',
      'WhatsApp Cloud API',
      'Shopify API',
      'REST APIs',
    ],
    highlights: [
      '20+ courier integrations behind one adapter contract, with cheapest- or fastest-courier auto-booking',
      'Shopify, WooCommerce and Daraz order sync, plus Splendid Accounts ERP sync of invoices, returns, journal entries and settlements',
      'AI agents on WhatsApp and an “Ask AI” reporting assistant with voice, answering from live business data',
    ],
    visual: 'oms',
    metrics: [
      { value: '20+', label: 'Courier integrations' },
      { value: '4', label: 'AI agents in production' },
      { value: '25+', label: 'Analytics reports' },
      { value: '5M', label: 'Orders processed on the platform*' },
    ],
    caseStudy: {
      overview:
        'WinqoHub (formerly ShipKardo) is the order management platform i-Splendid builds for online sellers in Pakistan. Each seller gets an isolated workspace with its own configurable order statuses, warehouses, roles and integrations. Orders arrive from Shopify, WooCommerce and Daraz, pass through a staging and validation step, reserve stock in the right warehouse and move through a full lifecycle — booked with one of 20+ couriers, dispatched on a load sheet, tracked automatically, delivered or returned — while every invoice, return, payment, journal entry and settlement is mirrored into the Splendid Accounts ERP. On top sits Winqo AI: WhatsApp agents that confirm orders, verify addresses and handle support, plus an “Ask AI” assistant that answers questions about the business in English or Roman Urdu, by text or voice. I work across the whole stack — from MongoDB data and Express APIs to the Angular screens sellers use all day, and the AI features on top.',
      flow: {
        title: 'Order lifecycle',
        steps: [
          'Channel order',
          'Staging & validation',
          'Stock reservation',
          'Courier booking',
          'Load sheet & dispatch',
          'Live tracking',
          'Delivered / returned',
          'ERP invoice & settlement',
        ],
      },
      capabilities: [
        {
          title: 'Orders',
          items: ['Multi-store order inbox', 'Configurable status lifecycle', 'Split, copy & replacement orders', 'Scan & pack verification'],
        },
        {
          title: 'Inventory',
          items: ['Stock reserved per warehouse', 'Serial numbers & batches', 'Grouped products & bundles', 'Cross-channel stock sync'],
        },
        {
          title: 'Shipping',
          items: ['20+ courier APIs, one contract', 'Cheapest / fastest auto-booking', 'Automatic status tracking', 'Shared courier rate limiting'],
        },
        {
          title: 'Channels & ERP',
          items: ['Shopify, WooCommerce, Daraz', 'Webhooks + scheduled sync', 'Splendid Accounts ERP sync', 'Partner Orders API'],
        },
        {
          title: 'Finance',
          items: ['COD & courier remittance matching', 'Customer & courier journal entries', 'Settlements & receive money', 'Per-document sync status'],
        },
        {
          title: 'Documents & insight',
          items: ['Load sheets, packing sheets, labels', 'Server-side PDF invoices', '25+ reports with charts', 'Excel & PDF exports'],
        },
        {
          title: 'Messaging',
          items: ['WhatsApp Business templates', 'SMS & SMTP email', 'Status- and tag-triggered messages', 'Shared human inbox'],
        },
        {
          title: 'Winqo AI',
          items: ['Order-confirmation agent', 'Address-verification agent', 'Customer-support agent', '“Ask AI” reporting with voice'],
        },
      ],
      architecture: [
        {
          layer: 'Frontend',
          tech: 'Angular · TypeScript · ag-Grid · Chart.js',
          detail: 'A large admin dashboard with server-side data grids, a shared component library and a token-based design system behind the Winqo Hub brand.',
        },
        {
          layer: 'Backend',
          tech: 'Node.js · Express.js · TypeScript',
          detail: 'A modular REST API with request validation and a shared TypeScript types package kept in sync between the API and the dashboard.',
        },
        {
          layer: 'Data',
          tech: 'MongoDB · Mongoose',
          detail: 'Multi-tenant data across 100+ collections — orders, stock, couriers, accounting documents and AI conversations — scoped per company.',
        },
        {
          layer: 'Integrations',
          tech: 'Adapter & factory pattern',
          detail: 'Every courier implements one common contract and every selling channel one channel interface, so a new partner plugs in without touching the order pipeline.',
        },
        {
          layer: 'Background work',
          tech: 'Task queue with retries',
          detail: 'Syncs, bookings, invoices and messages run as queued tasks with retry back-off, duplicate protection and a Task Monitor dashboard for operations.',
        },
        {
          layer: 'Access control',
          tech: 'Endpoint-level RBAC',
          detail: 'Roles, permission groups and per-endpoint exclusions, with a versioned permission cache that refreshes open sessions the moment an admin changes a role.',
        },
        {
          layer: 'Documents',
          tech: 'EJS templates · Puppeteer',
          detail: 'Load sheets, packing sheets, address labels and invoices rendered as PDFs on the server.',
        },
        {
          layer: 'AI & real time',
          tech: 'LLM tool-calling · RAG · speech · Socket.IO',
          detail: 'Agents call tools over live data and a company knowledge base, transcribe and speak voice, and push inbox updates to every open screen in real time.',
        },
      ],
      contribution: [
        'Develop and maintain features end to end — Angular frontend, Node.js / Express.js APIs and MongoDB data — for a platform used by online sellers every day.',
        'Integrated 20+ courier services — BlueEx, TCS, Leopards, PostEx, M&P, Call Courier Trax and more — behind one booking, tracking and status-mapping workflow, including the newest courier integration, ShipZo.',
        'Built Shopify, WooCommerce / WordPress and Daraz integrations for automated order and product sync.',
        'Built the integration between WinqoHub and the Splendid Accounts inventory system for real-time stock.',
        'Built complete product management modules: product listings, updates and inventory synchronization.',
        'Implemented SMTP email notifications and transactional SMS through Monty Mobile for order and status updates.',
        'Built Natural Language Reporting on the OpenAI API, and worked on the “Ask AI” agent — consolidating its tool set and enforcing business rules so answers stay accurate.',
        'Building AI agents that are given a task and decide their own steps to carry it out.',
        'Sped up heavy order reports on large date ranges with targeted indexes and leaner aggregation pipelines.',
        'Delivered the ShipKardo → Winqo Hub rebrand announcement on the login page and inside the app.',
        'Take part in architecture planning, code reviews and performance optimization with the team.',
      ],
      involves: [
        {
          title: 'Many couriers, one contract',
          body: 'Each courier has its own API, authentication, booking flow and status names. Wrapping all of them behind one adapter contract is what lets the platform book the cheapest or fastest courier automatically and show one tracking timeline.',
        },
        {
          title: 'Systems that have to agree',
          body: 'An order lives in the selling channel, in the OMS and in the ERP at the same time. Staging, idempotent sync and a per-document status for every accounting record keep the three from drifting apart.',
        },
        {
          title: 'Status as configuration',
          body: 'Every seller can rename and extend its own order statuses, so lifecycle rules are driven by status flags rather than hard-coded values — and stock, documents and messages all follow the same transitions.',
        },
        {
          title: 'Work that must not run twice',
          body: 'Bookings, invoices and payments run as queued tasks that can time out or retry. Duplicate checks before every retry are what stop a slow network from creating a second consignment or a second journal entry.',
        },
        {
          title: 'AI that has to be trusted',
          body: 'An assistant answering “how many orders were delivered in Lahore?” must never quietly drop the city and answer a broader question. Strict tool validation and server-side business rules matter more than the model call itself.',
        },
        {
          title: 'Permissions down to the endpoint',
          body: 'Cashiers, warehouse staff and managers share one system. Endpoint-level roles, enforced on the server and mirrored in the UI, let each seller hand the platform to the whole team safely.',
        },
      ],
      note: 'WinqoHub is a proprietary product. *Platform figures are as published on the product website. Source code, internal implementation details and customer data are intentionally not shown here.',
    },
    links: [{ label: 'Visit WinqoHub', href: 'https://winqoai.com/hub/' }],
  },
  {
    id: 'manifest-erp',
    tier: 'feature',
    name: 'Manifest ERP',
    formerly: 'ClearPort ERP',
    kind: 'Multi-tenant Customs Clearing & Freight Forwarding ERP',
    context: 'Independent build',
    period: '2026',
    status: 'Active development',
    problem:
      'Every import shipment means documents, a goods declaration, duty, delivery orders, transport, empty returns, expenses and a bill — usually tracked across paper files and spreadsheets.',
    summary:
      'A multi-tenant SaaS ERP for customs-clearing agents and freight forwarders: from the moment a bill of lading arrives to the day the job file is billed, paid and closed — every step under one job-file number. I designed and built it end to end.',
    role: 'Full-stack — architecture, API and web app',
    stack: [
      'React 18',
      'TypeScript',
      'TanStack Router / Query / Table',
      'Tailwind CSS',
      'Radix UI',
      'Node.js',
      'Express',
      'Zod',
      'PostgreSQL 16',
      'Prisma',
      'Socket.IO',
      'BullMQ',
      'Redis',
      'Puppeteer',
      'ExcelJS',
      'Docker',
      'Vitest',
    ],
    highlights: [
      'The full 17-step clearing workflow, with 14 customs stages and a dated log of who did what',
      'Self sign-up, company setup and team invitations — one person can work in several companies',
      '15 reports with Excel and PDF export, verified against the app’s own ledgers by 114 automated checks',
    ],
    visual: 'customs',
    metrics: [
      { value: '17', label: 'Workflow steps' },
      { value: '14', label: 'Customs stages' },
      { value: '66', label: 'Permissions across 5 roles' },
      { value: '15', label: 'Verified reports' },
    ],
    caseStudy: {
      overview:
        'Manifest ERP (formerly ClearPort ERP) runs a clearing and forwarding house from one place. Anyone can sign up, create their company and invite their team; every company gets its own isolated workspace with five ready-made roles, default masters and its own numbering. Before a vessel lands, the ETA sheet tracks arrivals and the documents checklist, and warns about duplicate bills of lading. Once the papers are in, the entry becomes a job file — and from there the shipment moves through 14 customs stages, pay orders and deposits, gate passes, full or partial deliveries and empty-container returns, while staff record expense vouchers against it. Billing turns billable vouchers and agency charges into sales-tax invoices, payments, advances and credit or debit notes, feeding a statement of account and the bank ledger. A close-file checklist makes sure nothing is left open, and a “Next step” card on every job file tells the user what to do now. I designed and built it end to end: the PostgreSQL schema, the Express API, the React web app and the shared validation and permission package between them.',
      flow: {
        title: 'Clearing workflow',
        steps: [
          'BL & ETA',
          'Documents',
          'Job file',
          'GD & assessment',
          'Duty & pay orders',
          'D/O & NOC',
          'Gate pass',
          'Delivery',
          'Empty return',
          'Expenses',
          'Billing & SOA',
          'Close file',
        ],
      },
      capabilities: [
        {
          title: 'Pre-arrival',
          items: ['ETA sheet', 'Documents checklist', 'Duplicate BL warning', 'Convert to job file'],
        },
        {
          title: 'Job files',
          items: ['Containers & documents', 'Expiry alerts', 'Next-step card', 'Close-file checklist'],
        },
        {
          title: 'Customs',
          items: ['14-stage customs board', 'Dated stage log', 'GD, D/O & NOC references', 'Printable forms & undertakings'],
        },
        {
          title: 'Transport',
          items: ['Transporters', 'Gate passes', 'Partial deliveries', 'Empty returns & detention'],
        },
        {
          title: 'Money',
          items: ['Expense vouchers & approvals', 'Pay orders & deposits', 'Sales-tax invoices', 'Payments, advances & SOA'],
        },
        {
          title: 'Banks',
          items: ['Bank accounts', 'Live balances', 'Bank ledger', 'Deposit refunds'],
        },
        {
          title: 'Reports',
          items: ['Receivables aging', 'Job file profitability', 'Files pending by stage', 'Staff performance'],
        },
        {
          title: 'Team & companies',
          items: ['Self sign-up & company setup', 'Invitations & roles', 'Several companies per user', 'Company branding'],
        },
      ],
      architecture: [
        {
          layer: 'Monorepo',
          tech: 'pnpm workspaces · Turborepo · TypeScript',
          detail: 'An API, a web app and a shared package of Zod schemas, constants and the permission matrix used by both sides — strict TypeScript everywhere.',
        },
        {
          layer: 'Frontend',
          tech: 'React 18 · TanStack Router / Query / Table · Tailwind',
          detail: 'File-based, code-split routes, server-state caching, Radix-based design system with light and dark themes, a command palette and responsive layouts.',
        },
        {
          layer: 'API',
          tech: 'Node.js · Express · Zod',
          detail: 'One router per feature; every company request is authenticated, loads the user’s current company and checks the permission before it touches data.',
        },
        {
          layer: 'Data & tenancy',
          tech: 'PostgreSQL 16 · Prisma',
          detail: 'One database, a company_id on every business table, the company taken from the session — never from the request — and money stored as decimals.',
        },
        {
          layer: 'Auth',
          tech: 'JWT · rotating refresh tokens · TOTP 2FA',
          detail: 'Short-lived access tokens in memory, httpOnly refresh cookies rotated on use, bcrypt passwords and authenticator-app 2FA with recovery codes.',
        },
        {
          layer: 'Background & real time',
          tech: 'BullMQ · Redis · Socket.IO',
          detail: 'Email and daily reminders run as queued jobs, and notifications and live badges reach the browser instantly.',
        },
        {
          layer: 'Documents & reports',
          tech: 'Puppeteer · pdf-lib · ExcelJS',
          detail: 'Branded invoices, statements, job files and customs forms as PDFs, and report workbooks with a header, totals and a summary sheet.',
        },
        {
          layer: 'Operations',
          tech: 'Pino · helmet · Docker Compose',
          detail: 'Request IDs in every log line and error, rate limiting and security headers, a full audit trail and one-command local stack.',
        },
      ],
      contribution: [
        'Designed and built the whole product: the PostgreSQL schema, the Express API, the React web app and the shared Zod and permission package.',
        'Modelled the complete 17-step clearing workflow — ETA sheet, job files, 14 customs stages with a dated log, pay orders and deposits, gate passes, deliveries, empty returns and the close-file checklist.',
        'Built multi-tenancy with self sign-up, company setup, invitations, owner protections and users who belong to several companies with a different role in each.',
        'Implemented 66 permissions in 16 groups across five roles, enforced on the server for the current company and mirrored in the UI.',
        'Built billing — sales-tax invoices from billable vouchers and agency charges, payments, advances, credit and debit notes and statements of account — plus a bank ledger.',
        'Built 15 reports with Excel and PDF export and a verification suite of 114 checks that ties each report back to the ledgers.',
        'Implemented secure authentication with rotating refresh tokens and TOTP 2FA, real-time notifications, background jobs and branded PDF documents.',
        'Set up structured logging with request IDs, an audit trail, Docker Compose and end-to-end tests that drive every page and role in a real browser.',
      ],
      involves: [
        {
          title: 'One number ties it together',
          body: 'Every document in a clearing job references the same job file. Making that link the backbone of the schema is what lets a voucher, a gate pass and an invoice all trace back to one shipment.',
        },
        {
          title: 'Tenants that never leak',
          body: 'Many companies share one database. The company comes from the signed-in session on the server and filters every query — the UI never gets to choose it.',
        },
        {
          title: 'Reports that agree with the books',
          body: 'An aging report that disagrees with a client’s statement is worse than no report. Every report is checked against the SOA, the bank ledger and raw totals before it ships.',
        },
        {
          title: 'Guidance, not just forms',
          body: 'Clearing has many steps and many people. A next-step card, expiry alerts and a close-file checklist keep each file moving and stop anything from being forgotten.',
        },
      ],
      note: 'Manifest ERP is in active development. Company names in the demo data are fictional.',
    },
    links: [],
  },
  {
    id: 'vantra-erp',
    tier: 'feature',
    name: 'Vantra ERP',
    formerly: 'Cuba POS',
    kind: 'Multi-company Trading ERP with POS & Accounting',
    context: 'Independent build',
    period: '2026',
    status: 'v2.0',
    problem:
      'Small trading businesses run sales, purchases, stock and their books in separate tools — so stock counts drift, double entries are typed by hand and nobody knows the real profit until month end.',
    summary:
      'A multi-company ERP for retail, wholesale and distribution businesses: sales, purchases, inventory, a point-of-sale counter and full double-entry accounting in one system. Every posted document moves stock at average cost and writes its own balanced journal — no double entry is ever typed by hand.',
    role: 'Full-stack — architecture, API and web app',
    stack: [
      'Angular 17',
      'TypeScript',
      'Signals',
      'RxJS',
      'SCSS',
      'Node.js',
      'Express',
      'MySQL 8',
      'Sequelize',
      'class-validator',
      'JWT',
      'bcrypt',
      'Nodemailer',
    ],
    highlights: [
      'One document engine for 8 document types, with posting rules that keep the books balanced automatically',
      'Moving-average stock ledger per warehouse, with negative stock blocked and stock valuation reconciled to the GL',
      'POS checkout, 20 reports, custom roles with a permission matrix and a field-level activity log',
    ],
    visual: 'accounts',
    metrics: [
      { value: '8', label: 'Document types, one engine' },
      { value: '20', label: 'Reports' },
      { value: '5', label: 'Built-in roles + custom' },
      { value: '100+', label: 'Automated checks passing' },
    ],
    caseStudy: {
      overview:
        'Vantra ERP (formerly Cuba POS) runs a trading business end to end. One sign-in can run several companies, each with its own team, data, books and settings. Creating a company sets up a chart of accounts, a main warehouse, a walk-in customer and five roles. Purchases flow from order to invoice to return and vendor payment; sales from order to invoice to return and customer receipt; and a POS counter turns a cart into a posted invoice and receipt in one step with a thermal receipt. Posting any document moves stock at moving-average cost and creates a balanced double-entry journal from a single table of posting rules, so ledgers, the trial balance, profit & loss and the balance sheet are always up to date. I rebuilt the original single-module POS into this system: the Express API, the MySQL schema and the Angular 17 app with its own UI kit.',
      flow: {
        title: 'Sales cycle',
        steps: ['Sale order', 'Sale invoice', 'Post', 'Stock issued at average cost', 'Journal & COGS', 'Customer receipt', 'Ledgers & reports'],
      },
      capabilities: [
        {
          title: 'Sales',
          items: ['Orders, invoices & returns', 'Customer receipts', 'Credit limit & due dates', 'Customer balances'],
        },
        {
          title: 'Purchases',
          items: ['Orders, invoices & returns', 'Vendor payments', 'Payables aging', 'Vendor balances'],
        },
        {
          title: 'Inventory',
          items: ['Stock per warehouse', 'Adjustments & transfers', 'Stock card', 'Moving-average costing'],
        },
        {
          title: 'Point of sale',
          items: ['Search or scan products', 'One-step checkout', 'Cash or bank', '58 / 80 mm thermal receipt'],
        },
        {
          title: 'Accounts',
          items: ['Chart of accounts', 'Automatic journals', 'Manual journal vouchers', 'Ledgers & trial balance'],
        },
        {
          title: 'Reports',
          items: ['Sales & profitability', 'Aging & balances', 'Stock valuation', 'P&L & balance sheet'],
        },
        {
          title: 'Administration',
          items: ['Company profile & printing', 'Invitations by email', 'Custom roles & permissions', 'Activity log'],
        },
        {
          title: 'Productivity',
          items: ['Global search (Ctrl+K)', 'Keyboard shortcuts', '360° customer & product pages', 'Print with letterhead'],
        },
      ],
      architecture: [
        {
          layer: 'Frontend',
          tech: 'Angular 17 · signals · standalone components',
          detail: 'OnPush components with the new control flow; routes, menus and pages generated from registries, so a new document type or master list needs almost no new UI code.',
        },
        {
          layer: 'UI kit',
          tech: 'SCSS design tokens · in-house components',
          detail: 'No CSS framework — buttons, tables, modals, drawers, date pickers, charts and print headers all come from one kit built on design tokens.',
        },
        {
          layer: 'API',
          tech: 'Node.js · Express · TypeScript',
          detail: 'Route → guard → DTO validation → service, with a generic CRUD layer for master data and a central error handler.',
        },
        {
          layer: 'Data',
          tech: 'MySQL 8 · Sequelize',
          detail: 'One schema shared by all companies, every table scoped by company, atomic document numbering and append-only migrations that run on start.',
        },
        {
          layer: 'Accounting',
          tech: 'Posting-rules engine',
          detail: 'Each document type maps to one posting function that produces a balanced journal; voiding writes the reverse, so the trial balance always nets to zero.',
        },
        {
          layer: 'Inventory',
          tech: 'Immutable stock ledger',
          detail: 'Every movement is recorded with its cost, on-hand balances update in the same transaction and stock valuation reconciles with the inventory account.',
        },
        {
          layer: 'Access',
          tech: 'JWT · company context · RBAC',
          detail: 'Every request resolves the member’s company, role and permissions on the server; the UI mirrors the same rules with guards and a *can directive.',
        },
        {
          layer: 'Security & email',
          tech: 'bcrypt · rate limits · Nodemailer',
          detail: 'Hashed, single-use reset and invitation tokens, sessions invalidated on password change, rate-limited sign-in and branded HTML email.',
        },
      ],
      contribution: [
        'Rebuilt the original invoice-only POS into a full multi-company ERP — API, database and Angular 17 front end.',
        'Designed a single document engine for eight document types, driven by a registry, with conversions between orders, invoices and returns.',
        'Built the accounting engine: posting rules for every document, automatic COGS, manual journals, party ledgers, trial balance and financial statements.',
        'Built the inventory engine with an immutable stock ledger, moving-average costing per warehouse, transfers, adjustments and negative-stock protection.',
        'Built the POS counter with one-transaction checkout and thermal receipts that use the company’s print settings.',
        'Built 20 reports on one report engine with filters, totals, charts, CSV export and printing with the company letterhead.',
        'Implemented multi-company access with invitations, five built-in roles, custom roles with a permission matrix and a field-level activity log.',
        'Created an in-house Angular UI kit on design tokens, global search, keyboard shortcuts and a demo company generator with 60 days of trading.',
      ],
      involves: [
        {
          title: 'Books that balance themselves',
          body: 'Nobody types a double entry. Each document type has one posting rule, so every sale, purchase, return and payment produces a balanced journal — and voiding simply reverses it.',
        },
        {
          title: 'Stock and money must agree',
          body: 'Stock moves and journals are written in the same transaction at the same average cost, which is why the stock valuation report matches the inventory account.',
        },
        {
          title: 'One engine, not eight screens',
          body: 'Orders, invoices, returns, adjustments and transfers share one table, one service and one form. Behaviour comes from a registry, so adding a document type is configuration.',
        },
        {
          title: 'Permissions the server enforces',
          body: 'A cashier, a storekeeper and an accountant see different menus, but the real check happens on the API for every request, for the company in that request.',
        },
      ],
      note: 'Vantra ERP is in a private repository. Company names in the demo data are fictional.',
    },
    links: [],
  },
  {
    id: 'splendid-accounts',
    tier: 'feature',
    name: 'Splendid Accounts',
    kind: 'Multi-tenant Cloud ERP & Accounting Platform',
    context: 'Professional · i-Splendid',
    period: 'Mar 2023 — Jun 2023',
    problem:
      'Small and medium-sized businesses run sales, purchasing, stock, payroll and tax filing in separate tools and spreadsheets — so the books never quite match what actually happened at the counter or in the warehouse.',
    summary:
      'A multi-tenant, multi-branch cloud ERP for small and medium-sized businesses in Pakistan, Saudi Arabia and Malaysia — sales, purchase, inventory, double-entry accounting, POS, payroll, CRM and tax-authority e-invoicing in one system. I worked on its Angular frontend: sales, purchase, POS, inventory and reporting screens, and the role and permission system.',
    role: 'Frontend — Angular',
    stack: ['Angular', 'TypeScript', 'RxJS', 'Nebular', 'Syncfusion EJ2', 'ECharts', 'SCSS', 'Bootstrap', 'REST APIs'],
    highlights: [
      'Sales & purchase invoices and returns, plus point of sale (POS)',
      'Inventory, CRM and financial reports such as profit & loss',
      'Role-based access control — granular permissions and rights across modules',
    ],
    visual: 'accounts',
    metrics: [
      { value: '3', label: 'Countries — PK, KSA, MY' },
      { value: '140+', label: 'Database entities' },
      { value: '180+', label: 'API controllers' },
      { value: '21', label: 'Built-in roles' },
    ],
    caseStudy: {
      overview:
        'Splendid Accounts is i-Splendid’s cloud ERP and accounting platform. Every company is an isolated tenant with its own branches, currencies, roles and settings, and every screen works inside a company-and-branch context. Sales move from quotation to order, delivery and invoice; purchases from order to receipt and invoice; and every approved document posts a balanced double-entry transaction, moves stock in the right warehouse and updates customer or vendor balances. On top sit POS, payroll, CRM, dashboards and e-invoicing with the tax authorities of Pakistan (FBR), Saudi Arabia (ZATCA) and Malaysia (MyInvois). My role was on the Angular frontend that accountants, cashiers and managers use every day.',
      flow: {
        title: 'Sales cycle',
        steps: ['Quotation', 'Sale order', 'Delivery', 'Invoice', 'Approval', 'Ledger & stock posting', 'Payment & settlement'],
      },
      capabilities: [
        { title: 'Sales', items: ['Quotations, orders & deliveries', 'Sale invoices & returns', 'Credit notes & payments', 'Customer portal'] },
        { title: 'Purchase', items: ['Purchase orders & receipts', 'Purchase invoices & returns', 'Vendor payments & refunds', 'Vendor settlements'] },
        { title: 'Inventory', items: ['Multi-warehouse stock', 'Batches & adjustments', 'Composite products', 'Inventory valuation'] },
        { title: 'Accounting', items: ['Chart of accounts', 'Journal entries', 'Bank deposits & fund transfers', 'Multi-currency'] },
        { title: 'Point of sale', items: ['POS invoices', 'Cash registers & sessions', 'Delivery counter', 'POS summaries'] },
        { title: 'People & CRM', items: ['Employees & attendance', 'Payroll periods & leave', 'Leads & events', 'Sales geography'] },
        { title: 'Compliance', items: ['FBR e-invoicing (Pakistan)', 'ZATCA (Saudi Arabia)', 'MyInvois (Malaysia)', 'Audit trail'] },
        { title: 'Insight & access', items: ['KPI dashboards & aging', 'P&L, trial balance, balance sheet', 'PDF & Excel exports', 'Roles & per-endpoint rights'] },
      ],
      architecture: [
        {
          layer: 'Frontend',
          tech: 'Angular · Nebular · Syncfusion EJ2',
          detail: 'Feature modules per business area, a shared API service layer, route guards and HTTP interceptors, server-paged data grids and ECharts dashboards across four themes.',
        },
        {
          layer: 'Backend',
          tech: 'ASP.NET Core · Entity Framework Core',
          detail: 'A layered API — controllers, services, repositories and a unit of work — with transaction builders that turn each approved document into balanced ledger entries.',
        },
        {
          layer: 'Data',
          tech: 'SQL Server',
          detail: 'Every record is keyed by company and branch, so tenants are isolated at the database level, with row versions for optimistic concurrency.',
        },
        {
          layer: 'Access control',
          tech: 'JWT · API keys · RBAC',
          detail: 'Roles map to page actions and page actions to API endpoints; the frontend mirrors the same rights to show only the menus, screens and buttons a user may use.',
        },
        {
          layer: 'Background & real time',
          tech: 'Hangfire · SignalR',
          detail: 'Recurring invoices, reminders, inventory valuation and tax-authority posting run as background jobs, with live notifications pushed to the browser.',
        },
        {
          layer: 'Integrations',
          tech: 'Tax authorities · payments · messaging',
          detail: 'FBR, ZATCA and MyInvois e-invoicing, local payment gateways, email, SMS and WhatsApp, push notifications and a shipping link to WinqoHub.',
        },
      ],
      contribution: [
        'Sales modules: sale invoices and sale returns, including draft, approve and void flows.',
        'Purchase modules: purchase invoices and purchase returns.',
        'Point of sale (POS) screens for fast, counter-side selling.',
        'Inventory modules for tracking stock across warehouses.',
        'Financial reports, including profit & loss (income statement).',
        'CRM screens for managing customers.',
        'Roles and permissions: role-based access control with granular rights, so each user only sees and does what their role allows.',
        'Maintaining and improving production features, debugging issues and collaborating with backend and product teammates.',
      ],
      involves: [
        {
          title: 'Numbers that must add up',
          body: 'Approving one invoice posts receivables, revenue, cost of sales, tax and stock at once. A frontend for accounting has to make correct data entry the easy path, because a mistake shows up in someone’s profit & loss.',
        },
        {
          title: 'Permissions everywhere',
          body: 'Twenty-one roles cut across every module — menus, screens, buttons and actions. Getting access control right is what lets a business safely hand the system to cashiers, accountants and managers alike.',
        },
        {
          title: 'Documents with a lifecycle',
          body: 'Drafts, approvals, voids and revisions all behave differently, and a revised invoice must keep its number and its audit trail. The UI has to make each state and its allowed actions obvious.',
        },
        {
          title: 'Speed at the counter',
          body: 'POS is used under pressure, with customers waiting. Its screens need to be fast and forgiving in a way back-office forms don’t.',
        },
      ],
      note: 'Splendid Accounts is a proprietary product. Platform architecture is described at a high level; my own work was on the Angular frontend. Source code, configuration and customer data are not shared.',
    },
    links: [{ label: 'Product website', href: 'https://splendidaccounts.com/' }],
  },
  {
    id: 'atelier-one',
    tier: 'feature',
    name: 'Atelier One',
    formerly: 'RobeApp',
    kind: 'Multi-company Tailoring Business Suite',
    context: 'Independent build · first customer: ROBE Cloth & Tailoring',
    status: 'Active development',
    problem:
      'A tailoring shop tracks measurements, fabric sold by the meter, orders moving through the workshop, staff wages and money owed — in registers that never add up.',
    summary:
      'Multi-company management software for tailoring and fabric businesses: customers with garment measurements, meter-based stock, orders tracked through the workshop, payments, purchases, staff wages and loans, expenses and 13 reports. Anyone can sign up, get a private workspace on a 14-day trial and add their team.',
    role: 'Full-stack — architecture, API and web app',
    stack: [
      'Angular 18',
      'Angular Material',
      'Signals',
      'Chart.js',
      'SCSS',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'JWT',
      'bcrypt',
      'PDFKit',
      'Jest',
    ],
    highlights: [
      'Self sign-up with a private company workspace on a 14-day trial — data isolated per company at the model layer',
      'Garment measurements per customer with history, snapshotted onto every order line',
      'Invoices, payments, stock and wages that stay in sync, with 13 reports and a full audit trail',
    ],
    visual: 'pos',
    metrics: [
      { value: '13', label: 'Business reports' },
      { value: '56', label: 'Backend tests passing' },
      { value: '3', label: 'Built-in roles + custom' },
      { value: '14-day', label: 'Trial per new company' },
    ],
    caseStudy: {
      overview:
        'Atelier One (formerly RobeApp) runs the day-to-day of a tailoring business. It started as a single-shop system for ROBE Cloth & Tailoring and is now multi-company: anyone can create an account, which sets up a private workspace with built-in roles, default dropdown values and a business profile, then add managers and counter staff. A customer record holds structured measurements for shalwar kameez, kurta pajama, coat and waistcoat with history, and each order line keeps a snapshot so later changes never alter old orders. Sale invoices assign employees and move items from in process to ready to delivered; fabric is deducted by the meter; advances become linked payment receipts; purchases add stock; wages flow into expenses and the profit & loss. A dashboard with deep links, global search and 13 reports show the owner where the business stands.',
      flow: {
        title: 'Order lifecycle',
        steps: [
          'Customer & measurements',
          'Sale invoice',
          'Assign employees',
          'In process',
          'Ready',
          'Delivered',
          'Payments until settled',
        ],
      },
      capabilities: [
        {
          title: 'Workspaces',
          items: ['Self sign-up & company setup', '14-day trial', 'Owner & staff accounts', 'Isolated company data'],
        },
        {
          title: 'Customers',
          items: ['Garment measurements', 'Measurement history', '360° customer page', 'Running-balance statement'],
        },
        {
          title: 'Orders',
          items: ['Sale invoices & PDF', 'Assigned employees', 'Item stages to delivery', 'Advance as linked receipt'],
        },
        {
          title: 'Stock & purchases',
          items: ['Meter-based fabric stock', 'Low-stock alerts & reorder', 'Purchase invoices', 'Stock movement history'],
        },
        {
          title: 'People & money',
          items: ['Payments against invoices', 'Employee loans & wages', 'Wages flow to expenses', 'Vendors'],
        },
        {
          title: 'Insight & control',
          items: ['Dashboard with deep links', '13 reports & CSV export', 'Roles & permissions', 'Field-level activity log'],
        },
      ],
      architecture: [
        {
          layer: 'Frontend',
          tech: 'Angular 18 · signals · Angular Material',
          detail: 'Standalone, lazy-loaded feature routes with functional guards, a shared UI kit (grid, date pickers, drawers, confirm dialogs) and a light and dark Graphite & Gold theme.',
        },
        {
          layer: 'API',
          tech: 'Node.js · Express.js',
          detail: 'Routes → auth and permission middleware → controllers, with request validation, security headers, allow-listed CORS and rate-limited recovery endpoints.',
        },
        {
          layer: 'Multi-tenancy',
          tech: 'MongoDB · Mongoose plugin · AsyncLocalStorage',
          detail: 'Each request runs inside its company; a plugin scopes every find, update, delete and aggregate and stamps new documents — a query with no company fails loudly instead of leaking data.',
        },
        {
          layer: 'Access',
          tech: 'JWT · token versioning · RBAC',
          detail: 'Module-and-action permissions checked on every route and mirrored in the UI; changing a role or password signs out other sessions instantly.',
        },
        {
          layer: 'Integrity',
          tech: 'Linked records · delete guards',
          detail: 'An invoice’s paid amount always equals its linked payments, deletes reverse stock and balances, and records in use can only be marked inactive.',
        },
        {
          layer: 'Quality',
          tech: 'Jest · Puppeteer',
          detail: '10 backend suites on throw-away databases, including company isolation, plus browser QA of every screen in both themes at desktop and phone widths.',
        },
      ],
      contribution: [
        'Designed and built the whole product: the Angular 18 app, the Express API and the MongoDB data model.',
        'Turned the single-shop RobeApp into a multi-company suite with self sign-up, trials, company owners and a tenant plugin that isolates every query — and migrated the original shop’s data into its own company.',
        'Modelled garment measurements per customer with history and snapshotted them onto order lines.',
        'Kept money and stock consistent: advances as linked receipts, paid always equal to linked payments, deletes that reverse their effects and delete guards for records in use.',
        'Built roles and permissions down to module and action, token versioning for instant sign-out and an admin-assisted password reset with one-time hashed links.',
        'Built the dashboard, global search, 13 reports with CSV export, PDF invoices and a field-level activity log.',
        'Created a shared UI kit and design system with light and dark themes, and covered the backend with 56 Jest tests.',
      ],
      involves: [
        {
          title: 'Money that must balance',
          body: 'A sale touches stock, the customer’s balance and payments at once. If edits and deletes don’t undo exactly what they did, the books quietly drift.',
        },
        {
          title: 'Measurements are data',
          body: 'Tailoring depends on exact measurements per garment and per person. Storing them as structured, versioned data — and snapshotting them on each order — is what makes repeat orders safe.',
        },
        {
          title: 'Isolation by default',
          body: 'Once many shops share one database, company scoping can’t depend on developers remembering a filter. Enforcing it in the model layer makes the safe path the only path.',
        },
        {
          title: 'Delete without breaking history',
          body: 'A product, employee or customer that appears on old invoices can’t simply vanish. Blocking the delete and offering “mark inactive” keeps the history intact.',
        },
      ],
      note: 'Atelier One is in active development. Customer data is not shown.',
    },
    links: [],
  },
  {
    id: 'mounties',
    tier: 'feature',
    name: 'Mounties',
    kind: 'Multi-location Venue Booking & Payments Platform',
    context: 'Professional · i-Splendid · Australian client',
    problem:
      'A group of children’s play venues sells parties, play sessions and drop-and-dine evenings — each with its own rooms, slots, menus and pricing rules.',
    summary:
      'A multi-location booking platform for an Australian family entertainment group: parents book and pay online through guided booking wizards, and staff run every venue from one back office — bookings, calendar, rooms, pricing plans, holidays, payments and reports with PDF and Excel export.',
    role: 'Developer — Angular, .NET & SQL Server',
    stack: [
      'Angular',
      'TypeScript',
      'RxJS',
      'ASP.NET Core',
      'C#',
      'Entity Framework Core',
      'SQL Server',
      'Stripe Checkout',
      'Hangfire',
      'ag-Grid',
      'FullCalendar',
      'ApexCharts',
      'QuestPDF',
      'ClosedXML',
    ],
    highlights: [
      'Public booking wizards for parties, drop-and-dine and general admission, with Stripe deposits',
      'Live slot and room availability per location, theme, date and group size',
      'Staff back office with calendar, change history and six reports exported to PDF and Excel',
    ],
    visual: 'booking',
    metrics: [
      { value: '3', label: 'Booking products' },
      { value: '80+', label: 'API endpoints' },
      { value: '7', label: 'Reports with export' },
      { value: 'Multi', label: 'Venue locations' },
    ],
    caseStudy: {
      overview:
        'Mounties is the booking platform behind a group of children’s play venues in Australia. Parents choose a party theme, a drop-and-dine evening or a general-admission play session, pick a date from a calendar that only shows days with free capacity, choose a time slot, add children, food packs, platters and extras, and pay a deposit through Stripe Checkout. The system allocates party rooms automatically from each room’s capacity and supported themes, prices every line from weekday and weekend, member and non-member fees, and records the deposit and balance due. Staff log in to a back office scoped to their venue, where they see the week’s bookings and free slots, take bookings at the counter with cash or EFTPOS, edit any detail of an existing booking, print party sheets, attendance lists and meal lists, mark holidays and block-outs on the calendar, and run financial, customer and trend reports. Every change to a booking is written to an activity log that shows exactly what changed and who changed it.',
      flow: {
        title: 'Online booking',
        steps: [
          'Choose theme or session',
          'Available date',
          'Time slot & room',
          'Children, food & extras',
          'Price summary',
          'Parent details & T&Cs',
          'Stripe deposit',
          'Confirmation & reminders',
        ],
      },
      capabilities: [
        {
          title: 'Booking products',
          items: ['Birthday parties with themes', 'Drop & dine evenings', 'General admission play', 'Staff counter bookings'],
        },
        {
          title: 'Availability',
          items: ['Weekly slot templates', 'Room capacity & themes', 'Automatic room allocation', 'Holidays & block-out days'],
        },
        {
          title: 'Pricing',
          items: ['Weekday & weekend fees', 'Member & non-member rates', 'Age bands & extra children', 'GST inclusive or exclusive'],
        },
        {
          title: 'Party add-ons',
          items: ['Food packs A & B', 'Complimentary platters', 'Extras with option groups', 'Add-on themes'],
        },
        {
          title: 'Payments',
          items: ['Stripe Checkout deposits', 'Cash & EFTPOS at the counter', 'Balance & due-date tracking', 'Tax invoices'],
        },
        {
          title: 'Operations',
          items: ['Weekly booking board', 'Calendar with holidays', 'Party, attendance & meal sheets', 'Booking change history'],
        },
        {
          title: 'Reports',
          items: ['Bookings & financial', 'Customer data', 'Activity & audit', 'Booking trends dashboard'],
        },
        {
          title: 'Communication',
          items: ['Booking confirmation email', 'Reminders before the event', 'Post-event feedback email', 'Password reset'],
        },
      ],
      architecture: [
        {
          layer: 'Frontend',
          tech: 'Angular · TypeScript · RxJS',
          detail: 'Lazy-loaded feature modules for public booking wizards and the staff back office, built on shared step components that customer and staff flows reuse.',
        },
        {
          layer: 'Backend',
          tech: 'ASP.NET Core · C#',
          detail: 'A REST API of 80+ endpoints that also serves the built Angular app, with JWT authentication and Admin and Staff roles.',
        },
        {
          layer: 'Data',
          tech: 'SQL Server · Entity Framework Core',
          detail: 'Code-first migrations over bookings, booking lines, children, rooms, pricing plans, schedules, holidays, invoices and activity logs, scoped per venue.',
        },
        {
          layer: 'Payments',
          tech: 'Stripe Checkout',
          detail: 'Online bookings open a Checkout session for the deposit; unpaid bookings are released automatically so slots never stay blocked.',
        },
        {
          layer: 'Background jobs',
          tech: 'Hangfire',
          detail: 'Daily reminder and feedback emails, confirmation emails after payment and scheduled clean-up of abandoned checkouts.',
        },
        {
          layer: 'Documents',
          tech: 'QuestPDF · ClosedXML',
          detail: 'Party print-outs, attendance and meal sheets as PDFs, and report workbooks with native Excel charts.',
        },
        {
          layer: 'Audit',
          tech: 'Snapshot & comparer pattern',
          detail: 'Each booking edit is compared before and after by a set of comparers, producing readable entries such as “Event date changed” or “Child added”.',
        },
        {
          layer: 'Back office UI',
          tech: 'ag-Grid · FullCalendar · ApexCharts',
          detail: 'Server-paged grids, a booking and holiday calendar, and a trends dashboard with KPIs, heatmaps and period-over-period charts.',
        },
      ],
      contribution: [
        'Worked across the Angular frontend, the ASP.NET Core API and the SQL Server database of the platform.',
        'Built the multi-step booking wizards for birthday parties, drop-and-dine and general admission, for both customers online and staff at the counter.',
        'Implemented date and time-slot availability with automatic room allocation by capacity and theme.',
        'Worked on pricing rules — weekday and weekend fees, member rates, age bands, food packs, platters and extras with option groups.',
        'Integrated Stripe Checkout for deposits, with staff-recorded cash and EFTPOS payments and balance tracking.',
        'Built back-office screens: booking board, booking detail with inline editing, calendar with holidays, rooms, event types, pricing plans and users.',
        'Worked on reports with PDF and Excel export, printable party, attendance and meal sheets, and the booking activity log.',
      ],
      involves: [
        {
          title: 'Three products, one engine',
          body: 'A party, a drop-and-dine evening and a play session look alike to a parent but price, allocate and confirm differently. Shared wizard steps with product-specific rules kept customer and staff flows consistent.',
        },
        {
          title: 'Availability is the product',
          body: 'A slot is only bookable if a room that supports the theme is free and big enough for the group, on a day that isn’t a holiday. Getting that right is what stops double bookings at the venue.',
        },
        {
          title: 'Money with many rules',
          body: 'Weekday or weekend, member or not, infant or child, deposit or full payment, GST in or out — every line is priced separately, and totals, deposits and balances have to agree everywhere.',
        },
        {
          title: 'A history staff can trust',
          body: 'Bookings change many times before the party. A readable change log — what changed, from what, to what, by whom — is what lets a team share one booking safely.',
        },
      ],
      note: 'Mounties is a client project delivered by i-Splendid. Client-specific details, customer data and source code are intentionally not shown.',
    },
    links: [],
  },
  {
    id: 'nursenova',
    tier: 'feature',
    name: 'NurseNova',
    kind: 'Family Health App — Admin Panel & REST APIs',
    context: 'Professional · i-Splendid',
    period: 'Jun 2023 — Sep 2023',
    problem:
      'A family’s health lives in scattered prescriptions, vaccination cards and memory — and finding the right doctor nearby means asking around.',
    summary:
      'A family health platform: one account holds profiles for every family member, each with a health history, medical records, a symptom diary and medication and vaccination reminders, plus doctor discovery by specialty and location. I built the Angular admin panel and the Node.js REST APIs the mobile app runs on.',
    role: 'Admin panel & backend APIs',
    stack: ['Angular', 'TypeScript', 'Nebular', 'ag-Grid', 'Node.js', 'Express.js', 'Sequelize', 'MySQL', 'JWT', 'REST APIs'],
    highlights: [
      'REST APIs across 19 modules — profiles, records, reminders, doctors, support and more',
      'Doctor search by specialty and by distance from the patient’s location',
      'Angular admin panel for doctors, specialties, vaccinations, issue types and support content',
    ],
    visual: 'health',
    metrics: [
      { value: '19', label: 'API modules' },
      { value: '100+', label: 'API endpoints' },
      { value: '2', label: 'Clients — admin & mobile' },
      { value: 'Family', label: 'Profiles per account' },
    ],
    caseStudy: {
      overview:
        'NurseNova is a health app for the whole family. One account can hold several profiles — parents, children, older relatives — and each profile carries its own health history (blood type, allergies, chronic conditions, medication, surgeries, lifestyle), medical records with uploaded documents, and a diary of symptoms tagged by issue type. Medication reminders support doses, times, every-day or lifetime schedules and snoozing; vaccination reminders are built from a standard vaccination catalogue grouped by category. Patients can find doctors by practice specialty or by distance from where they are, save the ones they trust, and reach support or send feedback from inside the app. Behind it sits an admin panel where the team manages doctors, specialties, the vaccination catalogue, issue types and support content, all served to the mobile app through one REST API.',
      flow: {
        title: 'Patient journey',
        steps: [
          'Sign up & verify',
          'Add family profiles',
          'Health history',
          'Records & diary',
          'Medication & vaccine reminders',
          'Find nearby doctors',
          'Save & get support',
        ],
      },
      capabilities: [
        {
          title: 'Accounts & family',
          items: ['Sign-up with OTP verification', 'Password reset', 'Multiple profiles per account', 'Primary & dependent profiles'],
        },
        {
          title: 'Health history',
          items: ['Blood type, height & weight', 'Allergies & chronic conditions', 'Medication & surgeries', 'Lifestyle & family history'],
        },
        {
          title: 'Records & diary',
          items: ['Medical records with documents', 'Symptom diary', 'Filter by issue type & date', 'Per-profile timeline'],
        },
        {
          title: 'Reminders',
          items: ['Medication doses & times', 'Every-day or lifetime schedules', 'Vaccination reminders', 'Snooze'],
        },
        {
          title: 'Doctors',
          items: ['Search by specialty', 'Nearby doctors by radius', 'Doctor profiles & contact', 'Saved doctors'],
        },
        {
          title: 'Admin panel',
          items: ['Doctors & specialties', 'Vaccination catalogue', 'Issue types', 'Support sections & feedback'],
        },
      ],
      architecture: [
        {
          layer: 'Admin frontend',
          tech: 'Angular · Nebular · ag-Grid',
          detail: 'A lazy-loaded admin console with data grids, reactive forms and route guards for the team that manages the app’s reference data.',
        },
        {
          layer: 'API',
          tech: 'Node.js · Express.js · TypeScript',
          detail: 'One REST API organised into 19 resource modules, shared by the admin panel and the patient mobile app.',
        },
        {
          layer: 'Data',
          tech: 'MySQL · Sequelize',
          detail: 'Relational models for users, family profiles, health details, records, reminders, doctors and catalogues, with soft deletes.',
        },
        {
          layer: 'Auth',
          tech: 'JWT · sessions',
          detail: 'Signed access tokens backed by server-side sessions, with OTP verification and password reset on the account side.',
        },
        {
          layer: 'Location',
          tech: 'Latitude / longitude radius search',
          detail: 'Doctors are stored with coordinates so the app can list those within a chosen distance of the patient.',
        },
      ],
      contribution: [
        'Built the Angular admin panel used to manage doctors, practice specialties, the vaccination catalogue, issue types and support content.',
        'Developed REST APIs with Node.js, Express.js and Sequelize on a MySQL database for both the admin panel and the mobile app.',
        'Worked on APIs for family profiles, health history, medical records, the diary, and medication and vaccination reminders.',
        'Implemented doctor discovery by specialty and by distance, plus saved doctors.',
        'Worked on session-based JWT authentication shared by the admin panel and the app.',
      ],
      involves: [
        {
          title: 'One backend, two clients',
          body: 'The same API serves an internal admin panel and a patient-facing mobile app, each with very different needs from the same data.',
        },
        {
          title: 'Family-shaped data',
          body: 'One account, several family members, each with their own history, records and reminders — a structure that has to stay clear and correctly scoped as it grows.',
        },
        {
          title: 'Reminders people rely on',
          body: 'A medication reminder is only useful if the dose, time and schedule are right every day. Recurring, lifetime and snoozed reminders all have to agree.',
        },
        {
          title: 'Sensitive by nature',
          body: 'Allergies, conditions and medical records are personal health data. Every endpoint has to return only what belongs to the signed-in account.',
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
    kind: 'Desktop WhatsApp Messaging Gateway',
    context: 'Professional · i-Splendid',
    status: 'v1.0.3 · Windows',
    problem:
      'Businesses already run their invoices, orders and reminders in an ERP or an order platform — but the WhatsApp messages that go with them are still copied and sent by hand, one chat at a time.',
    summary:
      'A Windows desktop app that turns a business’s own WhatsApp numbers into an automated messaging gateway. It links numbers by QR code, pulls “send this message” tasks from Splendid Accounts, WinqoHub or any custom API, sends them round-robin across the linked numbers and reports each delivery back to the source system.',
    role: 'Desktop app developer',
    stack: [
      'Electron',
      'Node.js',
      'JavaScript',
      'whatsapp-web.js',
      'Puppeteer',
      'SQLite',
      'better-sqlite3',
      'REST APIs',
      'libphonenumber',
      'Winston',
    ],
    highlights: [
      'Multiple WhatsApp numbers linked by QR, each running its own headless browser session',
      'Pulls message tasks from Splendid Accounts, WinqoHub or any REST API set up through a 5-step wizard',
      'Round-robin sending with delivery status written back to the source system',
    ],
    visual: 'desktop',
    metrics: [
      { value: '3', label: 'Task-source types' },
      { value: '5-step', label: 'Custom API wizard' },
      { value: 'Multi', label: 'WhatsApp numbers per install' },
      { value: 'v1.0.3', label: 'Shipped Windows installer' },
    ],
    caseStudy: {
      overview:
        'WinQo is an Electron desktop app installed on a business’s own Windows PC. Each WhatsApp number is linked once by scanning a QR code and then kept alive in its own headless browser session. The app connects to the systems where messages originate — the Splendid Accounts ERP, the WinqoHub order platform, or any other system through a configurable Custom API — fetches pending “send message” tasks on a schedule, normalises every phone number, sends text and documents round-robin across the numbers mapped to that source, and posts the result of each message back so the source system always knows what was delivered. Everything runs locally on an embedded SQLite database, with credentials encrypted at rest.',
      flow: {
        title: 'Message pipeline',
        steps: [
          'Link number by QR',
          'Fetch pending tasks',
          'Normalise phone number',
          'Pick next number',
          'Send text / document',
          'Report status back',
        ],
      },
      capabilities: [
        {
          title: 'WhatsApp sessions',
          items: ['QR-code linking', 'Several numbers at once', 'Session restore on restart', 'Auto-detects Chrome / Edge'],
        },
        {
          title: 'Task sources',
          items: ['Splendid Accounts', 'WinqoHub', 'Any custom REST API', 'Map numbers to each source'],
        },
        {
          title: 'Custom API wizard',
          items: ['Header, bearer, basic & query auth', 'Page, offset & cursor pagination', 'Field mapping with test fetch', 'Import / export configs'],
        },
        {
          title: 'Sending',
          items: ['Round-robin across numbers', 'Configurable gap between sends', 'Documents & attachments', 'E.164 phone normalisation'],
        },
        {
          title: 'Monitoring',
          items: ['Live message log', 'Per-source statistics', 'OS notifications', 'Rotating log files'],
        },
        {
          title: 'Desktop experience',
          items: ['Windows installer', 'System-tray app', 'Dark & light themes', 'Local data, no server needed'],
        },
      ],
      architecture: [
        {
          layer: 'Shell',
          tech: 'Electron · Node.js',
          detail: 'A main process that owns sessions, scheduling and storage, and a sandboxed renderer that talks to it only through a narrow, typed IPC bridge.',
        },
        {
          layer: 'WhatsApp',
          tech: 'whatsapp-web.js · Puppeteer',
          detail: 'One headless browser session per linked number, using the system’s Chrome or Edge when present and downloading a browser only when needed.',
        },
        {
          layer: 'Sources',
          tech: 'Adapter per source · REST',
          detail: 'Splendid Accounts, WinqoHub and Custom API all implement the same fetch-and-update contract, so the sending engine never cares where a task came from.',
        },
        {
          layer: 'Scheduling',
          tech: 'Timers with jitter',
          detail: 'Auto-fetch on a configurable interval with randomised jitter, and a paced send queue that spaces messages out instead of bursting them.',
        },
        {
          layer: 'Data',
          tech: 'SQLite · better-sqlite3',
          detail: 'An embedded database in WAL mode with versioned migrations that back the file up before every schema change.',
        },
        {
          layer: 'Security',
          tech: 'AES-256-GCM · contextBridge',
          detail: 'API credentials are encrypted at rest, and the UI has no direct Node.js access — only the handful of actions the bridge exposes.',
        },
      ],
      contribution: [
        'Built the Electron desktop app end to end — main process, IPC bridge, renderer UI and Windows installer.',
        'Implemented multi-number WhatsApp sessions with QR linking and automatic session restore, on whatsapp-web.js.',
        'Integrated Splendid Accounts and WinqoHub as message sources, fetching pending tasks and posting delivery status back.',
        'Designed the 5-step Custom API wizard — authentication, endpoints, pagination, field mapping and a live test fetch — so any system can feed messages without code changes.',
        'Built round-robin sending across mapped numbers with configurable pacing, document attachments and libphonenumber normalisation.',
        'Moved local storage to embedded SQLite with versioned, backed-up migrations, and encrypted stored credentials with AES-256-GCM.',
        'Added the live message log, statistics, OS notifications, system-tray mode, themes and rotating logs.',
      ],
      involves: [
        {
          title: 'A gateway, not a chat app',
          body: 'Nobody types messages into WinQo. The work is in pulling tasks reliably from other systems, sending each one exactly once and reporting back — so the ERP or order platform stays the single source of truth.',
        },
        {
          title: 'One engine, any source',
          body: 'Every API authenticates, paginates and names its fields differently. Turning those differences into configuration — rather than code — is what lets a new client connect their own system through a wizard.',
        },
        {
          title: 'Pacing matters',
          body: 'Sending hundreds of messages in a burst from one number is how numbers get restricted. Spreading load round-robin across several numbers, with gaps and jittered fetches, keeps sending steady and natural.',
        },
        {
          title: 'Software on someone else’s PC',
          body: 'A desktop app has no server to lean on: it must find a browser, survive restarts, migrate its own database safely and protect the credentials it stores on a machine you don’t control.',
        },
      ],
      note: 'WinQo is a proprietary i-Splendid product. Source code, client endpoints and message data are intentionally not shown.',
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
          'AI: natural-language reporting (OpenAI API), the “Ask AI” reporting agent and autonomous AI agents',
          'ShipZo courier integration, faster order reports and the Winqo Hub rebrand announcement',
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
          'Multi-location venue booking platform for an Australian client (ASP.NET Core, SQL Server)',
          'Booking wizards for parties, drop-and-dine and general admission with Stripe deposits',
          'Slot and room availability, pricing rules, back-office calendar and reports with PDF / Excel export',
        ],
      },
      {
        name: 'NurseNova',
        focus: 'Admin & APIs',
        points: [
          'Angular admin panel for doctors, specialties, vaccinations and support content',
          'Node.js / Express.js REST APIs on MySQL across 19 modules for the mobile app',
          'Family profiles, health history, records, medication & vaccination reminders, nearby-doctor search',
        ],
      },
      {
        name: 'WinQo',
        focus: 'Desktop',
        points: [
          'Electron desktop app that turns WhatsApp numbers into an automated messaging gateway',
          'Pulls message tasks from Splendid Accounts, WinqoHub or any custom REST API and reports delivery back',
          'Multi-number QR sessions (whatsapp-web.js), round-robin sending, embedded SQLite and encrypted credentials',
        ],
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
  { value: '8', label: 'Products & platforms built' },
  { value: 'Apr ’24', label: 'Employee of the Month' },
]
