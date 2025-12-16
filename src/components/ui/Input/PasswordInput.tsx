import React, { useState } from 'react';

type PasswordInputProps =
    React.InputHTMLAttributes<HTMLInputElement>;

export function PasswordInput({
                                  className = '',
                                  ...props
                              }: PasswordInputProps): React.ReactElement {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative w-full">
            <input
                type={visible ? 'text' : 'password'}
                className={`w-full rounded-xl border border-gray-300 px-4 py-2 pr-10 text-sm focus:border-black focus:outline-none ${className}`}
                {...props}
            />

            <button
                type="button"
                onClick={() => setVisible(!visible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
                {visible ? '🙈' : '👁'}
            </button>
        </div>
    );
}
