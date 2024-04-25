import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TopPostCard({ post }) {
    const [time, setTime] = useState(post.createdAt);

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


    useEffect(() => {
        timeFormat();
    }, []);

    return (
        <>
            <div className="flex justify-between">
                <Link
                    to={`/post/${post.id}`}
                    className="block w-full p-6 bg-white rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                    <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                        {post.Category && post?.Category?.name}
                    </p>
                    <div className="">
                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-800 dark:text-white">
                            {post.title}
                        </h5>
                    </div>
                    <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                        Votes: {post.votes} Created at: {!time.includes("NaN") && time}
                    </p>
                </Link>
            </div>

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
