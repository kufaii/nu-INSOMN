import { Link } from "react-router-dom";

export default function CategoryButton({ category }) {
  return (
    <>
      <Link to={`/redirect/category/post/${category.id}`}>
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          {category.name}
        </button>
      </Link>
    </>
  );
}
