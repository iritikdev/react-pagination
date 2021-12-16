import React, { Component } from "react";
import { getMovies } from "../service/fakeMovieService";
import Like from "./Like";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import Genre from "./genre";

class Movies extends Component {
  state = {
    currentPage: 1,
    movies: getMovies(),
    pageSize: 4
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    let count = this.state.movies.length;

    const { movies: allMovie, pageSize, currentPage } = this.state;

    const movies = paginate(allMovie, currentPage, pageSize);

    return (
      <>
        <div className="row">
          <div className="col-3">
            <Genre />
          </div>
          <div className="col">
            <p className="alert alert-primary mt-3 p-2" role="alert">
              {count === 0
                ? "There is no movies in database."
                : `Showing ${count} movies in the database.`}
            </p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie._id}>
                    <th>{movie.title}</th>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        liked={movie.liked}
                        onClick={() => this.handleLike(movie)}
                      />
                    </td>
                    <td onClick={() => this.handleDelete(movie)}>
                      <ion-icon name="trash-outline"></ion-icon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Movies;
