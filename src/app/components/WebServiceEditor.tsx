'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddIcon from '@mui/icons-material/Add';
import WebServiceForm from "@/app/components/WebServiceForm";
import WebServiceDataTable from "@/app/components/WebServiceDataTable";
import NavBar from "@/app/components/NavBar";
import SpringModal from '@/app/components/SpringModal';
import { WebService, WebServiceFormData } from "@/app/dto/webservice";
import { addWebService, updateWebService, deleteWebService } from "@/app/lib/api/webservices";

type WebServiceEditorProps = {
    webServices: WebService[];
};

export default function WebServiceEditor(props: WebServiceEditorProps) {
    const [modalState, setModalState] = useState<boolean>(false);
    const [webServices, setWebServices] = useState<WebService[]>(props.webServices);
    const [editWebServices, setEditWebServices] = useState<WebService | null>(null);
    const router = useRouter();

    function showForm(service: WebService | null) {
        setEditWebServices(service);
        setModalState(true);
    }

    async function upsertWebService(params: WebServiceFormData) {
        if (params.id) {
            const newItem: WebService = {
                ...params,
                id: params.id,
            }
            await updateWebService({ ...newItem });
            setWebServices(prev => [...prev.filter(ws => ws.id !== newItem.id), newItem]);
        }
        else {
            const response = await addWebService({ ...params });
            const newItem: WebService = {
                ...params,
                id: response.id,
            }
            setWebServices(prev => [...prev, newItem]);
        }
        // Hide current form after we complete the request
        setModalState(false);
    }

    async function onDeleteWebService(service: WebService) {
        await deleteWebService(service.id);
        setWebServices(prev => prev.filter(ws => ws.id !== service.id));
    }

    return (
        <div className="font-sans h-full">
            <NavBar
                webServices={webServices}
                current={null}
                onSelect={(service: WebService) => { router.push(`/?id=${service.id}`) }}
                bEditorMode={true}
            />

            <main className="h-full ml-16">
                <span className="flex flex-row items-center m-4">
                    <h2 className="font-bold uppercase">WebService Editor</h2>
                    <button onClick={() => showForm(null)} className="cursor-pointer mx-2"><AddIcon /></button>
                </span>
                <SpringModal open={modalState} onClose={() => setModalState(false)} className="rounded-xl w-lg shadow-2xl p-8 bg-white/10">
                    <WebServiceForm defaultWebService={editWebServices} onSubmit={upsertWebService} />
                </SpringModal>
                <WebServiceDataTable webServices={webServices} onEdit={showForm} OnDelete={onDeleteWebService} />
            </main>
        </div>
    );
}
