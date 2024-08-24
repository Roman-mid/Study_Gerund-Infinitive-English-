export interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
}
