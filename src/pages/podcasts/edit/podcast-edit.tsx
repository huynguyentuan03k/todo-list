import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Podcast, PodcastForm, PodcastSchema } from "../schema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import { SubmitHandler, useForm } from "react-hook-form"
import { useEffect } from "react"
import { useToast } from "@/components/ui/hooks/use-toast"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { ComboboxSelect } from "@/pages/components/custom/ComboboxSelect"
import { Publishers } from "@/pages/publishers/shema"
import { SingleFileCover } from "@/pages/components/custom/SingleFileCover"


export default function PodcastEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const updatePodcast = (podcast: PodcastForm) => {
    // trong formData chi chap nhan , string , Blob

    const formData = new FormData();

    if (podcast.cover_image) {
      formData.append('cover_image', podcast.cover_image);
    }

    formData.append('description', podcast.description);
    formData.append('slug', podcast.slug);
    formData.append('title', podcast.title)

    formData.append('publisher_id', podcast.publisher_id?.toString() ?? "")

    return http.post<Podcast>(`/podcasts/${id}`, formData, {
      headers: {
        "Content-Type": "Multipart/form-data",
      }
    });
  }

  const { data, isLoading } = useQuery({
    queryKey: ['podcasts', id],
    queryFn: () => http.get<{ data: Podcast }>(`/podcasts/${id}`)
  })

  const form = useForm<PodcastForm>({
    defaultValues: {
      title: data?.data.data.title,
      description: data?.data.data.description ?? undefined,
      slug: data?.data.data.slug ?? undefined,
      cover_image: undefined,
      cover_url: data?.data.data.cover_url ?? undefined,
      publisher_id: data?.data.data.publisher?.id ?? undefined,
    }
  })

  const onSubmit: SubmitHandler<PodcastForm> = (data) => {
    mutation.mutate(data)
  }

  // Update form values when data is loaded
  useEffect(() => {
    if (data?.data?.data) {
      const podcast = PodcastSchema.parse(data.data.data)
      form.reset({
        title: podcast.title,
        description: podcast.description ?? undefined,
        slug: podcast.slug ?? undefined,
        cover_url: podcast.cover_url ?? undefined,
        publisher_id: podcast.publisher?.id ?? undefined,
        cover_image: undefined,
      })
    }
  }, [data, form])

  const mutation = useMutation({
    mutationFn: updatePodcast,
    onSuccess: () => {
      toast({
        title: "update podcast successfully",
        description: "podcast has been store.",
      });
      navigate(`/portal/podcasts/${data?.data.data.id}/show`);
    },
    onError: () => {
      toast({
        title: "update podcast error",
        description: "cannot update podcast .",
      })
    },
  })

  const { data: PublisherResponse } = useQuery({
    queryKey: ['publishers'],
    queryFn: async () => {
      const res = await http.get<{ data: Publishers }>('/publishers')
      return res.data.data
    }
  })

  const publisherOptions = PublisherResponse?.map(item => (
    {
      label: item.name ?? "",
      value: item.id
    }
  )) ?? []

  if (isLoading) {
    return <SpinnerLoading />
  }

  if (!data) {
    return <div>No data</div>
  }

  return (
    <div >
      <div className="flex justify-between">
        <Breadcrumbs />
        <Button className="bg-blue-500 text-white hover:bg-blue-600 mb-2" onClick={() => navigate(-1)}>Back</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Podcast</CardTitle>
          <CardDescription>description Edit Podcast</CardDescription>
        </CardHeader>

        <form onSubmit={form.handleSubmit(data => onSubmit(data))} >
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <Form {...form}>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Title of your Podcast"
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
                        <Input
                          placeholder="Description about podcast"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cover_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <FormControl>
                        <SingleFileCover
                          value={form.watch('cover_url', field.value)}
                          onChange={(file) => {
                            if (file) {
                              form.setValue('cover_image', file) // dong nay co nghia la luu gia tri vao form
                              const preview = URL.createObjectURL(file)
                              form.setValue('cover_url', preview)
                              field.onChange(preview) // dong nay co nghia la cap nhat field cover_url
                            }
                          }}
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
                          value={field.value?.toString()}
                          onChange={(item) => {
                            field.onChange(item?.value)
                          }}
                          options={publisherOptions}
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
                          placeholder="Slug about podcast"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

              </Form>
            </div>

          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">Save</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
