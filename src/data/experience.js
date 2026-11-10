// Content of the "full experience" page (/experience) — based on the resume (CV Tom Santoni).
// No personal contact details here (address, phone, email): only the LinkedIn link is shown.
import allianz from '../assets/logos/allianz.svg'
import legrand from '../assets/logos/legrand.svg'
import cliking from '../assets/logos/cliking.svg'

export const experience = {
  intro:
    'Product designer based in Paris, with a Master’s degree in Digital Business and three years of work-study experience in design — now looking for a permanent position in product design.',
  meta: [
    { label: 'Based in', value: 'Paris, France' },
    { label: 'Degree', value: 'Master (Bac+5)' },
    { label: 'Looking for', value: 'Permanent role' },
  ],

  // Most recent first. `company` must match the projects' `company` to list them under the role.
  jobs: [
    {
      role: 'Product Designer',
      company: 'Allianz',
      logo: allianz,
      logoSize: 'h-5 md:h-6',
      type: 'Work-study',
      period: 'Sep 2025 – Aug 2026',
      summary: 'Designing and optimising the customer-area journeys used by 1.5 million people.',
      tasks: [
        'User tests and interviews',
        'Wireframes, mockups and interactive prototypes',
        'UX audits and benchmarks',
        'Running co-design workshops',
      ],
    },
    {
      role: 'UI Designer & Communications Officer',
      company: 'Legrand',
      logo: legrand,
      logoSize: 'h-5 md:h-6',
      type: 'Work-study',
      period: 'Sep 2023 – Aug 2024',
      summary: 'Creating marketing content for DEBFLEX, a Legrand brand.',
      tasks: [
        'Product pages and banners for marketplaces',
        'Visuals for social media and the website',
        'E-commerce watch and competitor analysis',
      ],
    },
    {
      role: 'UX/UI Designer & Marketing Officer',
      company: 'Cliking',
      logo: cliking,
      logoSize: 'h-5 md:h-6',
      type: 'Work-study',
      period: 'Sep 2022 – Aug 2023',
      summary: 'Designing the Cliking platform and the brand’s digital presence.',
      tasks: [
        'Mockups for the development of the Cliking platform',
        'Design and build of the Cliking.co website and landing pages on WordPress',
        'Visual content for social media',
        'Advertising campaigns on Google Ads and LinkedIn Ads',
      ],
    },
  ],

  education: [
    {
      school: 'GOBELINS Paris',
      period: '2025 – 2026',
      degree: 'Professional program — UI Designer',
      modules: ['Prototyping', 'Front-end', 'UI kits', 'Responsive design'],
    },
    {
      school: 'Paris School of Business',
      period: '2022 – 2024',
      degree: 'Master — Digital Business',
      modules: ['Marketing', 'SEO', 'HTML/CSS', 'JavaScript'],
    },
    {
      school: 'Paris School of Business',
      period: '2019 – 2022',
      degree: 'Bachelor — Start-up & business development',
      modules: ['Communication', 'Marketing', 'Finance', 'Management'],
    },
  ],

  tools: ['Figma', 'Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'WordPress', 'Microsoft Office'],
  languages: [
    { name: 'French', level: 'Native' },
    { name: 'English', level: 'Intermediate' },
  ],
}
