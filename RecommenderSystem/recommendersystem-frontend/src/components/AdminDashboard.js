import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { NavigationBar } from "./NavigationBar";

export const AdminDashboard = () => {
    return (
        <>
            <NavigationBar />
            <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                <h1>Admin Dashboard</h1>
                <br></br>
                <br></br>
                <h3>User Management</h3>
                <br></br>
                <Link to="/adduser">
                    <button type="button" className="btn btn-dark btn-lg btn-block" style={{ width: "200px" }}>
                        Add User
                    </button>
                </Link>
                <br></br>
                <Link to="/addadmin">
                    <button type="button" className="btn btn-dark btn-lg btn-block" style={{ width: "200px" }}>
                        Add Admin
                    </button>
                </Link>
                <br></br>
                <Link to="/alluser">
                    <button type="button" className="btn btn-dark btn-lg btn-block" style={{ width: "200px" }}>
                        All User
                    </button>
                </Link>

                <br></br>
                <br></br>
                <h3>Movie Management</h3>
                <br></br>
                <Link to="/movie">
                    <button type="button" className="btn btn-dark btn-lg btn-block" style={{ width: "200px" }}>
                        Manage Movie
                    </button>
                </Link>
            </div>
        </>
    );
};
