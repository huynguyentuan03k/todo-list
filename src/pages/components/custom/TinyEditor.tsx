import { Editor } from "@tinymce/tinymce-react";

export default function TinyEditor() {
  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      licenseKey="gpl"
      init={{
        height: 600,
        // menubar: true,
        plugins: [
          'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
          'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
          'media', 'table', 'emoticons', 'help'
        ],
        toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',
        menu: {
          favs: { title: 'My Favorites Huy', items: 'code visualaid | searchreplace | emoticons' }
        },
        menubar: 'favs file edit view insert format tools table help',

        // language
        // language: 'vi',
        // language_url: '/tinymce/langs/vi.js',
        // language_load: true,

        valid_elements: "*[*]",
        extended_valid_elements: "script[*],style[*]",

        skin_url: "/tinymce/skins/ui/oxide",
        content_css: "/tinymce/skins/content/default/content.css"
      }}
    />
  );
}
