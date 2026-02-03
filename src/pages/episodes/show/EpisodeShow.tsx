import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Episode, EpisodeSchema } from "../shema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"
import { IconEdit } from "@tabler/icons-react"
import { Link } from "react-router-dom"

export default function EpisodeShow() {
  const navigate = useNavigate()
  const { id } = useParams()

  const getEpisode = (id: number) => http.get<{ data: Episode }>(`/episodes/${id}`)

  const { data, isLoading } = useQuery({
    queryKey: ['episode', id],
    queryFn: () => getEpisode(Number(id))
  })

  if (isLoading) {
    return <SpinnerLoading />
  }

  const episode = EpisodeSchema.parse(data?.data.data)

  return (
    <div>
      <div className="flex w-full justify-between">
        <Breadcrumbs />
        <div className="flex gap-2">
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600 mb-2 " onClick={() => navigate(`/portal/episodes/${episode.id}/edit`)}>
            <IconEdit
              color="white"
              size={20}
              className="text-blue-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/portal/episodes/${episode.id}/edit`)
              }}
            />
            Edit
          </Button>
          <Button className=" bg-blue-500 text-white hover:bg-blue-600 mb-2" onClick={() => navigate(-1)}>Back</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>episode Detail</CardTitle>
          <CardDescription>Thông tin chi tiết của episode</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid lg:grid-cols-3 md:grid-cols-4 gap-4">
            <div className="flex flex-col col-span-1 lg:col-span-1 md:col-sapn-2">
              <Label>Title</Label>
              <p className="break-words w-40" >{episode.title}</p>
            </div>

            <div className="flex flex-col col-span-1 lg:col-span-1 md:col-sapn-2 ">
              <Label>Description</Label>
              <p className="break-words w-40">{episode.description}</p>
            </div>


            <div className="flex flex-col col-span-1 lg:col-span-1 md:col-sapn-2 ">
              <Label>Slug</Label>
              <p className="break-words w-40">{episode.slug}</p>
            </div>

            <div className="flex flex-col col-span-1 lg:col-span-1 md:col-sapn-2 ">
              <Label>Podcast Id</Label>
              <p className="break-words w-40">{episode.podcast_id}</p>
            </div>

            <div className="flex flex-col col-span-1 lg:col-span-1 md:col-sapn-2 ">
              <Label>Audio Url</Label>
              <Link
                to={episode.audio_path ?? ''}
                target="_blank"
                className="  hover:cursor-pointer break-words w-40 text-blue-500">{episode.audio_path}</Link>
            </div >

          </div >
        </CardContent >
      </Card >
    </div >
  )
}
