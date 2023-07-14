import Footer from "../../components/footer/Footer";
import Topbar from "../../components/topbar/Topbar";
import "./contact.css";

export default function Contact() {
  return (
    <div className="contactContainer">
      <Topbar />

      <div className="contactFormContainer">
        <div>
          <h1 className="contactTitle">Contact Us</h1>
          <p className="contactList">
            <span className="contactMain">Email :</span>
            <span className="contactText ">
              <a href="mailto:emailid@example.com" className="contactMail">
                MyTestEmail@gmail.com
              </a>
            </span>
          </p>
          <p className="contactList">
            <span className="contactMain">Tel 1:</span>
            <span className="contactText">+237 620 000 000</span>
          </p>
          <p className="contactList">
            <span className="contactMain">Tel 2:</span>
            <span className="contactText">+237 670 000 000</span>
          </p>
          <p className="contactList">
            <span className="contactMain">Tel 3:</span>
            <span className="contactText">+237 690 000 000</span>
          </p>
          <p className="contactList">
            <span className="contactMain">Fax :</span>
            <span className="contactText">+123 4567 4564 12345</span>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
