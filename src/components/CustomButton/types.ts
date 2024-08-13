export interface PropsButton {
  img: string;
  addClass?: string;
  onClick(e?: React.MouseEvent<HTMLElement>): void;
  disabled: boolean;
}
