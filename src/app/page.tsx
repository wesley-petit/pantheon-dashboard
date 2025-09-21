import WebServiceViewer from "@/app/components/WebServiceViewer";
import { getWebServices } from "@/app/lib/api/webservices";

export default async function Home() {
  const webServices = await getWebServices();
  return (<WebServiceViewer webServices={webServices} />);
}
