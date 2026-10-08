// Content of the About section — based on the resume (CV Tom Santoni).

// Link of the "full experience" page (resume) — page to be created later
export const EXPERIENCE_URL = '/experience'

export const about = {
  // Short intro — the words in `highlight` are shown in orange
  intro: {
    text: "I'm Tom, a product designer based in Paris. I design digital products that are",
    highlight: 'simple, useful and pleasant to use.',
  },
  body: [
    'Most recently, as a Product Designer at Allianz, I designed and optimised the customer-area journeys used by 1.5 million people — through user tests and interviews, interactive prototypes, UX audits and co-design workshops.',
    'Before that, I was a UI designer at Legrand and a UX/UI designer at Cliking.',
  ],
  facts: [
    { label: 'Based in', entries: [{ value: 'Paris, France' }] },
    { label: 'Latest role', entries: [{ value: 'Product Designer', detail: 'Allianz · 2025–2026' }] },
    {
      label: 'Education',
      entries: [
        { value: 'UI Designer program', detail: 'GOBELINS Paris · 2025–2026' },
        { value: 'Master in Digital Business', detail: 'Paris School of Business · 2022–2024' },
      ],
    },
  ],
  expertise: ['User testing & interviews', 'Interactive prototyping', 'UI design'],
}
