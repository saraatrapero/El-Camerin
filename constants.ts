
import { NavItem, GalleryImage, EventItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Historia', href: '#historia' },
  { label: 'Santuario', href: '#santuario' },
  { label: 'Romería', href: '#romeria' },
  { label: 'Galería', href: '#galeria' },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    url: 'https://picsum.photos/seed/santuario-cabezo-1/1200/800',
    title: 'El Real Santuario',
    description: 'La majestuosa basílica coronando el cerro del Cabezo en plena Sierra Morena.'
  },
  {
    url: 'https://picsum.photos/seed/morenita-altar/1200/800',
    title: 'La Morenita',
    description: 'Primer plano de la sagrada imagen de Nuestra Señora de la Cabeza en su camarín.'
  },
  {
    url: 'https://picsum.photos/seed/romeria-banderas/1200/800',
    title: 'Banderas de Cofradías',
    description: 'El colorido de las cientos de cofradías filiales llegando al santuario.'
  },
  {
    url: 'https://picsum.photos/seed/peregrinos-caballo/1200/800',
    title: 'Camino por la Sierra',
    description: 'Peregrinos y caballistas cruzando los senderos del Parque Natural.'
  },
  {
    url: 'https://picsum.photos/seed/campana-aparicion/1200/800',
    title: 'La Campana de Juan de Rivas',
    description: 'Símbolo del milagro de la aparición al pastor de Colomera.'
  },
  {
    url: 'https://picsum.photos/seed/noche-cerro/1200/800',
    title: 'Vigilia en el Cerro',
    description: 'La devoción que ilumina la noche del último sábado de abril.'
  }
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    date: '27 de Abril, 2025',
    title: 'Solemne Romería de la Morenita',
    description: 'El día grande con la procesión de la Virgen por las calzadas del cerro.'
  },
  {
    date: '11 de Agosto, 2025',
    title: 'Noche de la Aparición',
    description: 'Conmemoración del encuentro milagroso en 1227 con misa de campaña.'
  },
  {
    date: 'Octubre, 2024',
    title: 'Peregrinación Blanca',
    description: 'Día dedicado a los enfermos y mayores ante la planta de la Virgen.'
  }
];
