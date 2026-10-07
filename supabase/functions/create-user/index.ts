import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing authorization.");

    const url = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const caller = createClient(url, anonKey, { global: { headers: { Authorization: authHeader } } });
    const { data: { user }, error: userError } = await caller.auth.getUser();
    if (userError || !user) throw new Error("Unauthorized.");

    const admin = createClient(url, serviceKey);
    const { data: profile } = await admin.from("profiles").select("role, is_active").eq("id", user.id).single();
    if (!profile?.is_active || profile.role !== "admin") throw new Error("Administrator access required.");

    const body = await req.json();
    const firstName = body.first_name?.trim();
    const middleName = body.middle_name?.trim() || "";
    const lastName = body.last_name?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const role = body.role === "admin" ? "admin" : "staff";

    if (!firstName || !lastName || !email || !password || password.length < 8) {
      throw new Error("Complete all required fields. Password must be at least 8 characters.");
    }

    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { first_name: firstName, middle_name: middleName, last_name: lastName },
    });
    if (error) throw error;

    if (role === "admin") {
      const { error: roleError } = await admin.from("profiles").update({ role: "admin" }).eq("id", data.user.id);
      if (roleError) throw roleError;
    }

    return new Response(JSON.stringify({ user: { id: data.user.id, email: data.user.email } }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Unable to create user." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,
    });
  }
});
