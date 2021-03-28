import React from "react";
import "./Header.css";
import data from "../data";

export default function Header() {
  return (
    <div>
      <div
        className="green-band"
        style={{ backgroundColor: "#008080", height: "8px" }}
      ></div>
      {data.header.map((header) => (
        <div
          className="header"
          key={header.title_}
          style={{
            backgroundImage: `url('${process.env.PUBLIC_URL + header.image_}')`,
          }}
        >
          <h2> {header.brand_} </h2>
          <h1> {header.title_} </h1>
          <p> {header.text_} </p>
        </div>
      ))}
    </div>
  );
}
