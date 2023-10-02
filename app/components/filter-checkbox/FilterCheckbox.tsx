"use Client"

import React, {use, useEffect, useState} from "react";
import Checkbox from "../checkbox/Checkbox";

type FilterCheckboxProps = {
    label?: string;
    onChange?: ((checked: any) => void);
    value?: string;
    isChecked?: boolean;
    name?: string;
    };
const FilterCheckbox: React.FC<FilterCheckboxProps> = ({label, value, onChange, isChecked, name}) => {
    const [checked, setChecked] = useState(isChecked && isChecked || false);
    const [checkboxValue, setCheckboxValue] = useState(value);

    // useEffect(() => {
    //     setCheckboxValue(value);
    //     if(checkboxValue !== null && checkboxValue !== undefined){
    //         setChecked(true);
    //     }
    //     else{
    //         setChecked(false);
    //     }
    // }
    // , [value]);

  return (
        <div className={`w-max p-[1px] ${checked ? "bg-gradient-primary-500" : "bg-neutral-200" } rounded-[8px] flex items-center justify-center`}>
        <div className={`flex bg-white items-center gap-2 w-max p-2 rounded-[7px] border border-transparent cursor-pointer `} onClick={()=> setChecked(!checked)}>
            <Checkbox value={value} name={name} defaultCheck={checked} onChange={({ value, checked }) => {onChange && onChange({value:value, checked:checked})}}  />
            <p className="text-b2 text-neutral-500 select-none">{label}</p>
        </div>
        </div>
  );
};

export default FilterCheckbox;