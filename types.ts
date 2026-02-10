
export interface ImageState {
  original: string | null;
  edited: string | null;
  history: string[];
}

export interface EditRequest {
  image: string;
  prompt: string;
}

export interface Preset {
  id: string;
  label: string;
  prompt: string;
  icon: string;
}
