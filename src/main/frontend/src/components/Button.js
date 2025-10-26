import React from 'react';
import './styles/Button.css';

function Button({ children, onClick, variant, disabled }) {
    const buttonClasses = variant ? `button ${variant}` : 'button';
    
    return (
        <button className={buttonClasses} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}

export default Button;