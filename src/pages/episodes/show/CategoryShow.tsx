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
            className="bg-blue-500 text-white hover:bg-blue-600 mb-2 " onClick={() => navigate(`/portal/epidoes/${episode.id}/edit`)}>
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
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col col-span-1">
              <Label>Title</Label>
              <p>{episode.title}</p>
            </div>

            <div className="flex flex-col col-span-2">
              <Label>Description</Label>
              <p className="whitespace-pre-line">{episode.description}</p>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
