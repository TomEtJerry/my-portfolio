// All projects, shown as stacked cards in the Projects section.
// The ones marked `featured: true` (3 of them) are also shown in the hero slider.
// The ones with a `slug` and a `caseStudy` get their own page at /projects/<slug>
// (except while the case study is marked `draft: true`).
// The card shows `company · year` (or `role · year` when no company is set).
// Project images live in src/assets/projects — `?responsive` turns them into light WebP versions
// (see vite.config.js); each `image` is { sources: { webp: srcset }, img: { src, w, h } }
import projectOne from '../assets/projects/project_one.jpg?responsive'
import projectTwo from '../assets/projects/project_two.jpg?responsive'
import projectThree from '../assets/projects/project_three.jpg?responsive'
import projectFour from '../assets/projects/project_four.jpg?responsive'
import projectFive from '../assets/projects/project_five.jpg?responsive'

export const projects = [
  {
    slug: 'partner-offers-platform',
    title: 'Partner Offers Platform',
    featured: true,
    category: 'UX / UI Design',
    description:
      'Redesign of Allianz’s partner offers platform, so policyholders can easily find and claim the discounts negotiated for them.',
    year: '2026',
    company: 'Allianz',
    role: 'UX/UI Designer',
    image: projectOne,
    // Content of the project's own page (/projects/<slug>)
    caseStudy: {
      intro:
        'Redesign of Allianz’s partner offers platform — turning a dedicated but very limited space into an accessible experience where policyholders can easily find and claim the discounts and services negotiated with Allianz’s partner brands.',
      meta: [
        { label: 'Company', value: 'Allianz' },
        { label: 'Role', value: 'UX/UI Designer' },
        { label: 'Tools', value: 'Figma' },
      ],
      context: {
        title: 'An existing platform, too limited to be useful',
        text: 'Allianz negotiates discounts and services with partner brands for its policyholders, and a dedicated platform to browse these offers already existed inside the client area. But it was very limited: offers were hard to find, poorly structured and unclear to navigate. The brief was to overhaul the entire platform to make it more accessible and make retrieving an offer far simpler — starting with a benchmark of how competitor and other offer platforms handle the same problem.',
        goals: [
          'Make the partner offers platform accessible to every policyholder',
          'Simplify how offers are found, understood and claimed',
          'Redesign the experience for both desktop and mobile from one design system',
        ],
      },
      approach: {
        title: 'From platform audit to final mockups',
        // Shown under the title: sums up the context (the context section isn't displayed)
        intro:
          'Allianz’s client area already had a space listing the discounts negotiated with partner brands, but it was very limited: offers were hard to find, poorly structured and unclear to navigate. The brief was to overhaul it so every policyholder can easily find, understand and claim an offer, on desktop as on mobile.',
        steps: [
          {
            title: 'Auditing the existing platform',
            text: 'Going through the existing offers platform to pinpoint why it felt so limited: offers hard to locate, weak categorization, and a navigation that got in the way of simply claiming a deal.',
          },
          {
            title: 'Benchmarking the market',
            text: 'Reviewing how competitor insurers and other offer platforms structure, categorize and present partner deals, to spot patterns worth reusing and pitfalls to avoid.',
          },
          {
            title: 'Structuring the offers',
            text: 'Defining how offers are categorized and filtered, and designing the anatomy of an offer card and its detail page.',
          },
          {
            title: 'Designing desktop and mobile',
            text: 'Wireframing, then designing the full mockups in Figma for both desktop and mobile, from the offers homepage to a single offer’s detail page, so the experience stays just as easy to browse on every screen.',
          },
        ],
      },
      // Visuals: drop the files in src/assets/projects/<file> — they show up automatically
      desktop: {
        title: 'Browsing partner offers on desktop',
        text: 'An overview of the desktop mockups, from the offers homepage to a single offer’s detail page.',
        visuals: [
          { file: 'partner-offers/partner-offers-desktop-1.jpg', caption: 'Offers homepage, browsable by category' },
          { file: 'partner-offers/partner-offers-desktop-2.jpg', caption: 'Detail page of a single partner offer' },
          { file: 'partner-offers/partner-offers-desktop-3.jpg', caption: 'Filtering offers by category' },
        ],
      },
      mobile: {
        title: 'The same offers, adapted for mobile',
        text: 'The mobile version of the client area, reworked so partner offers stay just as easy to browse on a smaller screen.',
        visuals: [
          { file: 'partner-offers/partner-offers-mobile-1.jpg', caption: 'Offers homepage on mobile' },
          { file: 'partner-offers/partner-offers-mobile-2.jpg', caption: 'Offer detail on mobile' },
          { file: 'partner-offers/partner-offers-mobile-3.jpg', caption: 'Category filtering on mobile' },
        ],
      },
      results: [
        {
          value: '1.5M',
          text: 'policyholders who can now find their partner discounts straight from their Allianz client area.',
        },
        {
          value: '4',
          text: 'offer universes — On the road, At home, Family, Health — to browse deals by need instead of hunting brand by brand.',
        },
        {
          value: '2',
          text: 'screens, one design system: every page designed for desktop and mobile from the same components.',
        },
      ],
    },
  },
  {
    slug: 'customer-payment-portal',
    title: 'Customer Payment Portal',
    featured: true,
    category: 'UX / UI Design',
    description:
      'A dedicated space where Allianz policyholders can see and track their insurance premium payments on their own.',
    year: '2026',
    company: 'Allianz',
    role: 'UX/UI Designer',
    image: projectTwo,
    // Content of the project's own page (/projects/<slug>)
    caseStudy: {
      intro:
        'A dedicated space for visualizing and tracking insurance premium payments, designed for individual policyholders.',
      meta: [
        { label: 'Company', value: 'Allianz' },
        { label: 'Role', value: 'UX/UI Designer' },
        { label: 'Tools', value: 'Figma · UserTesting' },
      ],
      context: {
        title: 'Information clients had to ask for instead of simply seeing',
        text: 'Before this project, premium payment details were only visible to Allianz agents. For the simplest question — amount charged, next payment date, payment history — the client had to call or write to their agent, who then had to look up the information themselves. This friction generated an avoidable volume of requests and a frustrating experience for data that was actually simple to display.',
        quote: {
          text: 'I just wanted to know if this month’s payment had gone through, and I had to call my agency for that.',
          source: 'Recurring request reported by agents prior to the project',
        },
      },
      approach: {
        title: 'From wireframe to validated flow',
        // Shown under the title: sums up the context (the context section isn't displayed)
        intro:
          'Premium payment details used to be visible only to Allianz agents. For the simplest question — amount charged, next payment date, payment history — policyholders had to call or write to their agency. The goal was to give them a space where they can see and track their payments on their own, and to free agents from these avoidable requests.',
        steps: [
          {
            title: 'Scoping the need',
            text: 'Identifying the information clients expected, based on the most frequent requests reported by agencies: amount, date, status, and payment history.',
          },
          {
            title: 'Wireframing in Figma',
            text: 'Designing several versions of the tracking space, exploring different information hierarchies: contract overview, per-installment detail, and quick access to the latest payment.',
          },
          {
            title: 'Remote testing sessions (UserTesting)',
            text: 'Confronting the wireframes with real clients to observe where they looked for information, what they misunderstood, and which details felt missing or unnecessary.',
          },
          {
            title: 'Refinements and final version',
            text: 'Incorporating feedback to simplify access to payment status and clarify wording, before delivering the final mockups.',
          },
        ],
      },
      // Same layout as the other pages' mobile section (main phone large in the middle)
      mobile: {
        eyebrow: 'The wireframes',
        title: 'The payment tracking space',
        text: 'A look at the key mobile screens of the customer portal, from the contract overview to the detail of a single premium installment.',
        visuals: [
          { file: 'payment-portal/wireframe-1.jpg', caption: 'Contract status and next payment' },
          { file: 'payment-portal/wireframe-2.jpg', caption: 'Payment history closed' },
          { file: 'payment-portal/wireframe-3.jpg', caption: 'Payment history open' },
        ],
      },
      // Before / after cards, in place of the desktop section
      testing: {
        title: 'What UserTesting revealed',
        text: 'Several testing sessions surfaced friction points invisible on the wireframe alone, and the interface was adjusted accordingly.',
        changes: [
          {
            before: {
              file: 'payment-portal/frequency-toggle-before.jpg',
              text: 'The Monthly/Annual switch was a dropdown showing only one option at a time, so users never realized the other view was just one click away.',
            },
            after: {
              file: 'payment-portal/frequency-toggle-after.jpg',
              text: 'The dropdown was replaced with a two-part toggle button showing Monthly and Annual side by side, making the switch visible and reachable in a single tap.',
            },
          },
          {
            before: {
              file: 'payment-portal/progress-bar-before.jpg',
              text: 'A progress bar showed what percentage of the annual contract had been paid, but testers found it confusing to read alongside the payment list.',
            },
            after: {
              file: 'payment-portal/progress-bar-after.jpg',
              text: 'The progress bar was removed entirely, letting the payment list speak for itself for a clearer, less cluttered page.',
            },
          },
        ],
      },
      results: [
        { value: '16', text: 'testers took part in the UserTesting sessions to confront the wireframes with real clients.' },
        { value: '70%', text: 'overall task success rate across the payment tracking flow.' },
        { value: '4.4/5', text: 'average satisfaction rating given by testers for the flow.' },
      ],
    },
  },
  {
    slug: 'health-experience-evolution',
    title: 'Health Experience Evolution',
    featured: true,
    category: 'UX / UI Design',
    description:
      'Redesign of the health hub in Allianz’s client area, and a live page replacing the guarantees PDF.',
    year: '2025',
    company: 'Allianz',
    role: 'UX/UI Designer',
    image: projectThree,
    // Content of the project's own page (/projects/<slug>)
    caseStudy: {
      intro:
        'Redesign of the health insurance hub in Allianz’s client area — a more dynamic homepage with money-for-value content, health tips and clearer quick access, plus a full rework of how policyholders view their guarantees and benefit usage.',
      meta: [
        { label: 'Company', value: 'Allianz' },
        { label: 'Role', value: 'UX/UI Designer' },
        { label: 'Tools', value: 'Figma' },
      ],
      context: {
        title: 'A health hub that needed to work harder',
        text: 'Allianz’s health insurance hub inside the client area had grown flat and static: quick access to key actions was hard to find, and the guarantees a policyholder had subscribed to could only be checked by downloading a PDF. The brief covered two connected pieces of work — redesigning the hub itself, and rebuilding how guarantees are displayed — starting with a deep benchmark of competitor health platforms to map their strengths and weaknesses.',
        goals: [
          'Make the health hub more dynamic, with money‑for‑value and health tips content',
          'Give quick access a clearer hierarchy and better visibility',
          'Turn the guarantees PDF into a native, dynamic page with real‑time benefit usage',
        ],
      },
      approach: {
        title: 'From competitor benchmark to two connected redesigns',
        // Shown under the title: sums up the context (the context section isn't displayed)
        intro:
          'Allianz’s health insurance hub had grown flat and static: key actions were hard to find, and policyholders could only check their guarantees by downloading a PDF. The brief covered two connected pieces of work — making the hub more dynamic and useful, and turning the guarantees PDF into a native page showing benefit usage in real time.',
        steps: [
          {
            title: 'Benchmarking competitor health platforms',
            text: 'Reviewing competitor insurers’ health platforms to map their strengths and weaknesses, on both the hub experience and how they display guarantees.',
          },
          {
            title: 'Redesigning the health hub',
            text: 'Restructuring the hub around money‑for‑value content, personalized health tips, and a clearer hierarchy for quick access shortcuts.',
          },
          {
            title: 'Rebuilding the guarantees experience',
            text: 'Replacing the static PDF with a native, dynamic page showing every guarantee and its benefit usage updated in real time.',
          },
          {
            title: 'Designing for desktop and mobile',
            text: 'Designing the full experience in Figma for both desktop and mobile, so every improvement carries across screens.',
          },
        ],
      },
      // Two showcase sections, each with mobile and desktop visuals.
      // `scroll: true`: a full-page screenshot, shown in a frame the visitor can scroll inside
      showcases: [
        {
          eyebrow: 'The health hub',
          title: 'A hub that surfaces what matters',
          text: 'The hub’s homepage was redesigned around money‑for‑value content, personalized health tips and a clearer hierarchy for quick access shortcuts.',
          desktop: [
            { file: 'health-experience/hub-desktop-1.jpg', caption: 'Desktop view of the redesigned health hub', scroll: true },
          ],
          mobile: [
            { file: 'health-experience/hub-mobile-1.jpg', caption: 'Mobile view of the redesigned health hub', scroll: true },
          ],
        },
        {
          eyebrow: 'The guarantees experience',
          title: 'From a static PDF to a live, native page',
          text: 'The guarantees a policyholder subscribed to used to live in a PDF. They now live in a native, dynamic page showing benefit usage updated in real time.',
          desktop: [
            { file: 'health-experience/guarantees-desktop-1.jpg', caption: 'Desktop view of the new native guarantees page', scroll: true },
          ],
          mobile: [
            { file: 'health-experience/guarantees-mobile-1.jpg', caption: 'Guarantee detail with real‑time benefit usage' },
            { file: 'health-experience/guarantees-mobile-2.jpg', caption: 'Overview of the contract and subscribed guarantees', scroll: true },
            { file: 'health-experience/guarantees-mobile-3.jpg', caption: 'Guarantees grouped by care category' },
          ],
        },
      ],
      results: [
        { value: '2', text: 'connected pieces of work delivered: the health hub and the guarantees experience.' },
        { value: '7', text: 'care categories once locked in a PDF, now brought together in one native, dynamic page with real‑time benefit usage.' },
        { value: '1', text: 'full benchmark of competitor health platforms, strengths and weaknesses mapped.' },
      ],
    },
  },
  {
    slug: 'customer-data-platform',
    title: 'Customer Data Platform',
    category: 'UX / UI Design',
    description:
      'Visual redesign of Cliking’s customer satisfaction platform, extended with a brand new social media module.',
    year: '2023',
    company: 'Cliking',
    role: 'UX/UI Designer',
    image: projectFour,
    // Content of the project's own page (/projects/<slug>)
    caseStudy: {
      intro:
        'Visual redesign of Cliking’s customer satisfaction platform — turning a dense, inconsistent dashboard into a clear, branded interface, and extending it with a brand new social media module.',
      meta: [
        { label: 'Company', value: 'Cliking' },
        { label: 'Role', value: 'UX/UI Designer' },
        { label: 'Tools', value: 'Figma' },
      ],
      context: {
        title: 'An interface that no longer matched the product’s ambitions',
        text: 'Cliking’s platform lets businesses track customer satisfaction across surveys, reviews and client data. As the product grew, its interface accumulated inconsistent components, dense tables and a visual identity that no longer reflected the brand. The brief focused entirely on visual and interaction design: redesign the core dashboard and extend the platform with a new module.',
        goalsTitle: 'Redesign goals',
        goals: [
          'Build one consistent visual language across every screen',
          'Make satisfaction data easier to scan at a glance',
          'Design a brand new social media monitoring module',
        ],
      },
      approach: {
        title: 'From audit to a unified design system',
        // Shown under the title: sums up the context (the context section isn't displayed)
        intro:
          'Cliking’s platform lets businesses track customer satisfaction across surveys, reviews and client data. As the product grew, its interface piled up inconsistent components, dense tables and a look that no longer reflected the brand. The brief focused on visual and interaction design: give every screen one consistent language, make satisfaction data easy to scan, and add a brand new social media module.',
        steps: [
          {
            title: 'Auditing the existing screens',
            text: 'Going through every page of the platform to spot inconsistent components, redundant layouts and the screens clients open most often.',
          },
          {
            title: 'Defining a design system',
            text: 'Setting typography, color and component rules in Figma, then applying them consistently across cards, tables and navigation.',
          },
          {
            title: 'Redesigning the dashboard',
            text: 'Reworking the satisfaction overview, survey results and client database into clearer, lighter screens.',
          },
          {
            title: 'Designing the social media module',
            text: 'Adding a new section for monitoring posts and channel performance, built with the same design system from day one.',
          },
        ],
      },
      // Before / after slider comparing the old and new dashboard (it follows the scroll, or can be dragged)
      comparison: {
        title: 'A new visual identity for the dashboard',
        text: 'From the previous dashboard to the redesigned one: a single, consistent visual language, lighter screens and satisfaction data that reads at a glance.',
        before: 'customer-data-platform/before.png',
        after: 'customer-data-platform/after.png',
      },
      // Showcases with `visuals`: desktop screens only (plus an optional video on top)
      showcases: [
        {
          eyebrow: 'The dashboard',
          title: 'Clearer data, from the overview to the client file',
          text: 'The redesign covers the full journey: the satisfaction overview, the detail of a survey, and the client database, all built with the new design system.',
          video: {
            file: 'customer-data-platform/dashboard-walkthrough.mp4',
            caption: 'Walkthrough of the redesigned satisfaction dashboard',
          },
          visuals: [
            { file: 'customer-data-platform/dashboard-1.png', caption: 'Satisfaction overview with real-time alerts and reviews' },
            { file: 'customer-data-platform/dashboard-2.png', caption: 'Survey detail with CSAT, NPS and client segmentation' },
            { file: 'customer-data-platform/dashboard-3.png', caption: 'Searchable client database' },
          ],
        },
        {
          eyebrow: 'New module',
          title: 'A dedicated space for social media monitoring',
          text: 'Built from scratch with the same design system, this module lets clients compare channel performance, browse past posts and plan ahead.',
          visuals: [
            { file: 'customer-data-platform/social-media-1.png', caption: 'Cross-channel performance comparison' },
            { file: 'customer-data-platform/social-media-2.png', caption: 'Channel-level analysis with semantic feedback reading' },
            { file: 'customer-data-platform/social-media-3.png', caption: 'Library of published and scheduled posts' },
            { file: 'customer-data-platform/social-media-4.png', caption: 'Editorial calendar across channels' },
          ],
        },
      ],
      results: [
        { value: '8', text: 'types of response charts and visualizers redesigned.' },
        { value: '1', text: 'navbar entirely rethought.' },
        { value: '4', text: 'social networks brought into a brand new social media monitoring platform.' },
      ],
    },
  },
  {
    slug: 'wordpress-website',
    title: 'Wordpress Website',
    category: 'UX / UI Design',
    description:
      'Design and build, from scratch, of Cliking’s new WordPress showcase site after its rebrand from Goodmeal.',
    year: '2023',
    company: 'Cliking',
    role: 'UX/UI Designer',
    image: projectFive,
    // Content of the project's own page (/projects/<slug>)
    caseStudy: {
      intro:
        'Design and build, from scratch, of Cliking’s new showcase website on WordPress — following a funding round and a full rebrand from Goodmeal to Cliking, then kept alive ever since with a monthly blog.',
      meta: [
        { label: 'Company', value: 'Cliking' },
        { label: 'Role', value: 'UX/UI Designer' },
        { label: 'Tools', value: 'Figma · Wordpress' },
      ],
      context: {
        title: 'A rebrand that needed a website to match',
        text: 'After raising funding, Goodmeal became Cliking — a new name, a new logo, a whole new visual identity. The former website carried none of it. The brief was to design and build an entirely new showcase website from scratch on WordPress, built to carry the new brand and to keep evolving well after launch through a monthly blog.',
        goals: [
          'Bring Cliking’s new brand identity to every page of the site',
          'Design and build the entire website from scratch on WordPress',
          'Set up a blog to keep the site alive with monthly updates',
        ],
      },
      approach: {
        title: 'From new identity to a live, evolving site',
        // Shown under the title: sums up the context (the context section isn't displayed)
        intro:
          'After raising funding, Goodmeal became Cliking — a new name, a new logo, a whole new visual identity — and the former website carried none of it. The brief was to design and build a brand new showcase site from scratch on WordPress, carrying the new brand on every page and kept alive after launch with a monthly blog.',
        steps: [
          {
            title: 'Translating the new identity',
            text: 'Turning Cliking’s new logo, colors and typography into a coherent web design system in Figma.',
          },
          {
            title: 'Designing the showcase site',
            text: 'Designing every page — homepage, industries, product features, contact — around the new identity and the message Cliking wanted to carry.',
          },
          {
            title: 'Building on Wordpress',
            text: 'Building the entire site from scratch on WordPress, page by page, so the team could keep editing it independently after launch.',
          },
          {
            title: 'Launching the monthly blog',
            text: 'Setting up a blog section and a monthly publishing rhythm to keep the site active and support Cliking’s content strategy after launch.',
          },
        ],
      },
      showcases: [
        {
          eyebrow: 'The website',
          title: 'A full site, rebuilt from scratch',
          text: 'An overview of the new Cliking website, from the homepage to the contact page, all designed and built under the new brand identity.',
          video: {
            file: 'wordpress-website/walkthrough.mp4',
            caption: 'Walkthrough of the new Cliking website',
          },
          visuals: [
            { scroll: true, file: 'wordpress-website/page-1.jpg', caption: 'Homepage, introducing Cliking’s new identity' },
            { scroll: true, file: 'wordpress-website/page-2.jpg', caption: 'Industry pages, resources and customer testimonials' },
            { scroll: true, file: 'wordpress-website/page-3.jpg', caption: 'Feature page detailing the product experience' },
            { scroll: true, file: 'wordpress-website/page-4.jpg', caption: 'Contact page and footer, with the new monthly blog' },
          ],
        },
      ],
      results: [
        { value: '1', text: 'full rebrand — from Goodmeal to Cliking — carried across the new site.' },
        { value: '1', text: 'website designed and built entirely from scratch on WordPress.' },
        { value: '12', text: 'blog articles published per year to keep the site active since launch.' },
      ],
    },
  },
]

// Link to a project's own page, or null while it has no published page
export const projectUrl = (project) =>
  project.caseStudy && !project.caseStudy.draft ? `/projects/${project.slug}` : null
