
import { Publisher } from "@/types/publisher.type"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function PublisherShow() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Show Publisher</CardTitle>
        <CardDescription>description Publisher</CardDescription>
        <CardContent>
          <Label htmlFor="name" >Name</Label>
          <Input id="name" placeholder="Name of your publisher" />

          <Label htmlFor="address" >Address</Label>
          <Input id="address" placeholder="address of your" />


          <Label htmlFor="email" >Email</Label>
          <Input id="email" placeholder="email of your" />

          <Label htmlFor="website" >Website</Label>
          <Input id="website" placeholder="website of your" />

          <Label htmlFor="phone" >Phone</Label>
          <Input id="phone" placeholder="phone of your" />

          <Label htmlFor="phone" >Phone</Label>
          <Input id="phone" placeholder="phone of your" />

          <Label htmlFor="established_year" >Established Year</Label>
          <Input id="established_year" placeholder="established_year of your" />

          <Input />
          <Input />
        </CardContent>
      </CardHeader>
    </Card>

  )
}
