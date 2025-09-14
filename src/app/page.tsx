import WebServiceDashboard from "@/app/components/WebServiceDashboard";
import { getWebServices } from "@/app/lib/api/webservices";

export default async function Home() {
  const webServices = await getWebServices();
  return (<WebServiceDashboard webServices={webServices} />);
}
