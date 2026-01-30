import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Props = {
  url: string
  onChange: (value: string) => void
}

export default function ValidationUrlAudio({ url, onChange }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "valid" | "invalid">('idle')

  const validateUrl = async () => {
    try {
      if (!url) {
        setStatus('invalid');
        return;
      }

      setStatus('loading')

      const delay = new Promise((resolve) => setTimeout(resolve, 1000))

      const fetchPromise = fetch(url, {
        // dùng head để kiểm tra sự tồn tại của Content-Type
        // head gần giống với get nhưng nó chỉ trả về header của 1  response ko trả về body
        // response là một Response object của Fetch API.
        method: 'head',
      })

      // đợi cả 2, và promise.all trả về 1 mảng, ép kiểu cho giá trị trả về của promise.all
      const [response] = (await Promise.all([fetchPromise, delay])) as [Response, unknown];

      if (response.ok) {
        const contentType = response.headers.get('content-type') ?? ''
        if (contentType.includes('audio')) {
          setStatus('valid')
          return;
        }
      }
      setStatus('invalid')

    } catch (error) {
      setStatus('invalid')
    }

  }

  return (
    <>
      <Textarea className="min-h-[100px]"
        onChange={(e) => onChange(e.target.value)}
        value={url}
        disabled={status === 'loading'}
      />
      {/*
      vì thẻ html button nằm trong <form> nên sẽ tính là submit,
      chỉ cần thêm type button là xong
      */}
      <Button
        disabled={status === 'loading'}
        type="button"
        onClick={validateUrl}
      >Check</Button>
      <span className="ml-4">{status}</span>
    </>
  )
}
