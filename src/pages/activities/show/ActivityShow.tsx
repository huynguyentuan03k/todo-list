import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Activity, ActivitySchema } from "../shema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"

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

  /**
   * vì zod type của activity có lúc là array có lúc là object nên phải "TYPE GUARD" trước, rồi mới gọi giá trị để làm việc đc
  */
  let old = null
  let newData = null
  let filter = null

  if (typeof activity.properties == 'object'
    &&
    !Array.isArray(activity.properties)
  ) {
    filter = Object.entries(activity.properties?.attributes ?? {}).map(([key, value]) => {
      return [key, value]
    })

    old = activity.properties?.old ?? filter
    newData = activity.properties?.attributes
  }


  /**
   * console.log(Object.entries(newData ?? {}))

Array(5) [ (2) […], (2) […], (2) […], (2) […], (2) […] ]
 0: Array [ "id", 12 ]
 1: Array [ "name", '{"en": "Tiểu Thuyết", "vi": "Novel"}' ]
 2: Array [ "description", "des" ]
 3: Array [ "created_at", "2026-02-08T13:47:22.000000Z" ]
 4: Array [ "updated_at", "2026-02-13T04:38:18.000000Z" ]

   *
   *
   * Trong HTML:
  <tr> = 1 hàng ngang (table row)
  <td> = 1 ô trong hàng đó (table cell)

  <tr>
    <td>A</td>
    <td>B</td>
    <td>C</td>
  </tr>
  → hiển thị 1 hàng ngang gồm 3 cột
  A | B | C

  muốn hiển thị  1 row có 2 cell thì làm như này, trong 1 tr chỉ đc chứa th or td
  <tr>
      <td>A</td>
      <td>B</td>
  </tr>


*/
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
            </div>

          </div >
        </CardContent >

        <div className="relative bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right text-body table-fixed">
            <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  NAME
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  OLD
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  NEW
                </th>
              </tr>
            </thead>
            <tbody className="max-w-full">
              {
                // lưu ý ở đoạn này dữ liệu lẩy ra destructering ( [key,value],index )
                // lưu ý logic trong toàn bộ trang này phải hiểu và nhớ , nếu old bị null thì lấy ra attributess tức là dữ liệu mới

                Object.entries(old ?? {}).map(([key, value], index) => {
                  const isLast = index === (Object.entries(old ?? {}).length - 1);

                  return (
                    <tr className="bg-neutral-primary border-b border-default">

                      {/* name */}
                      <td scope="row" className="px-6 py-4 font-medium text-heading whitespace-normal break-all ">
                        {Array.isArray(value) ? value[0] : key}
                      </td>

                      {/* old */}
                      <td scope="row" className="px-6 py-4 font-medium text-heading whitespace-normal break-all ">
                        {Array.isArray(value) ? '' : value}
                      </td>

                      {/* new */}
                      {/* tôi muốn phần tử cuối phải có 1 ui riêng */}
                      <td scope="row" className={`px-6 py-4 font-medium text-heading whitespace-normal break-all `}>
                        {
                          Object.entries(newData ?? {})[index][1]
                        }
                      </td>
                    </tr>
                  )
                }
                )
              }
            </tbody>
          </table>
        </div>

        <div>
        </div>
        <div>

        </div>

      </Card >
    </div >
  )
}
