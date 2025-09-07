import { Form, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { getStudent } from "@/apis/students.api";
import { Student } from "@/types/students.type";
import HeaderPage from "@/pages/components/custom/HeaderPage";

export default function Contact() {
  const { contactId } = useParams()

  const [student, setStudent] = useState<Student>()

  useEffect(() => {
    if (contactId) {
      getStudent(contactId)
        .then(response => setStudent(response.data))
    }
  }, [contactId])

  return (
    <div id="contact">
      <HeaderPage />
      <Avatar>
        <AvatarImage sizes="" src={student?.avatar} />
        <AvatarFallback>Fail</AvatarFallback>
      </Avatar>

      <div>
        <h1>page show</h1>
        <Favorite student={student} />

        <h1>Id: {student?.id}</h1>
        <h1>First Name: {student?.first_name}</h1>
        <h1>Last Name: {student?.last_name}</h1>
        <h1>Email: {student?.email}</h1>
        <h1>Btc Address: {student?.btc_address}</h1>
        <h1>Country: {student?.country}</h1>
        <h1>Gender: {student?.gender}</h1>
        <h1>Dob: {student?.dob}</h1>
        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

type props = {
  student: Student | undefined
}
function Favorite({ student }: props) {
  const favorite = student?.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
