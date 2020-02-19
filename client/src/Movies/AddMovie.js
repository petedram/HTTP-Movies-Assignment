import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./Movie";

const newItem = {
    id: "",
    title: "",
    director: "",
    metascore: '',
    stars: ['one','two','three'],
  };

const AddMovie = props => {

    const [newMovie, setNewMovie] = useState(newItem);
    console.log('props', props);

      const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
    
 //update to handle array of stars

        if (ev.target.name === 'stars') {
            console.log('count', ev.target.name);
            
            // newMovie.stars[0] = ev.target.value
            // // newMovie.forceUpdate();
                
        } else {
            setNewMovie({
                ...newMovie,
                [ev.target.name]: value
              });
        }

        console.log('change', ev.target.name);
        console.log('item after change', newMovie);

      };

    const handleSubmit = e => {


        // adding to text box addes to stars[0]
        // button to add star: creates new input and adds to stars.length+1 i.e. stars[1]




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

            <input
                type='string'
                name='stars'
                onChange={changeHandler}
                placeholder='star'
                value={newMovie.stars[0]}
            />
       
            <div className="baseline" />
    
    
            <button className="md-button form-button">Update</button>
          </form>
        </div>
      );
};

export default AddMovie;
