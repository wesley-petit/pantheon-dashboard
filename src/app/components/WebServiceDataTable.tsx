'use client';

import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Image from "next/image";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { WebService } from "@/app/dto/webservice";

type WebServiceDataTableProps = {
    webServices: WebService[];
    onEdit: (service: WebService) => void;
    OnDelete: (service: WebService) => void;
    onSortArray: (services: WebService[]) => void;
};

export default function WebServiceDataTable(props: WebServiceDataTableProps) {
    const nameTemplate = (service: WebService) => {
        return (
            <span className="flex flex-row my-2">
                <Image src={service.thumbnailPath} alt={`${service.name} Logo`} width={32} height={32} className="object-contain" />
                <p className="content-center ml-4">{service.name}</p>
            </span>
        );
    };
    const urlTemplate = (service: WebService) => {
        return <a href={service.url} target="_blank" className="content-center underline">{service.url}</a>;
    };
    const buttonsTemplate = (service: WebService) => {
        return (
            <span>
                <button onClick={() => props.onEdit(service)} className="cursor-pointer px-2"><EditIcon /></button>
                <button onClick={() => props.OnDelete(service)} className="cursor-pointer px-2"><DeleteIcon /></button>
            </span>
        );
    };

    function reorderByIndex(services: WebService[]): WebService[] {
        return services.map((ws, index) => ({ ...ws, sortOrder: index + 1, }));
    }

    return (
        <DataTable value={props.webServices} reorderableColumns reorderableRows onRowReorder={(e) => props.onSortArray(reorderByIndex(e.value))} className="rounded-xl p-4 bg-white/10" >
            <Column rowReorder style={{ width: '2rem' }} />
            <Column header="NAME" body={nameTemplate}></Column>
            <Column header="URL" body={urlTemplate}></Column>
            <Column header="ACTIONS" body={buttonsTemplate}></Column>
        </DataTable>
    );
}