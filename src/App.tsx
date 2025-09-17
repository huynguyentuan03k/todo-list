import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import About from "./pages/About"


// sau này bạn có thể thêm page ContactsDetail.tsx cho chi tiết user
// import ContactDetail from "./pages/contacts/contact-detail"
function Publisher() {
  return (
    <>
      <h3>publisher</h3>
    </>
  )
}
export default function App() {
  return (
    <Routes>
      <Route path="/" >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="portal/publishers" element={<Publisher />} />
      </Route>
    </Routes>
  )
}
