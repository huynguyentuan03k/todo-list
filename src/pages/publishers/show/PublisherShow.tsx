import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Publisher, PublisherSchema } from "../shema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import { Link } from "react-router-dom"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"

export default function PublisherShow() {
  const navigate = useNavigate()
  const { id } = useParams()

  const getPublisher = (id: number) => http.get<{ data: Publisher }>(`/publishers/${id}`)

  const { data, isLoading } = useQuery({
    queryKey: ['publisher', id],
    queryFn: () => getPublisher(Number(id))
  })

  if (isLoading) {
    return <SpinnerLoading />
  }

  const publisher = PublisherSchema.parse(data?.data.data)

  return (
    <div>
      <div className="flex w-full justify-between">
        <Breadcrumbs />
        <Button className=" bg-blue-500 text-white hover:bg-blue-600 mb-2" onClick={() => navigate(-1)}>Back</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Publisher Detail</CardTitle>
          <CardDescription>Thông tin chi tiết của Publisher</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col col-span-1">
              <Label>Name</Label>
              <p>{publisher.name}</p>
            </div>

            <div className="flex flex-col col-span-1">
              <Label>Address</Label>
              <p>{publisher.address}</p>
            </div>

            <div className="flex flex-col col-span-1">
              <Label>Email</Label>
              <p>{publisher.email}</p>
            </div>

            <div className="flex flex-col col-span-1">
              <Label>Website</Label>
              <Link to={publisher.website ?? ''}>
                <p className="text-blue-500">{publisher.website}</p>
              </Link>
            </div>

            <div className="flex flex-col col-span-1">
              <Label>Phone</Label>
              <p>{publisher.phone}</p>
            </div>

            <div className="flex flex-col col-span-1">
              <Label>Established Year</Label>
              <p>{publisher.established_year}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
