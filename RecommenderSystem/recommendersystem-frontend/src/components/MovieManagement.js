import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavigationBar } from "./NavigationBar";

export const MovieManagement = () => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [rating, setRating] = useState([]);
    const [posterId, setPosterId] = useState([]);
    const [genre, setGenre] = useState([]);
    const [movieId, setMovieId] = useState([]);
    const api = "https://localhost:7074/api/Movie/GetMovies";
    const apiadd = "https://localhost:7074/api/Movie/AddMovie";

    const navigate = useNavigate();

    // load all data
    useEffect(() => {
        (async () => await Load())();
    }, []);

    //using axios to get all movies from db
    async function Load() {
        axios
            .get(api)
            .then((res) => {
                setMovies(res.data);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // form validation
    const IsValidate = () => {
        let isproceed = true;
        let errormessage = "Please enter this field:  ";

        if (title === null || title === "") {
            isproceed = false;
            errormessage += " Title";
        }

        if (description === null || description === "") {
            isproceed = false;
            errormessage += " Description";
        }

        if (genre === null || genre === "") {
            isproceed = false;
            errormessage += " Genre";
        }

        if (rating === null || rating === "") {
            isproceed = false;
            errormessage += " Rating";
        }

        if (posterId === null || posterId === "") {
            isproceed = false;
            errormessage += " PosterId";
        }

        if (!isproceed) {
            toast.warning(errormessage);
        } else {
            if (/^[0-9]{0,10}$/.test(rating)) {
            } else {
                isproceed = false;
                toast.warning("Please enter the valid rating (0-10)");
            }

            if (/^\d+$/.test(posterId)) {
            } else {
                isproceed = false;
                toast.warning("Please enter the valid Poster Id");
            }
        }
        return isproceed;
    };

    // function to add new movie
    async function save(e) {
        e.preventDefault();

        if (IsValidate()) {
            await axios
                .post(apiadd, {
                    title: title,
                    description: description,
                    genre: genre,
                    rating: rating,
                    posterId: posterId,
                })
                .then((res) => {
                    toast.success("Movie added successfully");
                    Load();
                })
                .catch((err) => {
                    toast.error("Add failed" + err.message);
                });
        }
    }

    // function to edit movie
    async function editMovie(movie) {
        setTitle(movie.title);
        setDescription(movie.description);
        setMovieId(movie.movieId);
        setGenre(movie.genre);
        setRating(movie.rating);
        setPosterId(movie.posterId);
    }

    // function to delete movie
    async function deleteMovie(id) {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            await axios
                .delete("https://localhost:7074/api/Movie/DeleteMovie/" + id)
                .then((res) => {
                    toast.success("Movie deleted successfully");
                    Load();
                })
                .catch((err) => {
                    toast.error("Delete failed" + err.message);
                });

            setTitle("");
            setDescription("");
            setMovieId("");
            setGenre("");
            setRating("");
            setPosterId("");
            Load();
        }
    }

    // function to reset value inside form
    async function reset() {
        setTitle("");
        setDescription("");
        setMovieId("");
        setGenre("");
        setRating("");
        setPosterId("");
    }

    // function to update movie
    async function update(e) {
        e.preventDefault();

        if (IsValidate()) {
            await axios
                .patch("https://localhost:7074/api/Movie/UpdateMovie/" + movies.find((u) => u.movieId === movieId).movieId || movieId, {
                    title: title,
                    description: description,
                    genre: genre,
                    rating: rating,
                    posterId: posterId,
                    movieId: movieId,
                })
                .then((res) => {
                    toast.success("Movie updated successfully");
                    Load();
                })
                .catch((err) => {
                    toast.error("Login failed" + err.message);
                });
        }
    }

    return (
        <>
            <NavigationBar />

            <div className="offset-lg-3 col-lg-6" style={{ marginTop: "50px" }}>
                <form className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>Movie Management</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    hidden
                                    value={movieId}
                                    onChange={(event) => {
                                        setMovieId(event.target.value);
                                    }}
                                />
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Title <span className="errmsg">*</span>
                                        </label>
                                        <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Description <span className="errmsg">*</span>
                                        </label>
                                        <input value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="description"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Genre <span className="errmsg">*</span>
                                        </label>
                                        <input value={genre} onChange={(e) => setGenre(e.target.value)} className="form-control" id="genre"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Rating <span className="errmsg">*</span>
                                        </label>
                                        <input value={rating} onChange={(e) => setRating(e.target.value)} className="form-control" id="rating"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Poster Id <span className="errmsg">*</span>
                                        </label>
                                        <input value={posterId} onChange={(e) => setPosterId(e.target.value)} className="form-control" id="posterId"></input>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-primary mt-4" onClick={save}>
                                        Add Movie
                                    </button>
                                    &nbsp; &nbsp;
                                    <button className="btn btn-warning mt-4" onClick={update}>
                                        Update Movie
                                    </button>
                                    &nbsp; &nbsp;
                                    <button className="btn btn-dark mt-4" onClick={reset}>
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <br></br>

            <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                <h1>All Movies</h1>
                <br></br>
            </div>

            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.movieId}>
                            <td>{movie.movieId}</td>
                            <td>{movie.title}</td>
                            <td>{movie.description}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.rating}</td>
                            <td>
                                <button type="button" className="btn btn-warning" onClick={() => editMovie(movie)}>
                                    Edit
                                </button>
                                &nbsp; &nbsp;
                                <button type="button" className="btn btn-danger" onClick={() => deleteMovie(movie.movieId)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="d-flex flex-column align-items-center justify-content-center mt-5 mb-5">
                <br></br>
                <Link to="/admindashboard">
                    <button type="button" class="btn btn-dark btn-lg btn-block">
                        Admin Dashboard
                    </button>
                </Link>
            </div>
        </>
    );
};
