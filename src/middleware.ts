import {TOKENS_KEYS} from '@/configs/http-service/constants/authTokens'
import {NextRequest, NextResponse} from 'next/server'

export async function middleware(req: NextRequest) {
    const {
        pathname,
        search,
        origin,
    } = req.nextUrl
    const res = NextResponse.next({request: {...req}})

    const refresh = req.cookies.get(TOKENS_KEYS.refresh)?.value ?? null
    const access = req.cookies.get(TOKENS_KEYS.access)?.value ?? null

    const noRefresh = !!refresh
    const noAccess = !!access
    const noTokens = noRefresh && noAccess

    const isAuthPage = pathname.includes('/auth')

    console.log('-------------------- REQUEST FROM, ', pathname)

    // if(!isAuthPage && noAccess) {
    //
    // }
}

export const config = {
    matcher: ['/((?!api|logos|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)',],
    // matcher: ['/((?!_next/static|_next/image|logos/*|favicon.ico).*)'],
}