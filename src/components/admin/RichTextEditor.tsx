import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Code,
  Undo2,
  Redo2,
  Images,
} from "lucide-react";
import { MediaBrowserModal } from "@/components/admin/MediaLibrary";

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [browsing, setBrowsing] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[140px] p-3 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) editor.commands.setContent(value || "", { emitUpdate: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!editor) return null;

  const btn = (active: boolean) =>
    `p-1.5 rounded hover:bg-zinc-100 ${active ? "bg-zinc-200 text-zinc-900" : "text-zinc-600"}`;

  return (
    <div className="border border-zinc-300 rounded-md bg-white overflow-hidden">
      <div className="flex flex-wrap gap-1 border-b border-zinc-200 p-1.5 bg-zinc-50">
        <button type="button" title="Bold" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button type="button" title="Italic" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button type="button" title="Underline" className={btn(editor.isActive("underline"))} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="w-3.5 h-3.5" />
        </button>
        <span className="w-px bg-zinc-200 mx-1" />
        <button type="button" title="Heading 2" className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="w-3.5 h-3.5" />
        </button>
        <button type="button" title="Heading 3" className={btn(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="w-3.5 h-3.5" />
        </button>
        <button type="button" title="Bullet list" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="w-3.5 h-3.5" />
        </button>
        <button type="button" title="Numbered list" className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="w-3.5 h-3.5" />
        </button>
        <button type="button" title="Quote" className={btn(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="w-3.5 h-3.5" />
        </button>
        <button type="button" title="Code block" className={btn(editor.isActive("codeBlock"))} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <Code className="w-3.5 h-3.5" />
        </button>
        <span className="w-px bg-zinc-200 mx-1" />
        <button type="button" title="Align left" className={btn(editor.isActive({ textAlign: "left" }))} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft className="w-3.5 h-3.5" />
        </button>
        <button type="button" title="Align center" className={btn(editor.isActive({ textAlign: "center" }))} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter className="w-3.5 h-3.5" />
        </button>
        <button type="button" title="Align right" className={btn(editor.isActive({ textAlign: "right" }))} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight className="w-3.5 h-3.5" />
        </button>
        <span className="w-px bg-zinc-200 mx-1" />
        <button
          type="button"
          title="Link"
          className={btn(editor.isActive("link"))}
          onClick={() => {
            const url = prompt("Enter URL");
            if (url === null) return;
            if (!url) editor.chain().focus().unsetLink().run();
            else editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          title="Image by URL"
          className={btn(false)}
          onClick={() => {
            const url = prompt("Image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
        >
          <ImageIcon className="w-3.5 h-3.5" />
        </button>
        <button type="button" title="Insert from media library" className={btn(false)} onClick={() => setBrowsing(true)}>
          <Images className="w-3.5 h-3.5" />
        </button>
        <span className="w-px bg-zinc-200 mx-1" />
        <button type="button" title="Undo" className={btn(false)} onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 className="w-3.5 h-3.5" />
        </button>
        <button type="button" title="Redo" className={btn(false)} onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 className="w-3.5 h-3.5" />
        </button>
      </div>
      <EditorContent editor={editor} />
      <MediaBrowserModal
        open={browsing}
        onClose={() => setBrowsing(false)}
        onSelect={(url) => editor.chain().focus().setImage({ src: url }).run()}
      />
    </div>
  );
}
