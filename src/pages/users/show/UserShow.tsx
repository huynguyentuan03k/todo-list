import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { getUser } from "@/apis/users.api"
import { SpinnerLoading } from "@/components/custom/SpinnerLoading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserSchema } from "../shema"

export default function UserShow() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({ queryKey: ["user", id], queryFn: () => getUser(Number(id)) })
  if (isLoading) return <SpinnerLoading />
  const user = UserSchema.parse(data?.data.data)
  return (
    <Card>
      <CardHeader><CardTitle>User Detail</CardTitle></CardHeader>
      <CardContent className="grid gap-3">
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
      </CardContent>
      <div className="flex justify-end gap-2 p-6 pt-0">
        <Button variant="outline" onClick={() => navigate(`/portal/users/${user.id}/edit`)}>Edit</Button>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
      </div>
    </Card>
  )
}
