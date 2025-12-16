import React from 'react';

type WarningAlertProps = {
    title?: string;
    message: string;
};

export function WarningAlert({
                                 title = 'Внимание',
                                 message,
                             }: WarningAlertProps): React.ReactElement {
    return (
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4">
            <p className="font-semibold text-yellow-800">{title}</p>
            <p className="mt-1 text-sm text-yellow-700">{message}</p>
        </div>
    );
}
