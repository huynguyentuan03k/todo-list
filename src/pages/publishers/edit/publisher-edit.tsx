
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "../../components/custom/DatePicker"
import { PhoneInput } from "../../components/custom/PhoneInput"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Publisher, PublisherSchema } from "../shema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import { useForm, SubmitHandler } from "react-hook-form"


export default function PublisherEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const getPublisher = (id: number) => http.get<{ data: Publisher }>(`/publishers/${id}`);

  const { data, isLoading } = useQuery({
    queryKey: ['publisher'],
    queryFn: () => getPublisher(Number(id))
  })

  // React Hook Form
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Publisher>()

  const onSubmit: SubmitHandler<Publisher> = (data) => console.log(data)

  if (isLoading) {
    return <SpinnerLoading />
  }

  const publisher = PublisherSchema.parse(data?.data.data)


  // Mutation update


  return (
    <div>
      <div className="flex justify-end">
        <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => navigate(-1)}>Back</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Publisher</CardTitle>
          <CardDescription>description Edit Publisher</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} >
          <CardContent>
            <div className="grid grid-cols-3 gap-4">

              <div className="flex flex-col col-span-1">
                <Label htmlFor="name" >Name</Label>
                <Input id="name" {...register} defaultValue={publisher.name} placeholder="Name of your publisher" />
              </div>

              <div className="flex flex-col col-span-1">
                <Label htmlFor="address" >Address</Label>
                <Input id="address" placeholder="address of your" />
              </div>

              <div className="flex flex-col col-span-1">
                <Label htmlFor="email" >Email</Label>
                <Input id="email" placeholder="email of your" />
              </div>

              <div className="flex flex-col col-span-1">
                <Label htmlFor="website" >Website</Label>
                <Input id="website" placeholder="website of your" />
              </div>

              <div className="flex flex-col col-span-1">
                <Label htmlFor="phone" >Phone</Label>
                <Input id="phone" placeholder="phone of your" />
              </div>
              <div className="flex flex-col col-span-1">

                <Label htmlFor="phone">Phone</Label>
                <PhoneInput />
              </div>

              <div className="flex flex-col col-span-1">
                <Label htmlFor="created_at" >Created At</Label>
                <DatePicker value={publisher.created_at} />
              </div>

            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => navigate(-1)}>Save</Button>
          </CardFooter>
        </form>
      </Card>
    </div >
  )
}
