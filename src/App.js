import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarList from "./components/carList";
import AddCar from "./components/addCar";
import EditCar from "./components/editCar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="add" element={<AddCar />} />
        <Route path="edit/:id" element={<EditCar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
