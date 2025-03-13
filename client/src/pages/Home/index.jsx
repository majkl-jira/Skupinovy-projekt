import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Link to={"/add-comment"}>
        <p>Add Comment</p>
      </Link>
    </>
  );
}
