import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { DataTable } from "@/components/ui/data-table/data-table"
import http from "@/utils/http"
import { columns } from "./columns"
import { Tag, Tags, TagsSchema } from "../shema"
import { useSearchParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function TagOverview() {
  useEffect(() => {
    if (!localStorage.getItem("PER_PAGE")) localStorage.setItem("PER_PAGE", "10")
  }, [])

  const [searchParams] = useSearchParams()
  const page = searchParams.get("page") || 1
  const per_page = localStorage.getItem("PER_PAGE") ?? "10"

  const { data, isLoading, error } = useQuery({
    queryKey: ["tags", page, per_page],
    queryFn: () => http.get<{ data: Tags; meta?: { total: number } }>("/tags", { params: { page, per_page } }),
  })

  if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin" /></div>
  if (error) return <p className="text-red-500">Failed to load tags</p>

  const tags = TagsSchema.parse(data?.data.data ?? [])

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 flex justify-end">
        <Button asChild>
          <Link to="/portal/tags/create">New</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={tags as unknown as Tags} meta={data?.data?.meta as any} fieldTitle="name" pageIndex={Number(page) - 1} pageSize={Number(per_page)} />
    </div>
  )
}
