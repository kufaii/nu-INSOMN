import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/features/user/User";
import EditUserModal from "../components/EditUserModal";

export default function User() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <>
      <div className="h-screen flex grid justify-center content-center dark:bg-gray-800">
        <h1 className="text-2xl font-extrabold text-slate-400 mt-5">{`current user: ${userData.username}`}</h1>
      </div>
      <EditUserModal />
    </>
  );
}
