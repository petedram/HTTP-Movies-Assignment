import React, { useState, useEffect } from "react";
import axios from "axios";

const newItem = {
    id: "",
    title: "",
    director: "",
    metascore: '',
    stars: ['']
  };

const AddMovie = props => {

    const [newMovie, setNewMovie] = useState(newItem);
    console.log('props', props);

      const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
    
 //update to handle array of stars
        setNewMovie({
          ...newMovie,
          [ev.target.name]: value
        });
        console.log('item after change', newMovie);

      };

    const handleSubmit = e => {
        e.preventDefault();
        axios
          .post(`http://localhost:5000/api/movies/`, newMovie)
          .then(res => {
            props.updateItems(res.data);
          })
          .catch(err => {
            console.log(err);
          });
          props.history.push("/");

      };



    return (
        <div>
          <h2>Add Movie</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              onChange={changeHandler}
              placeholder="title"
              value={newMovie.title}
            />
            <div className="baseline" />
    
            <input
              type="text"
              name="director"
              onChange={changeHandler}
              placeholder="director"
              value={newMovie.director}
            />
            <div className="baseline" />
    
            <input
              type="string"
              name="metascore"
              onChange={changeHandler}
              placeholder='0'
              value={newMovie.metascore}
            />
            <div className="baseline" />
    
            {newMovie.stars.map(star => (
            <input
                type='string'
                name='stars'
                onChange={changeHandler}
                placeholder='stars'
                value={star}
                key={star} 
                className="movie-star"
            />
          ))}
            <div className="baseline" />
    
    
            <button className="md-button form-button">Update</button>
          </form>
        </div>
      );
};

export default AddMovie;
