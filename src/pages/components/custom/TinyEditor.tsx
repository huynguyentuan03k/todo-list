import { Editor } from "@tinymce/tinymce-react";

export default function TinyEditor() {
  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      licenseKey="gpl"
      init={{
        height: 600,
        menubar: true,
        plugins: [
          "advlist", "autolink", "lists", "link", "image",
          "charmap", "preview", "searchreplace", "visualblocks",
          "code", "fullscreen", "insertdatetime", "media",
          "table", "help", "wordcount"
        ],
        toolbar:
          "undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | code fullscreen",

        valid_elements: "*[*]",
        extended_valid_elements: "script[*],style[*]",

        skin_url: "/tinymce/skins/ui/oxide",
        content_css: "/tinymce/skins/content/default/content.css"
      }}
    />
  );
}
