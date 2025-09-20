import { DataTable } from "./data-table"
import { columns } from "./columns"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { Publishers, PublishersSchema } from "../shema"
import http from "@/utils/http"


const getPublishers = (page: number | string = 1, limit: number | string = 10) =>
  http.get<Publishers>("/publishers", {
    params: { page, limit },
  })

export default function PublishersOverview() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['publishers'],
    queryFn: () => getPublishers(1, 10),
  })
  console.log(data)
  if (isLoading) {
    <div className="flex justify-center py-10">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  }

  if (error) {
    return <p className="text-red-500">Failed to load publishers</p>
  }


  const publishers = PublishersSchema.parse(data?.data?.data ?? [])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={publishers} />
    </div>
  )
}
