import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "../../components/custom/DatePicker"
import { PhoneInput } from "../../components/custom/PhoneInput"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import http from "@/utils/http"
import { Publisher, PublisherSchema } from "../shema"
import { SpinnerLoading } from "@/pages/components/custom/SpinnerLoading"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useToast } from "@/components/ui/hooks/use-toast"


export default function PublisherEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const updatePublisher = (publisher: Publisher) =>
    http.put<Publisher>(`/publishers/${id}`, publisher);


  // Initialize useForm with empty defaults first
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Publisher>({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      website: '',
      phone: ''
    }
  })

  const { data, isLoading } = useQuery({
    queryKey: ['publisher', id],
    queryFn: () => http.get<{ data: Publisher }>(`/publishers/${id}`)
  })

  // Update form values when data is loaded
  useEffect(() => {
    if (data?.data?.data) {
      const publisher = PublisherSchema.parse(data.data.data)
      reset({
        name: publisher.name,
        email: publisher.email,
        address: publisher.address,
        website: publisher.website,
        phone: publisher.phone
      })
    }
  }, [data, reset])



  const newName = watch('name')



  // useMutation

  const mutation = useMutation({
    mutationFn: updatePublisher,
    onSuccess: () => {
      toast({
        title: "update publisher successfully",
        description: "publisher has been store.",
      })

    },
    onError: () => {
      toast({
        title: "update publisher error",
        description: "cannot update publisher .",
      })
    },
  })

  function onSubmit(data: Publisher) {
    mutation.mutate(data)
  }

  // loading
  if (isLoading) {
    return <SpinnerLoading />
  }

  if (!data) {
    return <div>No data</div>
  }

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

              {/* phone */}
              <div className="flex flex-col col-span-1">
                <Label htmlFor="phone">Phone</Label>
                <PhoneInput />
              </div>

              {/* created_at */}
              <div className="flex flex-col col-span-1">
                <Label htmlFor="created_at" >Created At</Label>
                <DatePicker value={data?.data?.data ? PublisherSchema.parse(data.data.data).created_at : undefined} />
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
