import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm, Controller } from "react-hook-form";

// shadcn/ui components (assumes project already set up)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // optional helper for classNames

type FormValues = {
  title: string;
  files: File[];
};

export default function UploadWithPreviewAndReactHookForm() {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { title: "", files: [] },
  });

  // keep preview URLs in local state for rendering
  const [previews, setPreviews] = useState<string[]>([]);

  // watch files from RHF
  const files = watch("files");

  // create previews when files change
  useEffect(() => {
    // revoke old object URLs
    setPreviews((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return [];
    });

    if (!files || files.length === 0) return;

    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setPreviews(urls);

    // cleanup when component unmounts
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [files]);

  // dropzone config
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // append to existing files (multi)
      const nextFiles = [...(files || []), ...acceptedFiles];
      setValue("files", nextFiles, { shouldValidate: true });
    },
    [files, setValue]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 5 * 1024 * 1024, // 5MB per file
    multiple: true,
  });

  // helper: remove file at index
  const removeFile = (index: number) => {
    const next = (files || []).slice();
    // revoke URL for that file's preview
    if (previews[index]) URL.revokeObjectURL(previews[index]);
    next.splice(index, 1);
    setValue("files", next, { shouldValidate: true });
  };

  // submit handler
  const onSubmit = async (data: FormValues) => {
    try {
      // build multipart form data
      const fd = new FormData();
      fd.append("title", data.title);
      (data.files || []).forEach((f, idx) => fd.append("files[]", f));

      // example fetch to /api/upload
      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Upload failed");

      // handle success (reset form / show toast...)
      alert("Upload successful");
      setValue("title", "");
      setValue("files", []);
    } catch (err) {
      console.error(err);
      alert((err as Error).message || "Upload error");
    }
  };

  // derived helper for showing simple validation messages
  const fileTooLarge = useMemo(() => {
    return (files || []).some((f) => f.size > 5 * 1024 * 1024);
  }, [files]);

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Upload images (react-hook-form + shadcn/ui)</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Album title" {...register("title", { required: true })} />
            {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}
          </div>

          <Controller
            control={control}
            name="files"
            render={() => (
              <div>
                <div
                  {...getRootProps()}
                  className={cn(
                    "border-dashed border-2 rounded-md p-6 text-center cursor-pointer",
                    isDragActive ? "border-primary bg-primary/5" : "border-border",
                    isDragReject ? "border-red-500" : ""
                  )}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here...</p>
                  ) : (
                    <p>Drag & drop images here, or click to select (max 5MB / file)</p>
                  )}
                </div>

                {fileTooLarge && <p className="text-red-500 text-sm mt-2">One or more files exceed 5MB.</p>}

                {/* preview grid */}
                {previews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {previews.map((src, idx) => (
                      <div key={src} className="relative border rounded overflow-hidden">
                        <img src={src} alt={`preview-${idx}`} className="w-full h-32 object-cover" />
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="absolute top-1 right-1 bg-white/80 rounded-full p-1 shadow"
                          aria-label={`Remove file ${idx}`}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          />

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={isSubmitting || fileTooLarge}>
              {isSubmitting ? "Uploading..." : "Upload"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setValue("files", []);
                setValue("title", "");
              }}
            >
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
