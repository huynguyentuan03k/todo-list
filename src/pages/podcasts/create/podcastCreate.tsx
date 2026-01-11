import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import http from "@/utils/http"
import { PodcastForm } from "../schema"
import { useToast } from "@/components/ui/hooks/use-toast"
import { useForm, SubmitHandler } from "react-hook-form"
import { AxiosError } from "axios"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { ComboboxSelect } from "@/pages/components/custom/ComboboxSelect"
import { useQuery } from "@tanstack/react-query"
import { Publishers } from "@/pages/publishers/shema"
import { SingleFileCover } from "@/pages/components/custom/SingleFileCover"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"

type LaravelValidationError = {
  message: string;
  errors: Record<string, string[]>;
};

async function createPodcast(data: PodcastForm) {
  const formData = new FormData();

  if (data.cover_image) {
    formData.append("cover_image", data.cover_image);
  }

  formData.append("title", data.title);
  formData.append("description", data.title);
  formData.append("slug", data.title)

  // trong formdata khong chap nhan number va null
  // chi chap nhan : string , blob (file, FileList, etc.)
  formData.append("publisher_id", String(data.publisher_id))

  return http.post<PodcastForm>(`/podcasts`, formData, {
    headers: {
      "Content-Type": "Multipart/form-data",
    }
  });
}

export default function PodcastCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const { data: PublisherResponse } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await http.get<{ data: Publishers }>(`/publishers`)
      return res.data.data
    }
  })

  const publisherOptions = PublisherResponse?.map(item => (
    {
      label: item.name || "",
      value: Number(item.id)
    }
  )) ?? []

  //

  const form = useForm<PodcastForm>({
    defaultValues: {
      title: "",
      description: "",
      slug: "",
      publisher_id: undefined,
      cover_url: "",
    }
  })

  // form data ! entity data
  const onSubmit: SubmitHandler<PodcastForm> = (data) => {
    mutation.mutate(data)
  }

  const mutation = useMutation({
    mutationFn: createPodcast,
    onSuccess: () => {
      toast({
        title: "create podcast successfully",
        description: "podcast has been store.",
      });
      navigate('/portal/podcasts')
    },
    onError: (error: AxiosError<LaravelValidationError>) => { // axios faild luon tra ra AxiosError<T>
      const backendMessage = error?.response?.data?.message || "Something went wrong";
      toast({
        title: "update podcast failed",
        description: backendMessage,
        variant: "destructive",
      });
    }
  })

  return (
    <div>
      <div className="flex justify-between">
        <Breadcrumbs />
        {/* <Button className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg mb-2" onClick={() => navigate(-1)}>Back</Button> */}
        <Button className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg mb-2" onClick={() => navigate(-1)}>Back</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Create Podcast</CardTitle>
          <CardDescription>description Create Podcast</CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <Form {...form}>
            <CardContent>
              <div className="grid grid-cols-3 gap-x-4 gap-y-6">

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          // type text luon tra ra string , 'abc', '',
                          type="text"
                          placeholder="Title of Podcast"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description about Podcast"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Slug about Podcast"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="publisher_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publisher</FormLabel>
                      <FormControl>
                        <ComboboxSelect
                          value={field.value ? String(field.value) : undefined}
                          onChange={(value) => {
                            field.onChange(Number(value))
                          }}
                          options={publisherOptions}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cover_image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover</FormLabel>
                      <FormControl>
                        <SingleFileCover
                          value={form.watch("cover_url")}
                          onChange={(file) => {
                            field.onChange(file)
                            if (file) {
                              const preview = URL.createObjectURL(file);
                              form.setValue('cover_url', preview)
                              form.setValue('cover_image', file)
                            }
                          }}
                          ratio={3 / 4}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

              </div>
            </CardContent>
          </Form>

          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
            >Save</Button>
          </CardFooter>
        </form>
      </Card>
    </div >
  )
}
