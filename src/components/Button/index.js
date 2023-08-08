import React from 'react';
import './style.css';

function Button({text,onClick,blue,disabled}) {
  return (
    <div 
    onClick={onClick} 
    className={blue ? "button button-blue" : "button"}
    disabled={disabled}
    > 
         {text}
    </div>
  )
}

export default Button