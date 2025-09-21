import WebServiceEditor from "@/app/components/WebServiceEditor";
import { getWebServices } from "@/app/lib/api/webservices";

export default async function Editor() {
    const webServices = await getWebServices();
    return (<WebServiceEditor webServices={webServices} />);
}
