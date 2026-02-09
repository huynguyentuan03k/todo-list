import { DataTable } from "@/components/ui/data-table/data-table"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { Activities, ActivitiesSchema, ActivityResponse } from "../shema"
import http from "@/utils/http"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { columns } from './columns'


const getActivities = (page: number | string = 1, per_page: number | string = 10) => {

  const response = http.get<ActivityResponse<Activities>>("/activities", {
    params: { page, per_page },
    // tuc la khi response luon tra ve kieu nay : type PublisherResponse<Publishers>
  })

  return response
}

export default function ActivityOverview() {

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const per_page = localStorage.getItem('PER_PAGE') ?? '10'

  useEffect(() => {
    if (!localStorage.getItem('PER_PAGE')) {
      localStorage.setItem('PER_PAGE', '10')
    }
  }, [])
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['Activities', page, per_page],
    queryFn: () => getActivities(page, per_page),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500">Failed to load episode</p>
  }

  const episodes = ActivitiesSchema.parse(data?.data.data ?? [])

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={episodes}
        meta={data?.data?.meta}
        fieldTitle="title"
        pageIndex={Number(page) - 1}
        pageSize={Number(per_page)}
      />
    </div>
  )
}
