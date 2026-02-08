import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import http from "@/utils/http"
import { CategoryForm } from "../shema"
import { useToast } from "@/components/ui/hooks/use-toast"
import { useForm, SubmitHandler } from "react-hook-form"
import { AxiosError } from "axios"
import { Textarea } from "@/components/ui/textarea"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"
import { FormControl, FormField, FormItem, FormLabel, Form } from "@/components/ui/form"

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

async function createCategory(data: CategoryForm) {
  return http.post<CategoryForm>(`/categories`, data);
}

export default function CategoryCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<CategoryForm> = (data) => {
    mutation.mutate(data)
  }

  const form = useForm<CategoryForm>({
    defaultValues: {
      name: {
        en: '',
        vi: '',
      },
      description: ''
    }
  })

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
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <Form {...form}>

            <CardContent>
              <div className="grid grid-cols-3 gap-x-4 gap-y-6">


                <FormField
                  control={form.control}
                  name="name.en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name en</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name en"
                          {...field}

                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name.vi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name vi</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name vi"
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
                    <FormItem className="h-15">
                      <FormLabel>Description</FormLabel>
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
