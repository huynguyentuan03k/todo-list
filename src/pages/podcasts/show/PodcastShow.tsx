import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Podcast, PodcastShowSchema } from "../schema"
import { EpisodesSchema } from "@/pages/episodes/shema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import { Link } from "react-router-dom"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"
import { IconEdit } from "@tabler/icons-react"
import { ImageIcon } from "lucide-react"
import { ImagePreview } from "@/pages/components/custom/ImagePreview"
import { DataTableEpisode } from "./data-tableEpisode"
import { columnsEpisode } from "./columnsEpisode"

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

  const podcast = PodcastShowSchema.parse(data?.data.data)

  const episodes = EpisodesSchema.parse(podcast.episodes)

  return (
    <div>
      <div className="flex w-full justify-between">
        <Breadcrumbs />
        <div className="flex gap-x-3">
          <Button

            className=" bg-blue-500 text-white hover:bg-blue-600 mb-2"
            onClick={
              () => navigate(`/portal/podcasts/${data?.data.data.id}/edit`)
            }>
            <IconEdit />
            Edit
          </Button>
          <Button className=" bg-blue-500 text-white hover:bg-blue-600 mb-2" onClick={() => navigate(-1)}>Back</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Podcast Detail</CardTitle>
          <CardDescription>Thông tin chi tiết của Podcast</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-4  gap-4">

            <div className="flex flex-col col-span-1 lg:col-span-1 md:col-span-2">
              <Label>Title</Label>
              <p>{podcast.title}</p>
            </div>

            <div className="flex flex-col col-span-1 lg:col-span-1 md:col-span-2">
              <Label>Description</Label>
              <p>{podcast.description}</p>
            </div>

            <div className="flex flex-col col-span-1 lg:col-span-1 md:col-span-2">
              <Label>Publisher</Label>
              <Link to={`/portal/publishers/${podcast.publisher?.id}/show`}>
                <p className="text-blue-500">{podcast.publisher?.name} - ID: {podcast.publisher?.id}</p>
              </Link>
            </div>

            <div className="flex flex-col col-span-1 lg:col-span-1 md:col-span-2">
              <Label>Authors</Label>
              {
                podcast.authors.map((item) => (
                  <Link to={`/portal/authors/${item.id}/show`}>
                    <p className="text-blue-500">{item.name} - ID: {item.id}</p>
                  </Link>
                ))
              }
            </div>

            <div className="flex flex-col col-span-1 lg:col-span-1 md:col-span-2">
              <Label>Categories</Label>
              {
                podcast.categories.map((item) => (
                  <Link to={`/portal/categories/${item.id}/show`}>
                    <p className="text-blue-500">{item.name?.en} - ID: {item.id}</p>
                  </Link>
                ))
              }
            </div>

            <div className="flex flex-col col-span-1 lg:col-span-3 md:col-span-4">
              <Label>TinyMVC</Label>
              <div
                dangerouslySetInnerHTML={{ __html: podcast.content ?? "" }}
              >

              </div>
            </div>

            <div className="flex flex-col col-span-1 lg:col-span-1 md:col-span-2">
              <div className="flex flex-col gap-2">
                <Label>Cover Image</Label>
                {
                  podcast.cover_url ?
                    <ImagePreview
                      src={podcast.cover_url}
                    />
                    : <ImageIcon
                      className="w-full h-full object-cover"
                    />
                }
              </div>
            </div>


          </div>
        </CardContent>
      </Card>

      {/* data table episode */}
      <div className="flex items-end mt-6">
        <Button variant="default" className="ml-auto bg-blue-500 hover:bg-blue-700" onClick={() => navigate(`/portal/episodes/create`)}>New</Button>
      </div>

      <Card className="mt-2">
        <DataTableEpisode
          columns={columnsEpisode}
          /**
           * HÃY ĐỌC KỸ DÒNG NÀY : type của zod khác với type của typescript
            EpisodesSchema.parse là kiểm tra xem dữ liệu có đúng như vậy ko, đúng với shape ko ?
            dữ liệu backend trả về podcast.episodes mặc định có type dự vào cấu hình nhưng phải parse lại bằng zod để kiểm tra shape
            khi đã parse thành công biến episodes mặc định có type
            */
          data={episodes}
        />
      </Card>

    </div >
  )
}
