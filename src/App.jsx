import { BrowserRouter, Route, Routes } from "react-router-dom"
import StudentPage from "./pages/StudentPage"

function App() {
  return <BrowserRouter>
     <Routes>
      <Route path="/" element = {<StudentPage />}/>
     </Routes>
  </BrowserRouter>
}

export default App