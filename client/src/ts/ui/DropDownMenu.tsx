import React, { useState } from "react";
import { Button } from "./index";

const DropDownMenu = ({
  name,
  options,
}: {
  name: string;
  options: Array<{ name: string; onClick: Function }>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  return (
    <div className="dropDownContainer">
      <header onClick={toggling}> {name} </header>
      {isOpen && (
        <div className="dropDownListContainer">
          <ul className="dropDownList">
            {options.map((option) => (
              <Button text={option.name} onClick={option.onClick} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { DropDownMenu };
