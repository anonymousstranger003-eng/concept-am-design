import { useState } from "react";
import { ArrowDown, ArrowUp, GripVertical, Plus, Trash2 } from "lucide-react";
import type { Field } from "@/lib/cms-schemas";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImagePicker } from "@/components/admin/ImagePicker";
import { StylePanel } from "@/components/admin/StylePanel";
import type { AnyStyle, StyleMap } from "@/lib/cms-style";

type AnyRecord = Record<string, unknown>;

function defaultForField(f: Field): unknown {
  if (f.type === "list") return [];
  if (f.type === "number") return 0;
  return "";
}

function defaultItem(fields: Field[]): AnyRecord {
  const o: AnyRecord = {};
  for (const f of fields) o[f.key] = defaultForField(f);
  return o;
}

function move<T>(arr: T[], from: number, to: number): T[] {
  const next = arr.slice();
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

export function FieldRenderer({
  field,
  value,
  onChange,
  depth = 0,
  path,
  styles,
  onStyleChange,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
  depth?: number;
  /** Dotted path of this field inside the block, e.g. "slides.0.heading". */
  path?: string;
  styles?: StyleMap;
  onStyleChange?: (path: string, style: AnyStyle) => void;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const fieldPath = path ?? field.key;
  const myStyle: AnyStyle = (styles?.[fieldPath] ?? {}) as AnyStyle;
  const setStyle = (next: AnyStyle) => onStyleChange?.(fieldPath, next);
  const textPanel = onStyleChange ? (
    <StylePanel kind="text" style={myStyle} onChange={setStyle} previewText={typeof value === "string" ? value : ""} />
  ) : null;

  const label = (
    <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1.5">
      {field.label}
    </label>
  );

  if (field.type === "text" || field.type === "url") {
    return (
      <div>
        {label}
        <input
          type="text"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 px-3 rounded-md border border-zinc-300 text-sm bg-white focus:outline-none focus:border-zinc-900"
        />
        {field.hint && <p className="text-[11px] text-zinc-500 mt-1">{field.hint}</p>}
        {textPanel}
      </div>
    );
  }

  if (field.type === "number") {
    return (
      <div>
        {label}
        <input
          type="number"
          value={(value as number) ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-10 px-3 rounded-md border border-zinc-300 text-sm bg-white focus:outline-none focus:border-zinc-900"
        />
        {field.hint && <p className="text-[11px] text-zinc-500 mt-1">{field.hint}</p>}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        {label}
        <textarea
          rows={3}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-zinc-300 text-sm bg-white focus:outline-none focus:border-zinc-900"
        />
        {field.hint && <p className="text-[11px] text-zinc-500 mt-1">{field.hint}</p>}
        {textPanel}
      </div>
    );
  }

  if (field.type === "richtext") {
    return (
      <div>
        {label}
        <RichTextEditor value={(value as string) ?? ""} onChange={onChange} />
        {field.hint && <p className="text-[11px] text-zinc-500 mt-1">{field.hint}</p>}
        {textPanel}
      </div>
    );
  }

  if (field.type === "image") {
    return (
      <div>
        {label}
        <ImagePicker value={(value as string) ?? ""} onChange={onChange} />
        {onStyleChange && (
          <StylePanel
            kind="image"
            style={myStyle}
            onChange={setStyle}
            previewSrc={typeof value === "string" ? value : ""}
          />
        )}
      </div>
    );
  }

  if (field.type === "list") {
    const items = Array.isArray(value) ? (value as unknown[]) : [];
    const itemFields = field.itemFields ?? [];
    const update = (next: unknown[]) => onChange(next);
    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <label className="text-xs uppercase tracking-wider text-zinc-500">{field.label}</label>
            <p className="text-[11px] text-zinc-400">Drag the handle to reorder.</p>
          </div>
          <button
            type="button"
            onClick={() => update([...items, defaultItem(itemFields)])}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-zinc-900 text-white text-xs hover:bg-zinc-800"
          >
            <Plus className="w-3.5 h-3.5" /> Add {field.itemLabel ?? "item"}
          </button>
        </div>
        <div className="space-y-3">
          {items.length === 0 && (
            <div className="text-xs text-zinc-500 border border-dashed border-zinc-300 rounded-md p-4 text-center">
              No {field.itemLabel?.toLowerCase() ?? "items"} yet.
            </div>
          )}
          {items.map((it, idx) => {
            const rec = (it ?? {}) as AnyRecord;
            const title =
              (rec["title"] as string) ||
              (rec["name"] as string) ||
              (rec["label"] as string) ||
              (rec["q"] as string) ||
              (rec["path"] as string) ||
              "";
            return (
              <div
                key={idx}
                onDragOver={(e) => {
                  if (dragIndex === null) return;
                  e.preventDefault();
                  setOverIndex(idx);
                }}
                onDrop={(e) => {
                  if (dragIndex === null) return;
                  e.preventDefault();
                  update(move(items, dragIndex, idx));
                  setDragIndex(null);
                  setOverIndex(null);
                }}
                className={`border rounded-lg p-4 bg-white transition-colors ${
                  overIndex === idx && dragIndex !== null ? "border-zinc-900" : "border-zinc-200"
                } ${dragIndex === idx ? "opacity-50" : ""} ${depth > 0 ? "" : "shadow-sm"}`}
              >
                <div className="flex items-center justify-between mb-3 gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      draggable
                      onDragStart={() => setDragIndex(idx)}
                      onDragEnd={() => {
                        setDragIndex(null);
                        setOverIndex(null);
                      }}
                      className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-zinc-400 hover:text-zinc-900"
                      title="Drag to reorder"
                    >
                      <GripVertical className="w-4 h-4" />
                    </span>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-500 truncate">
                      {field.itemLabel ?? "Item"} #{idx + 1}
                      {title ? ` · ${title}` : ""}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => update(move(items, idx, idx - 1))}
                      className="p-1.5 rounded hover:bg-zinc-100 disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === items.length - 1}
                      onClick={() => update(move(items, idx, idx + 1))}
                      className="p-1.5 rounded hover:bg-zinc-100 disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!confirm("Remove this item?")) return;
                        update(items.filter((_, i) => i !== idx));
                      }}
                      className="p-1.5 rounded text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="grid gap-3">
                  {itemFields.map((sub) => (
                    <FieldRenderer
                      key={sub.key}
                      field={sub}
                      value={rec[sub.key]}
                      depth={depth + 1}
                      path={`${fieldPath}.${idx}.${sub.key}`}
                      styles={styles}
                      onStyleChange={onStyleChange}
                      onChange={(v) => {
                        const next = items.slice();
                        next[idx] = { ...rec, [sub.key]: v };
                        update(next);
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
