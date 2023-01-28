import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavigationBar = ({ searchMovie, setSearchQuery }) => {
    const usenavigate = useNavigate();
    const [usernamedisplay, setUsernameDisplay] = useState("");

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        // console.log(username);
        if (username === "" || username === null) {
            setUsernameDisplay("");
        } else {
            setUsernameDisplay(username);
        }
    }, []);

    return (
        <>
            <div className="navigationBar">
                <nav>
                    <div className="logo">
                        Recommender <span>System</span>
                    </div>
                    <div className="nav-items">
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        <li>
                            {usernamedisplay === "" ? (
                                <Link to="/login">Login</Link>
                            ) : (
                                <span className="navSpan">
                                    Welcome <b className="navB">{usernamedisplay}</b>
                                </span>
                            )}
                        </li>

                        <li>{usernamedisplay === "" ? <span></span> : <Link to="/login">Logout</Link>}</li>
                    </div>
                    <form id="searchMovie" onSubmit={searchMovie}>
                        <input type="text" placeholder="Search Movie Here" id="searchValue" className="search-data" onChange={setSearchQuery} />
                    </form>
                </nav>
            </div>
        </>
    );
};
