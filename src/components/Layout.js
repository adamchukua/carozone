import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="container">
      <header>
        <Header/>
      </header>

      <div className="content">{children}</div>

      <footer className="footer">
        <Footer/>
      </footer>
    </div>
  )
}