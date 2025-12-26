import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Author, AuthorSchema } from "../shema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import Breadcrumbs from "@/pages/components/custom/breadcrumbs"
import { IconEdit } from "@tabler/icons-react"
import { Link } from "react-router-dom"

export default function AuthorShow() {
  const navigate = useNavigate()
  const { id } = useParams()

  const getAuthor = (id: number) => http.get<{ data: Author }>(`/authors/${id}`)

  const { data, isLoading } = useQuery({
    queryKey: ['author', id],
    queryFn: () => getAuthor(Number(id))
  })

  if (isLoading) {
    return <SpinnerLoading />
  }

  const author = AuthorSchema.parse(data?.data.data)

  return (
    <div>
      <div className="flex w-full justify-between">
        <Breadcrumbs />
        <div className="flex gap-2">
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600 mb-2 " onClick={() => navigate(`/portal/authors/${author.id}/edit`)}>
            <IconEdit
              color="white"
              size={20}
              className="text-blue-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/portal/authors/${author.id}/edit`)
              }}
            />
            Edit
          </Button>
          <Button className=" bg-blue-500 text-white hover:bg-blue-600 mb-2" onClick={() => navigate(-1)}>Back</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>author Detail</CardTitle>
          <CardDescription>Thông tin chi tiết của author</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <Label>Name</Label>
              <p>{author.name}</p>
            </div>

            <div className="flex flex-col ">
              <Label>Avatar</Label>
              <p>{author.avatar}</p>
            </div>

            <div className="flex flex-col ">
              <Label>Bio</Label>
              <p>{author.bio}</p>
            </div>

            <div className="flex flex-col ">
              <Label>Email</Label>
              <p>{author.email}</p>
            </div>

            <div className="flex flex-col ">
              <Label>Website</Label>
              <Link to={author.website ?? ''}>
                <p className="text-blue-500">
                  {author.website}
                </p>
              </Link>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
