import React from "react";

export default function Layout({ children }) {
  return (
    <div className="container">
      <header>
        <h1 className="header--logo">Carozone</h1>

        <p className="header--info">+380931524162</p>
      </header>

      <div className="content">{children}</div>

      <footer className="footer">
        © Ivan Adamchuk 2023
      </footer>
    </div>
  )
}