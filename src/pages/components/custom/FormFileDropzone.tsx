"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dropzone,
  DropZoneArea,
  DropzoneTrigger,
  DropzoneMessage,
  useDropzone,
} from "@/components/ui/dropzone";
import { cn } from "@/lib/utils";

type Props = {
  value?: string | undefined;
  onChange: (file?: File) => void;
};

export function SingleFile({ value, onChange }: Props) {
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

  const avatarSrc = value ? value : undefined;
  const isPending = dropzone.fileStatuses[0]?.status === "pending";

  return (
    <Dropzone {...dropzone}>
      <DropzoneMessage />
      <DropZoneArea>
        <DropzoneTrigger className="flex items-center gap-4 bg-transparent">
          <Avatar className={cn("h-20 w-20", isPending && "animate-pulse")}>
            <AvatarImage className="object-cover" src={avatarSrc} />
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
