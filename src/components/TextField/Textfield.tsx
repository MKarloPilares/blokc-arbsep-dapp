import { ChangeEvent } from 'react';
import React from 'react';
import './Textfield.css';
import { Uint256 } from 'web3';


interface TextFieldProps {
    value: Uint256;
    onChange: (value: string) => void
    placeholder: string
}

const Textfield: React.FC<TextFieldProps> = ({value, onChange, placeholder}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    }
    return (
        <div>  
            <input className="textField" type='text' value={value} onChange={handleChange} placeholder={placeholder}/>
        </div>
    )
}

export default Textfield