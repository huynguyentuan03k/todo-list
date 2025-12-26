import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Author, AuthorSchema } from "../shema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useToast } from "@/components/ui/hooks/use-toast"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"


export default function AuthorEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const updateAuthor = (author: Author) =>
    http.put<Author>(`/authors/${id}`, author);
  // Initialize useForm with empty defaults first
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Author>({
    defaultValues: {
      name: '',
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
      reset({
        name: author.name,
      })
    }
  }, [data, reset])

  const newName = watch('name')

  const mutation = useMutation({
    mutationFn: updateAuthor,
    onSuccess: () => {
      toast({
        title: "update category successfully",
        description: "category has been store.",
      });
      navigate('/portal/authors')
    },
    onError: () => {
      toast({
        title: "update category error",
        description: "cannot update category .",
      })
    },
  })

  function onSubmit(data: Author) {
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
        <form onSubmit={handleSubmit(data => onSubmit(data))} >
          <CardContent>
            <div className="grid grid-cols-3 gap-4">

              <div className="flex flex-col col-span-1 gap-y-2">
                <Label htmlFor="name" >Name : {newName}</Label>
                {errors.name && <span>{errors.name.message}</span>}
                <Input id="name" {...register('name', { required: "ten ko de trong" })} placeholder="Name of your publisher" />
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
