import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="items-center mx-auto bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
      <div className="min-h-16 bg-white dark:bg-gray-900 flex flex-wrap w-full justify-between items-center z-20 border-b border-gray-200 dark:border-gray-600">
        <Link
          to="/home"
          className="flex justify-center w-1/2 font-extrabold py-2 text-white  rounded bg-transparent md:p-0 "
          aria-current="page"
        >
          Home
        </Link>
        <Link
          to="/home/following"
          className="flex justify-center w-1/2 font-extrabold py-2 text-white rounded bg-transparent md:p-0 "
          aria-current="page"
        >
          Following
        </Link>
      </div>
    </div>
  );
}
