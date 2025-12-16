import React from 'react';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({
                             className = '',
                             ...props
                         }: TextAreaProps): React.ReactElement {
    return (
        <textarea
            className={`w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-black focus:outline-none ${className}`}
            {...props}
        />
    );
}
