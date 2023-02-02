import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const NavigationBar = ({ searchMovie, setSearchQuery }) => {
    const [usernamedisplay, setUsernameDisplay] = useState("");
    const [userrole, setUserRole] = useState("");
    const [currenturl, setCurrentUrl] = useState("");

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        let role = sessionStorage.getItem("role");
        setUserRole(role);
        if (username === "" || username === null) {
            setUsernameDisplay("");
        } else {
            setUsernameDisplay(username);
        }

        const curl = window.location.href;
        setCurrentUrl(curl);
    }, []);

    return (
        <>
            <div className="navigationBar">
                <nav>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <div className="logo">
                            Recommender <span>System</span>
                        </div>
                    </Link>

                    <div className="nav-items">
                        <li>{userrole === "Admin" && <Link to="/admindashboard">Dashboard</Link>}</li>

                        <li>
                            {usernamedisplay === "" ? (
                                <Link to="/login">Login</Link>
                            ) : (
                                <span className="navSpan">
                                    Welcome, <b className="navB">{usernamedisplay}</b>
                                </span>
                            )}
                        </li>

                        <li>{usernamedisplay !== "" && <Link to="/login">Logout</Link>}</li>
                    </div>
                    {currenturl === "http://localhost:3000/" && (
                        <form id="searchMovie" onSubmit={searchMovie}>
                            <input type="text" placeholder="Search Movie Here" id="searchValue" className="search-data" onChange={setSearchQuery} />
                        </form>
                    )}
                </nav>
            </div>
        </>
    );
};
