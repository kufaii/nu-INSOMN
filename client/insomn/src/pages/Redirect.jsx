import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Redirect({ page, state }) {
  const navigate = useNavigate();
  let id = 0;
  if (state == "haveParams") {
    id = useParams().key;
  }
  let link = "";

  const checkDestination = () => {
    switch (page) {
      case "home":
        link = "/home";
        break;
      case "post":
        link = "/post";
        break;
      case "profile":
        link = "/profile";
        break;
      case "postByCategory":
        link = "/category/post";
        break;
      default:
        link = "/home";
        break;
    }
    if (id) {
      link += `/${id}`;
    }
  };

  useEffect(() => {
    checkDestination();
    navigate(link);
  }, []);

  return <></>;
}
