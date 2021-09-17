import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import {
    useParams
  } from "react-router-dom";
import { api } from "../../config.json";
import axiosConfig from '../../Utils/axiosConfig';
import { BsThreeDotsVertical } from "react-icons/bs";



function SearchScreen() {
    let { searchparam } = useParams();

    useEffect(() => {
        console.log(searchparam);
      }, [])

  const videos = useSelector((state) => (state.video && state.video.data) || []);
  const user = useSelector((state) => (state.account && state.account.username) || []);

  const history = useHistory();
  // const [videos, setVideos] = useState();

  // useEffect(() => {
  //   axios
  //   .get(api + "/fetchall")
  //   .then(response => {setVideos(response.data); console.log(response.data)});
  // }, []);

  const watchlater = (videoId) => {

    console.log(user);
    const add = {
      "username": user,
      "videoId": videoId
    }
    axios
    .post(api + "/watchlater", add, axiosConfig)
  }



    return (
        <span  className='App'>
        <h2 style={{paddingLeft: 4}}>Search result for '{searchparam}'</h2>

        <div className="grid-container">

        {videos && videos.filter(video => video.name.toLowerCase().includes(searchparam)).map(vid => 
        
        <div className="grid-item">

<a><img className="video-pic" onClick={() => history.push(`/video/${vid._id}`)} src={vid.thumbnail} /></a>
        
        <div style={{lineHeight: 0.5, marginTop: 10, textAlign: 'left'}}>
        <p><a style={{fontWeight: 'bold'}} onClick={() => history.push(`/video/${vid._id}`)}>{vid.name}</a></p>
        <div style={{float: 'right'}}><a onClick={() => watchlater(vid._id)}><BsThreeDotsVertical/></a></div>
        <p>{vid.author.username}</p>
        <p>{vid.views} views</p>
        </div>
        </div>
        
        )

          }
        </div>


      </span>
    );
  }
  

export default SearchScreen;