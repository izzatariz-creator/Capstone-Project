import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavigationBar } from "./NavigationBar";
import "../App.css";

export const AddAdmin = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const api = "https://localhost:7074/api/Authenticate/register-admin";

    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = "Please enter this field:  ";

        if (username === null || username === "") {
            isproceed = false;
            errormessage += " Username";
        }

        if (email === null || email === "") {
            isproceed = false;
            errormessage += " Email";
        }

        if (password === null || password === "") {
            isproceed = false;
            errormessage += " Password";
        }

        if (!isproceed) {
            toast.warning(errormessage);
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            } else {
                isproceed = false;
                toast.warning("Please enter the valid email");
            }
        }
        return isproceed;
    };

    const handlesubmit = (e) => {
        e.preventDefault();

        if (IsValidate()) {
            axios
                .post(api, {
                    Username: username,
                    Email: email,
                    Password: password,
                })
                .then((res) => {
                    toast.success("Admin registered");
                    navigate("/admindashboard");
                })
                .catch((err) => {
                    toast.error("Login failed + err.message");
                });
        }
    };

    return (
        <>
            <NavigationBar />

            <div>
                <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card">
                            <div className="card-header">
                                <h2>Add Admin</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>
                                                User Name <span className="errmsg">*</span>
                                            </label>
                                            <input value={username} onChange={(e) => setUsername(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>
                                                Email <span className="errmsg">*</span>
                                            </label>
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>
                                                Password <span className="errmsg">*</span>
                                            </label>
                                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control"></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-dark">
                                    Submit
                                </button>
                                &nbsp; &nbsp;
                                <Link className="btn btn-dark" to={"/admindashboard"}>
                                    Back
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};