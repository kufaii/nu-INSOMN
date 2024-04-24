import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPost, fetchPost } from "../store/features/post/Post";
import AddPostModal from "../components/AddPostModal";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import socket from "../socket";

export default function Home() {
  const dispatch = useDispatch();
  const allPost = useSelector((state) => state.post.data);

  useEffect(() => {
    socket.auth = {
      access_token: localStorage.access_token,
    };
    socket.connect();
    socket.on("post-new", (value) => {
      dispatch(fetchAllPost(value));
    });
    socket.on("vote-new", (value) => {
      dispatch(fetchAllPost(value));
    });

    dispatch(fetchPost());
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <td scope="col" className="px-6 py-3">
                <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                  <div className="w-100 flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                          <Link
                            to="/home"
                            className="block py-2 px-3 text-white  rounded bg-transparent md:p-0 "
                            aria-current="page"
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/home/following"
                            className="block py-2 px-3 text-white rounded bg-transparent md:p-0 "
                            aria-current="page"
                          >
                            Following
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </td>
            </tr>
          </thead>
          <tbody>
            {allPost.map((el) => (
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
      </div>

      <AddPostModal />
    </>
  );
}
