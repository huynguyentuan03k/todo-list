import { DataTable } from "@/components/ui/data-table/data-table"
import { columns } from "./columns"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { AuthorResponse, AuthorsSchema, Authors } from "../shema"
import http from "@/utils/http"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"


const getAuthors = (page: number | string = 1, per_page: number | string = 10) => {

  const response = http.get<AuthorResponse<Authors>>("/authors", {
    params: { page, per_page },
    // tuc la khi response luon tra ve kieu nay : type PublisherResponse<Publishers>
  })

  return response
}

export default function AuthorOverview() {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || 1
  const per_page = localStorage.getItem('PER_PAGE') ?? '10'

  useEffect(() => {
    localStorage.setItem('PER_PAGE', '10')
  }, [])

  const { data, isLoading, error } = useQuery({
    queryKey: ['Authors', page, per_page],
    queryFn: () => getAuthors(page, per_page),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500">Failed to load Authors</p>
  }

  const Authors = AuthorsSchema.parse(data?.data.data ?? [])

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={Authors}
        meta={data?.data?.meta}
        fieldTitle='title'
        pageIndex={0}
        pageSize={Number(per_page)}
      />
    </div>
  )
}
