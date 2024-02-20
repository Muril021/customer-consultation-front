import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Edit from "../pages/Edit";
import Error from "../pages/Error";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/registrar' element={<Register />} />
        <Route path='/editar/:id' element={<Edit />} />

        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;