import { useEffect, useState } from "react";
import React from "react";

const ColorPicker = ({
        value,
        onChange,
    } : {
        value:string ,
        onChange: (v: string) => void;
    })=>{
    const [val, setCol] = useState(value);

    useEffect(()=>{
        onChange(val);
    }, [val]);
   
    return  (
        <input
            type = "color"
            value={val}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newColor = e.target.value
                setCol(newColor)
            }}
        />

    )

    

}

export { ColorPicker }