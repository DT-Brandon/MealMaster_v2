import { useState, useContext, useEffect } from "react";
import { userContext } from "../../userContext";
import "./createditems.css";
import Recipes from "../recipes/Recipes";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function CreatedItems() {
  const [recipesList, setRecipesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { userInfo } = useContext(userContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        await axios
          .get(`/recipes/${userInfo._id}/myrecipes/all`)
          .then((res) => {
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
      {recipesList.length === 0 && <h2>You have not created any recipe Yet</h2>}

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
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
          pageClassName={"pageElement"}
        />
      </div>
    </div>
  );
}
