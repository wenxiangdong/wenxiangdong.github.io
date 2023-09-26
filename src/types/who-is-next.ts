export enum Color {
  C1,
  C2,
  C3,
  C4,
  C5,
}
export interface Option {
  value: string;
  color: Color;
}
export interface Question {
  id: string;
  title: string;
  options: Option[];
  currentOption: string;
}