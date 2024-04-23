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
      <p>{userData.username}</p>
      <EditUserModal />
    </>
  );
}
