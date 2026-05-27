export interface FileWithMeta {
  file: File;
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  pageCount?: number;
  error?: string;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Tool {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  path: string;
  icon: string;
  color: string;
  seoTitle: string;
  seoDesc: string;
  faqs: FAQItem[];
}
