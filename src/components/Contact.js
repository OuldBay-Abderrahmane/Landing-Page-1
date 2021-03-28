import React, { useState } from "react";
import "./Contact.css";
import db from "../firebase";
import data from "../data";
import AnchorLink from "react-anchor-link-smooth-scroll";
import ArrowDownwardTwoToneIcon from "@material-ui/icons/ArrowDownwardTwoTone";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("contacts")
      .add({
        name: name,
        email: email,
        message: message,
      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted!");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-app">
      <AnchorLink className="arrow" href="#contact">
        <ArrowDownwardTwoToneIcon />
      </AnchorLink>
      <div className="contact" id="contact">
        {data.contact.map((contact) => (
          <div className="text" key={contact.title_}>
            <h1>{contact.title_}</h1>
            <p>{contact.text_}</p>
          </div>
        ))}
        <form className="form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Message</label>
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button
            type="submit"
            style={{ background: loader ? "#ccc" : " #008080" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
