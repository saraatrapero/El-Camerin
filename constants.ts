
import { NavItem, GalleryImage, EventItem, SiteContent } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Historia', href: '#historia' },
  { label: 'Inscripciones', href: '#inscripciones' },
  { label: 'Santuario', href: '#santuario' },
  { label: 'Romería', href: '#romeria' },
  { label: 'Galería', href: '#galeria' },
];

export const INITIAL_CONTENT: SiteContent = {
  hero: {
    subtitle: "Real Santuario de la Virgen de la Cabeza",
    title: "La Morenita",
    description: "Ocho siglos de fe, milagro y tradición en el corazón de Sierra Morena.",
    bgImage: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=1920"
  },
  history: {
    title: "Una Luz en la Sierra",
    quote: "En la soledad de la noche, el tañido de una campana rompió el silencio de las cumbres, guiando al pastor Juan de Rivas hacia lo inefable.",
    p1: "Nuestra Señora de la Cabeza no es solo una imagen; es la historia viva de un pueblo. Su aparición en el siglo XIII marcó el inicio de la devoción mariana más antigua de España.",
    p2: "La talla actual, de belleza bizantina y piel morena, es el centro de todas las miradas cada último domingo de abril.",
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800"
  },
  santuario: {
    title: "El Real Santuario",
    description: "Emplazado en lo más alto del Cerro del Cabezo, el Santuario es un faro espiritual para toda la provincia de Jaén. Un edificio que ha renacido de sus cenizas para albergar el tesoro más preciado de la sierra.",
    quote: "Virgen de la Cabeza, Reina de Sierra Morena, a tus plantas me tienes, líbrame de toda pena.",
    image: "https://images.unsplash.com/photo-1548107931-df291c953335?auto=format&fit=crop&q=80&w=1000"
  }
};

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1590424669408-963dfd44f6f7?auto=format&fit=crop&q=80&w=1200',
    title: 'Arquitectura Sacra',
    description: 'La sobriedad y grandeza del Santuario en la cima del Cerro.'
  },
  {
    url: 'https://images.unsplash.com/photo-1544154447-98317a3a992d?auto=format&fit=crop&q=80&w=1200',
    title: 'Iconografía Mariana',
    description: 'Detalle de la orfebrería y mantos bordados que visten a la Morenita.'
  },
  {
    url: 'https://images.unsplash.com/photo-1516483642775-9a3dcad8c98c?auto=format&fit=crop&q=80&w=1200',
    title: 'Sierra Morena',
    description: 'El entorno indómito de encinas donde ocurrió el milagro de la aparición.'
  },
  {
    url: 'https://images.unsplash.com/photo-1563297058-29367c376136?auto=format&fit=crop&q=80&w=1200',
    title: 'Caballistas en el Camino',
    description: 'Tradición y nobleza ecuestre cruzando los senderos hacia el Cabezo.'
  },
  {
    url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200',
    title: 'Fervor Popular',
    description: 'La multitud que acompaña a la Virgen en su procesión de domingo.'
  },
  {
    url: 'https://images.unsplash.com/photo-1555436169-20e93ea9a7ff?auto=format&fit=crop&q=80&w=1200',
    title: 'Las Banderas',
    description: 'El vuelo de las banderas de las cofradías saludando a la Patrona.'
  }
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    date: '27 de Abril, 2025',
    title: 'Solemne Romería de la Morenita',
    description: 'La fiesta más antigua de España en honor a la Reina de Sierra Morena.'
  },
  {
    date: '11 de Agosto, 2025',
    title: 'Aniversario de la Aparición',
    description: 'Conmemoración del encuentro milagroso con el pastor Juan de Rivas.'
  },
  {
    date: 'Octubre, 2024',
    title: 'Peregrinación de los Mayores',
    description: 'Jornada dedicada a los devotos veteranos de la Cofradía Matriz.'
  }
];
