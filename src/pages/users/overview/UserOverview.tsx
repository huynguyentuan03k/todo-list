import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import http from "@/utils/http"
import { Button } from "@/components/ui/button"
import { Link, useSearchParams } from "react-router-dom"
import { DataTable } from "@/components/ui/data-table/data-table"
import { columns } from "./columns"
import { UsersSchema, type Users } from "../shema"

export default function UserOverview() {
  useEffect(() => {
    if (!localStorage.getItem("PER_PAGE")) localStorage.setItem("PER_PAGE", "10")
  }, [])
  const [searchParams] = useSearchParams()
  const page = searchParams.get("page") || 1
  const per_page = localStorage.getItem("PER_PAGE") ?? "10"
  const { data, isLoading } = useQuery({
    queryKey: ["users", page, per_page],
    queryFn: () => http.get<{ data: Users; meta?: { total: number } }>("/users", { params: { page, per_page } }),
  })
  if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin" /></div>
  const users = UsersSchema.parse(data?.data.data ?? [])
  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 flex justify-end">
        <Button asChild><Link to="/portal/users/create">New</Link></Button>
      </div>
      <DataTable columns={columns} data={users as unknown as Users} meta={data?.data.meta as any} fieldTitle="name" pageIndex={Number(page)-1} pageSize={Number(per_page)} />
    </div>
  )
}
