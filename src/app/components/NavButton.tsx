// NavButton.jsx
import React from "react";

type NavButtonProps = {
    label: string;
    ariaLabel: string;
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
            className={`flex ${props.bSelected ? "selected" : ""}`}
        >
            {props.children}
            <p className="content-center pl-5">{props.label}</p>
        </button>
    );
};
