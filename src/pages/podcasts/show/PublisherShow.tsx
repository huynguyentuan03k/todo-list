import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Podcast, PodcastSchema } from "../schema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import { Link } from "react-router-dom"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"

export default function PodcastShow() {
  const navigate = useNavigate()
  const { id } = useParams()

  const getPodcast = (id: number) => http.get<{ data: Podcast }>(`/podcasts/${id}`)

  const { data, isLoading } = useQuery({
    queryKey: ['podcast', id],
    queryFn: () => getPodcast(Number(id))
  })

  if (isLoading) {
    return <SpinnerLoading />
  }

  const podcast = PodcastSchema.parse(data?.data.data)

  return (
    <div>
      <div className="flex w-full justify-between">
        <Breadcrumbs />
        <Button className=" bg-blue-500 text-white hover:bg-blue-600 mb-2" onClick={() => navigate(-1)}>Back</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Podcast Detail</CardTitle>
          <CardDescription>Thông tin chi tiết của Podcast</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col col-span-1">
              <Label>Title</Label>
              <p>{podcast.title}</p>
            </div>

            <div className="flex flex-col col-span-1">
              <Label>Description</Label>
              <p>{podcast.description}</p>
            </div>

            <div className="flex flex-col col-span-1">
              <Label>Cover Image</Label>
              <p>{podcast.cover_image}</p>
            </div>

            <div className="flex flex-col col-span-1">
              <Label>Publisher</Label>
              <Link to={`/portal/publishers/${podcast.publisher_id}/show`}>
                <p className="text-blue-500">{podcast.publisher_id}</p>
              </Link>
            </div>

            <div className="flex flex-col col-span-1">
              <Label>Publisher</Label>
              <p>{podcast.publisher_id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
