import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import http from "@/utils/http"
import { Author, AuthorForm } from "../shema"
import { useToast } from "@/components/ui/hooks/use-toast"
import { useForm, SubmitHandler } from "react-hook-form"
import { AxiosError } from "axios"
import { Textarea } from "@/components/ui/textarea"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"
import { SingleFileAvatar } from "@/pages/components/custom/SingleFileAvatar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
/**
 * {
  "message": "The given data was invalid.",
  "errors": {
    "email": [
      "The email has already been taken."
    ],
    "name": [
      "The name field is required."
    ]
  }
}

Record<string, string[]> la kiểu dựng sẵn (utility type) trong TypeScript.
- errors là một object
- Key: tên field (vd: "email", "name") → string
- Value: mảng chứa các message → string[]
*/

type LaravelValidationError = {
  message: string;
  errors: Record<string, string[]>;
};

async function createAuthor(data: AuthorForm) {
  const formData = new FormData();
  formData.append('avatar', "");
  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('website', data.website);
  formData.append('bio', data.bio);

  return http.post<Author>(`/authors`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export default function AuthorCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const form = useForm<AuthorForm>({
    defaultValues: {
      name: "",
      bio: "",
      email: "",
      website: "",
      avatar: undefined,
    }
  })

  const onSubmit: SubmitHandler<AuthorForm> = (data) => {
    mutation.mutate(data)
  }

  const mutation = useMutation({
    mutationFn: createAuthor,
    onSuccess: () => {
      toast({
        title: "create author successfully",
        description: "author has been store.",
      });
      queryClient.invalidateQueries({ queryKey: ['authors'] })
      navigate('/portal/authors')
    },
    onError: (error: AxiosError<LaravelValidationError>) => { // axios faild luon tra ra AxiosError<T>
      const backendMessage = error?.response?.data?.message || "Something went wrong";
      toast({
        title: "update author failed",
        description: backendMessage,
        variant: "destructive",
      });
    }

  })

  return (
    <div>
      <div className="flex justify-between">
        <Breadcrumbs />
        <Button className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg mb-2" onClick={() => navigate(-1)}>Back</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Create Author</CardTitle>
          <CardDescription>description Create Author</CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <Form {...form}>
            <CardContent>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-6">

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
                  name="avatar"
                  render={({ field }) => (
                    <FormItem className="row-span-2">
                      <FormLabel>Avatar</FormLabel>
                      <div className="flex">
                        <FormControl className="">
                          <SingleFileAvatar
                            {...field}
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

              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
              >Save</Button>
            </CardFooter>
          </Form>
        </form>
      </Card>
    </div >
  )
}
