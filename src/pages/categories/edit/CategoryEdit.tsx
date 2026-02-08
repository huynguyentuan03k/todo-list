import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Category, CategoryForm, CategorySchema } from "../shema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useToast } from "@/components/ui/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"


export default function CategoryEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const updateCategory = (category: CategoryForm) => {
    console.log("update ", category)
    http.put<CategoryForm>(`/categories/${id}`, category);
  }

  const { data, isLoading } = useQuery({
    queryKey: ['category', id],
    queryFn: () => http.get<{ data: Category }>(`/categories/${id}`)
  })


  // Initialize useForm with empty defaults first
  const form = useForm<CategoryForm>({
    defaultValues: {
      name: {
        en: '',
        vi: '',
      }
    }
  })


  // Update form values when data is loaded
  useEffect(() => {
    if (data?.data?.data) {
      const category = CategorySchema.parse(data.data.data)
      form.reset({
        name: {
          en: category.name?.en ?? undefined,
          vi: category.name?.vi ?? undefined,
        },
        description: category.description ?? undefined,
      })
    }
  }, [data, form])



  const mutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      toast({
        title: "update category successfully",
        description: "category has been store.",
      });
      navigate('/portal/categories')
    },
    onError: () => {
      toast({
        title: "update category error",
        description: "cannot update category .",
      })
    },
  })

  function onSubmit(data: CategoryForm) {
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
          <CardTitle>Edit Category</CardTitle>
          <CardDescription>description Edit Category</CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(data => onSubmit(data))} >

          <Form {...form}>

            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

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
              <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">Save</Button>
            </CardFooter>
          </Form>
        </form>
      </Card>
    </div>
  )
}
