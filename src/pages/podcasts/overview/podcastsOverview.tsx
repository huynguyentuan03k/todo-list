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
import { Input } from "@/components/ui/input"
import { useEffect, useMemo, useRef } from "react"


const getPodcasts = (
  page: number | string = 1,
  per_page: number | string = 10,
  filters: {
    title?: string,
    description?: string,
  },
  sort: string | "-id",
) => {
  const response = http.get<PodcastResponse<Podcasts>>("/podcasts", {
    params: { page, per_page, filter: filters, sort },
    // tuc la khi response luon tra ve kieu nay : type PublisherResponse<Publishers>
  })

  return response
}

export default function PodcastsOverview() {

  const per_page: number = Number(localStorage.getItem('PER_PAGE')) || 10

  const [searchParams, setSearchParams] = useSearchParams()
  const useRefInput = useRef<HTMLInputElement>(null)

  const sort = searchParams.get("sort") ?? "-id"
  const title = searchParams.get('title') ?? ""
  const page = searchParams.get('page') || 1

  const { data, isLoading, error } = useQuery({
    queryKey: ['podcasts', page, per_page, title, sort],
    queryFn: () => getPodcasts(page, per_page, { title }, sort),
  })

  // useMemo : giúp giữ nguyên địa chỉ cho biến podcasts
  // useMemo Lần render đầu tiên: data chưa có gì -> useMemo chạy -> trả về mảng rỗng.
  // useMemo lan 2 data thay đổi -> useMemo thấy sự thay đổi ở dependency [data] -> chạy lại PodcastsSchema.parse -> trả về danh sách podcast mới.
  // Khi gõ vào ô Input (filter): Component render lại, nhưng data từ API vẫn chưa đổi (vì chưa gọi lại API hoặc API chưa trả kết quả mới)
  // -> useMemo không chạy lại -> nó trả về ngay kết quả đã parse ở bước trước.
  const podcasts = useMemo(() => {
    return PodcastsSchema.parse(data?.data?.data ?? [])
  }, [data])

  // chi can chay 1 lan khi component re-render
  useEffect(() => {

    if (!localStorage.getItem('PER_PAGE')) {
      localStorage.setItem('PER_PAGE', '10')
      if (!isLoading && title && useRefInput.current) {
        useRefInput.current?.focus()
      }
    }

  }, [title, isLoading])

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <div className="flex justify-start py-10 text-red-500">
      Failed to load podcasts
    </div>
  }

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

      <div className="mb-3 flex">
        <Input
          ref={useRefInput}
          placeholder="Filter title..."
          className="sm:max-w-sm max-w-sm"
          value={title}
          onChange={(e) => {

            // không dùng e.target vì TypeScript không đảm bảo target là HTMLInputElement
            const value = e.currentTarget.value

            setSearchParams((pre) => {
              const preNew = new URLSearchParams(pre)
              if (value) {
                preNew.set('title', value)
              } else {
                preNew.delete('title')
              }
              return preNew
            })

            // sau khi set state value trong thi auto focus vao the input
            if (useRefInput.current) {
              useRefInput.current.focus()
            }
          }}
        />
      </div>

      <DataTable
        columns={columns}
        data={podcasts}
        meta={data?.data.meta}
        fieldTitle="title"
        pageIndex={Number(page) - 1}
        pageSize={per_page}
      />
    </div>
  )
}
