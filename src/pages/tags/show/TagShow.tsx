import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SpinnerLoading } from "@/components/custom/SpinnerLoading"
import { getTag } from "@/apis/tags.api"
import { TagSchema } from "../shema"

export default function TagShow() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({ queryKey: ["tag", id], queryFn: () => getTag(Number(id)) })
  if (isLoading) return <SpinnerLoading />
  const tag = TagSchema.parse(data?.data.data)
  return (
    <Card>
      <CardHeader><CardTitle>Tag Detail</CardTitle></CardHeader>
      <CardContent className="grid gap-3">
        <div><strong>Name:</strong> {tag.name}</div>
        <div><strong>Slug:</strong> {tag.slug}</div>
      </CardContent>
      <div className="flex justify-end gap-2 p-6 pt-0">
        <Button variant="outline" onClick={() => navigate(`/portal/tags/${tag.id}/edit`)}>Edit</Button>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
      </div>
    </Card>
  )
}
