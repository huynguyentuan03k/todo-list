import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import http from "@/utils/http"
import { Category } from "../shema"
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

async function createCategory(data: Category) {
  return http.post<Category>(`/categories`, data);
}

export default function CategoryCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const { register, handleSubmit, formState: { errors } } = useForm<Category>()

  const onSubmit: SubmitHandler<Category> = (data) => {
    mutation.mutate(data)
  }

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast({
        title: "create category successfully",
        description: "category has been store.",
      });
      navigate('/portal/categories')
    },
    onError: (error: AxiosError<LaravelValidationError>) => { // axios faild luon tra ra AxiosError<T>
      const backendMessage = error?.response?.data?.message || "Something went wrong";
      toast({
        title: "update category failed",
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
          <CardTitle>Create Category</CardTitle>
          <CardDescription>description Create Category</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid grid-cols-3 gap-x-4 gap-y-6">

              <div className="flex flex-col col-span-1 space-y-2 ">
                <Label htmlFor="name">Name</Label>
                <Input {...register('name', { required: true })} id="name" placeholder="Name of your Category" />
                {errors.name && <span className="text-xs text-red-500">This field is required</span>}
              </div>

              <div className="flex flex-col col-span-2 space-y-2 ">
                <Label htmlFor="description">Description</Label>
                <Textarea {...register('description')} placeholder="Type your description here." />
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
