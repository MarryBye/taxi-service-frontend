import React from 'react';

type Option = {
    label: string;
    value: string;
};

type MultiCheckboxProps = {
    options: Option[];
    value: string[];
    onChange: (value: string[]) => void;
};

export function MultiCheckbox({
                                  options,
                                  value,
                                  onChange,
                              }: MultiCheckboxProps): React.ReactElement {
    const toggle = (val: string) => {
        if (value.includes(val)) {
            onChange(value.filter((v) => v !== val));
        } else {
            onChange([...value, val]);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            {options.map((opt) => (
                <label
                    key={opt.value}
                    className="flex items-center gap-2 text-sm text-gray-700"
                >
                    <input
                        type="checkbox"
                        checked={value.includes(opt.value)}
                        onChange={() => toggle(opt.value)}
                        className="accent-black"
                    />
                    {opt.label}
                </label>
            ))}
        </div>
    );
}
