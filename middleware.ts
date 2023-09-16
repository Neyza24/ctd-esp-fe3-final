import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
    const access = req.cookies.get("Access");
    const url = req.nextUrl.pathname;

    const dev = process.env.NODE_ENV !== "production";
    const server = dev
        ? "http://localhost:3000"
        : "https://ctd-esp-fe3-final-neyza-vargas.vercel.app/";

    if (url.includes("CompraConfirmacion")) {
        if (!access) {
            return NextResponse.redirect(server);
        }
    }

};

middleware