import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const usenavigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            let inputobj = { username: username, password: password };
            fetch("https://localhost:7160/api/Auth/login", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(inputobj),
            })
                .then((res) => {
                    return res.json();
                })
                .then((resp) => {
                    console.log(resp);
                    if (Object.keys(resp).length === 0) {
                        toast.error("Login failed, invalid credentials");
                    } else {
                        toast.success("Success");
                        sessionStorage.setItem("username", username);
                        // sessionStorage.setItem("jwttoken", resp.jwtToken);
                        usenavigate("/");
                    }
                })
                .catch((err) => {
                    toast.error("Login Failed due to :" + err.message);
                });
        }
    };

    const validate = () => {
        let result = true;
        if (username === "" || username === null) {
            result = false;
            toast.warning("Please Enter Username");
        }
        if (password === "" || password === null) {
            result = false;
            toast.warning("Please Enter Password");
        }
        return result;
    };

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
                <form onSubmit={ProceedLoginusingAPI} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>
                                    User Name <span className="errmsg">*</span>
                                </label>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>
                                    Password <span className="errmsg">*</span>
                                </label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>{" "}
                            &nbsp; | &nbsp;
                            <Link className="btn btn-success" to={"/register"}>
                                New User
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
