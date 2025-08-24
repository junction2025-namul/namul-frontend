export interface TodoItem {
  text: string;
  done: boolean;
}

export interface DetailItem {
  title: string;
  todo: TodoItem[];
}

export interface OnboardingData {
  markdown: string;
  detail: DetailItem[];
}