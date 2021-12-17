import React, { Component } from "react";
import { getMovies } from "../service/fakeMovieService";
import { getGenres } from "../service/fakeGenreService";
import Like from "./Like";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listgroup";
import MoviesTable from "./moviesTable";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: {}
  };
  // it will rendered after rendering the component
  componentDidMount() {
    const genres = [{ name: "All Genre" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

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

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    let count = this.state.movies.length;

    const {
      movies: allMovie,
      pageSize,
      currentPage,
      selectedGenre
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovie.filter((m) => m.genre._id === selectedGenre._id)
        : allMovie;

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <p className="alert alert-primary mt-3 p-2" role="alert">
              {count === 0
                ? "There is no movies in database."
                : `Showing ${filtered.length} movies in the database.`}
            </p>
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
            />
            <Pagination
              itemsCount={filtered.length}
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
