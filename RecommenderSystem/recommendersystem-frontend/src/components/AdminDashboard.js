import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { NavigationBar } from "./NavigationBar";

export const AdminDashboard = () => {
    return (
        <>
            <NavigationBar />
            <div class="d-flex flex-column align-items-center justify-content-center mt-5">
                <h1>Admin Dashboard</h1>
                <br></br>
                <Link to="/adduser">
                    <button type="button" class="btn btn-dark btn-lg btn-block">
                        Add User
                    </button>
                </Link>
                <br></br>
                <button type="button" class="btn btn-dark btn-lg btn-block">
                    Add Admin
                </button>
            </div>
        </>
    );
};
