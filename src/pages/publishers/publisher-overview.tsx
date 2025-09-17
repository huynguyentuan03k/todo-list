import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/components/data-table/columns"
import { Publisher } from "@/types/publisher.type"

const data: Publisher[] = [
  {
    id: 1,
    name: "PodcastVN",
    address: "Hà Nội",
    email: "contact@podcastvn.com",
    website: "https://podcastvn.com",
    phone: "0123456789",
    established_year: 2020,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default function PublishersOverview() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
