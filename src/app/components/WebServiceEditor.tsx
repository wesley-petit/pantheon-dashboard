'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddIcon from '@mui/icons-material/Add';
import { Toaster } from 'react-hot-toast';
import WebServiceForm from "@/app/components/WebServiceForm";
import WebServiceDataTable from "@/app/components/WebServiceDataTable";
import NavBar from "@/app/components/NavBar";
import SpringModal from '@/app/components/SpringModal';
import { WebService, WebServiceFormData } from "@/app/dto/webservice";
import { addWebService, updateWebService, deleteWebService, sortWebServices, sortWebServicesLocally } from "@/app/lib/api/webservices";
import { withToast } from "@/app/lib/withToast";

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
                sortOrder: webServices.find((ws) => ws.id === params.id)?.sortOrder ?? 0,
            }
            await updateWebService({ ...newItem });
            const temp = [...webServices.filter(ws => ws.id !== newItem.id), newItem];
            setWebServices(sortWebServicesLocally(temp));
        }
        else {
            const response = await addWebService({ ...params, sortOrder: webServices.length });
            const newItem: WebService = {
                ...params,
                id: response.id,
                sortOrder: webServices.length
            }
            setWebServices(prev => [...prev, newItem]);
        }
        // Hide current form after we complete the request
        setModalState(false);
    }

    async function onSubmit(params: WebServiceFormData) {
        await withToast(() => upsertWebService(params));
    };

    async function onDeleteWebService(service: WebService) {
        await withToast(() => deleteWebService(service.id), "Delete successfully!");
        setWebServices(prev => prev.filter(ws => ws.id !== service.id));
    }

    async function onSortArray(services: WebService[]) {
        await withToast(() => sortWebServices(services), "Sort successfully!");
        setWebServices(services);
    }

    return (
        <div className="font-sans">
            <NavBar
                webServices={webServices}
                current={null}
                onSelect={(service: WebService) => { router.push(`/?id=${service.id}`) }}
                bEditorMode={true}
            />

            <main className="mx-16 mb-12">
                <span className="flex flex-row items-center m-4">
                    <h2 className="font-bold uppercase">WebService Editor</h2>
                    <button onClick={() => showForm(null)} className='custom-button'><AddIcon /></button>
                </span>
                <SpringModal open={modalState} onClose={() => setModalState(false)} className="rounded-xl w-lg shadow-2xl p-8 background">
                    <WebServiceForm defaultWebService={editWebServices} onSubmit={onSubmit} />
                </SpringModal>
                <WebServiceDataTable webServices={webServices} onEdit={showForm} OnDelete={onDeleteWebService} onSortArray={onSortArray} />
            </main>
            <Toaster />
        </div>
    );
}
