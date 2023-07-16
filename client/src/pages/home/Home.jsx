import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect } from "react";
import "./home.css";
import Footer from "../../components/footer/Footer";
import Recipes from "../../components/recipes/Recipes";

import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

export default function Home() {
  const [recipesList, setRecipesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        await axios.get("/recipes/user/random").then((res) => {
          setRecipesList(res.data);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();

    // eslint-disable-next-line
  }, []);

  const PER_PAGE = 12;
  const offset = currentPage * PER_PAGE;
  const currentPageData = recipesList
    .slice(offset, offset + PER_PAGE)
    .map((recipe) => {
      return <Recipes key={recipe._id} recipe={recipe} />;
    });

  const pageCount = Math.ceil(recipesList.length / PER_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const recipeComponents = recipesList.map((recipe) => {
    return <Recipes key={recipe._id} recipe={recipe} />;
  });

  return (
    <div>
      <Topbar />
      <div className="content">
        <div className="homeHeroConatiner">
          <div className="homeHeroImgContainer">
            <img
              src="/images/HeroImage.webp"
              alt="dish image"
              className="homeHeroImg"
            />
          </div>
          <div className="homeHeroTextConatiner">
            <div className="homeHeroText">
              Grab our recipes, and embark into a delicious Journey, that will
              unleash the true
              <span className="heroMaintext">Meal Master </span>
              within you
            </div>
            <div className="heroSearchButttonConatiner">
              <Link to="/search">
                <div className="heroSearchButtton">Search A Recipe</div>
              </Link>
            </div>
          </div>
        </div>
        <h1>Here are few recipes for you!</h1>
        <div className="recipesContainer">{currentPageData} </div>

        <div className="homePagination">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link_disabled"}
            activeClassName={"pagination__link--active"}
            pageClassName={"pageElement"}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
