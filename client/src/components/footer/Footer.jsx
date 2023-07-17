import React from "react";
import "./footer.css";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footerWrapper">
        <div className="footerPart">
          <div>
            <h1 className="footerPartTitle">Learn More</h1>
            <ul className="footerPartList">
              <li className="footerPartListItem">
                <Link to="/about" className="notFoundLink">
                  About Us
                </Link>
              </li>
              <li className="footerPartListItem">
                <Link to="/contact" className="notFoundLink">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footerPart footerMid">
          <div>
            <h1 className="footerPartTitle">Advertise</h1>
            <ul className="footerPartList">
              <li className="footerPartListItem">Advertise</li>
              <li className="footerPartListItem">Sponsor</li>
            </ul>
          </div>
        </div>
        <div className="footerPart">
          <div>
            <h1 className="footerPartTitle">Connect</h1>
            <ul className="footerPartList">
              <li className="footerPartListItem">
                <Facebook className="linkIcon" htmlColor="blue" /> Facebook
              </li>
              <li className="footerPartListItem">
                <Twitter className="linkIcon" htmlColor="#00acee" /> Twitter
              </li>
              <li className="footerPartListItem">
                <Instagram className="linkIcon" htmlColor="purple" /> Instagram
              </li>
              <li className="footerPartListItem">
                <LinkedIn className="linkIcon" htmlColor="#0072b1" /> Linked In
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
