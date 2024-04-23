import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentByPost, fetchOnePost } from "../store/features/post/Post";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config";

export default function Post() {
  const navigate = useNavigate();
  const postId = useParams().id;
  const dispatch = useDispatch();
  const postById = useSelector((state) => state.post.dataById);
  const comment = useSelector((state) => state.post.commentByPost);
  const [addComment, setAddComment] = useState({
    content: "",
    CommentId: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAddComment({
      ...addComment,
      [name]: value,
    });
    console.log("update: ", addComment.CommentId);
  };
  const quoteHandler = (id) => {
    setAddComment({
      ...addComment,
      CommentId: id,
    });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios({
        method: "post",
        url: "/comment/" + postId,
        data: addComment,
        headers: {
          authorization: "Bearer " + localStorage.access_token,
        },
      });

      navigate(`/redirect/post/${postId}`);
    } catch (error) {
      console.log("ERROR GANNNN >>>>>>", error);
    }
  };

  useEffect(() => {
    dispatch(fetchOnePost(postId));
    dispatch(fetchCommentByPost(postId));
  }, []);

  return (
    <>
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <ul
          className="text-sm font-medium text-center text-white divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 rtl:divide-x-reverse"
          id="fullWidthTab"
        >
          <li className="w-full">
            <h5 className="inline-block w-full p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600">
              {postById.title}
            </h5>
          </li>
        </ul>
        <div
          id="fullWidthTabContent"
          className="border-t border-gray-200 dark:border-gray-600"
        >
          {comment.map((el) => {
            return (
              <div
                className="block p-4 rounded-lg md:p-8 dark:bg-gray-800 border-b-2 border-gray-200"
                id="stats"
                role="tabpanel"
                aria-labelledby="stats-tab"
              >
                <p className="text-white">
                  {el.Quote
                    ? `Quote ${el.Quote.author} : ${el.Quote.content}`
                    : ``}
                </p>
                <p className="text-white">
                  {el.author} : {el.content}
                </p>
                <button
                  onClick={() => quoteHandler(el.id)}
                  value={el.id}
                  name="CommentId"
                  className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Quote
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <form className="max-w-sm mx-auto" onSubmit={submitHandler}>
        <label
          htmlFor="content"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your reply
        </label>
        <textarea
          onChange={changeHandler}
          id="content"
          value={addComment.content}
          name="content"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Leave a reply..."
        ></textarea>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}
