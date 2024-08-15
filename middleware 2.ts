import { NextRequest, NextResponse } from "next/server";


export function middleware(req:NextRequest){
    const res = NextResponse.next();

    const cookie = req.cookies.get("sessionid");
    if(!cookie){
        res.cookies.set("sessionid", crypto.randomUUID());
        
    }
    return res;
}