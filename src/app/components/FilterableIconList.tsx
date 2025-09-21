'use client';

import { useState, useEffect, useRef, ChangeEvent } from "react";
import Image from "next/image";

export enum ImageFormat {
    WebP = 'webp',
    SVG = 'svg',
    PNG = 'png',
}

type FilterableIconListProps = {
    maxElements: number;
    imageFormat: ImageFormat;
    onSelect: (url: string) => void;
};

interface Icon {
    filename: string;
    displayName: string;
}

export default function FilterableIconList(props: FilterableIconListProps) {
    const [filteredIcons, setFilteredIcons] = useState<Icon[]>([]);
    const [searchItem, setSearchItem] = useState<string | null>(null)
    const iconFilenamesRef = useRef<Icon[]>([]);
    // Rely on homarr-labs official icons : https://github.com/homarr-labs/dashboard-icons/tree/main
    const dashboardIconsCdn = "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons";

    useEffect(() => {
        fetchDashboardIconFilenames()
            .then(response => {
                response.sort();
                iconFilenamesRef.current = response.map((filename) => ({
                    filename,
                    displayName: getDisplayName(filename),
                }));
                updateFilteredIcons(searchItem);
            })
            .catch(err => console.log(err));
    }, []);

    async function fetchDashboardIconFilenames(): Promise<string[]> {
        const res = await fetch(`${dashboardIconsCdn}/tree.json`, {
            method: "GET"
        });

        const data = await res.json();
        if (!res.ok) {
            console.log(data);
            throw new Error("Failed to fetch dashboard filteredIcons");
        }

        if (!(props.imageFormat in data)) {
            throw new Error(`Unsupported format ${props.imageFormat}`);
        }
        return data[props.imageFormat];
    }

    function getDisplayName(filename: string): string {
        return filename.replace("-", " ").split(".")[0]
    }

    function updateFilteredIcons(filter: string | null) {
        const result = getComputedFilteredIcons(filter).slice(0, props.maxElements);
        setFilteredIcons(result);
    }

    function getComputedFilteredIcons(filter: string | null): Icon[] {
        setSearchItem(filter)
        if (!filter || filter.length === 0) {
            return iconFilenamesRef.current ?? [];
        }

        const formatted = filter.replace("-", " ").toLowerCase();
        return iconFilenamesRef.current.filter((icon) =>
            icon.displayName.toLowerCase().includes(formatted)
        );
    }

    function getFullUrl(icon: Icon) {
        return `${dashboardIconsCdn}/${props.imageFormat}/${icon.filename}`;
    }

    return (
        <>
            <input
                type="text"
                value={searchItem ?? ''}
                onChange={(e) => updateFilteredIcons(e.target.value)}
                className="bg-white rounded-md text-black/100 p-2 my-4 w-full"
                placeholder="Search.."
            />

            <div className="flex flex-wrap w-full">
                {filteredIcons.map((item) => (
                    <button
                        type="button"
                        key={`${item.filename} button`}
                        onClick={() => props.onSelect(getFullUrl(item))}
                        className="cursor-pointer"
                    >
                        <Image
                            key={item.filename}
                            src={getFullUrl(item)}
                            alt={item.displayName}
                            width={48}
                            height={48}
                            className="object-contain align-top m-2"
                        />
                    </button>
                ))}
            </div>
        </>
    );
}