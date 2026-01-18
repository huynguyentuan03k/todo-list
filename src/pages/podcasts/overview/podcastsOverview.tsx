import { DataTable } from "@/components/ui/data-table/data-table"
import { columns } from "./columns"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { PodcastResponse, Podcasts, PodcastsSchema } from "../schema"
import http from "@/utils/http"
import { useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"


const getPodcasts = (page: number | string = 1, per_page: number | string = 10) => {

  const response = http.get<PodcastResponse<Podcasts>>("/podcasts", {
    params: { page, per_page },
    // tuc la khi response luon tra ve kieu nay : type PublisherResponse<Publishers>
  })

  return response
}

export default function PodcastsOverview() {
  localStorage.setItem('PER_PAGE', '10')
  const per_page = localStorage.getItem('PER_PAGE') ?? 10

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || 1

  const { data, isLoading, error } = useQuery({
    queryKey: ['podcasts', page, per_page],
    queryFn: () => getPodcasts(page, per_page),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500">Failed to load podcasts</p>
  }

  const podcasts = PodcastsSchema.parse(data?.data.data ?? [])

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between">
        <Breadcrumbs />
        <Link to={'/portal/podcasts/create'}>
          <Button className="ml-2 mb-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg shadow">
            New
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={podcasts}
        meta={data?.data.meta}
      />
    </div>
  )
}
