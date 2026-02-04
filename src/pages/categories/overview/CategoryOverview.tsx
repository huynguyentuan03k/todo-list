import { DataTable } from "@/components/ui/data-table/data-table"
import { columns } from "./columns"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { CategoryResponse, Categories, CategoriesSchema } from "../shema"
import http from "@/utils/http"
import { useSearchParams } from "react-router-dom"


const getCategories = (page: number | string = 1, per_page: number | string = 10) => {

  const response = http.get<CategoryResponse<Categories>>("/categories", {
    params: { page, per_page },
    // tuc la khi response luon tra ve kieu nay : type PublisherResponse<Publishers>
  })

  return response
}

export default function CategoryOverview() {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || 1
  const per_page = searchParams.get('per_page') || '10'

  const { data, isLoading, error } = useQuery({
    queryKey: ['Categories', page, per_page],
    queryFn: () => getCategories(page, per_page),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500">Failed to load categories</p>
  }

  const Categories = CategoriesSchema.parse(data?.data.data ?? [])

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={Categories}
        meta={data?.data?.meta}
        fieldTitle="title"
        pageIndex={0}
        pageSize={Number(per_page)}
      />
    </div>
  )
}
