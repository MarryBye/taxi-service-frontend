export const styleSheet = {
    textStyles: {
        H1: "text-3xl font-bold text-gray-900",
        H2: "text-2xl font-semibold text-gray-900",
        H3: "text-xl font-semibold text-gray-800",
        H4: "text-lg font-semibold text-gray-800",

        DEFAULT: "text-base text-gray-900 leading-relaxed",
        PARAGRAPH: "text-base text-gray-700 leading-relaxed",
        LEAD: "text-lg text-gray-700 leading-relaxed",
        SMALL: "text-sm text-gray-600 leading-relaxed",
        XS: "text-xs text-gray-500",

        MUTED: "text-sm text-gray-400",
        SUBTLE: "text-sm text-gray-500 italic",

        BOLD: "font-semibold text-gray-900",
        STRONG: "font-bold text-gray-900",
        EMPHASIS: "text-blue-600 font-medium",

        LINK: "text-blue-600 hover:underline cursor-pointer",
        LINK_MUTED: "text-gray-500 hover:text-gray-700 underline-offset-2 hover:underline",
        LINK_NO_DECORATION: "text-gray-700 cursor-pointer hover:text-gray-900",

        ERROR: "text-sm text-red-600",
        SUCCESS: "text-sm text-green-600",
        WARNING: "text-sm text-yellow-600",
        INFO: "text-sm text-blue-600",

        CODE: "font-mono text-sm bg-gray-100 px-1 py-0.5 rounded",
    },

    contentStyles: {
        SECTION: "max-w-7xl mx-auto px-8 py-16",
        SECTION_LIGHT: "bg-gray-50 py-16",
        SECTION_NARROW: "max-w-4xl mx-auto px-8 py-16",

        TEXT_BLOCK: "max-w-3xl space-y-4",
        TEXT_BLOCK_WIDE: "max-w-4xl space-y-4",

        LIST: "list-disc pl-6 space-y-1 text-gray-700",
        LIST_COMPACT: "list-disc pl-5 space-y-0.5 text-sm text-gray-600",

        HIGHLIGHT:
            "rounded-lg bg-blue-50 border border-blue-100 p-4 text-blue-800",

        NOTE:
            "rounded-lg bg-gray-100 border border-gray-200 p-4 text-gray-700",

        QUOTE:
            "border-l-4 border-blue-500 pl-4 italic text-gray-700",

        DIVIDER:
            "my-10 border-gray-200"
    },

    layoutStyles: {
        PAGE: "min-h-screen flex flex-col",
        CENTERED: "flex items-center justify-center",
        STACK: "flex flex-col gap-6",
        GRID_3: "grid grid-cols-1 md:grid-cols-3 gap-10",
        GRID_2: "grid grid-cols-1 md:grid-cols-2 gap-10"
    },

    emphasisStyles: {
        BOX:
            "rounded-xl border border-gray-200 bg-white p-6 shadow-sm",

        BOX_ACCENT:
            "rounded-xl border border-blue-200 bg-blue-50 p-6",

        BOX_WARNING:
            "rounded-xl border border-yellow-200 bg-yellow-50 p-6",

        BOX_DANGER:
            "rounded-xl border border-red-200 bg-red-50 p-6"
    },

    containerStyles: {
        SMALL_CONTAINER: "flex flex-col gap-2",
        ROW: "flex flex-row gap-4 items-center",
        COLUMN: "flex flex-col gap-4 items-center",
        CARD:
            "flex flex-col gap-4 rounded-xl border border-gray-200 " +
            "bg-white p-6 shadow-sm",
        PAGE:
            "max-w-7xl mx-auto px-6 py-8",
        MODAL:
            "fixed inset-0 z-50 flex items-center justify-center bg-black/40",
        MODAL_CARD:
            "w-full max-w-lg rounded-xl bg-white p-6 shadow-lg",
        ROW_SMALL_GAP: "flex flex-row gap-1 items-center",
        COLUMN_SMALL_GAP: "flex flex-col gap-2 items-center",
    },

    inputStyles: {
        INPUT:
            "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm " +
            "text-gray-900 placeholder-gray-400 " +
            "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 " +
            "disabled:bg-gray-100 disabled:cursor-not-allowed",

        TEXTAREA:
            "w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm " +
            "text-gray-900 placeholder-gray-400 " +
            "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30",

        SELECT:
            "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm " +
            "text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30",

        RADIO:
            "h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500",

        CHECK:
            "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",

        BUTTON_PRIMARY:
            "inline-flex items-center justify-center rounded-lg " +
            "bg-blue-600 px-4 py-2 text-sm font-semibold text-white " +
            "hover:bg-blue-700 active:bg-blue-800 cursor-pointer " +
            "focus:outline-none focus:ring-2 focus:ring-blue-500/50 " +
            "disabled:bg-gray-400 disabled:cursor-not-allowed",

        BUTTON_SECONDARY:
            "inline-flex items-center justify-center rounded-lg border border-gray-300 " +
            "px-4 py-2 text-sm font-medium text-gray-700 " +
            "hover:bg-gray-100 cursor-pointer",

        BUTTON_WARNING:
            "inline-flex items-center justify-center rounded-lg " +
            "bg-yellow-500 px-4 py-2 text-sm font-semibold text-white " +
            "hover:bg-yellow-600 active:bg-yellow-700 cursor-pointer",

        BUTTON_DANGER:
            "inline-flex items-center justify-center rounded-lg " +
            "bg-red-600 px-4 py-2 text-sm font-semibold text-white " +
            "hover:bg-red-700 active:bg-red-800 cursor-pointer"
    },

    tableStyles: {
        TABLE: "w-full border-collapse",
        THEAD: "bg-gray-50",
        TH: "px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b",
        TD: "px-4 py-3 text-sm text-gray-900 border-b",
        TR: "hover:bg-gray-50",
        ACTIONS: "opacity-0 group-hover:opacity-100 transition"
    },

    otherStyles: {
        DIVIDER: "my-4 border-gray-200",
        LOADER:
            "h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
        BADGE:
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        BADGE_SUCCESS:
            "bg-green-100 text-green-700",
        BADGE_WARNING:
            "bg-yellow-100 text-yellow-700",
        BADGE_ERROR:
            "bg-red-100 text-red-700",
        EMPTY_STATE:
            "flex flex-col items-center justify-center text-gray-400 py-12"
    }
};