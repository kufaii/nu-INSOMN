import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="items-center mx-auto bg-gray-50 dark:bg-gray-700 sticky top-0">
      <div className="min-h-16 bg-white dark:bg-gray-900 flex flex-wrap w-full justify-between items-center z-20 border-b border-gray-200 dark:border-gray-600">
        <NavLink
          to="/home"
          end
          className={({ isActive }) =>
            isActive
              ? "h-16 border-b border-orange-500 items-center flex justify-center w-1/2 font-extrabold py-2 text-white bg-transparent md:p-0"
              : "flex justify-center w-1/2 font-extrabold py-2 text-gray-400 bg-transparent md:p-0 "
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/home/following"
          className={({ isActive }) =>
            isActive
              ? "h-16 border-b border-orange-500 items-center flex justify-center w-1/2 font-extrabold py-2 text-white bg-transparent md:p-0"
              : "flex justify-center w-1/2 font-extrabold py-2 text-gray-400 bg-transparent md:p-0 "
          }
        >
          Following
        </NavLink>
      </div>
    </div>
  );
}
