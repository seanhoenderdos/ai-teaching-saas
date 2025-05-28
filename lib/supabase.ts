import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      async accessToken() {
        try {
          const token = await (await auth()).getToken();
          return token;
        } catch (error) {
          // Handle JWT expiration or other auth errors
          // eslint-disable-next-line no-console
          console.warn("Failed to get auth token:", error);
          return null;
        }
      },
    }
  );
};

// For public operations that don't require authentication
export const createSupabasePublicClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
