import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Author, AuthorForm, AuthorSchema } from "../shema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect } from "react"
import { useToast } from "@/components/ui/hooks/use-toast"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SingleFileAvatar } from "@/pages/components/custom/SingleFileAvatar"
import { Textarea } from "@/components/ui/textarea"


export default function AuthorEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const updateAuthor = async (data: AuthorForm) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("bio", data.bio ?? "");
    formData.append("email", data.email ?? "");
    formData.append("website", data.website ?? "");

    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }

    return http.post<Author>(`/authors/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };


  const form = useForm<AuthorForm>({
    defaultValues: {
      name: "",
      bio: "",
      email: "",
      website: "",
      avatar: undefined,
      avatar_url: undefined,
    }
  })

  const { data, isLoading } = useQuery({
    queryKey: ['author', id],
    queryFn: () => http.get<{ data: Author }>(`/authors/${id}`)
  })

  // Update form values when data is loaded
  useEffect(() => {
    if (data?.data?.data) {
      const author = AuthorSchema.parse(data.data.data)
      form.reset({
        name: author.name ?? '',
        bio: author.bio ?? '',
        email: author.email ?? '',
        website: author.website ?? '',
        avatar: undefined,
        avatar_url: author.avatar_url ?? '',
      })
    }
  }, [data, form])


  const mutation = useMutation({
    mutationFn: updateAuthor,
    onSuccess: () => {
      toast({
        title: "update author successfully",
        description: "author has been store.",
        variant: "default",
      });
      navigate('/portal/authors')
    },
    onError: () => {
      toast({
        title: "update author error",
        description: "cannot update author .",
        variant: "destructive",
      })
    },
  })

  const onSubmit: SubmitHandler<AuthorForm> = (data) => {
    mutation.mutate(data)
  }

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
          <CardTitle>Edit Author</CardTitle>
          <CardDescription>description Edit Author</CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(data => onSubmit(data))} >
          <CardContent>
            <div className="grid grid-cols-3 gap-4">

              <Form {...form}>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name of your Author"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem className="h-15">
                      <FormLabel>Bio</FormLabel>
                      <FormControl className="d">
                        <Textarea
                          className="min-h-[70px]"
                          placeholder="Bio your here"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="avatar_url"
                  render={({ field }) => (
                    <FormItem className="row-span-2">
                      <FormLabel>Avatar</FormLabel>
                      <div className="flex">
                        <FormControl className="">
                          <SingleFileAvatar
                            value={field.value}
                            onChange={(file) => {
                              if (file) {
                                form.setValue("avatar", file)
                                form.setValue("avatar_url", URL.createObjectURL(file))
                              }
                            }}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email of your"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Website of your"
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
