import axios from "axios";
import { useEffect, useState } from "react";


export default function BlogAdd() {
  const [isLoggedIn, setLogin] = useState(false);
  
  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const user = await axios.get("http://localhost:5000/users/me");
        setLogin(user.data.isAdmin);
      } catch (error) {
        console.error("Chyba při ověřování přihlášení:", error);
      }
    };
    isLoggedIn();
  }, []);

  if (!isLoggedIn) {
    return "Nemáš oprávnění";
  }

  return <div>BlogAdd</div>;
}