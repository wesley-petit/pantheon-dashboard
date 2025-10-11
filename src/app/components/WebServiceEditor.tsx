'use client';

import { useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Toaster } from 'react-hot-toast';
import WebServiceForm from "@/app/components/WebServiceForm";
import WebServiceDataTable from "@/app/components/WebServiceDataTable";
import NavBar from "@/app/components/NavBar";
import SpringModal from '@/app/components/SpringModal';
import { WebService, WebServiceFormData, AddWebServiceArraySchema, AddWebServiceArrayRequest } from "@/app/dto/webservice";
import { addWebService, updateWebService, deleteWebService, sortWebServices, sortWebServicesLocally } from "@/app/lib/api/webservices";
import { withToast } from "@/app/lib/withToast";

type WebServiceEditorProps = {
    webServices: WebService[];
};

export default function WebServiceEditor(props: WebServiceEditorProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [modalState, setModalState] = useState<boolean>(false);
    const [webServices, setWebServices] = useState<WebService[]>(props.webServices);
    const [editWebServices, setEditWebServices] = useState<WebService | null>(null);

    const router = useRouter();

    function showForm(service: WebService | null) {
        setEditWebServices(service);
        setModalState(true);
    }

    function exportToJson() {
        const jsonString = JSON.stringify(webServices);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "dashboard-backup.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }

    async function importFromJson(file: File) {
        if (file.type !== "application/json" && !file.name.endsWith(".json"))
            throw new Error("Please select a valid JSON file.")

        const jsonString = await file.text();
        const parsedData = JSON.parse(jsonString);
        const inputWebServices = AddWebServiceArraySchema.parse(parsedData);

        if (inputWebServices.length === 0)
            throw new Error("No web services in the input file.");

        await deleteWebServices(webServices);
        setWebServices([]);
        await addWebServices(inputWebServices);
    };

    async function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        try {
            await withToast(() => importFromJson(file), "Import successfully !")
        }
        catch (ex) {
            e.target.files = null;
            throw ex;
        }
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

    async function addWebServices(newWebServices: AddWebServiceArrayRequest) {
        newWebServices.forEach(async (webService) => {
            const response = await addWebService({ ...webService });
            const newItem: WebService = {
                ...webService,
                id: response.id
            }
            setWebServices(prev => [...prev, newItem]);
        });
    }

    async function deleteWebServices(webServices: WebService[]) {
        webServices.forEach(async (webService) => {
            await deleteWebService(webService.id);
        });
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

            <main className="pb-12">
                <span className="flex flex-row items-center m-4">
                    <h2 className="font-bold uppercase">WebService Editor</h2>
                    <button onClick={() => showForm(null)} className='custom-button'><AddIcon /></button>
                    <button onClick={exportToJson} className='custom-button'><FileDownloadIcon /></button>
                    <button onClick={() => fileInputRef.current?.click()} className='custom-button'><FileUploadIcon /></button>
                </span>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImportFile}
                    accept=".json,application/json"
                />
                <SpringModal
                    open={modalState}
                    onClose={() => setModalState(false)}
                    className="rounded-xl w-md max-w-full shadow-2xl p-6 background"
                >
                    <WebServiceForm defaultWebService={editWebServices} onSubmit={onSubmit} />
                </SpringModal>
                <WebServiceDataTable webServices={webServices} onEdit={showForm} OnDelete={onDeleteWebService} onSortArray={onSortArray} />
            </main>
            <Toaster />
        </div>
    );
}
