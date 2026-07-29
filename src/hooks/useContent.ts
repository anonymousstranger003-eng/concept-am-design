import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/components/admin/SupabaseProvider";

export function useContentBlocks() {
  const { client } = useSupabase();
  return useQuery({
    queryKey: ["content_blocks"],
    enabled: !!client,
    staleTime: 30_000,
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

export function useContent<T>(key: string, fallback: T): T {
  const { data } = useContentBlocks();
  const val = data?.[key];
  if (val == null) return fallback;
  return val as T;
}
