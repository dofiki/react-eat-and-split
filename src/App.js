import { useState, useEffect } from "react";
import AppContent from "./AppContent";

export default function App() {
  return (
    <>
      <Banner />
      <AppContent />
    </>
);
}

function Banner() {
  return (
    <div className="navBar">
      <div className="logo">
      <img className="logoimg" src="/logo192.png" alt="Logo" />
        EatnSplit
        </div>
      <div className="menuMain">
      
      </div>
    </div>
  );
}