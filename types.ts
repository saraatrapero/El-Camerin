
export interface NavItem {
  label: string;
  href: string;
}

export interface GalleryImage {
  url: string;
  title: string;
  description: string;
}

export interface EventItem {
  date: string;
  title: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface InscripcionCarreta {
  id: string;
  fechaRegistro: string;
  nombreCarreta: string;
  presidente: string;
  jefeCarreta: string;
  mail: string;
  direccion: string;
  password?: string;
}

export interface Persona {
  id: string;
  fechaRegistro: string;
  tipo: 'socio' | 'caballista';
  nombre: string;
  dni: string;
  fechaNacimiento: string;
  tlf: string;
  email: string;
  password?: string;
  carretaId?: string;
  signature?: string; // Firma en formato base64
}

export type UserRole = 'admin' | 'carreta' | 'caballista' | 'guest';

export interface AuthSession {
  role: UserRole;
  name?: string;
  id?: string;
  data?: any;
}

export interface SiteContent {
  hero: {
    subtitle: string;
    title: string;
    description: string;
    bgImage: string;
  };
  history: {
    title: string;
    quote: string;
    p1: string;
    p2: string;
    image: string;
  };
  santuario: {
    title: string;
    description: string;
    quote: string;
    image: string;
  };
}
