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
import { Categories } from "@/pages/categories/shema"
import { Authors } from "@/pages/authors/shema"
import MultiSelectCustom, { MultiSeclectOptions } from "@/pages/components/custom/MultiSelectCustom"

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
  formData.append("description", data.description);
  formData.append("slug", data.slug)

  // trong formdata khong chap du lieu cua phuong thuc append(name,value), cho value la string or Blob bao gom File
  // chi chap nhan : string , blob (file, FileList, etc.)
  // muon truyen 1 mang vao formdata phai tao 1 field va append du lieu mang vao field do

  formData.append("publisher_id", String(data.publisher_id))
  if (data.author_ids.length > 0) {
    data.author_ids.forEach((item) => formData.append('author_ids[]', item.toString()))
  }

  if (data.category_ids.length > 0) {
    data.category_ids.forEach(item => formData.append('category_ids[]', item.toString()))
  }

  return http.post<PodcastForm>(`/podcasts`, formData, {
    headers: {
      "Content-Type": "Multipart/form-data",
      "Accept": "application/json"
    }
  });
}

export default function PodcastCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const { data: publisherOptions = [] } = useQuery<MultiSeclectOptions[] | undefined>({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await http.get<{ data: Publishers }>(`/publishers`)
      return res.data.data.map(item => ({ value: item.id, label: item.name ?? "Unkown" })) ?? []
    }
  })


  // <Categories/>   => res.data la 1 mang
  // <{ data: Categories}>   => res.data.data la 1 mang
  // <{ dataCategories: Categories}>   => res.data.dataCategories la 1 mang
  //<{ dataCategories: Categories }> KHÔNG phải JSX ,
  // Nó là generic của TypeScript Dùng để nói cho TS biết API trả về object có field dataCategories chứa Categories
  // const {data : categories } = obj , day la cu phap js destructuring co nghia la : const categories = obj.data
  /**
   * res.data => {
   *  data: Categories,
   *  meta ,
   *  links ,
   * }  bang voi obj , obj.data duoc , nhu ban da thay meta va link ko biet co type gi ?
   */
  const { data: CategoriesOptions = [], isLoading } = useQuery<MultiSeclectOptions[] | undefined>({
    // useQuery<MultiSeclectOptions[]> tuc la data bên trong kết quả của useQuery có kiểu là MultiSeclectOptions[] | undefined
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await http.get<{ data: Categories }>('/categories')
      return res.data.data.map(item => ({ value: item.id, label: item.name ?? "Unkown" })) ?? []
    }
  })

  // lan dau res.data.data thuong xuyen bi undefined nen hay can than
  const { data: AuthorsOptions = [], isLoading: isAuthorLoading } = useQuery<MultiSeclectOptions[] | undefined>({
    queryKey: ['authors'],
    queryFn: async () => {
      const res = await http.get<{ data: Authors }>("/authors")
      return res.data.data.map(item => ({ value: item.id, label: item.name ?? "Unkown" })) ?? []
    }
  })

  //
  const form = useForm<PodcastForm>({
    defaultValues: {
      title: "",
      description: "",
      slug: "",
      publisher_id: undefined,
      cover_url: "",
      category_ids: [],
      author_ids: [],
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
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-6">

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
                          {...field}
                          options={publisherOptions ?? []}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="category_ids"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categories</FormLabel>
                      <FormControl>
                        <MultiSelectCustom
                          overflowBehavior="wrap"
                          isLoading={isLoading}
                          value={field.value.map(String)}
                          onChange={(items: string[]) => {
                            field.onChange(items)
                          }}
                          options={CategoriesOptions ?? []}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/*
                hien tai co 3 layer
                1 / ui component (MultiSelectCustom)
                2 / Form State (react-hook-form)
                3 / API payload
                */}
                <FormField
                  control={form.control}
                  name="author_ids"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Authors</FormLabel>
                      <FormControl>
                        <MultiSelectCustom
                          overflowBehavior="wrap"
                          isLoading={isAuthorLoading}
                          value={field.value.map(String)}
                          options={AuthorsOptions ?? []}
                          onChange={(items: string[]) => {
                            field.onChange(items)
                          }}
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
