import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"


function VideoCard({ title, author, view, image }) {
  return (
    <div className="grid-item">
    <img className="video-pic" src={image} alt="W3Schools.com"/>
    <div style={{lineHeight: 0.5, marginTop: 10, textAlign: 'left'}}>
    <p style={{fontWeight: 'bold'}}>{title}</p>
    <p>{author}</p>
    <p>{view} views</p>
    </div>
    </div>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;
