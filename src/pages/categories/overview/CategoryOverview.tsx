import { DataTable } from "./data-table"
import { columns } from "./columns"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { CategoryResponse, Categories, CategoriesSchema } from "../shema"
import http from "@/utils/http"
import { useNavigate, useSearchParams } from "react-router-dom"


const getCategories = (page: number | string = 1, per_page: number | string = 10) => {

  const response = http.get<CategoryResponse<Categories>>("/categories", {
    params: { page, per_page },
    // tuc la khi response luon tra ve kieu nay : type PublisherResponse<Publishers>
  })

  return response
}

export default function CategoryOverview() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || 1
  const per_page = searchParams.get('per_page') || 10

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

  const pagination = {
    page: data?.data.meta.current_page ?? 1,
    perPage: data?.data.meta.per_page ?? 10,
    totalPage: data?.data.meta.total ?? 0,
    lastPage: data?.data.meta.last_page ?? 1,
    onPageChange: (newPage: number) => {
      navigate(`?page=${newPage}&per_page=${per_page}`)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable
        pagination={pagination}
        columns={columns}
        data={Categories}
      />
    </div>
  )
}
