import { Link, useNavigate } from "react-router-dom";
import axios from "../config";
import { useState } from "react";
import socket from "../socket";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const voteHandler = async (e) => {
    try {
      await axios({
        method: "put",
        url: `/post/${post.id}/vote`,
        data: {
          vote: e.target.value,
        },
        headers: {
          authorization: "Bearer " + localStorage.access_token,
        },
      });

      socket.emit("new-vote");
      navigate("/redirect/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link
        to={`/redirect/post/${post.id}`}
        className="block w-100 p-6 bg-white  rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800  dark:hover:bg-gray-700"
      >
        <div className="">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
            {post.title}
          </h5>
        </div>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          Votes: {post.votes} Created at: {post.createdAt}
        </p>
      </Link>
      <Link to={`/delete-post/${post.id}`}>
        <button
          type="button"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Delete
        </button>
      </Link>
      <button
        onClick={voteHandler}
        value={1}
        type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Upvote
      </button>
      <button
        onClick={voteHandler}
        value={-1}
        type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Downvote
      </button>
    </>
  );
}
