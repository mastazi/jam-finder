import { clerkMiddleware } from '@clerk/nextjs/server';

import { env } from '@/lib/config/env';

export default clerkMiddleware({
  domain: env.clerkDomain,
  proxyUrl: env.clerkProxyUrl
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
};
