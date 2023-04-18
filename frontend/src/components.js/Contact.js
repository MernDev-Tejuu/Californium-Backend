import React from "react";
// import "../component.css/Contact.css"
import { FcStart } from "react-icons/fc";
import { BsLinkedin, BsYoutube } from "react-icons/bs";
import { FaTwitter, FaUserTie } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { MdEmail, MdCall, MdMessage } from "react-icons/md";
const Contact = () => {
  return (
    <div className="Contact-bg-color">
      <div className="Contact-bg-container">
        <div className="grid-contact">
          <div className="grid-baby">
            <MdEmail /> Email<br></br>tejasgade921@gmail.com
          </div>
          <a
            href="https://youtu.be/FAfSdJl4HiI"
            id="contact-header"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "} 
            <div className="grid-baby">
              <FcStart /> Youtube<br></br>Arduino Robotics
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/tejas-gade-34440b244/"
            id="contact-header"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="grid-baby">
              <BsLinkedin /> Linkdin<br></br>connect me
            </div>
          </a>
        </div>
        <br></br>
        <div className="login-outer-container">
          <form>
            <legend>How Can We Help?</legend>
            <fieldset className="fieldset">
              <lable for="First name">
                <FaUserTie />
                First name :{" "}
              </lable>
              <input type="text" id="form-firstName" />
              <br></br>
              <label for="last name">
                <FaUserTie /> Last name :{" "}
              </label>
              <input type="text" id="form-lastName" />
              <br></br>
              <label for="phone">
                <MdCall />
                Phone :{" "}
              </label>
              <input type="text" id="form-phone" />
              <br></br>
              <label for="message">
                <MdMessage /> Your Message :
              </label>
              <input type="text" id="text-message" />
              <button id="login-button">Send Message</button>
            </fieldset>
          </form>

          <div className="login-inner-container">
            <a
              href="https://www.linkedin.com/in/tejas-gade-34440b244/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsLinkedin />
            </a>
            <a
              href="https://youtu.be/FAfSdJl4HiI"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsYoutube />
            </a>
            <a
              href="https://www.linkedin.com/in/tejas-gade-34440b244/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/tejas-gade-34440b244/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GrInstagram /> 
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
