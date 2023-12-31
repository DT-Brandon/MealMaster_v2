import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import Main from "../../components/main/Main";
import ProfileInfo from "../../components/Profileinfo/ProfileInfo";
import ChangePassword from "../../components/changePassword/ChangePassword";
import Footer from "../../components/footer/Footer";
import SavedItems from "../../components/saveditems/SavedItems";
import CreatedItems from "../../components/createditems/CreatedItems";

export default function Profile() {
  const [currentPage, setCurrentPage] = useState("Profile Info");
  const pages = [
    { text: "Profile Info", page: <ProfileInfo /> },
    { text: "Modify Password", page: <ChangePassword /> },
    { text: "Favorite Recipes", page: <SavedItems /> },
    { text: "My Recipes", page: <CreatedItems /> },
  ];

  const Page = () => {
    let ThePage;

    pages.forEach((page) => {
      if (page.text === currentPage) {
        ThePage = page.page;
      }
    });
    return ThePage;
  };

  const ThePage = Page();
  /* const PF = process.env.REACT_APP_PUBLIC_FOLDER; */

  return (
    <div className="profileContainer">
      <Topbar />
      <div className="profileWrapper">
        <Sidebar
          setPage={setCurrentPage}
          pages={pages}
          currentPage={currentPage}
        />
        <Main currentPage={ThePage} />
      </div>
      <Footer />
    </div>
  );
}
