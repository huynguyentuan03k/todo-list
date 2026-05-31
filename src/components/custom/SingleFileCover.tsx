import {
  Dropzone,
  DropZoneArea,
  DropzoneTrigger,
  useDropzone,
} from "@/components/ui/dropzone";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

type Props = {
  value?: string;
  onChange: (file?: File) => void;
  ratio?: number; // default ratio 3:4
  label?: string;
};

export function SingleFileCover({
  value,
  onChange,
  ratio = 3 / 4,
  label = "Upload cover image",
}: Props) {
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

  const coverSrc = value;
  const isPending = dropzone.fileStatuses[0]?.status === "pending";

  return (
    <Dropzone {...dropzone}>
      <DropZoneArea>
        <DropzoneTrigger className="w-full bg-transparent">
          <Card
            className={cn(
              "overflow-hidden border-dashed border-2 transition",
              isPending && "animate-pulse"
            )}
          >
            <AspectRatio ratio={ratio}>
              {coverSrc ? (
                <img
                  src={coverSrc}
                  alt="cover"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                  <ImageIcon className="h-8 w-8" />
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs">
                    PNG, JPG, JPEG, WEBP — max 2MB
                  </p>
                </div>
              )}
            </AspectRatio>
          </Card>
        </DropzoneTrigger>
      </DropZoneArea>
    </Dropzone>
  );
}
