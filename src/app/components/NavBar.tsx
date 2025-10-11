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
        <header className="fixed top-0 right-0 z-1 mr-2" style={{ scrollbarWidth: "none" }}>
            <nav className={`${bFullWidth ? "open" : ""} overflow-y-scroll flex flex-col fixed top-0 h-full w-50 pt-8 background rounded-tl-xl rounded-bl-xl`}>
                <NavButton
                    label="Home"
                    ariaLabel="Home Page"
                    bSelected={(!props.bEditorMode && props.current == null)}
                    onClick={() => router.push('/')}
                >
                    <HomeIcon width={32} height={32} className="object-contain" />
                </NavButton>

                <NavButton
                    label="Editor"
                    ariaLabel="Editor Page"
                    bSelected={props.bEditorMode}
                    onClick={() => router.push('/editor')}
                >
                    <SettingsIcon width={32} height={32} className="object-contain" />
                </NavButton>

                {props.webServices.map((service) => (
                    <NavButton
                        key={`service ${service.id}`}
                        label={service.name}
                        ariaLabel={`Switch to ${service.name}`}
                        bSelected={isSelected(props.current, service)}
                        onClick={() => {
                            props.onSelect(service);
                            setFullWidth(false);
                        }}
                    >
                        <Image src={service.thumbnailPath} alt={`${service.name} Logo`} width={30} height={30} className="object-contain" />
                    </NavButton>
                ))}
            </nav>

            <Hamburger
                toggled={bFullWidth}
                size={20}
                toggle={setFullWidth}
            />
        </header>
    );
}
