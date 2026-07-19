import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    console.log("[useAuth] checking admin role", { userId: user.id, email: user.email });
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        console.log("[useAuth] user_roles result", { data, error });
        if (error) {
          console.error("[useAuth] role query failed:", error.message);
          setIsAdmin(false);
          return;
        }
        const roles = (data ?? []).map((r: any) => r.role);
        setIsAdmin(roles.includes("admin"));
      });
  }, [user]);

  return { session, user, isAdmin, loading };
}
