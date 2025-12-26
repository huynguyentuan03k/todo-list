import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Episode, EpisodeSchema } from "../shema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useToast } from "@/components/ui/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"


export default function EpisodeEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const updateEpisode = (episode: Episode) =>
    http.put<Episode>(`/episodes/${id}`, episode);

  // Initialize useForm with empty defaults first
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Episode>({
    defaultValues: {
      title: '',
      description: ''
    }
  })

  const { data, isLoading } = useQuery({
    queryKey: ['episode', id],
    queryFn: () => http.get<{ data: Episode }>(`/episodes/${id}`)
  })
  // Update form values when data is loaded
  useEffect(() => {
    if (data?.data?.data) {
      const episode = EpisodeSchema.parse(data.data.data)
      reset({
        title: episode.title,
        description: episode.description,
      })
    }
  }, [data, reset])

  const newName = watch('title')

  const mutation = useMutation({
    mutationFn: updateEpisode,
    onSuccess: () => {
      toast({
        title: "update episode successfully",
        description: "episode has been store.",
      });
      navigate('/portal/episodes')
    },
    onError: () => {
      toast({
        title: "update episode error",
        description: "cannot update episode.",
      })
    },
  })

  function onSubmit(data: Episode) {
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
          <CardTitle>Edit Episode</CardTitle>
          <CardDescription>description Edit Episode</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(data => onSubmit(data))} >
          <CardContent>
            <div className="grid grid-cols-3 gap-4">

              <div className="flex flex-col col-span-1 gap-y-2">
                <Label htmlFor="title" >Title : {newName}</Label>
                {errors.title && <span>{errors.title.message}</span>}
                <Input id="title" {...register('title', { required: "ten ko de trong" })} placeholder="Title of your episode" />
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
