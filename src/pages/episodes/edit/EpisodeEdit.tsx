import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Episode, episodeForm, EpisodeSchema } from "../shema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import { SubmitHandler, useForm } from "react-hook-form"
import { useEffect } from "react"
import { useToast } from "@/components/ui/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { ComboboxSelect } from "@/pages/components/custom/ComboboxSelect"
import { Podcasts } from "@/pages/podcasts/schema"
import { MultiSeclectOptions } from "@/pages/components/custom/MultiSelectCustom"


export default function EpisodeEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const updateEpisode = (episode: episodeForm) => http.put<Episode>(`/episodes/${id}`, episode);

  const { data, isLoading } = useQuery({
    queryKey: ['episode', id],
    queryFn: () => http.get<{ data: Episode }>(`/episodes/${id}`)
  })

  const { data: podcastOptions = [], isLoading: podcastIsLoading } = useQuery<MultiSeclectOptions[] | undefined>({
    queryKey: ['podcasts'],
    queryFn: async () => {
      const res = await http.get<{ data: Podcasts }>(`/podcasts`)

      return res.data.data.map(item => (
        {
          value: item.id,
          label: item.title
        }
      ))
    }
  })

  const form = useForm<episodeForm>({
    defaultValues: {
      title: data?.data.data.title ?? '',
      description: data?.data.data.description ?? '',
      slug: data?.data.data.slug ?? '',
      audio_path: data?.data.data.audio_path ?? '',
    }
  })

  // Update form values when data is loaded
  useEffect(() => {
    if (data?.data?.data) {
      const episode = EpisodeSchema.parse(data.data.data)
      form.reset({
        title: episode.title ?? '',
        description: episode.description ?? '',
        slug: episode.slug ?? '',
        audio_path: episode.audio_path ?? '',
      })
    }
  }, [data, form])

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

  const onSubmit: SubmitHandler<episodeForm> = (data) => {
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
        <form onSubmit={form.handleSubmit(data => onSubmit(data))} >
          <CardContent>
            <Form {...form}>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Title of your Podcast"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1 lg:col-span-1 md:col-span-2">
                <FormField
                  control={form.control}
                  name="podcast_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Podcast Id</FormLabel>
                      <FormControl>
                        <ComboboxSelect
                          {...field}
                          value={field.value}
                          options={podcastOptions}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1 lg:col-span-1 md:col-span-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description about podcast"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1 lg:col-span-1 md:col-span-2">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Slug about podcast"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">Save</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
