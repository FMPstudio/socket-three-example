import React, { useState } from "react";

const Slider = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => {
  const [val, setVal] = useState(value);

  return (
    <input
      min={0.01}
      max={2.0}
      step={0.01}
      type="range"
      value={val}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        setVal(newValue);
        onChange(newValue);
      }}
    />
  );
};

export { Slider };
