import React from "./notfound.css";
import Topbar from "../../components/topbar/Topbar";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <Topbar />
      <div className="notFoundPage">
        <h1>Oops, looks like you've stumbled upon a missing recipe!</h1>
        <div className="notFoundImgContainer">
          <img
            src="/images/HeroImage.webp"
            alt="dish "
            className="homeHeroImg"
          />
        </div>
        <p>
          But don't worry, our chefs are working hard to whip up new and
          delicious recipes every day. Meanwhile, feel free to explore our
          extensive collection of other mouthwatering recipes.
        </p>
        <p>
          If you believe this is a mistake or have any questions, please don't
          hesitate to reach out to our friendly support team.
        </p>

        <span className="notFoundLink">
          <Link to="/" className="notFoundLink">
            Home
          </Link>{" "}
        </span>
        <span className="notFoundLink">
          <Link to="/contact" className="notFoundLink">
            Contact
          </Link>{" "}
        </span>
      </div>

      <Footer />
    </div>
  );
}
