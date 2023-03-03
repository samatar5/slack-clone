import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Channel from "./views/Channel";

export default function App() {
  return (
    <div className="main-container">
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={<div className="chat-section">chat section</div>}
        />
        <Route path="/:id" element={<Channel />} />
      </Routes>
    </div>
  );
}
