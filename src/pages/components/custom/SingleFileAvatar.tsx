import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dropzone,
  DropZoneArea,
  DropzoneTrigger,
  DropzoneMessage,
  useDropzone,
} from "@/components/ui/dropzone";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  value?: string | File;
  onChange: (file?: File) => void;
  onBlur?: () => void;
  name?: string;
};

export function SingleFileAvatar({ value, onChange, onBlur }: Props) {

  const [preview, setPreview] = useState<string | undefined>(
    typeof value === "string" ? value : undefined
  )

  // xu ly preview khi value thay doi
  useEffect(() => {
    // truong hop 1 : nguoi dung chon anh tu may tinh
    if (value instanceof File) {
      const url = URL.createObjectURL(value)
      setPreview(url)
      return () => URL.revokeObjectURL(url) // don dep bo nho tranh memory leak
    }
    // truong hop 2: vao page edit du lieu duoc gui len la 1 string
    else if (typeof value === "string") {
      setPreview(value)
    }
    // truong hop 3 : khong co anh nao
    else {
      setPreview(undefined)
    }
  }, [value])

  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      onChange(file);
      return {
        status: "success",
        result: URL.createObjectURL(file),
      };
    },
    validation: {
      accept: {
        "image/*": [".png", ".jpg", ".jpeg", ".webp"],
      },
      maxSize: 2 * 1024 * 1024,
      maxFiles: 1,
    },
    shiftOnMaxFiles: true,
  });

  const isPending = dropzone.fileStatuses[0]?.status === "pending";

  return (
    <Dropzone {...dropzone}>
      <DropzoneMessage />
      <DropZoneArea>
        <DropzoneTrigger
          className="flex items-center gap-4 bg-transparent"
          onBlur={onBlur}
        >
          <Avatar className={cn("h-20 w-20", isPending && "animate-pulse")}>
            <AvatarImage className="object-cover" src={preview} />
            <AvatarFallback>IMG</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Upload avatar</p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, JPEG, WEBP — max 2MB
            </p>
          </div>
        </DropzoneTrigger>
      </DropZoneArea>
    </Dropzone>
  );
}
