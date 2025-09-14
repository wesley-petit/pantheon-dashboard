'use client';

import { useState } from "react";
import NavBar from "@/app/components/NavBar";
import WebServiceIframe from "@/app/components/WebServiceIframe";
import { WebService } from "@/app/dto/webservice";
import { allWebServices } from "@/app/lib/placeholder-data";

export default function Home() {
  const [currentWebService, setCurrentWebService] = useState<WebService | null>(
    0 < allWebServices.length ? allWebServices[0] : null
  );

  return (
    <div className="font-sans h-full">
      <NavBar
        allWebServices={allWebServices}
        current={currentWebService}
        onSelect={setCurrentWebService}
      />
      <main className="h-full ml-15">
        {currentWebService != null && (<WebServiceIframe service={currentWebService}></WebServiceIframe>)}
      </main>
    </div >
  );
}
