import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  LOCAL_ADMIN_COOKIE,
  verifyLocalAdminToken,
} from "@/lib/auth/local-admin";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export type AdminContext =
  | { ok: true; supabase: SupabaseClient; email: string }
  | { ok: false; status: number; message: string };

export async function requireAdmin(): Promise<AdminContext> {
  const supabase = await createClient();

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.email) {
      return { ok: true, supabase, email: user.email };
    }
  }

  const jar = await cookies();
  const localEmail = verifyLocalAdminToken(
    jar.get(LOCAL_ADMIN_COOKIE)?.value,
  );
  if (localEmail) {
    const service = createServiceClient();
    if (service) {
      return { ok: true, supabase: service, email: localEmail };
    }
    return {
      ok: false,
      status: 503,
      message:
        "Signed in locally — add SUPABASE_SERVICE_ROLE_KEY for uploads, or sign in with your Supabase admin user.",
    };
  }

  return { ok: false, status: 401, message: "Unauthorized" };
}
