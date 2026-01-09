import React from "react";

import { styleSheet } from "@/styles/Form";

export function LoaderBlock(): React.ReactElement {

    return (
        <div
            className="flex items-center justify-center w-full h-full flex items-center justify-center"
        >
            <div className={styleSheet.otherStyles.LOADER}/>
        </div>
    );
}