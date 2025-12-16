import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary';
};

export function Button({
                           variant = 'primary',
                           className = '',
                           ...props
                       }: ButtonProps): React.ReactElement {
    const base =
        'rounded-xl px-6 py-3 text-sm font-medium transition focus:outline-none';

    const variants = {
        primary: 'bg-black text-white hover:bg-gray-800',
        secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        />
    );
}
