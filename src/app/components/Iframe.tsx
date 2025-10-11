'use client';

import { useRef } from "react";
import CachedIcon from '@mui/icons-material/Cached';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function Iframe({ url }: { url: string }) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    function reloadIframe() {
        if (iframeRef.current) {
            try {
                // Works only for same-origin URLs
                iframeRef.current.contentWindow?.location.reload();
            } catch (e) {
                // Fallback: reset src (works for cross-origin)
                iframeRef.current.src = url;
            }
        }
    }

    return (
        <div className="h-full w-full overflow-hidden">
            <div className="text-left m-2">
                <button className='custom-button' onClick={reloadIframe}><CachedIcon /></button>
                <a className='custom-button' href={url} target='blank'><ArrowOutwardIcon /></a>
            </div>
            <iframe
                allow="clipboard-read; clipboard-write; camera; microphone; speaker-selection; encrypted-media; web-share; display-capture; autoplay; fullscreen; picture-in-picture"
                sandbox="allow-presentation allow-forms allow-same-origin allow-orientation-lock allow-pointer-lock allow-scripts allow-popups allow-popups-to-escape-sandbox allow-modals allow-top-navigation allow-top-navigation-by-user-activation allow-downloads"
                className="h-full w-full rounded-xl"
                ref={iframeRef}
                src={url}>
            </iframe>
        </div>
    )
}