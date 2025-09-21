import { z } from "zod";

export type WebService = {
    id: number;
    name: string;
    url: string;
    thumbnailPath: string;
    sortOrder: number;
};

export type WebServiceFormData = {
    id: number | null;
    name: string;
    url: string;
    thumbnailPath: string;
}

export const AddWebServiceRequestSchema = z.object({
    name: z.string().min(1).max(32),
    url: z.string().url().min(1).max(128),
    thumbnailPath: z.string().min(1).max(128),
    sortOrder: z.number().nonnegative(),
});
export type AddWebServiceRequest = z.infer<typeof AddWebServiceRequestSchema>;
export type AddWebServiceResponse = {
    id: number;
}

export const UpdateWebServiceRequestSchema = z.object({
    id: z.number(),
    name: z.string().min(1).max(32),
    url: z.string().url().min(1).max(128),
    thumbnailPath: z.string().min(1).max(128),
    sortOrder: z.number().nonnegative(),
});
export type UpdateWebServiceRequest = z.infer<typeof UpdateWebServiceRequestSchema>;

export const DeleteWebServiceRequestSchema = z.object({
    id: z.number()
});
export type DeleteWebServiceRequest = z.infer<typeof DeleteWebServiceRequestSchema>;

const SortWebServiceSchema = z.object({
    id: z.number(),
    sortOrder: z.number().nonnegative(),
});
export type SortWebService = z.infer<typeof SortWebServiceSchema>;
export const SortWebServicesRequestSchema = z.array(SortWebServiceSchema);
export type SortWebServicesRequest = z.infer<typeof SortWebServicesRequestSchema>;
