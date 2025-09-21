import WebServiceViewer from "@/app/components/WebServiceViewer";
import { getWebServices, sortWebServicesLocally } from "@/app/lib/api/webservices";

export default async function Home() {
  const webServices = sortWebServicesLocally(await getWebServices());
  return (<WebServiceViewer webServices={webServices} />);
}
