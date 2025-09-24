
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
import { useForm, } from "react-hook-form"

export default function PublisherEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['publisher', id],
    queryFn: () => http.get<{ data: Publisher }>(`/publishers/${id}`)
  })


  if (isLoading) {
    <SpinnerLoading />
  }

  const publisher = PublisherSchema.parse(data?.data.data)


  // React Hook Form , register dang ky filed voi form, handleSubmit dung de validation truoc khi goi callback
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Publisher>({
    defaultValues: {
      name: publisher.name,
      email: publisher.email,
      address: publisher.address,
      website: publisher.website,
      phone: publisher.phone
    }
  })

  // const onSubmit: SubmitHandler<Publisher> = (data) => console.log(data)
  function onSubmit(data: Publisher) {
    console.log("data ", data)
  }


  const newName = watch('name')
  return (
    <div >
      <div className="flex justify-end">
        <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => navigate(-1)}>Back</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Publisher</CardTitle>
          <CardDescription>description Edit Publisher</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(data => onSubmit(data))} >
          <CardContent>
            <div className="grid grid-cols-3 gap-4">

              <div className="flex flex-col col-span-1">
                <Label htmlFor="name" >Name : {newName}</Label>
                {errors.name && <span>{errors.name.message}</span>}
                <Input id="name" {...register('name', { required: "ten ko de trong" })} placeholder="Name of your publisher" />
              </div>

              <div className="flex flex-col col-span-1">
                <Label htmlFor="address" >Address</Label>
                <Input {...register('address')} id="address" placeholder="address of your" />
              </div>

              <div className="flex flex-col col-span-1">
                <Label htmlFor="email" >Email</Label>
                <Input {...register("email", {
                  required: "Email là bắt buộc",
                  pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" }
                })} />
                {errors.email && <span>{errors.email.message}</span>}
              </div>

              <div className="flex flex-col col-span-1">
                <Label htmlFor="website" >Website</Label>
                <Input {...register('website')} id="website" placeholder="website of your" />
              </div>

              <div className="flex flex-col col-span-1">
                <Label htmlFor="phone" >Phone</Label>
                <Input {...register('phone')} id="phone" placeholder="phone of your" />
              </div>

              {/* phone */}
              <div className="flex flex-col col-span-1">
                <Label htmlFor="phone">Phone</Label>
                <PhoneInput />
              </div>

              {/* created_at */}
              <div className="flex flex-col col-span-1">
                <Label htmlFor="created_at" >Created At</Label>
                <DatePicker value={publisher.created_at} />
              </div>

            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">Save</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
