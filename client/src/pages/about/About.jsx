import Topbar from "../../components/topbar/Topbar";
import Footer from "../../components/footer/Footer";
import "./about.css";

export default function About() {
  return (
    <div>
      <Topbar />
      <div className="aboutPageContainer">
        <h1 className="aboutPageTitle">Welcome To Meal Master</h1>
        <div className="aboutContainer">
          <div className="aboutImgContainer">
            <img
              src="/images/FoodImage1.jpeg"
              alt="dish"
              className="homeHeroImg"
            />
          </div>
          <div className="aboutTextContainer">
            <div className="aboutText">
              <h2>Objectives :</h2>
              We Aim at giving the opportunity to every single person, to learn
              cooking in a friendly and joyfull area. Here you will receive
              support from Administrators as well as from other members
            </div>
          </div>
        </div>
        <div className="aboutContainer">
          <div className="aboutTextContainer">
            <div className="aboutText">
              <h2>What we Offer :</h2>
              <ol>
                <li>
                  Vast Recipe Collection: Explore our extensive library of
                  recipes spanning various cuisines and dietary preferences.
                </li>
                <li>
                  Detailed Instructions: Each recipe on our website is
                  accompanied by clear and concise step-by-step instructions.
                </li>
                <li>
                  Tips and Tricks: Enhance your culinary skills with our helpful
                  cooking tips, tricks, and techniques shared by our team of
                  experienced chefs.
                </li>
                <li>
                  Community and Interaction: Meal Master is more than just a
                  collection of recipes. We foster a vibrant community where
                  food enthusiasts can connect, exchange ideas, and share their
                  culinary experiences.
                </li>
              </ol>
            </div>
          </div>
          <div className="aboutImgContainer">
            <img
              src="/images/FoodImage2.jpeg"
              alt="dish"
              className="homeHeroImg"
            />
          </div>
        </div>
        <div className="aboutContainer">
          <div className="aboutImgContainer">
            <img
              src="/images/HeroImage.webp"
              alt="dish"
              className="homeHeroImg thirdImage"
            />
          </div>
          <div className="aboutTextContainer">
            <div className="aboutText">
              <h2>Join Us :</h2>
              <p>
                Have feedback or suggestions? We're always striving to improve
                and cater to our community's needs. Feel free to reach out to us
                with your thoughts and ideas. Your input is invaluable!
              </p>

              <p>
                Thank you for choosing Meal Master. Get ready to embark on a
                culinary adventure like no other!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
