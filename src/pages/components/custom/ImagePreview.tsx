import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

type Props = {
  src: string | undefined
  alt?: string
  ratio?: number
}

export function ImagePreview({ src, alt = "Preview image", ratio = 3 / 4 }: Props) {
  return (
    <Dialog>
      {/* Thumbnail */}
      <DialogTrigger asChild>
        <AspectRatio
          ratio={ratio}
          className="bg-blue-700 overflow-hidden rounded-md"
        >
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover cursor-pointer"
          />
        </AspectRatio>

      </DialogTrigger>

      <DialogContent className="[&>button]:hidden bg-transparent outline-none border-none max-w-2xl">
        <AspectRatio ratio={ratio} className="w-full h-full p-0 border-none  ">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded-lg"
          />
        </AspectRatio>
      </DialogContent>

    </Dialog>
  )
}
