import React from 'react';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({
                               className = '',
                               ...props
                           }: IconButtonProps): React.ReactElement {
    return (
        <button
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition ${className}`}
            {...props}
        />
    );
}
