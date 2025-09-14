'use client';

import { useState } from "react";
import NavBar from "@/app/components/NavBar";
import WebServiceIframe from "@/app/components/WebServiceIframe";
import { WebService } from "@/app/dto/webservice";

type WebServiceDashboardProps = {
  webServices: WebService[];
};

export default function WebServiceDashboard({ webServices }: WebServiceDashboardProps) {
  const [currentWebService, setCurrentWebService] = useState<WebService | null>(
    0 < webServices.length ? webServices[0] : null
  );

  return (
    <div className="font-sans h-full">
      <NavBar
        webServices={webServices}
        current={currentWebService}
        onSelect={setCurrentWebService}
      />
      <main className="h-full ml-15">
        {currentWebService != null && (<WebServiceIframe service={currentWebService}></WebServiceIframe>)}
      </main>
    </div>
  );
}