import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const BootstrapInput = z.object({
  email: z.string().email().max(255),
  password: z.string().min(6).max(128),
});

/** Returns whether the first admin still needs to be created. */
export const getSetupState = createServerFn({ method: "GET" }).handler(async () => {
  const { createClient } = await import("@supabase/supabase-js");
  const url = process.env.APP_SUPABASE_URL;
  const key = process.env.APP_SUPABASE_SERVICE_ROLE;
  if (!url || !key) {
    return { configured: false, needsSetup: false, suggestedEmail: "" };
  }
  const admin = createClient(url, key, { auth: { persistSession: false } });
  const { count, error } = await admin
    .from("admins")
    .select("*", { count: "exact", head: true });
  if (error) {
    return {
      configured: true,
      needsSetup: false,
      suggestedEmail: "",
      error: error.message,
    };
  }
  return {
    configured: true,
    needsSetup: (count ?? 0) === 0,
    suggestedEmail: process.env.ADMIN_EMAIL ?? "",
  };
});

/** Creates the first admin. Refuses if an admin already exists. */
export const bootstrapAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => BootstrapInput.parse(data))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env.APP_SUPABASE_URL;
    const key = process.env.APP_SUPABASE_SERVICE_ROLE;
    if (!url || !key) {
      throw new Error("Server is missing APP_SUPABASE_URL / APP_SUPABASE_SERVICE_ROLE.");
    }
    const admin = createClient(url, key, { auth: { persistSession: false } });

    const { count, error: countErr } = await admin
      .from("admins")
      .select("*", { count: "exact", head: true });
    if (countErr) {
      throw new Error(
        `Database not ready: ${countErr.message}. Did you run the SQL migration?`,
      );
    }
    if ((count ?? 0) > 0) {
      throw new Error("An admin already exists. Use the login page.");
    }

    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });
    if (createErr || !created.user) {
      throw new Error(createErr?.message ?? "Failed to create user.");
    }

    const { error: insErr } = await admin
      .from("admins")
      .insert({ user_id: created.user.id, email: data.email });
    if (insErr) {
      // Roll back the auth user so setup can be retried cleanly.
      await admin.auth.admin.deleteUser(created.user.id).catch(() => {});
      throw new Error(insErr.message);
    }

    return { ok: true };
  });
