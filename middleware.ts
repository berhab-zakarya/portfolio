import { NextRequest, NextResponse } from 'next/server';

// Configuration constants
const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || 'https://berhabzakarya.studxptm.com/',
  AUTH: {
    REFRESH: '/auth/refresh',
  },
};

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

// Paths to protect
const PROTECTED_PATHS = ['/dashboard'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.debug(`[Middleware] Processing request for path: ${pathname}`);

  // Check if the request is for a protected path
  if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    console.debug(`[Middleware] Path ${pathname} is protected`);

    const accessToken = request.cookies.get(STORAGE_KEYS.ACCESS_TOKEN)?.value;
    const refreshToken = request.cookies.get(STORAGE_KEYS.REFRESH_TOKEN)?.value;
    console.debug(`[Middleware] Access token: ${accessToken ? 'present' : 'missing'}, Refresh token: ${refreshToken ? 'present' : 'missing'}`);

    // If no access token, attempt to refresh or redirect
    if (!accessToken) {
      console.debug('[Middleware] No access token found, attempting refresh');
      if (refreshToken) {
        try {
          console.debug(`[Middleware] Sending refresh request to ${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.REFRESH}`);
          const refresh = await fetch(
            `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.REFRESH}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                refresh: refreshToken,
              }),
            }
          );

          console.debug(`[Middleware] Refresh response status: ${refresh.status}`);
          if (!refresh.ok) {
            const errorData = await refresh.json();
            const errorMsg =
              errorData?.detail ||
              errorData?.message ||
              'Failed to refresh token';
            console.error(`[Middleware] Refresh failed: ${errorMsg}`);
            throw new Error(errorMsg);
          }

          const data = await refresh.json();
          console.debug('[Middleware] Refresh successful, new tokens received');

          // Create response to update cookies
          const response = NextResponse.next();

          // Set new tokens in cookies
          console.debug('[Middleware] Setting new access token in cookies');
          response.cookies.set(STORAGE_KEYS.ACCESS_TOKEN, data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
          });

          console.debug('[Middleware] Setting new refresh token in cookies');
          response.cookies.set(STORAGE_KEYS.REFRESH_TOKEN, data.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
          });

          console.debug('[Middleware] Returning response with updated tokens');
          return response;
        } catch (error) {
          console.error(`[Middleware] Token refresh failed: ${error instanceof Error ? error.message : String(error)}`);
          // Redirect to root if refresh fails
          console.debug('[Middleware] Redirecting to root due to refresh failure');
          return NextResponse.redirect(new URL('/', request.url));
        }
      } else {
        console.debug('[Middleware] No refresh token, redirecting to root');
        // No refresh token, redirect to root
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    console.debug('[Middleware] Access token valid, allowing request to proceed');
    // Access token exists, allow request to proceed
    return NextResponse.next();
  }

  console.debug(`[Middleware] Path ${pathname} is not protected, allowing request`);
  // Non-protected paths, allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};