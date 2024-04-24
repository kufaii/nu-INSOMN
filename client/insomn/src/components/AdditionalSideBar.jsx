import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTop5Post } from "../store/features/post/Post";
import PostCard from "./PostCard";
import socket from "../socket";
import UserCard from "./UserCard";

export default function AdditionalSideBar() {
  const dispatch = useDispatch();
  const topPost = useSelector((state) => state.post.top);
  const [onlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    socket.on("online:users", (value) => {
      setOnlineUser(value);
      console.log(value, "daftar orang hilang");
    });

    dispatch(fetchTop5Post());

    return () => {
      socket.off("online:users");
    };
  }, []);

  return (
    <>
      <aside
        id="separator-sidebar"
        className="xl:block hidden fixed top-0 right-0 z-40 w-96 h-screen bg-gray-50 dark:bg-gray-800 transform translate-x-full sm:translate-x-0 transition-transform ease-in-out duration-300"
        aria-label="Sidebar"
      >
        <div className="h-1/2 px-3 py-4 overflow-y-auto">
          <p className="flex items-center pb-5">
            <span className="text-xl font-semibold whitespace-nowrap dark:text-white">
              Top Post
            </span>
          </p>
          <ul className="space-y-2 font-medium">
            {topPost.map((el) => {
              return (
                <li>
                  <PostCard key={el.id} post={el} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="h-1/2 px-3 py-4 overflow-y-auto">
          <p className="flex items-center pb-5">
            <span className="text-xl font-semibold whitespace-nowrap dark:text-white">
              === Online User ===
            </span>
          </p>
          <ul className="space-y-2 font-medium">
            {onlineUser.map((el, i) => {
              return (
                <li>
                  <UserCard key={i} user={el} />
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
