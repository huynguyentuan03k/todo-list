import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import http from "@/utils/http"
import { Podcast, PodcastForm, PodcastSchema } from "../schema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import { SubmitHandler, useForm } from "react-hook-form"
import { useEffect, useRef } from "react"
import { useToast } from "@/components/ui/hooks/use-toast"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { ComboboxSelect } from "@/pages/components/custom/ComboboxSelect"
import { Publishers } from "@/pages/publishers/shema"
import { SingleFileCover } from "@/pages/components/custom/SingleFileCover"
import { Textarea } from "@/components/ui/textarea"
import TinyEditor from "@/pages/components/custom/TinyEditor"
import { Authors } from "@/pages/authors/shema"
import MultiSelectCustom from "@/pages/components/custom/MultiSelectCustom"
import { Categories } from "@/pages/categories/shema"
import { ApiErrorResonse } from "@/pages/episodes/edit/EpisodeEdit"
import { AxiosError } from "axios"


export default function PodcastEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  // fix bug ,Nội dung vừa gõ biến mất , Ctrl + Z thì nó hiện lại, biến editorRef.current khi mount mặc định đã OnInit rồi nhé nó là 1 instance và có giá trị rồi
  // cơ bản là khi dùng useRef để chắn trường hợp re-render khi giá trị trong form thay đổi , và chỉ load 1 lần thôi gán cho = true
  const isInitialized = useRef<boolean>(false)
  const queryClient = useQueryClient()

  const updatePodcast = (podcast: PodcastForm) => {
    // trong formData chi chap nhan , string , Blob
    const formData = new FormData();

    if (podcast.cover_image) {
      formData.append('cover_image', podcast.cover_image);
    }

    formData.append('description', podcast.description);
    formData.append('slug', podcast.slug);
    formData.append('title', podcast.title)
    formData.append('content', podcast.content)

    formData.append('publisher_id', podcast.publisher_id?.toString() ?? "")

    // lưu ý là từ string[] nó sẽ chuyền thành ['1','2','3'] => '1,2,3'

    podcast.author_ids?.forEach(id => {
      formData.append('author_ids[]', String(id))
    })
    podcast.category_ids?.forEach(id => {
      formData.append('category_ids[]', String(id))
    })

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

  const onSubmit: SubmitHandler<PodcastForm> = (data) => {
    mutation.mutate(data)
  }

  const form = useForm<PodcastForm>({
    defaultValues: {
      title: data?.data.data.title,
      description: data?.data.data.description ?? undefined,
      slug: data?.data.data.slug ?? undefined,
      cover_image: undefined,
      cover_url: data?.data.data.cover_url ?? undefined,
      publisher_id: data?.data.data.publisher?.id ?? undefined,
      content: data?.data.data.content ?? "",
      author_ids: data?.data.data.categories.map(item => (item.id)) ?? undefined,
      category_ids: data?.data.data.authors.map(item => (item.id)) ?? undefined,
    }
  })

  // Update form values when data is loaded
  useEffect(() => {
    if (data?.data?.data && !isInitialized.current) {
      const podcast = PodcastSchema.parse(data.data.data)
      form.reset({
        title: podcast.title,
        description: podcast.description ?? undefined,
        slug: podcast.slug ?? undefined,
        cover_url: podcast.cover_url ?? undefined,
        publisher_id: podcast.publisher?.id ?? undefined,
        cover_image: undefined,
        content: podcast.content ?? "",
        author_ids: podcast.authors.map(item => (item.id)) ?? [],
        category_ids: podcast.categories.map(item => (item.id)) ?? [],
      })
      isInitialized.current = true
    }
  }, [data, form])

  const mutation = useMutation({
    mutationFn: updatePodcast,
    onSuccess: () => {
      // invalidate cache của podcast này khi đã thành công update
      queryClient.invalidateQueries({
        queryKey: ['podcasts', id]
      })
      toast({
        title: "update podcast successfully",
        description: "podcast has been store.",
      });
      navigate(`/portal/podcasts/${data?.data.data.id}/show`);
    },
    onError: (error: AxiosError<ApiErrorResonse>) => {
      toast({
        title: "update podcast error",
        description: error.response?.data.message,
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

  const { data: authorsOptions = [], isLoading: isAuthorLoading } = useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const res = await http.get<{ data: Authors }>('/authors')

      return res.data.data.map(item => ({
        value: item.id,
        label: item.name ?? ''
      })) ?? []
    }
  })

  const { data: categoriesOptions = [], isLoading: isCategoryLoding } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await http.get<{ data: Categories }>('/categories')

      return res.data.data.map(item => ({
        value: item.id,
        label: `${item.name?.en}-${item.name?.vi}`
      })) ?? []
    }
  })


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
            <Form {...form}>
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-4 gap-4">

                <div className="col-span-1 lg:col-span-1 md:col-span-2">
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
                </div>

                <div className="col-span-1 lg:col-span-1 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Description about podcast"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-1 lg:col-span-1 md:col-span-2">
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
                </div>

                <div className="col-span-1 lg:col-span-1 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="publisher_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publisher</FormLabel>
                        <FormControl>
                          <ComboboxSelect
                            {...field}
                            options={publisherOptions}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-1 lg:col-span-1 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="author_ids"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Authors</FormLabel>
                        <FormControl>
                          <MultiSelectCustom
                            options={authorsOptions}
                            {...field}
                            value={field.value?.map(item => `${item}`)}
                            isLoading={isAuthorLoading}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-1 lg:col-span-1 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="category_ids"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categories</FormLabel>
                        <FormControl>
                          <MultiSelectCustom
                            options={categoriesOptions}
                            isLoading={isCategoryLoding}
                            {...field}
                            value={field.value?.map(item => `${item}`)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="sm:col-span-3">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TinyMce</FormLabel>
                        <FormControl>
                          <TinyEditor
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                </div>
                <div className="col-span-1 lg:col-span-1 md:col-span-2">
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
                </div>

              </div>
            </Form>

          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">Save</Button>
          </CardFooter>
        </form>
      </Card>
    </div >
  )
}
