import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Podcast, PodcastSchema } from "../schema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useToast } from "@/components/ui/hooks/use-toast"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"
import { Textarea } from "@/components/ui/textarea"
import UploadFile from "@/pages/components/custom/uploadFile"


export default function PodcastEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const updatePodcast = (podcast: Podcast) =>
    http.post<Podcast>(`/podcasts/${id}`, podcast);


  // Initialize useForm with empty defaults first
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Podcast>({
    defaultValues: {
      title: '',
      description: '',
      slug: '',
      cover_image: '',
      publisher_id: null
    }
  })

  const { data, isLoading } = useQuery({
    queryKey: ['podcasts', id],
    queryFn: () => http.get<{ data: Podcast }>(`/podcasts/${id}`)
  })

  // Update form values when data is loaded
  useEffect(() => {
    if (data?.data?.data) {
      const podcast = PodcastSchema.parse(data.data.data)
      reset({
        title: podcast.title,
        description: podcast.description,
        slug: podcast.slug,
        cover_image: podcast.cover_image,
        publisher_id: podcast.publisher_id,

      })
    }
  }, [data, reset])

  const newName = watch('title')

  const mutation = useMutation({
    mutationFn: updatePodcast,
    onSuccess: () => {
      toast({
        title: "update podcast successfully",
        description: "podcast has been store.",
      })
    },
    onError: () => {
      toast({
        title: "update podcast error",
        description: "cannot update podcast .",
      })
    },
  })

  function onSubmit(data: Podcast) {
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
          <CardTitle>Edit Podcast</CardTitle>
          <CardDescription>description Edit Podcast</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(data => onSubmit(data))} >
          <CardContent>
            <div className="grid grid-cols-3 gap-4">

              <div className="flex flex-col col-span-1">
                <Label htmlFor="name" >Title : {newName}</Label>
                {errors.title && <span>{errors.title.message}</span>}
                <Input id="title" {...register('title', { required: "ten ko de trong" })} placeholder="Name of your publisher" />
              </div>

              <div className="flex flex-col col-span-1">
                <Label htmlFor="description" >Description</Label>
                <Textarea
                  className="h-[200px]"
                  {...register('description')} id="description" placeholder="description of your" />
                {/* <Input {...register('description')} id="description" placeholder="address of your" /> */}
              </div>

              <div className="flex flex-col col-span-1">
                <Label htmlFor="cover_image" >cover_image</Label>
                {/* <Input {...register("cover_image", {
                  required: "cover_image là bắt buộc",
                })} /> */}
                <UploadFile />
                {errors.cover_image && <span>{errors.cover_image.message}</span>}
              </div>

              <div className="flex flex-col col-span-1">
                <Label htmlFor="publisher" >publisher</Label>
                <Input {...register('publisher_id')} id="publisher_id" placeholder="website of your" />
              </div>
              <div className="flex flex-col col-span-1">
                <Label htmlFor="slug" >slug</Label>
                <Input {...register('slug')} id="slug" placeholder="website of your" />
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
