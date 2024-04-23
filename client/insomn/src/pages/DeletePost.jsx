import { useEffect } from "react";
import axios from "../config";
import { useNavigate, useParams } from "react-router-dom";

export default function DeletePost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const deletingPost = async () => {
    try {
      await axios({
        method: "delete",
        url: `/post/${id}`,
        headers: {
          authorization: `Bearer ` + localStorage.access_token,
        },
      });
      navigate("/home");
    } catch (error) {}
  };

  useEffect(() => {
    deletingPost();
  }, []);

  return <></>;
}
