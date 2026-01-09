import React from "react";

import { styleSheet } from "@/styles/Form";

export function ContentTable({
    content,
    table_map
}: {
    content: any[];
    table_map: {
        [label: string]: (r: any) => React.ReactNode
    }
}): React.ReactElement {

    const entries = Object.entries(table_map);

    return (
        <table className={styleSheet.tableStyles.TABLE}>
            <thead className={styleSheet.tableStyles.THEAD}>
                <tr
                    className={styleSheet.tableStyles.TR}
                >
                    {entries.map(([label]) => (
                        <th
                            key={label}
                            className={styleSheet.tableStyles.TH}
                        >
                            {label}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {content.map((row) => (
                    <tr
                        key={row.id}
                        className={styleSheet.tableStyles.TR}
                    >
                        {entries.map(([label, render]) => (
                            <td
                                key={label}
                                className={styleSheet.tableStyles.TD}
                            >
                                {render(row)}
                            </td>
                        ))}

                    </tr>
                ))}
            </tbody>
        </table>
    );
}