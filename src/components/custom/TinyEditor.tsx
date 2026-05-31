import { Editor } from "@tinymce/tinymce-react";
import { Editor as TypeEditor } from "tinymce";
import { useRef } from "react";

type Props = {
  value: string,
  onChange: (value: string) => void
}
export default function TinyEditor({ value, onChange }: Props) {

  // type của useRef phải tìm type của biến editor và gán vào , không tính trường hợp type any
  // as tức là đổi tên Editor thành tên TypeEditor
  const editorRef = useRef<TypeEditor | null>(null);

  return (
    <div id="editor">
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        value={value}
        onEditorChange={(content) => onChange(content)}

        // props OnInit nhan vao 1 ham trong ham nay co 2 tham so la
        // event va editor, nhung chi can dung den editor thoi nen dung
        // ky tu _ thay cho ten de ko bi loi 'event' is declared but its value is never read.
        onInit={(_, editor) => {
          editorRef.current = editor
          editorRef.current.focus()
        }}
        init={{
          height: 600,
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

          // icons
          icons: 'material',

          valid_elements: "*[*]",
          extended_valid_elements: "script[*],style[*]",

          skin_url: "/tinymce/skins/ui/oxide",
          content_css: "/tinymce/skins/content/default/content.css"
        }}
      />
    </div>
  );
}
