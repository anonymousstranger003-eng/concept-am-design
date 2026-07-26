import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/components/admin/SupabaseProvider";

export type SiteSettings = {
  siteName?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  addressCalicut?: string;
  addressKasaragod?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  mapCalicut?: string;
  mapKasaragod?: string;
  metaTitle?: string;
  metaDescription?: string;
};

export const SETTINGS_FALLBACK: SiteSettings = {
  siteName: "AM Concepts",
  tagline: "Architects & Interiors",
  email: "amconcepts.architects20@gmail.com",
  phone: "+91 95394 58218",
  whatsapp: "919539458218",
  addressCalicut:
    "PRAGATHI, 13/1640, Madhuravanam Road, Civil Station, Kozhikode, Kerala 673020",
  addressKasaragod: "Ali & Son's Complex, 1/136, Chemnad, Kerala 671317",
  instagram: "https://www.instagram.com/am_concepts_architects?utm_source=qr",
  facebook: "https://www.facebook.com/share/1EjoTL5Ueh/?mibextid=wwXIfr",
  linkedin: "https://linkedin.com",
  youtube: "https://youtube.com/@amconceptsarchitects?si=x6iK5KQd9sNDdj63",
};

export function useSiteSettings(): SiteSettings {
  const { client } = useSupabase();
  const { data } = useQuery({
    queryKey: ["site_settings"],
    enabled: !!client,
    staleTime: 60_000,
    queryFn: async () => {
      if (!client) return {};
      const { data, error } = await client
        .from("site_settings")
        .select("data")
        .eq("id", 1)
        .maybeSingle();
      if (error) return {};
      return (data?.data ?? {}) as SiteSettings;
    },
  });
  return { ...SETTINGS_FALLBACK, ...(data ?? {}) };
}
