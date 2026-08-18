import { useState } from "react";
import { Paintbrush, RotateCcw } from "lucide-react";
import {
  ALIGN_CHOICES,
  FIT_CHOICES,
  FONT_FAMILY_OPTIONS,
  IMAGE_ALIGN_CHOICES,
  TRANSFORM_CHOICES,
  WEIGHT_CHOICES,
  imageStyleToCss,
  textStyleToCss,
  type AnyStyle,
} from "@/lib/cms-style";

type Kind = "text" | "image";

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{children}</div>
);

function Label({ children }: { children: React.ReactNode }) {
  return <span className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1">{children}</span>;
}

function TextInput({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <input
        type="text"
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-9 px-2.5 rounded-md border border-zinc-300 text-xs bg-white focus:outline-none focus:border-zinc-900"
      />
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value?: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-9 px-2 rounded-md border border-zinc-300 text-xs bg-white focus:outline-none focus:border-zinc-900"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const plain = (arr: string[], emptyLabel = "Default") =>
  arr.map((v) => ({ value: v, label: v === "" ? emptyLabel : v }));

/**
 * Independent typography / image controls for ONE field.
 * The style object is stored per field path, so editing one field never
 * touches another.
 */
export function StylePanel({
  kind,
  style,
  onChange,
  previewText,
  previewSrc,
}: {
  kind: Kind;
  style: AnyStyle;
  onChange: (next: AnyStyle) => void;
  previewText?: string;
  previewSrc?: string;
}) {
  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const set = (patch: Partial<AnyStyle>) => onChange({ ...style, ...patch });
  const customised = Object.values(style ?? {}).some((v) => v !== "" && v !== undefined && v !== false);

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border text-[11px] ${
          customised ? "border-zinc-900 text-zinc-900" : "border-zinc-300 text-zinc-500"
        } hover:bg-zinc-50`}
      >
        <Paintbrush className="w-3 h-3" />
        {kind === "image" ? "Image settings" : "Typography"}
        {customised ? " •" : ""}
      </button>

      {open && (
        <div className="mt-2 rounded-lg border border-zinc-200 bg-zinc-50/70 p-3 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1">
              {(["desktop", "tablet", "mobile"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDevice(d)}
                  className={`h-7 px-2.5 rounded-md text-[11px] capitalize border ${
                    device === d ? "bg-zinc-900 text-white border-zinc-900" : "border-zinc-300 bg-white"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onChange({})}
              className="inline-flex items-center gap-1 h-7 px-2 rounded-md border border-zinc-300 bg-white text-[11px] text-zinc-600 hover:bg-zinc-100"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {kind === "text" ? (
            <>
              <Row>
                <Select
                  label="Font family"
                  value={style.fontFamily}
                  options={FONT_FAMILY_OPTIONS}
                  onChange={(v) => set({ fontFamily: v })}
                />
                <Select
                  label="Font weight"
                  value={style.fontWeight}
                  options={plain(WEIGHT_CHOICES)}
                  onChange={(v) => set({ fontWeight: v })}
                />
                <label className="block">
                  <Label>Font colour</Label>
                  <div className="flex gap-1.5">
                    <input
                      type="color"
                      value={style.color || "#000000"}
                      onChange={(e) => set({ color: e.target.value })}
                      className="h-9 w-10 rounded-md border border-zinc-300 bg-white"
                    />
                    <input
                      type="text"
                      value={style.color ?? ""}
                      placeholder="inherit"
                      onChange={(e) => set({ color: e.target.value })}
                      className="flex-1 h-9 px-2 rounded-md border border-zinc-300 text-xs bg-white"
                    />
                  </div>
                </label>
              </Row>
              <Row>
                <TextInput label="Desktop size" value={style.sizeDesktop} placeholder="e.g. 72px" onChange={(v) => set({ sizeDesktop: v })} />
                <TextInput label="Tablet size" value={style.sizeTablet} placeholder="e.g. 48px" onChange={(v) => set({ sizeTablet: v })} />
                <TextInput label="Mobile size" value={style.sizeMobile} placeholder="e.g. 30px" onChange={(v) => set({ sizeMobile: v })} />
              </Row>
              <Row>
                <TextInput label="Line height" value={style.lineHeight} placeholder="e.g. 1.1" onChange={(v) => set({ lineHeight: v })} />
                <TextInput label="Letter spacing" value={style.letterSpacing} placeholder="e.g. -0.02em" onChange={(v) => set({ letterSpacing: v })} />
                <Select label="Alignment" value={style.align} options={plain(ALIGN_CHOICES)} onChange={(v) => set({ align: v })} />
              </Row>
              <Row>
                <Select label="Text transform" value={style.transform} options={plain(TRANSFORM_CHOICES)} onChange={(v) => set({ transform: v })} />
                <div className="col-span-2 flex items-end gap-4 pb-1">
                  {([
                    ["bold", "Bold"],
                    ["italic", "Italic"],
                    ["underline", "Underline"],
                  ] as const).map(([k, l]) => (
                    <label key={k} className="inline-flex items-center gap-1.5 text-xs text-zinc-700">
                      <input
                        type="checkbox"
                        checked={!!style[k]}
                        onChange={(e) => set({ [k]: e.target.checked } as Partial<AnyStyle>)}
                      />
                      {l}
                    </label>
                  ))}
                </div>
              </Row>
              <div className="rounded-md border border-zinc-200 bg-white p-3">
                <Label>Live preview ({device})</Label>
                <div style={textStyleToCss(style, device)}>
                  {previewText?.trim() ? previewText : "The quick brown fox jumps over the lazy dog"}
                </div>
              </div>
            </>
          ) : (
            <>
              <Row>
                <TextInput label="Desktop width" value={style.widthDesktop} placeholder="e.g. 480px / 100%" onChange={(v) => set({ widthDesktop: v })} />
                <TextInput label="Desktop height" value={style.heightDesktop} placeholder="e.g. 360px / auto" onChange={(v) => set({ heightDesktop: v })} />
                <TextInput label="Max width" value={style.maxWidth} placeholder="e.g. 100%" onChange={(v) => set({ maxWidth: v })} />
              </Row>
              <Row>
                <TextInput label="Tablet width" value={style.widthTablet} onChange={(v) => set({ widthTablet: v })} />
                <TextInput label="Tablet height" value={style.heightTablet} onChange={(v) => set({ heightTablet: v })} />
                <TextInput label="Max height" value={style.maxHeight} placeholder="e.g. 70vh" onChange={(v) => set({ maxHeight: v })} />
              </Row>
              <Row>
                <TextInput label="Mobile width" value={style.widthMobile} onChange={(v) => set({ widthMobile: v })} />
                <TextInput label="Mobile height" value={style.heightMobile} onChange={(v) => set({ heightMobile: v })} />
                <TextInput label="Border radius" value={style.radius} placeholder="e.g. 12px" onChange={(v) => set({ radius: v })} />
              </Row>
              <Row>
                <Select label="Object fit" value={style.objectFit} options={plain(FIT_CHOICES)} onChange={(v) => set({ objectFit: v })} />
                <TextInput label="Object position" value={style.objectPosition} placeholder="e.g. 60% 50%" onChange={(v) => set({ objectPosition: v })} />
                <Select label="Alignment" value={style.align} options={plain(IMAGE_ALIGN_CHOICES)} onChange={(v) => set({ align: v })} />
              </Row>
              <TextInput label="Alt text override" value={style.alt} onChange={(v) => set({ alt: v })} />
              <div className="rounded-md border border-zinc-200 bg-white p-3">
                <Label>Live preview ({device})</Label>
                {previewSrc ? (
                  <img
                    src={previewSrc}
                    alt={style.alt || "preview"}
                    style={{ maxWidth: "100%", ...imageStyleToCss(style, device) }}
                  />
                ) : (
                  <div className="text-xs text-zinc-400">Upload or pick an image to preview.</div>
                )}
                <p className="text-[10px] text-zinc-400 mt-2">
                  The original upload is never cropped — only its displayed size changes.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
