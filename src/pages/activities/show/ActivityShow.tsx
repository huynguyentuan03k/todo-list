import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { ActivitiesSchema, Activity, ActivitySchema } from "../shema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"
import { IconEdit } from "@tabler/icons-react"
import { Link } from "react-router-dom"

export default function ActivityShow() {
  const navigate = useNavigate()
  const { id } = useParams()

  const getActivity = (id: number) => http.get<{ data: Activity }>(`/activities/${id}`)

  const { data, isLoading } = useQuery({
    queryKey: ['activities', id],
    queryFn: () => getActivity(Number(id))
  })

  if (isLoading) {
    return <SpinnerLoading />
  }

  const activity = ActivitySchema.parse(data?.data.data)

  return (
    <div>
      <div className="flex w-full justify-between">
        <Breadcrumbs />
        <div className="flex gap-2">
          <Button className=" bg-blue-500 text-white hover:bg-blue-600 mb-2" onClick={() => navigate(-1)}>Back</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>episode Detail</CardTitle>
          <CardDescription>Thông tin chi tiết của episode</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid lg:grid-cols-3 md:grid-cols-4 gap-4">
            <div className="flex flex-col col-span-1 lg:col-span-1 md:col-sapn-2">
              <Label>Event</Label>
              <span>{activity.event}</span>
            </div>
            <div className="flex flex-col col-span-1 lg:col-span-1 md:col-sapn-2">
              <Label>Log Name</Label>
              <span>{activity.log_name}</span>
            </div>
            <div className="flex flex-col col-span-1 lg:col-span-1 md:col-sapn-2">
              <Label>Subject Type</Label>
              <span>{activity.subject_type}</span>
            </div>
            <div className="flex flex-col col-span-3">
              <Label>Properties</Label>
              {
                typeof activity.properties === 'object' ? (
                  <div>
                    <span>object</span>
                  </div>

                ) : (
                  <span>array</span>
                )
              }
            </div>
          </div >
        </CardContent >
      </Card >
    </div >
  )
}
