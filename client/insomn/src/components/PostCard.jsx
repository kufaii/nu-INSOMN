import { Link } from "react-router-dom";
import axios from "../config";
import socket from "../socket";
import { useDispatch } from "react-redux";
import { fetchFollowingPost, fetchPost } from "../store/features/post/Post";

export default function PostCard({ post }) {
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    await axios({
      method: "delete",
      url: `/post/${post.id}`,
      headers: {
        authorization: `Bearer ` + localStorage.access_token,
      },
    });
    socket.emit("new-post");
    dispatch(fetchPost());
  };

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
      dispatch(fetchPostByCategory(post.Category.id));
      dispatch(fetchPost());
      dispatch(fetchFollowingPost());
    } catch (error) {
      console.log(error);
    }
  };

  console.log(post.Category, "ini ada <<<<<<<<");

  return (
    <>
      <Link
        to={`/post/${post.id}`}
        className="block w-100 p-6 bg-white  rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800  dark:hover:bg-gray-700"
      >
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {post.Category && post?.Category?.name}
        </p>
        <div className="">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
            {post.title}
          </h5>
        </div>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          Votes: {post.votes} Created at: {post.createdAt}
        </p>
      </Link>

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
      </button>
    </>
  );
}
