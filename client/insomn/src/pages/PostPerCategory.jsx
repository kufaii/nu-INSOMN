import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPostByCategory,
  fetchPostByCategory,
} from "../store/features/post/Post";
import AddPostModal from "../components/AddPostModal";
import PostCard from "../components/PostCard";
import { Link, useParams } from "react-router-dom";
import socket from "../socket";
import NavBar from "../components/NavBar";

export default function PostPerCategory() {
  const idCategory = useParams().id;
  const dispatch = useDispatch();
  const postPerCategory = useSelector((state) => state.post.postByCategory);

  useEffect(() => {
    socket.auth = {
      access_token: localStorage.access_token,
    };

    socket.connect();

    socket.on("post-perCategory:new", () => {
      dispatch(fetchPostByCategory(idCategory));
    });
    socket.on("vote-following:new", () => {
      dispatch(fetchPostByCategory(idCategory));
    });

    // dispatch(fetchFollowingPost());
    dispatch(fetchPostByCategory(idCategory));
  }, []);

  return (
    <>
      <div className="relative vh-100 w-100 ">
        <NavBar />
        <div className="bg-white  dark:bg-gray-800 overflow-auto">
          {postPerCategory.map((el) => (
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <PostCard key={el.id} post={el} />
            </div>
          ))}
        </div>
      </div>

      {/* 

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              <td
                scope="col"
                className="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
              >
                <div className="w-100 flex flex-wrap items-center justify-between mx-auto p-4">
                  <Link
                    to="/home"
                    className="flex justify-center w-1/2 font-extrabold py-2 px-3 text-white  rounded bg-transparent md:p-0 "
                    aria-current="page"
                  >
                    Home
                  </Link>
                  <Link
                    to="/home/following"
                    className="flex justify-center w-1/2 font-extrabold py-2 px-3 text-white rounded bg-transparent md:p-0 "
                    aria-current="page"
                  >
                    Following
                  </Link>
                </div>
              </td>
            </tr>
          </thead>

          <tbody>
            {postPerCategory.map((el) => (
              <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    <PostCard key={el.id} post={el} />
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div> */}

      <AddPostModal idCategory={idCategory} />
    </>
  );
}
