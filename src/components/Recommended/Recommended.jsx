import React, { useEffect, useState } from "react";
import "./Recommended.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import thumbnail2 from "../../assets/thumbnail2.png";
import thumbnail3 from "../../assets/thumbnail3.png";
import thumbnail4 from "../../assets/thumbnail4.png";
import thumbnail5 from "../../assets/thumbnail5.png";
import thumbnail6 from "../../assets/thumbnail6.png";
import thumbnail7 from "../../assets/thumbnail7.png";
import thumbnail8 from "../../assets/thumbnail8.png";

import { API_KEY,value_converter} from "../../data";
import { Link } from "react-router-dom";

function Recommended({categoryId}) {

  const [apiData,setApiData]=useState([]);

  // const fetchRelatedData=async ()=>{
  //   const relatedVideoData_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=IN&relevanceLanguage=hi&videoCategoryId=${categoryId}&key=${API_KEY}`
  //   await fetch(relatedVideoData_url).then(response=>response.json()).then(data=>setApiData(data.items))
  // }

  const fetchRelatedData = async () => {
    let videos = [];
    let nextPageToken = "";
    const maxResultsPerPage = 50; // API limit
    const totalVideosNeeded = 200;
  
    try {
      while (videos.length < totalVideosNeeded) {
        const relatedVideoData_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=${maxResultsPerPage}&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}${nextPageToken ? `&pageToken=${nextPageToken}` : ""}`;
  
        const response = await fetch(relatedVideoData_url);
        const data = await response.json();
  
        if (data.items) {
          videos = [...videos, ...data.items]; // Append new videos
        }
  
        if (data.nextPageToken) {
          nextPageToken = data.nextPageToken; // Get next page token
        } else {
          break; // No more pages available
        }
      }
  
      console.log("Total Videos Fetched:", videos.length);
      setApiData(videos.slice(0, totalVideosNeeded)); // Store exactly 200 videos
  
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };
  
  
 
  useEffect(()=>{
    fetchRelatedData()
  },[])

  return (
    <div className="recommended">
      {apiData.map((item,index)=>{
        return (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.snippet.viewCount)} Views</p>
          </div>
        </Link>
        )
      })}

      
      
    </div>
  );
}

export default Recommended;
