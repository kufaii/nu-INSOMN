import { Link } from "react-router-dom";
import axios from "../config";
import socket from "../socket";
import { useDispatch } from "react-redux";
import {
  fetchFollowingPost,
  fetchPost,
  fetchPostByCategory,
} from "../store/features/post/Post";
import { useEffect, useState } from "react";
// import { BiLike, BiSolidLike, BiDislike, BiSolidDislike  } from "react-icons/bi";

export default function PostCard({ post }) {
  const dispatch = useDispatch();
  const [time, setTime] = useState(post.createdAt);
  // const [alreadyVote, setAlreadyVote] = useState(false);
  const [alreadyVote, setAlreadyVote] = useState(0);

  const deleteHandler = async () => {
    try {
      await axios({
        method: "delete",
        url: `/post/${post.id}`,
        headers: {
          authorization: `Bearer ` + localStorage.access_token,
        },
      });
      console.log("Massssukkk");
      socket.emit("new-post");
      dispatch(fetchPost());
    } catch (error) {
      console.log("");
    }
  };

  const voteHandler = async (e) => {
    const newVote = +e.target.value;
    if (alreadyVote == newVote) {
      throw "already vote dumbass";
    }

    try {
      await axios({
        method: "put",
        url: `/post/${post.id}/vote`,
        data: {
          vote: +e.target.value,
        },
        headers: {
          authorization: "Bearer " + localStorage.access_token,
        },
      });

      socket.emit("new-vote");
      setAlreadyVote(+e.target.value);
      dispatch(fetchPostByCategory(post.Category.id));
      dispatch(fetchPost());
      dispatch(fetchFollowingPost());
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(alreadyVote, "status  sssssssssssssss")

  const timeFormat = () => {
    const dateString = new Date(time);
    const hours = dateString.getHours();
    const minutes = dateString.getMinutes();
    setTime(
      `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`
    );
  };

  // console.log(post.Category, "ini ada <<<<<<<<");

  useEffect(() => {
    timeFormat();
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <div className="basis-1/12 grid grid-cols-1 items-center text-center justify-center">
          <button onClick={voteHandler} value={1}>
            {alreadyVote ? (alreadyVote === 1 ? "👍🏻" : "👍🏿") : "👍🏿"}
          </button>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {post.votes}
          </p>
          <button onClick={voteHandler} value={-1}>
            {alreadyVote ? (alreadyVote === -1 ? "👎🏻" : "👎🏿") : "👎🏿"}
          </button>
        </div>
        <Link
          to={`/post/${post.id}`}
          className="basis-11/12 block w-100 p-6 bg-white rounded-lg hover:bg-gray-100 dark:bg-gray-800  dark:hover:bg-gray-700 "
        >
          <p className="font-normal text-gray-700 dark:text-gray-400 truncate ...">
            {post.Category && post?.Category?.name}
          </p>
          <div className="">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
              {post.title}
            </h5>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Posted at: {!time.includes("NaN") && time}
          </p>
        </Link>
      </div>
      {/* <div className="flex justify-between">
        <Link
          to={`/post/${post.id}`}
          className="block w-100 p-6 bg-white rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800  dark:hover:bg-gray-700 "
        >
          <p className="font-normal text-gray-700 dark:text-gray-400 truncate ...">
            {post.Category && post?.Category?.name}
          </p>
          <div className="">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
              {post.title}
            </h5>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Votes: {post.votes} Created at: {!time.includes("NaN") && time}
          </p>
        </Link>
        <div className="flex items-center justify-center">
          <button onClick={voteHandler} value={alreadyVote ? -1 : 1}>
            {alreadyVote ? "👍🏻" : "👍🏿"}
          </button>
          <button onClick={voteHandler} value={alreadyVote ? 1 : -1}>
            {alreadyVote ? "👎🏿" : "👎🏻"}
          </button>
          <button onClick={deleteHandler}>Delete boyy</button>
        </div>
      </div> */}
      {/* 
      <button
        onClick={deleteHandler}
        type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Delete
      </button>
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
      </button> */}
    </>
  );
}
