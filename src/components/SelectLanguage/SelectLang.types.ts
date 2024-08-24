interface ListProps {
  name: string;
  language: string;
}

export interface SelectLangProps {
  list: ListProps[];
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}
