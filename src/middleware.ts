import {TOKENS_KEYS} from '@/configs/http-service/constants/authTokens'
import {NextRequest, NextResponse} from 'next/server'

export async function middleware(req: NextRequest) {
    const {
        pathname,
        search,
        origin,
    } = req.nextUrl
    const res = NextResponse.next({request: {...req}})

    console.log('-------------------- REQUEST FROM, ', pathname)
}

export const config = {
    matcher: ['/((?!api|logos|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)',],
    // matcher: ['/((?!_next/static|_next/image|logos/*|favicon.ico).*)'],
}