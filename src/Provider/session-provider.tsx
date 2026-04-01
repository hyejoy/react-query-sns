import GlobalLoader from "@/components/ui/global-loader";
import supabase from "@/lib/supabase";
import { useIsSessionLoaded, useSessionActions } from "@/store/session";
import { useEffect, type ReactNode } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const { setSession } = useSessionActions();

  const isSessionLoaded = useIsSessionLoaded();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;

  return children;
}
