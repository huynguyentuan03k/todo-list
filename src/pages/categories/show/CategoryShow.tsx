import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Categories, Category, CategoriesSchema, CategorySchema } from "../shema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"

export default function CategoryShow() {
  const navigate = useNavigate()
  const { id } = useParams()

  const getCategory = (id: number) => http.get<{ data: Category }>(`/categories/${id}`)

  const { data, isLoading } = useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategory(Number(id))
  })

  if (isLoading) {
    return <SpinnerLoading />
  }

  const category = CategorySchema.parse(data?.data.data)

  return (
    <div>
      <div className="flex w-full justify-end">
        <Button className=" bg-blue-500 text-white hover:bg-blue-600 " onClick={() => navigate(-1)}>Back</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>category Detail</CardTitle>
          <CardDescription>Thông tin chi tiết của category</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col col-span-1">
              <Label>Name</Label>
              <p>{category.name}</p>
            </div>

            <div className="flex flex-col col-span-2">
              <Label>Description</Label>
              <p>{category.description}</p>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
