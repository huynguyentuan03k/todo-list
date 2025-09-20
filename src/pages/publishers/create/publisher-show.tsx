
// import { Publisher } from "@/types/publisher.type"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "../../components/custom/DatePicker"
import { PhoneInput } from "../../components/custom/PhoneInput"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function PublisherCreate() {
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Publisher</CardTitle>
        <CardDescription>description Create Publisher</CardDescription>
        <Button onClick={() => navigate(-1)}>Back</Button>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">

            <div className="flex flex-col col-span-1">
              <Label htmlFor="name" >Name</Label>
              <Input id="name" placeholder="Name of your publisher" />
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

              <Label htmlFor="phone" >Phone</Label>
              <PhoneInput />
            </div>

            <div className="flex flex-col col-span-1">
              <Label htmlFor="established_year" >Established Year</Label>
              <DatePicker />
            </div>

          </div>
        </CardContent>
      </CardHeader>
    </Card>

  )
}
