import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/components/admin/SupabaseProvider";
import { DEFAULTS } from "@/lib/cms-defaults";

export function useContentBlocks() {
  const { client } = useSupabase();
  return useQuery({
    queryKey: ["content_blocks"],
    enabled: !!client,
    staleTime: 15_000,
    queryFn: async () => {
      if (!client) return {} as Record<string, unknown>;
      const { data, error } = await client.from("content_blocks").select("key, data");
      if (error) return {} as Record<string, unknown>;
      const map: Record<string, unknown> = {};
      for (const row of data ?? []) map[(row as { key: string }).key] = (row as { data: unknown }).data;
      return map;
    },
  });
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

/** Shallow-merges the stored block over its seed defaults (arrays are replaced). */
export function mergeWithDefaults<T>(key: string, stored: unknown, fallback?: T): T {
  const base = (DEFAULTS[key] ?? fallback ?? {}) as Record<string, unknown>;
  if (!isPlainObject(stored)) return (fallback ?? base) as T;
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(stored)) {
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out as T;
}

/** Reads a content block, merged over its seed defaults. */
export function useSection<T>(key: string, fallback?: T): T {
  const { data } = useContentBlocks();
  return mergeWithDefaults<T>(key, data?.[key], fallback);
}

/** Raw block read with an explicit fallback (no defaults merge). */
export function useContent<T>(key: string, fallback: T): T {
  const { data } = useContentBlocks();
  const val = data?.[key];
  if (val == null) return fallback;
  return val as T;
}
