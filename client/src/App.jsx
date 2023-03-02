import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";

export default function App() {
  const [channels, setChannels] = useState(null);
  useEffect(() => {
    async function getChannels() {
      const response = await fetch("http://localhost:3000/channels");
      const data = await response.json();
      console.log(data);
      setChannels(data);
    }
    getChannels();
  });

  return (
    <div className="main-container">
      <div className="sidebar">
        {channels
          ? channels.map((channel) => <div>{channel.name}</div>)
          : "loading..."}
      </div>
      <div className="chat-section">chat section</div>
    </div>
  );
}
