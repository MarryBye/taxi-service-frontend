import React from 'react';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function TextInput({
                              className = '',
                              ...props
                          }: TextInputProps): React.ReactElement {
    return (
        <input
            type="text"
            className={`w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-black focus:outline-none ${className}`}
            {...props}
        />
    );
}
