import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { ToastContainer } from "react-toastify";
import { AdminDashboard } from "./components/AdminDashboard";
import { AddUser } from "./components/AddUser";
import { AddAdmin } from "./components/AddAdmin";
import { AllUser } from "./components/AllUser";

function App() {
    return (
        <div className="App">
            <ToastContainer theme="colored"></ToastContainer>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/admindashboard" element={<AdminDashboard />}></Route>
                    <Route path="/adduser" element={<AddUser />}></Route>
                    <Route path="/addadmin" element={<AddAdmin />}></Route>
                    <Route path="/alluser" element={<AllUser />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
