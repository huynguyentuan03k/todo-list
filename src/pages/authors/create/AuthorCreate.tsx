import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import http from "@/utils/http"
import { Author } from "../shema"
import { useToast } from "@/components/ui/hooks/use-toast"
import { useForm, SubmitHandler } from "react-hook-form"
import { AxiosError } from "axios"
import { Textarea } from "@/components/ui/textarea"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"

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

async function createAuthor(data: Author) {
  return http.post<Author>(`/authors`, data);
}

export default function AuthorCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const { register, handleSubmit, formState: { errors } } = useForm<Author>()

  const onSubmit: SubmitHandler<Author> = (data) => {
    mutation.mutate(data)
  }

  const mutation = useMutation({
    mutationFn: createAuthor,
    onSuccess: () => {
      toast({
        title: "create author successfully",
        description: "author has been store.",
      });
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid grid-cols-3 gap-x-4 gap-y-6">

              <div className="flex flex-col col-span-1 space-y-2 ">
                <Label htmlFor="name">Name</Label>
                <Input {...register('name', { required: true })} id="name" placeholder="Name of your Author" />
                {errors.name && <span className="text-xs text-red-500">This field is required</span>}
              </div>

              <div className="flex flex-col col-span-2 space-y-2 ">
                <Label htmlFor="bio">bio</Label>
                <Textarea {...register('bio')} placeholder="Bio your here." />
              </div>

              <div className="flex flex-col col-span-1 space-y-2 ">
                <Label htmlFor="avatar">Avatar</Label>
                <Input {...register('avatar',)} id="avatar" placeholder="Avatar of your" />
              </div>

              <div className="flex flex-col col-span-1 space-y-2 ">
                <Label htmlFor="email">Email</Label>
                <Input {...register('email',)} id="email" placeholder="Email of your" />
              </div>

              <div className="flex flex-col col-span-1 space-y-2 ">
                <Label htmlFor="website">Website</Label>
                <Input {...register('website',)} id="website" placeholder="Website of your" />
              </div>

            </div>
          </CardContent>
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
