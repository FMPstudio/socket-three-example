import React, { useEffect, useState } from "react";

const NumberInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => {
  const [val, setVal] = useState(value);

  useEffect(() => {
    onChange(val);
  }, [val]);

  return (
    <input
      type="number"
      step={0.1}
      value={val}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        setVal(newValue);
      }}
    />
  );
};

export { NumberInput };
