import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../config";
import socket from "../socket";
import {
  fetchFollowingPost,
  fetchPost,
  fetchPostByCategory,
} from "../store/features/post/Post";
import { FetchCategoryContext } from "../contexts/FetchCategory";

export default function AddPostModal({ idCategory }) {
  console.log(idCategory, "ID CATEGORYYYYYYYYYYYYYYYYYYYYY");
  const addCategories = useSelector((state) => state.post.category);
  const dispatch = useDispatch();
  const newCategories = useContext(FetchCategoryContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentContent, setCommentContent] = useState({
    content: "",
  });
  const [post, setPost] = useState({
    title: "",
    CategoryId: "",
  });

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };
  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentContent({
      ...commentContent,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const addPost = await axios({
        method: "post",
        url: "/post",
        data: post,
        headers: {
          authorization: "Bearer " + localStorage.access_token,
        },
      });
      const addComment = await axios({
        method: "post",
        url: "/comment/" + addPost.data.data.id,
        data: commentContent,
        headers: {
          authorization: "Bearer " + localStorage.access_token,
        },
      });

      socket.auth = {
        access_token: localStorage.access_token,
      };

      socket.emit("new-post", idCategory);
      dispatch(fetchPost());
      dispatch(fetchFollowingPost());
      // dispatch(fetchPostByCategory(3)); //belum dinamis
      handleModalToggle();
    } catch (error) {
      console.log("ERROR GANNN >>>>>>", error);
    }
  };

  const handleModalToggle = () => {
    console.log("ketrigere>>>>>>>>>>>>");
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div>
        <button
          onClick={handleModalToggle}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="fixed sm:ml-80 xl:mr-96 md:mr-0 bottom-8 right-8 z-40 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Add Post
        </button>

        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`${
            isModalOpen ? "block" : "hidden"
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-zinc-500/50 flex justify-center w-full md:inset-0 h-full max-h-full`}
        >
          <div className="relative grid content-center p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add Post
                </h3>
                <button
                  type="button"
                  onClick={handleModalToggle}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      onChange={handlePostChange}
                      type="text"
                      name="title"
                      value={post.title}
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write your title here"
                      required=""
                    />
                  </div>
                  <div className="col-span-2">
                    <textarea
                      onChange={handleCommentChange}
                      value={commentContent.content}
                      name="content"
                      id="content"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Whats up?"
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="CategoryId"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category
                    </label>
                    <select
                      id="CategoryId"
                      name="CategoryId"
                      value={post.CategoryId}
                      onChange={handlePostChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option defaultValue="">Select category</option>
                      {newCategories.cobacoba &&
                        newCategories.cobacoba.data.map((el) => (
                          <option value={el.id} key={el.id}>
                            {el.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add new post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
