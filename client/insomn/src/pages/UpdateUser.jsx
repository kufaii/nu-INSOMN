import { useDispatch, useSelector } from "react-redux";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
  return <></>;
}
