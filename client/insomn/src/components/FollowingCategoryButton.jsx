import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPostByCategory } from "../store/features/post/Post";
import axios from "../config";
import { fetchUser } from "../store/features/user/User";

export default function FollowingCategoryButton({ category }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const linkTo = () => {
    dispatch(fetchPostByCategory(category.id));
    navigate(`/category/post/${category.id}`);
  };

  const unfollow = async () => {
    try {
      await axios({
        method: "delete",
        url: `/category/${category.id}/follow`,
        headers: {
          authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      dispatch(fetchUser());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center text-white bg-gray-800 border-2 focus:outline-none focus:ring-4 focus:ring-gray-700 font-medium rounded-full text-sm dark:bg-gray-800 border-gray-700">
        <button
          onClick={linkTo}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          {category.name}
        </button>
        <button
          onClick={unfollow}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          -
        </button>
      </div>
    </>
  );
}
