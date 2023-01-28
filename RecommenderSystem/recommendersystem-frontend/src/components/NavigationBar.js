import React from "react";
import { Link } from "react-router-dom";

export const NavigationBar = ({ searchMovie, setSearchQuery }) => {
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
                    </div>
                    <form id="searchMovie" onSubmit={searchMovie}>
                        <input type="text" placeholder="Search Movie Here" id="searchValue" className="search-data" onChange={setSearchQuery} />
                    </form>
                </nav>
            </div>
        </>
    );
};
