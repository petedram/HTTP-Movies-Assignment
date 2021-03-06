import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleDeleteMovie = () => {
    const urlDelete = 'http://localhost:5000/api/movies/'+this.state.movie.id;
    console.log('delete', urlDelete);

    axios
    .delete(urlDelete)
        .then(res => {
            console.log('response after del', res);
            this.props.history.push('/');
    })
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <a href="#" onClick={this.handleDeleteMovie} className="delete-button">DELETE</a>        
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <Link className="edit-button" to={`/update-movie/${this.state.movie.id}`}>Edit</Link>
      </div>
    );
  }
}
