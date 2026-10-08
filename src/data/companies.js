// The 3 companies I worked for, shown at the bottom left of the hero.
// Logos are in src/assets/logos (single dark color — the hero shows them in gray)
// `size`: height classes, tuned per logo so they look visually balanced
import allianz from '../assets/logos/allianz.svg'
import legrand from '../assets/logos/legrand.svg'
import cliking from '../assets/logos/cliking.svg'

export const companies = [
  { name: 'Allianz', logo: allianz, size: 'h-[1.0625rem] md:h-[1.7rem]' },
  { name: 'Legrand', logo: legrand, size: 'h-[1.02rem] md:h-[1.6rem]' },
  { name: 'Cliking', logo: cliking, size: 'h-[1.1rem] md:h-[1.8rem]' },
]
