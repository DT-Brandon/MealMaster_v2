import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Recipes from "../../components/recipes/Recipes";
import Topbar from "../../components/topbar/Topbar";
import Footer from "../../components/footer/Footer";
import "./search.css";
import ReactPaginate from "react-paginate";

export default function Search() {
  const [recipeList, setRecipeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [recipeFound, setRecipeFound] = useState(true);

  const cuisines = [
    "none",
    "african",
    "american",
    "british",
    "cajun",
    "caribbean",
    "chinese",
    "eastern european",
    "french",
    "german",
    "greek",
    "indian",
    "irish",
    "italian",
    "japanese",
    "jewish",
    "korean",
    "latin american",
    "mexican",
    "middle eastern",
    "nordic",
    "southern",
    "spanish",
    "thai",
    "vietnamese",
  ];
  const cuisine = useRef();
  const cuisineSelectInput = cuisines.map((cuisine) => {
    return <option value={cuisine}>{cuisine}</option>;
  });

  const diets = [
    "none",
    "ketogenic",
    "paleo",
    "primal",
    "vegan",
    "vegetarian",
    "whole 30",
  ];

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await axios.get("/recipes/user/random").then((res) => {
          setRecipeList(res.data);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, []);

  const PER_PAGE = 12;
  const offset = currentPage * PER_PAGE;
  const currentPageData = recipeList
    .slice(offset, offset + PER_PAGE)
    .map((recipe) => {
      return <Recipes key={recipe._id} recipe={recipe} />;
    });

  const pageCount = Math.ceil(recipeList.length / PER_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const diet = useRef();
  const dietSelectInput = diets.map((diet) => {
    return <option value={diet}>{diet}</option>;
  });

  const allergies = [
    {
      name: "dairy",
      check: false,
    },
    {
      name: "egg",
      check: false,
    },
    {
      name: "gluten",
      check: false,
    },
    {
      name: "grain",
      check: false,
    },
    {
      name: "peanut",
      check: false,
    },
    {
      name: "seafood",
      check: false,
    },
    {
      name: "sesame",
      check: false,
    },
    {
      name: "shellfish",
      check: false,
    },
    {
      name: "soy",
      check: false,
    },
    {
      name: "sulfite",
      check: false,
    },
    {
      name: "tree nut",
      check: false,
    },
    {
      name: "wheat",
      check: false,
    },
  ];
  const [allergieValue, setAllergieValue] = useState(allergies);

  function handleAllergieChange(allergie) {
    setAllergieValue((prevData) => {
      return prevData.map((data) => {
        return data.name === allergie.name
          ? { name: data.name, check: !data.check }
          : data;
      });
    });
  }
  const allergieInput = allergieValue.map((allergie) => {
    const name = allergie.name;
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    return (
      <div className="checkBoxGroup">
        <input
          type="checkbox"
          className="checkBox"
          onChange={() => {
            handleAllergieChange(allergie);
          }}
          name={allergie.name}
          id={allergie.name}
          checked={allergie.check}
        />
        <label htmlFor={allergie.name} className="checkBoxLabel">
          {capitalizedName + " Free"}
        </label>
      </div>
    );
  });

  const title = useRef();
  const time = useRef();
  const maxCalories = useRef();
  const minCalories = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (maxCalories.current.value < minCalories.current.value) {
      maxCalories.current.setCustomValidity(
        "Can not be less than MIN CALORIES"
      );
    }
    const IntolerancesArray = [];
    allergieValue.forEach((data) => {
      data.check && IntolerancesArray.push(data.name);
    });

    const searchOption = {
      title: title.current.value !== "" && title.current.value,
      cuisine: cuisine.current.value !== "none" && cuisine.current.value,
      diet: diet.current.value !== "none" && diet.current.value,
      maxTime: time.current.value !== "" && time.current.value,
      maxCalories:
        maxCalories.current.value !== "" && maxCalories.current.value,
      minCalories:
        minCalories.current.value !== "" && minCalories.current.value,
      Intolerances: IntolerancesArray.length > 0 && IntolerancesArray,
    };
    try {
      await axios.post("/recipes/all/search", searchOption).then((res) => {
        setRecipeList(res.data);
        if (res.data.length >= 1) {
          setRecipeFound(true);
        } else {
          setRecipeFound(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const recipeComponents = recipeList.map((recipe) => {
    return <Recipes key={recipe._id} recipe={recipe} />;
  });

  return (
    <div>
      <Topbar />
      <div className="formWrapper">
        <form onSubmit={handleSubmit} className="searchForm">
          <div className="searchInputContainer">
            <label htmlFor="name" className="searchFormLabel">
              Recipe Name
            </label>
            <input
              ref={title}
              type="text"
              id="name"
              className="searchFormInput"
            />
          </div>
          <div className="searchInputContainer">
            <span className="searchFormLabel">Cuisine</span>
            <select className="searchFormInput" ref={cuisine}>
              {cuisineSelectInput}
            </select>
          </div>
          <div className="searchInputContainer">
            <span className="searchFormLabel">Diet</span>
            <select className="searchFormInput" ref={diet}>
              {dietSelectInput}
            </select>
          </div>
          <div className="searchInputContainer">
            <label htmlFor="time" className="searchFormLabel">
              Max Ready Time(In Mins)
            </label>
            <input
              type="number"
              ref={time}
              id="time"
              className="searchFormInput short"
            />
          </div>
          <div className="searchInputContainer">
            <label htmlFor="maxCalories" className="searchFormLabel">
              Max calories
            </label>
            <input
              ref={maxCalories}
              type="number"
              id="maxCalories"
              className="searchFormInput short"
            />
          </div>
          <div className="searchInputContainer">
            <label htmlFor="minCalories" className="searchFormLabel">
              Min calories
            </label>
            <input
              ref={minCalories}
              type="number"
              id="minCalories"
              className="searchFormInput short"
            />
          </div>
          <div className="searchInputContainer">
            <span className="searchFormLabel">Specify any Intolerances</span>

            <div className=" searchAllergie">{allergieInput}</div>
          </div>
          <div className="searchFormSubmitContainer">
            <input type="submit" className="searchFormSubmit" value="Search" />
          </div>
        </form>
      </div>
      <div className="searchResults">
        {!recipeFound && (
          <div>
            <h2>
              Your recipe is not yet availablle in Our Database, Our chefs are
              working hard to solve this.
            </h2>
            <p>Feel free to contact us for any Recipe suggestion</p>
          </div>
        )}

        <div className="recipesContainer">{currentPageData}</div>
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
      <Footer />
    </div>
  );
}
