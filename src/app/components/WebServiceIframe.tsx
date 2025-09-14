'use client';

import { useRef } from "react";
import CachedIcon from '@mui/icons-material/Cached';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { WebService } from "@/app/dto/webservice";

export default function WebServiceIframe({ service }: { service: WebService }) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    function reloadIframe() {
        if (iframeRef.current) {
            try {
                // Works only for same-origin URLs
                iframeRef.current.contentWindow?.location.reload();
            } catch (e) {
                // Fallback: reset src (works for cross-origin)
                iframeRef.current.src = service.url;
            }
        }
    }

    return (
        <div className="h-full w-full">
            <div className="text-right m-4">
                <button className='cursor-pointer mr-4' onClick={reloadIframe}><CachedIcon /></button>
                <a href={service.url} target='blank'><ArrowOutwardIcon /></a>
            </div>
            <iframe
                allow="clipboard-read; clipboard-write; camera; microphone; speaker-selection; encrypted-media; web-share; display-capture; autoplay; fullscreen; picture-in-picture"
                sandbox="allow-presentation allow-forms allow-same-origin allow-orientation-lock allow-pointer-lock allow-scripts allow-popups allow-popups-to-escape-sandbox allow-modals allow-top-navigation allow-top-navigation-by-user-activation allow-downloads"
                className="h-full w-full"
                ref={iframeRef}
                src={service.url}>
            </iframe>
        </div>
    )
}