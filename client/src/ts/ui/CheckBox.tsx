import React, { useState } from "react";

const CheckBox = ({
  checked,
  onChange,
  name,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  name: string
}) => {
  const [val, setVal] = useState(checked);

  return (
      <div color="#ff0000">
    <input
      type="checkbox"
      checked={val}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.checked;
        setVal(newValue);
        onChange(newValue);
      }}
    />
    {name}
    </div>
  );
};

export {CheckBox}
