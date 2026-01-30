import { DataTable } from "@/components/ui/data-table/data-table"
import { columns } from "./columns"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { PublisherResponse, Publishers, PublishersSchema } from "../shema"
import http from "@/utils/http"
import { useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"
import { useEffect } from "react"


const getPublishers = (page: number | string = 1, per_page: number | string = 10) => {

  const response = http.get<PublisherResponse<Publishers>>("/publishers", {
    params: { page, per_page },
    // tuc la khi response luon tra ve kieu nay : type PublisherResponse<Publishers>
  })

  return response
}

export default function PublishersOverview() {

  useEffect(() => {
    localStorage.setItem('PER_PAGE', '10')
  }, [])

  const per_page = Number(localStorage.getItem('PER_PAGE')) | 10

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || 1

  const { data, isLoading, error } = useQuery({
    queryKey: ['publishers', page, per_page],
    queryFn: () => getPublishers(page, per_page),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }


  if (error) {
    return (
      <div className="flex justify-center ">
        <div className=" text-red-500 py-11">Failed to load publishers</div>
      </div>
    )
  }

  const publishers = PublishersSchema.parse(data?.data.data ?? [])

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between">
        <Breadcrumbs />
        <Link to={'/portal/publishers/create'}>
          <Button className="ml-2 mb-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg shadow">
            New
          </Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={publishers}
        meta={data?.data.meta}
        fieldTitle="name"
        pageIndex={0}
        pageSize={per_page}
      />
    </div>
  )
}
