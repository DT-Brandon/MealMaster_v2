import "./topbar.css";
import { Menu, RestaurantMenu, Search } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { userContext } from "../../userContext";
import Registration from "../../pages/Registration/Registration";

export default function Topbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [droppedlist, setdroppedList] = useState(false);
  const handleDrop = () => {
    setdroppedList((listValue) => !listValue);
  };
  const { userInfo, logout, restartSession } = useContext(userContext);
  const navigate = useNavigate();
  const navigateTo = (route) => {
    navigate(route);
  };
  restartSession();

  const location = useLocation();

  return (
    <div className="topBarWrapperAll">
      <div className="topbarContainer">
        <div className="topbarLeft">
          <img
            src="/images/logo.png"
            alt=""
            className="logoImg"
            onClick={() => {
              return navigateTo("/");
            }}
          />
        </div>
        <div className="topbarCenter"></div>
        <div className="topbarRight">
          <div className="searchbar">
            <Search className="searchIcon" />
            <span
              className={
                location.pathname === "/search"
                  ? "topbarLink searchLink  active"
                  : "  topbarLink"
              }
              onClick={() => {
                navigateTo("/search");
              }}
            >
              Search
            </span>
          </div>
          <div
            className={
              !droppedlist ? "topbarLinks" : "topbarLinks topbardDropped"
            }
          >
            <span
              className={
                location.pathname === "/" ? "topbarLink active" : "topbarLink"
              }
              onClick={() => {
                navigateTo("/");
              }}
            >
              home
            </span>

            {userInfo ? (
              <span
                className={
                  location.pathname === "/profile"
                    ? "topbarLink active"
                    : "topbarLink"
                }
                onClick={() => {
                  navigateTo("/profile");
                }}
              >
                {userInfo.username}
              </span>
            ) : (
              <span
                className="topbarLink"
                onClick={() => {
                  handleShow();
                }}
              >
                Login
              </span>
            )}

            {userInfo && (
              <span
                className={
                  location.pathname === "/add"
                    ? "topbarLink active"
                    : "topbarLink"
                }
                onClick={() => {
                  navigateTo("/add");
                }}
              >
                Add a Recipe
              </span>
            )}
            {userInfo && (
              <span
                className="topbarLink"
                onClick={() => {
                  logout();
                  navigateTo("/");
                }}
              >
                Log-out
              </span>
            )}
            <span
              className={
                location.pathname === "/about"
                  ? "topbarLink active"
                  : "topbarLink"
              }
              onClick={() => {
                navigateTo("/about");
              }}
            >
              About Us
            </span>
          </div>

          <img
            src={
              userInfo?.profilePicture
                ? `/images/person/${userInfo.profilePicture}`
                : "/images/person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </div>
        <div className="topBarMenuDrop" onClick={handleDrop}>
          {!droppedlist ? <Menu /> : <RestaurantMenu />}
        </div>
      </div>
      {show && (
        <div className="RegisterModal">
          <Registration setClose={handleClose} />
        </div>
      )}
    </div>
  );
}
