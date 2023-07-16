import React, { useEffect, useState, useRef, useContext } from "react";
import Topbar from "../../components/topbar/Topbar";
import Footer from "../../components/footer/Footer";
import "./recipe.css";
import { userContext } from "../../userContext";
import { useParams } from "react-router";
import {
  ThumbDownOffAlt,
  ThumbUpOffAlt,
  ThumbDownSharp,
  ThumbUpSharp,
  FavoriteBorder,
  Favorite,
} from "@mui/icons-material";
import axios from "axios";

export default function Recipe() {
  const params = useParams();
  const [recipe, setRecipe] = useState();
  const [recipeComments, setRecipeComments] = useState([]);
  const [commented, setCommented] = useState(false);

  const comment = useRef();

  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [like, setLike] = useState();
  const [dislike, setDisLike] = useState();
  const { userInfo, setUserInfo } = useContext(userContext);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        axios.get(`/recipes/${params.recipeId}`).then((res) => {
          setRecipe(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setIsLiked(recipe?.likes.includes(userInfo?._id));
    setLike(recipe?.likes.length);
    setIsDisLiked(recipe?.dislikes.includes(userInfo?._id));
    setDisLike(recipe?.dislikes.length);
    setIsFavorite(userInfo?.favorites.includes(recipe?._id));
  }, [userInfo?._id, recipe?.likes, recipe?.dislikes]);

  useEffect(() => {}, [userInfo?._id, recipe?.dislikes]);
  const likeHandler = () => {
    if (userInfo?._id) {
      try {
        axios.put("/recipes/" + recipe._id + "/like", { userId: userInfo._id });
      } catch (err) {
        console.log(err);
      }
      setLike(isLiked ? like - 1 : like + 1);
      setDisLike(isDisLiked ? dislike - 1 : dislike);
      setIsDisLiked(false);
      setIsLiked(!isLiked);
    } else {
      alert("You must be Logged in To perform this action");
    }
  };
  const dislikeHandler = () => {
    if (userInfo?._id) {
      try {
        axios.put("/recipes/" + recipe._id + "/dislike", {
          userId: userInfo._id,
        });
      } catch (err) {
        console.log(err);
      }
      setDisLike(isDisLiked ? dislike - 1 : dislike + 1);
      setLike(isLiked ? like - 1 : like);
      setIsLiked(false);
      setIsDisLiked(!isDisLiked);
    } else {
      alert("You must be Logged in To perform this action");
    }
  };
  const favoriteHandler = async () => {
    if (userInfo?._id) {
      try {
        await axios
          .put("/recipes/add/toFavorites/" + recipe._id, {
            userId: userInfo._id,
          })
          .then((res) => {
            setUserInfo((preData) => {
              const data = preData;
              const index = data.favorites.indexOf(recipe._id);

              data.favorites.includes(recipe._id)
                ? data.favorites.splice(index, 1)
                : data.favorites.push(recipe._id);
              return data;
            });
          });
      } catch (err) {
        console.log(err);
      }
      setIsFavorite((favorite) => !favorite);
    } else {
      alert("You must be Logged in To perform this action");
    }
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        axios.get(`/recipes/${params.recipeId}/comment/all`).then((res) => {
          const data = res.data.slice(0).slice(-20).reverse();
          setRecipeComments(data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    // eslint-disable-next-line
  }, [commented]);

  let i = 1;

  const ingredientComponent = recipe?.ingredients.map((ingredient) => {
    const newIngredient = (
      <div key={ingredient + i} className="ingredient">
        <span className="step"> {i}) </span> {ingredient}
      </div>
    );
    i++;
    return newIngredient;
  });

  i = 1;
  const directionComponent = recipe?.directions.map((step) => {
    const newStep = (
      <div key={step + i} className="direction">
        <span className="step">step {i}: </span> {step}
      </div>
    );
    i++;
    return newStep;
  });
  i = 1;

  const commentComponent = recipeComments?.map((comment) => {
    const newComment = (
      <div key={comment.userId + i} className="comment">
        <p className="commentName">{comment.username} :</p>
        <span className="commentText">{comment.comment} </span>
      </div>
    );
    i++;
    return newComment;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo?._id) {
      const data = {
        userId: userInfo._id,
        comment: comment.current.value,
      };
      try {
        axios
          .put("/recipes/" + recipe._id + "/comment", data)
          .then(setCommented((prevValue) => !prevValue));
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("You must be Logged in To perform this action");
    }
  };

  return (
    <div>
      <Topbar />
      <div className="showRecipeWrapper">
        <div className="showRecipeContainer">
          <h2>
            Name: <span className="showRecipeName">{recipe?.title}</span>
          </h2>
          <div className="recipeLikeConatiner">
            {isLiked ? (
              <ThumbUpSharp className="like" onClick={likeHandler} />
            ) : (
              <ThumbUpOffAlt className="like" onClick={likeHandler} />
            )}
            <span className="likeValue">{like}</span>
            {isDisLiked ? (
              <ThumbDownSharp className="like" onClick={dislikeHandler} />
            ) : (
              <ThumbDownOffAlt className="like" onClick={dislikeHandler} />
            )}
            <span className="likeValue">{dislike}</span>
          </div>
          <h2 className="showRecipeDescTitle">description</h2>
          <div className="showRecipeDescText">{recipe?.desc}</div>
          <h2>
            Author: <span className="showRecipeName">{recipe?.userId}</span>
          </h2>
          <div className="showRecipeImgConatiner">
            <div className="showRecipeFavorite">
              {isFavorite ? (
                <Favorite htmlColor="red" onClick={favoriteHandler} />
              ) : (
                <FavoriteBorder htmlColor="red" onClick={favoriteHandler} />
              )}
            </div>
            <img
              src={`/images/recipe/${recipe?.picture}`}
              alt=""
              className="showRecipeImg"
            />
          </div>
          <h2 className="showRecipePrepTime">
            Prep Time:{" "}
            <span className="showRecipeName">
              {recipe?.preparationTime} mins
            </span>
          </h2>
          <h2 className="showRecipePrepTime">
            servings:{" "}
            <span className="showRecipeName">
              {recipe?.servings} person{recipe?.servings >= 1 ? "s" : ""}
            </span>
          </h2>
          {recipe?.cuisine !== "default" && (
            <h2 className="showRecipePrepTime">
              cuisine: <span className="showRecipeName">{recipe?.cuisine}</span>
            </h2>
          )}

          <h2 className="showRecipePrepTime">
            diet: <span className="showRecipeName">{recipe?.diet}</span>
          </h2>
          <h2 className="showRecipePrepTime">
            calories: <span className="showRecipeName">{recipe?.calories}</span>
          </h2>

          <h2 className="showRecipeIngredientTitle">Ingredients</h2>
          {ingredientComponent}
          <h2 className="showRecipeDirectionTitle">Direction</h2>
          {directionComponent}

          <form onSubmit={handleSubmit} className="addComment">
            <h2 className="showRecipeAddCommentTitle">Add A Comment</h2>
            <div className="showRecipeCommentContainer">
              <textarea
                className="showRecipeComment"
                ref={comment}
                cols="30"
                rows="10"
              ></textarea>
              <input className="showRecipeSubmit" type="submit" value="Send" />
            </div>
          </form>
          <h2 className="showRecipeCommentTitle">Comments</h2>
          {commentComponent}
        </div>
      </div>

      <Footer />
    </div>
  );
}
