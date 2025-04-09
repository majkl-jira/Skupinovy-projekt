import axios from "axios";
import { useEffect, useState } from "react";

export default function BlogAdd() {
  const [isLoggedIn, setLogin] = useState(false);
  useEffect(() => {
    const isLoggedIn = async () => {
      const user = await axios.get("http://localhost:5000/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLogin(user.data.isAdmin);
    };
    isLoggedIn();
  }, []);

  if (!isLoggedIn) {
    return "Nemáš oprávnění";
  }

  return <div>BlogAdd</div>;
}
