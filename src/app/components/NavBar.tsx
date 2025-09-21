'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Squash as Hamburger } from "hamburger-react";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import NavButton from '@/app/components/NavButton';
import { WebService } from "@/app/dto/webservice";

type NavBarProps = {
    webServices: WebService[];
    current: WebService | null;
    bEditorMode: boolean;
    onSelect: (service: WebService) => void;
};

export default function NavBar(props: NavBarProps) {
    const [bFullWidth, setFullWidth] = useState(false);
    const router = useRouter();

    function isSelected(a: WebService | null, b: WebService) {
        if (a == null)
            return false;

        return a.id === b.id;
    }

    return (
        <nav className="flex flex-1 flex-col fixed h-full top-0 gap-2 p-2 z-10">
            <div>
                <Hamburger toggled={bFullWidth} size={20} toggle={setFullWidth} />
            </div>

            {props.webServices.map((service) => (
                <NavButton
                    key={`${service.name} nav`}
                    label={service.name}
                    ariaLabel={`Switch to ${service.name}`}
                    bFullWidth={bFullWidth}
                    bSelected={isSelected(props.current, service)}
                    onClick={() => {
                        props.onSelect(service);
                        setFullWidth(false);
                    }}
                >
                    <Image src={service.thumbnailPath} alt={`${service.name} Logo`} width={32} height={32} className="object-contain" />
                </NavButton>
            ))}

            <NavButton
                label="Home"
                ariaLabel="Home Page"
                bFullWidth={bFullWidth}
                bSelected={(!props.bEditorMode && props.current == null)}
                onClick={() => router.push('/')}
            >
                <HomeIcon width={32} height={32} />
            </NavButton>

            <NavButton
                label="Editor"
                ariaLabel="Editor Page"
                bFullWidth={bFullWidth}
                bSelected={props.bEditorMode}
                onClick={() => router.push('/editor')}
            >
                <SettingsIcon width={32} height={32} />
            </NavButton>
        </nav>
    );
}
