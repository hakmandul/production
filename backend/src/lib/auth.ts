// src/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db"; 
import * as schema from "../db/schema"; 

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),
    
    // 1. TRUSTED ORIGINS
    // Required for CORS checks to pass between your domains
    trustedOrigins: [
        "https://gocyxapik.pp.ua",
        "https://www.gocyxapik.pp.ua"
    ],

    advanced: {
        // 2. CROSS SUBDOMAIN COOKIES (Crucial for your setup)
        // This allows the cookie set by 'api.gocyxapik.pp.ua' to be readable 
        // by 'gocyxapik.pp.ua' (your frontend).
        crossSubDomainCookies: {
            enabled: true,
            domain: "gocyxapik.pp.ua", // Set this to your ROOT domain
        },

        // 3. SECURE COOKIES
        // Your Nginx handles SSL, but the Bun app runs on HTTP locally.
        // This forces the 'Secure' flag on cookies so they work with HTTPS.
        useSecureCookies: true, 
        
        // Optional: Custom prefix if you want cleaner cookie names
        // cookiePrefix: "gocyxapik-auth", 
    },

    emailAndPassword: {
        enabled: true,
    },
});