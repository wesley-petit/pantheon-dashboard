import { NextResponse } from "next/server";
import { withErrorHandling } from "@/app/api/apiHandler"
import database from "@/app/lib/database/database";

export const GET = withErrorHandling(async () => {
    // simple query to test DB connection
    database.prepare("SELECT 1").get();
    return NextResponse.json({
        status: "ok",
        database: "connected"
    });
});
