import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Channel from "./views/Channel";
import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");

  return (
    <div className="main-container">
      {name ? (
        <>
          <Sidebar />
          <Routes>
            <Route
              path="/"
              element={<div className="chat-section">chat section</div>}
            />
            <Route path="/:id" element={<Channel username={name} />} />
          </Routes>
        </>
      ) : (
        <div>
          <h1>Välkommen till min slack</h1>
          <button onClick={() => setName("Samatar")}>Login as Samatar</button>
        </div>
      )}
    </div>
  );
}
