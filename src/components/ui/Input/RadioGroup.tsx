import React from 'react';

type Option = {
    label: string;
    value: string;
};

type RadioGroupProps = {
    name: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
};

export function RadioGroup({
                               name,
                               options,
                               value,
                               onChange,
                           }: RadioGroupProps): React.ReactElement {
    return (
        <div className="flex flex-col gap-2">
            {options.map((opt) => (
                <label
                    key={opt.value}
                    className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                >
                    <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={value === opt.value}
                        onChange={() => onChange(opt.value)}
                        className="accent-black"
                    />
                    {opt.label}
                </label>
            ))}
        </div>
    );
}
