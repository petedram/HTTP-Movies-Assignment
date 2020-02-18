import React, { useState, useEffect } from "react";
import axios from "axios";

const initialItem = {
    id: "",
    title: "",
    director: "",
    metascore: '',
    stars: ['']
  };

const UpdateMovie = props => {
    const [item, setItem] = useState(initialItem);
    const { id } = props.match.params;
    console.log('props', props);

    useEffect(() => {

        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
          setItem(res.data);
          console.log('from axios', res.data);
        })
        .catch(err => console.log(err));
    }, []);

      const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
    

        //update to handle array of stars
        setItem({
          ...item,
          [ev.target.name]: value
        });
        console.log('item after change', item);

      };

    const handleSubmit = e => {
        e.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${item.id}`, item)
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
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={item.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={item.director}
        />
        <div className="baseline" />

        <input
          type="string"
          name="metascore"
          onChange={changeHandler}
          placeholder='0'
          value={item.metascore}
        />
        <div className="baseline" />

        {item.stars.map(star => (
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

}

export default UpdateMovie;
