import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";

import { api } from "../../config.json";
import { WatchLater } from '@material-ui/icons';
import axiosConfig from '../../Utils/axiosConfig';



function Default() {
  const dispatch = useDispatch();

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
        <h2 style={{paddingLeft: 4}}>Recommended</h2>

        <div className="grid-container">

        {videos && videos.map(vid => 
        
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





        {/* <div className="grid-container">
        <div className="grid-item">
        <img className="video-pic" src="https://im-media.voltron.voanews.com/Drupal/01live-166/styles/sourced/s3/2019-04/8E5F857F-716C-4FD1-835F-93FCCACF17D1.jpg?itok=MyJ4Yb0C" alt="W3Schools.com"/>
        <div style={{lineHeight: 0.5, marginTop: 10, textAlign: 'left'}}>
        <p><a style={{fontWeight: 'bold'}} onClick={() => history.push('/video')}>AmericaAmerica</a></p>
        <p>Donald Trump</p>
        <p>1,000,000 views</p>
        </div>
        </div>
        <div className="grid-item">2</div>
        <div className="grid-item">3</div>  
        <div className="grid-item">4</div>
        <div className="grid-item">5</div>
        <div className="grid-item">6</div>  
        <div className="grid-item">7</div>
        <div className="grid-item">8</div>
        <div className="grid-item">9</div>  
        </div> */}
      </span>
    );
  }
  

export default Default;