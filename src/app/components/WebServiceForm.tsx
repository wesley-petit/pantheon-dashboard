'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import Image from "next/image";
import { WebService, WebServiceFormData } from "@/app/dto/webservice";
import FilterableIconList, { ImageFormat } from "./FilterableIconList";
import { uploadMedia } from "@/app/lib/api/medias";
import { withToast } from "@/app/lib/withToast";
import "@/app/styles/file-upload.css";

type RawFormData = {
    id: number | null;
    name: string;
    url: string;
    thumbnail: FileList | null;
}

type WebServiceFormProps = {
    defaultWebService: WebService | null,
    onSubmit: (formData: WebServiceFormData) => Promise<void>
};

export default function WebServiceForm(props: WebServiceFormProps) {
    const [file, setFile] = useState<File | null>(null);
    const [iconUrl, setIconUrl] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(props.defaultWebService?.thumbnailPath ?? null);

    const { register, handleSubmit, formState: { errors } } = useForm<RawFormData>({
        defaultValues: {
            id: props.defaultWebService?.id,
            name: props.defaultWebService?.name,
            url: props.defaultWebService?.url,
            thumbnail: null
        }
    });

    const onSubmit = async (data: RawFormData) => {
        const thumbnailPath = await getThumbnailPath();
        const formatted: WebServiceFormData = {
            id: data.id,
            name: data.name.trim(),
            url: data.url.trim(),
            thumbnailPath: thumbnailPath
        };
        await props.onSubmit(formatted);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const selectedFile = e.target.files[0];
        setPreview(URL.createObjectURL(selectedFile));
        setFile(selectedFile);
        setIconUrl(null);
    };

    const handleIconSelect = (url: string) => {
        // Reset choices when we select the same icon a second time.
        const result = iconUrl === url ? null : url;
        setIconUrl(result);
        setFile(null);
        setPreview(result);
    }

    function hasValidContent(files: FileList | null): boolean {
        return (
            // Required if no default or uploaded files are provided
            props.defaultWebService?.thumbnailPath != null
            || iconUrl != null
            || (files != null && files.length > 0)
        );
    }

    async function getThumbnailPath(): Promise<string> {
        if (!file) {
            const result = iconUrl ?? props.defaultWebService?.thumbnailPath;
            if (!result) {
                toast.error("Undefined thumbnail")
                throw new Error("Undefined thumbnail");
            }
            return result;
        }

        const formData = new FormData();
        formData.append("file", file);
        const response = await withToast(() => uploadMedia(formData), "Upload successfully!");
        return response.fullPath;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <input
                type="text"
                placeholder="Name"
                className="bg-white rounded-md text-black/100 p-2 my-2"
                {...register("name", {
                    required: {
                        value: true,
                        message: "This field is required"
                    },
                    maxLength: {
                        value: 32,
                        message: "Your name must be at most 32 characters"
                    }
                })} />
            {errors.name && (
                <div className="text-red-500">{errors.name.message}</div>
            )}

            <input
                type="text"
                placeholder="URL"
                className="bg-white rounded-md text-black/100 p-2 my-2"
                {...register("url", {
                    required: {
                        value: true,
                        message: "This field is required"
                    },
                    maxLength: {
                        value: 128,
                        message: "Your name must be at most 128 characters"
                    }
                }
                )} />
            {errors.url && (
                <div className="text-red-500">{errors.url.message}</div>
            )}

            <FilterableIconList imageFormat={ImageFormat.SVG} maxElements={18} onSelect={handleIconSelect} />

            <div className="file-upload mt-4">
                {preview && (
                    <Image src={preview} alt="Thumbnail preview" width={64} height={64} className="block mx-auto my-4 object-contain" />
                )}
                <h3 className="font-bold uppercase">Upload</h3>
                <input
                    type="file"
                    {...register("thumbnail", {
                        validate: {
                            required: (files: FileList | null) =>
                                hasValidContent(files)
                                || "A thumbnail image is required",
                            fileType: (files: FileList | null) =>
                                hasValidContent(files)
                                || (files && files[0]?.type.startsWith("image/"))
                                || "Only image files are allowed"
                        }
                    })}
                    onChange={handleFileChange}
                />
            </div>
            {errors.thumbnail && (
                <div className="text-red-500">{errors.thumbnail.message}</div>
            )}

            <input type="hidden" {...register("id")} />
            <button type="submit" className="custom-button mt-4 px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            <Toaster />
        </form>
    );
}