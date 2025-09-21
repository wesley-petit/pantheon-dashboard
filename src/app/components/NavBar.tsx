'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Squash as Hamburger } from "hamburger-react";
import SettingsIcon from '@mui/icons-material/Settings';
import { WebService } from "@/app/dto/webservice";

type NavBarProps = {
    webServices: WebService[];
    current: WebService | null;
    bEditorMode: boolean;
    onSelect: (service: WebService) => void;
};

export default function NavBar({ webServices, current, onSelect, bEditorMode }: NavBarProps) {
    const [bFullWidth, setFullWidth] = useState(false);
    const router = useRouter();

    function isSelected(a: WebService | null, b: WebService) {
        if (a == null)
            return false;

        return a.url === b.url;
    }

    return (
        <nav className="flex flex-1 flex-col fixed h-full top-0 gap-2 p-2 z-10">
            <div>
                <Hamburger toggled={bFullWidth} size={20} toggle={setFullWidth} />
            </div>

            {webServices.map((service) => (
                <button
                    key={service.url}
                    title={service.name}
                    aria-label={`Switch to ${service.name}`}
                    onClick={() => {
                        onSelect(service);
                        setFullWidth(false);
                    }}
                    className={`flex mx-auto p-2 rounded cursor-pointer ${bFullWidth ? "min-w-60" : ""} ${isSelected(current, service) ? "selected" : ""}`}
                >
                    <Image src={service.thumbnailPath} alt={`${service.name} Logo`} width={32} height={32} />
                    {bFullWidth && (
                        <p className="content-center px-4">{service.name}</p>
                    )}
                </button>
            ))}


            <button
                key="editor"
                title="editor"
                aria-label={`WebServices Editor`}
                onClick={() => router.push('/editor')}
                className={`flex mx-auto p-2 rounded cursor-pointer center ${bFullWidth ? "min-w-60" : ""} ${bEditorMode ? "selected" : ""}`}
            >
                <SettingsIcon width={32} height={32} />
                {bFullWidth && (
                    <p className="content-center px-4">Editor</p>
                )}
            </button>
        </nav>
    );
}
