import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";

type Props = {
  url: string
  onChange: (value: string) => void
}

export default function ValidationUrlAudio({ url, onChange }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "valid" | "invalid">('idle')
  const [duration, setDuration] = useState<number>(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)


  const validateUrl = async () => {
    // thể fetch dữ liệu và đợi phẩn hồi đc vì CORS phải dùng thủ thuật này
    // tạo new Audio sau đó gấn url này vào audio đó Audio thì sẽ không bị CORS nữa
    try {
      if (!url) {
        setStatus('invalid');
        return;
      }

      setStatus('loading')


      const audio = new Audio()

      const checkAudioPromise = new Promise<'valid' | 'invalid'>((resolve) => {
        // chỉ có 1 đối tượng khi gọi hàm checkAudioPromise là audio còn audioRef.current chỉ lưu địa chỉ của đối tượng audio thôi
        // useRef kiểm soát lifecycle và cleanup
        // audioRef.current = audio

        audio.src = url

        audio.preload = 'metadata'

        audio.onloadedmetadata = () => {
          console.log((Math.ceil(audio?.duration ?? 0)))
          setDuration((audio?.duration ?? 0 / 60))
          resolve('valid')
        }

        audio.onerror = () => {
          resolve('invalid')
        }

      })
      console.log("re-render")
      // const fetchPromise = fetch(url, {
      //   // dùng head để kiểm tra sự tồn tại của Content-Type
      //   // head gần giống với get nhưng nó chỉ trả về header của 1  response ko trả về body
      //   // response là một Response object của Fetch API.
      //   method: 'head',
      // })

      // đợi cả 2, và promise.all trả về 1 mảng, ép kiểu cho giá trị trả về của promise.all ,
      // const result = (await Promise.all([checkAudioPromise])) as [Response,unkown]
      // setStatus(result[0])
      const [result] = (await Promise.all([checkAudioPromise]));

      audio.src = ''
      audio.pause();
      audio.load();

      setStatus(result)

    } catch (error) {
      setStatus('invalid')
      console.error(error)
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
      <span className="ml-4">phút {duration === 0 ? 0 : duration}</span>
    </>
  )
}
