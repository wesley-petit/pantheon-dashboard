import WebServiceEditor from "@/app/components/WebServiceEditor";
import { getWebServices, sortWebServicesLocally } from "@/app/lib/api/webservices";

export default async function Editor() {
    const webServices = sortWebServicesLocally(await getWebServices());
    return (<WebServiceEditor webServices={webServices} />);
}
