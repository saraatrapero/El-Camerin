
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
