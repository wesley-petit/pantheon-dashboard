import { okResponse, withErrorHandling } from "@/app/api/apiHandler"
import database from "@/app/lib/database/database";
import { SortWebServicesRequestSchema, SortWebService } from "@/app/dto/webservice";

export const PATCH = withErrorHandling(async (req: Request) => {
    const request = SortWebServicesRequestSchema.parse(await req.json());
    const stmt = database.prepare("UPDATE webservices SET sortOrder = ? WHERE id = ?");
    const updateMany = database.transaction((items: SortWebService[]) => {
        for (const ws of items) {
            stmt.run(ws.sortOrder, ws.id);
        }
    });
    updateMany(request);
    return okResponse();
});
