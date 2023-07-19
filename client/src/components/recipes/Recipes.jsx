import "./recipes.css";
import axios from "axios";
import { useState, useContext } from "react";
import { userContext } from "../../userContext";
import {
  ThumbDownOffAlt,
  ThumbUpOffAlt,
  ThumbDownSharp,
  ThumbUpSharp,
  FavoriteBorder,
  Favorite,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

export default function Recipes({ recipe }) {
  const { userInfo, setUserInfo } = useContext(userContext);

  const [isLiked, setIsLiked] = useState(recipe.likes.includes(userInfo?._id));
  const [isDisLiked, setIsDisLiked] = useState(
    recipe.dislikes.includes(userInfo?._id)
  );
  const [isFavorite, setIsFavorite] = useState(
    userInfo?.favorites.includes(recipe._id)
  );
  const [like, setLike] = useState(recipe.likes.length);
  const [dislike, setDisLike] = useState(recipe.dislikes.length);

  const navigate = useNavigate();
  const navigateTo = (route) => {
    navigate(route);
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
  const likeHandler = () => {
    if (userInfo?._id) {
      try {
        axios
          .put("/recipes/" + recipe._id + "/like", { userId: userInfo._id })
          .then((res) => {});
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

  return (
    <div className="singleRecipe">
      <div className="singleRecipeTop">
        <div className="singleRecipeFavorite">
          {isFavorite ? (
            <Favorite
              htmlColor="red"
              className="heavyIndex"
              onClick={favoriteHandler}
            />
          ) : (
            <FavoriteBorder htmlColor="red" onClick={favoriteHandler} />
          )}
        </div>

        <div
          className="recipeImgConatiner"
          onClick={() => {
            navigateTo(`/recipe/${recipe._id}`);
          }}
        >
          <img
            src={"/images/recipe/" + recipe?.picture}
            alt={recipe.title.slice(0, 25)}
            className="recipeImg"
          />
        </div>
        <div className="recipeLikeConatiner">
          {isLiked ? (
            <ThumbUpSharp className="like" onClick={likeHandler} />
          ) : (
            <ThumbUpOffAlt className="like" onClick={likeHandler} />
          )}
          <div className="likeNumber">{like}</div>

          {isDisLiked ? (
            <ThumbDownSharp className="like" onClick={dislikeHandler} />
          ) : (
            <ThumbDownOffAlt className="like" onClick={dislikeHandler} />
          )}
          <div className="likeNumber">{dislike}</div>
        </div>
      </div>
      <div className="singleRecipeBottom">
        <h3 className="singleRecipeTitle">
          Name :
          <span
            className="singleRecipeTitleText"
            onClick={() => {
              navigateTo(`/recipe/${recipe._id}`);
            }}
          >
            {recipe.title.slice(0, 25)}
          </span>
        </h3>
        <div className="singleRecipeDescConatiner">
          <h3 className="singleRecipeDesc">Description</h3>
          <p className="singleRecipeDescText">
            {recipe.desc.slice(0, 100)} ...
          </p>
        </div>
      </div>
    </div>
  );
}
