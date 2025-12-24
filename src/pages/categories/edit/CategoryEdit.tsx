import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Category, CategorySchema } from "../shema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useToast } from "@/components/ui/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"


export default function CategoryEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const updateCategory = (category: Category) =>
    http.put<Category>(`/categories/${id}`, category);

  // Initialize useForm with empty defaults first
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Category>({
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const { data, isLoading } = useQuery({
    queryKey: ['category', id],
    queryFn: () => http.get<{ data: Category }>(`/categories/${id}`)
  })
  // Update form values when data is loaded
  useEffect(() => {
    if (data?.data?.data) {
      const category = CategorySchema.parse(data.data.data)
      reset({
        name: category.name,
        description: category.description,
      })
    }
  }, [data, reset])

  const newName = watch('name')

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

  function onSubmit(data: Category) {
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
        <form onSubmit={handleSubmit(data => onSubmit(data))} >
          <CardContent>
            <div className="grid grid-cols-3 gap-4">

              <div className="flex flex-col col-span-1 gap-y-2">
                <Label htmlFor="name" >Name : {newName}</Label>
                {errors.name && <span>{errors.name.message}</span>}
                <Input id="name" {...register('name', { required: "ten ko de trong" })} placeholder="Name of your publisher" />
              </div>

              <div className="flex flex-col col-span-2 gap-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea className="h-[200px]" id="description" {...register('description')} placeholder="type description here" />
              </div>

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
