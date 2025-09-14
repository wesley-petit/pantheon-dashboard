'use client';

import { useState } from "react";
import Image from "next/image";
import { Squash as Hamburger } from "hamburger-react";
import { WebService } from "@/app/dto/webservice";

type NavBarProps = {
    webServices: WebService[];
    current: WebService | null;
    onSelect: (service: WebService) => void;
};

export default function NavBar({ webServices, current, onSelect }: NavBarProps) {
    const [bOpen, setOpen] = useState(false);

    function isSelected(a: WebService | null, b: WebService) {
        if (a == null)
            return false;

        return a.url === b.url;
    }

    return (
        <nav className="flex flex-1 flex-col fixed h-full top-0 gap-2 p-2">
            <div>
                <Hamburger toggled={bOpen} size={20} toggle={setOpen} />
            </div>

            {webServices.map((service) => (
                <button
                    key={service.url}
                    aria-label={`Switch to ${service.name}`}
                    onClick={() => {
                        onSelect(service);
                        setOpen(false);
                    }}
                    className={`flex p-2 rounded cursor-pointer ${bOpen ? "min-w-60" : ""} ${isSelected(current, service) ? "selected" : ""}`}
                >
                    <Image src={service.image_path} alt={`${service.name} Logo`} width={32} height={32} />
                    {bOpen && (
                        <p className="content-center pl-4 pr-4">{service.name}</p>
                    )}
                </button>
            ))}
        </nav>
    );
}
