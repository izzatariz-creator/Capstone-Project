import React, { useState, useEffect } from "react";
import { NavigationBar } from "./NavigationBar";
import "../App.css";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "api_key=9bf3ce744d5c5df6ca18c4875bbb36f2";
const POPULARMOVIE_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;
const API_IMG = "https://image.tmdb.org/t/p/w500/";

const MovieCard = ({ title, poster_path, overview, vote_average }) => {
    //determine the color of rating
    const getRatingColor = (rating) => {
        if (rating >= 8) {
            return "green";
        } else if (rating >= 5) {
            return "orange";
        } else {
            return "red";
        }
    };

    // display all movie card
    return (
        <div className="movieCard">
            <img src={poster_path ? API_IMG + poster_path : "https://placehold.co/1080x1580"} alt="Movie"></img>

            <div className="info">
                <h3>{title}</h3>
                <span style={{ color: getRatingColor(vote_average) }}>{vote_average}</span>
            </div>

            <div className="overview">
                <h3>Overview</h3>
                {overview}
                <br />
                <br />
                <button type="button">Similar Movie</button>
            </div>
        </div>
    );
};

export const Home = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState([]);

    //using axios to fetch movie from api
    useEffect(() => {
        const fetchMovies = async () => {
            const { data } = await axios.get(POPULARMOVIE_URL);
            setMovies(data.results);
            console.log(data.results);
        };

        fetchMovies();
    }, []);

    //Function to search movie
    const searchMovie = async (e) => {
        e.preventDefault();

        if (query.length > 0) {
            try {
                const url = `${SEARCH_URL}&query=${query}`;
                const res = await fetch(url);
                const data = await res.json();
                // console.log(data.total_results);
                setMovies(data.results);
            } catch (e) {
                console.log(e);
            }
        } else {
            const fetchMovies = async () => {
                const { data } = await axios.get(POPULARMOVIE_URL);
                setMovies(data.results);
            };

            fetchMovies();
        }
    };

    //Function to set search query
    const setSearchQuery = (e) => {
        setQuery(e.target.value);
    };

    return (
        <>
            <div>
                <NavigationBar searchMovie={searchMovie} setSearchQuery={setSearchQuery} />

                {movies.length > 0 ? (
                    <div className="movieList">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} {...movie} />
                        ))}
                    </div>
                ) : (
                    <div className="movieList">{/* <p className="warning">Sorry! No Movies Found</p> */}</div>
                )}
            </div>
        </>
    );
};
