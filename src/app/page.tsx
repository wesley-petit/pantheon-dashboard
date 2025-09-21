import WebServiceViewer from "@/app/components/WebServiceViewer";
import { getWebServices, sortWebServices } from "@/app/lib/api/webservices";

export default async function Home() {
  const webServices = sortWebServices(await getWebServices());
  return (<WebServiceViewer webServices={webServices} />);
}
