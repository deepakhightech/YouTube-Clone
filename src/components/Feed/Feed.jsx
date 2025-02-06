import React from "react";
import "./Feed.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import thumbnail2 from "../../assets/thumbnail2.png";
import thumbnail3 from "../../assets/thumbnail3.png";
import thumbnail4 from "../../assets/thumbnail4.png";
import thumbnail5 from "../../assets/thumbnail5.png";
import thumbnail6 from "../../assets/thumbnail6.png";
import thumbnail7 from "../../assets/thumbnail7.png";
import thumbnail8 from "../../assets/thumbnail8.png";
import { Link } from "react-router-dom";
import { API_KEY, value_converter, publishedDate } from "../../data";
import { useState, useEffect } from "react";

function Feed({ category }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let videos = [];
    let nextPageToken = "";
    const maxResultsPerPage = 50; // API limit per request
    const totalVideosNeeded = 500; // Target videos
  
    try {
      while (videos.length < totalVideosNeeded) {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=${maxResultsPerPage}&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}${nextPageToken ? `&pageToken=${nextPageToken}` : ""}`;
  
        const response = await fetch(videoList_url);
        const data = await response.json();
  
        if (data.items) {
          videos = [...videos, ...data.items]; // Add new videos
        }
  
        if (data.nextPageToken) {
          nextPageToken = data.nextPageToken; // Get next page
        } else {
          break; // No more pages available
        }
      }
  
      console.log("Total Videos Fetched:", videos.length);
      setData(videos.slice(0, totalVideosNeeded)); // Store exactly 500 videos
  
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };
  
  

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <Link
            to={`Video/${item.snippet.categoryId}/${item.id}`}
            className="card"
            key={index}
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {value_converter(item.statistics.viewCount)}&bull;{" "}
              {publishedDate(item.snippet.publishedAt)}{" "}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

export default Feed;

/*
{
    "kind": "youtube#videoListResponse",
    "etag": "hLZ4ogGNwNEoA5md5_BUy4GFWC8",
    "items": [
      {
        "kind": "youtube#video",
        "etag": "gECtkpXxZZaHgnvGJEXCigMjLEs",
        "id": "itpcsQQvgAQ",
        "snippet": {
          "publishedAt": "2025-01-16T13:03:22Z",
          "channelId": "UCGIY_O-8vW4rfX98KlMkvRg",
          "title": "Nintendo Switch 2 – First-look trailer",
          "description": "Introducing Nintendo Switch 2, the successor to Nintendo Switch, releasing in 2025.\n \nLearn more: https://ninten.do/6003ohKAB",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/itpcsQQvgAQ/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/itpcsQQvgAQ/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/itpcsQQvgAQ/hqdefault.jpg",
              "width": 480,
              "height": 360
            },
            "standard": {
              "url": "https://i.ytimg.com/vi/itpcsQQvgAQ/sddefault.jpg",
              "width": 640,
              "height": 480
            },
            "maxres": {
              "url": "https://i.ytimg.com/vi/itpcsQQvgAQ/maxresdefault.jpg",
              "width": 1280,
              "height": 720
            }
          },
          "channelTitle": "Nintendo of America",
          "tags": [
            "nintendo",
            "game",
            "gameplay",
            "fun",
            "video game",
            "action",
            "adventure",
            "rpg",
            "play",
            "switch",
            "nintendo switch"
          ],
          "categoryId": "20",
          "liveBroadcastContent": "none",
          "localized": {
            "title": "Nintendo Switch 2 – First-look trailer",
            "description": "Introducing Nintendo Switch 2, the successor to Nintendo Switch, releasing in 2025.\n \nLearn more: https://ninten.do/6003ohKAB"
          },
          "defaultAudioLanguage": "en"
        },
        "contentDetails": {
          "duration": "PT2M22S",
          "dimension": "2d",
          "definition": "hd",
          "caption": "false",
          "licensedContent": true,
          "contentRating": {},
          "projection": "rectangular"
        },
        "statistics": {
          "viewCount": "16712782",
          "likeCount": "981652",
          "favoriteCount": "0",
          "commentCount": "95261"
        }
      },   */
