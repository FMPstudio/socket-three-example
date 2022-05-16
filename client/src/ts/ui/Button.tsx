import React from "react";

const Button = ({ text, onClick }: { text: string; onClick: Function }) => {
  return (
    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick(e)}>
      {text}
    </button>
  );
};

export { Button };
