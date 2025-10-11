'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import Iframe from "@/app/components/Iframe";
import { WebService } from "@/app/dto/webservice";

type WebServiceViewer = {
  webServices: WebService[];
};

export default function WebServiceDashboard({ webServices }: WebServiceViewer) {
  const searchParams = useSearchParams();
  const [currentWebService, setCurrentWebService] = useState<WebService | null>(getDefaultWebService(webServices, searchParams));

  function getDefaultWebService(webServices: WebService[], searchParams: URLSearchParams) {
    // Query parameters set by the WebServiceEditor
    const params = searchParams.get("id");
    if (params) {
      const id = parseInt(params, 10);
      const firstMatching = webServices.find(s => s.id === id);
      if (firstMatching) {
        return firstMatching;
      }
    }

    return 0 < webServices.length ? webServices[0] : null;
  }

  return (
    <div className="font-sans h-full">
      <NavBar
        webServices={webServices}
        current={currentWebService}
        onSelect={setCurrentWebService}
        bEditorMode={false}
      />
      <main className="h-full">
        {currentWebService != null && (<Iframe url={currentWebService.url}></Iframe>)}
      </main>
    </div>
  );
}