import { NextResponse } from "next/server";
import { ZodError } from "zod";

type Handler = (req: Request) => Promise<NextResponse>;

export function withErrorHandling(handler: Handler): Handler {
    return async (req) => {
        try {
            return await handler(req);
        } catch (ex) {
            if (ex instanceof ZodError) {
                const errors = JSON.parse(ex.message);
                return NextResponse.json(
                    { errors: errors },
                    { status: 400 }
                );
            }

            if (ex instanceof SyntaxError
                && ex.message.includes("Unexpected end of JSON input")) {
                return NextResponse.json(
                    { error: "Invalid or missing JSON body" },
                    { status: 400 }
                );
            }

            console.error("Unexpected error:", ex);
            return NextResponse.json(
                { error: "Internal Server Error" },
                { status: 500 }
            );
        }
    };
}

export function okResponse() {
    return new NextResponse(null, { status: 200 });
}