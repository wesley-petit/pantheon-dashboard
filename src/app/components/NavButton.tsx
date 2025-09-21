// NavButton.jsx
import React from "react";

type NavButtonProps = {
    label: string;
    ariaLabel: string;
    bFullWidth: boolean;
    bSelected: boolean;
    children: React.ReactElement<any>;
    onClick: () => void;
};

export default function NavButton(props: NavButtonProps) {
    return (
        <button
            title={props.label}
            aria-label={props.ariaLabel}
            onClick={props.onClick}
            className={`flex mx-auto p-2 rounded cursor-pointer center
        ${props.bFullWidth ? "min-w-60" : ""}
        ${props.bSelected ? "selected" : ""}`}
        >
            {props.children}
            {props.bFullWidth && (
                <p className="content-center px-4">{props.label}</p>
            )}
        </button>
    );
};
