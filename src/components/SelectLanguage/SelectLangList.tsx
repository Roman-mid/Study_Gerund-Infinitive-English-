import React from "react";
import { SelectLangProps } from "./SelectLang.types";

const SelectLangList: React.FC<SelectLangProps> = ({
  list,
  inputValue,
  onClick,
  onChange,
}) => {
  const filteredanguages = list.filter((lang) =>
    lang.name.toLowerCase().includes(inputValue.toLocaleLowerCase())
  );
  const selectLanguege = filteredanguages.map((obj, ind) => (
    <li
      key={ind}
      data-value={JSON.stringify(obj)}
      className="langItem"
      onClick={onClick}
    >
      {obj.name}
    </li>
  ));
  return (
    <div className="chooseLangWrap">
      <input type="text" className="input" onChange={onChange} />
      <ul className="langList">{selectLanguege}</ul>
    </div>
  );
};

export default SelectLangList;
