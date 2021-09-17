import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  useParams
} from "react-router-dom";
import axios from 'axios';
import { api } from "../../config.json";
import { Link, useHistory } from 'react-router-dom';
import VideoComment from '../../Components/Comment';
import axiosConfig from '../../Utils/axiosConfig';


function VideoScreen() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state)

  const user = useSelector((state) => (state.account && state.account.username) || []);
  const loggedin = useSelector((state) => state.account.user);

  const comments = useSelector((state) => (state.comment && state.comment.comment) || []);

  const placeholder = 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png';
  const pictureStyle = {
    width: 40,
    height: 40,
    borderRadius: 40/2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "red"
  }

const history = useHistory();
let { id } = useParams();
const [video, setVideo] = useState();
const [videos, setVideos] = useState();
const [comment, setComment] = useState();
  
const fetchSuggest = async () => {
  await axios
  .get(api + "/fetchall")
  .then(response => {setVideos(response.data); console.log(response.data)});
}

const fetchCurrentVid = async () => {
  await axios
  .post(api + "/fetchvideo", {"_id": id})
  .then(response => {setVideo(response.data); dispatch({type:'GetComment', payload: response.data.comment}); comments.map(c => ({...c, showChild: false, 
    showReply: false}));});
}

const postComment = async () => {
  const newVideo = {
    "_id": id,
    "username": user,
    "comment": comment,
  }
  console.log(comments)

  await axios
  .post(api + "/postcomment", newVideo, axiosConfig)
  .then(response => {fetchCurrentVid()});
}


useEffect(() => {
  fetchSuggest();
  fetchCurrentVid()
}, [id]);


  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
    <div style={{flex: 7, padding: 5}}>
    {video && <video width="100%" height="550vh" controls autoPlay >
      <source src={video.uri} type="video/mp4" />
      Your browser does not support the video tag.
    </video>}
    <h5 style={{color: 'white'}}>{video && video.name}</h5>
    <p>{video && video.views} views</p>
    <hr style={{borderColor: 'gray', marginBottom: 5, height: 0.2}}/>
    <img src={placeholder} style={pictureStyle}/>
    <span style={{fontWeight: 'bolder'}}> <a onClick={()=> console.log('america') }>{video && ' ' + video.author.username}</a></span>
    <div style={{marginTop: 15, alignContent: 'center', textAlign: 'left'  }}>
    <a style={{color: 'gray'}} onClick={() => console.log('placeholder')}>Open description</a>
    <hr style={{borderColor: 'gray'}}/>
    </div>
    <div style={{marginTop: 15}}>
    <h6>Comments ({video && video.comment.length})</h6>
    <div style={{padding: 10}}>
      {loggedin && <React.Fragment><textarea 
      style={{ borderColor: 'white', color: 'white', backgroundColor: 'black', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottomStyle: 'solid', borderBottomWidth: 1, cursor: 'auto', padding: 5 }}
      type="text"
      placeholder='Comment'
      value={comment}
      onChange={(event) => setComment(event.target.value)}
      className="form-control" />
      <div style={{textAlign: 'right', marginTop: 3}}>
      <button className="btn btn-outline-light my-2 my-sm-0" onClick={() => postComment()}>Post comment</button></div></React.Fragment>}
      {comments && comments.filter(comment => !comment.parent).map(comment => <VideoComment videoId={id} _id={comment._id} restart={() => fetchCurrentVid()} />)}

    </div>
    </div>
    </div>



    <div style={{flex: 3}}>
    <h5 style={{marginTop: 10}}>Similar videos</h5>
    {videos && video && videos.filter(vid => vid.tag == video.tag).map(vid => 
        
        <div style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>

        <a><img style={{width: '120px', height: '100px'}} onClick={() => {history.replace(`/video/${vid._id}`); history.go(0)}} src={vid.thumbnail} /></a>
        
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', marginLeft: 4}}>
        <p><a style={{fontWeight: 'bold', textOverflow: 'ellipsis'}} onClick={() => {history.replace(`/video/${vid._id}`); history.go(0)}}>{vid.name}</a></p>
        <div style={{display: 'flex', flexDirection: 'column'}}>
        <span>{vid.author.username}</span>
        <span>{vid.views} views</span>
        </div>
        </div>
        </div>
        
        )

          }
    </div>
    
    
    
    </div>


);
}

export default VideoScreen;