export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
  description: string;
  modelUrl?: string; // Optional URL for GLB/GLTF/OBJ file
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface NavItem {
  label: string;
  href: string;
}