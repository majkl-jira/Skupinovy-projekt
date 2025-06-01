import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

// Zajištění, že cookies budou součástí požadavků
axios.defaults.withCredentials = true;

const navlink = [
  { name: "O nás", route: "/" },
  { name: "Kontakty", route: "/kontakty" },
  { name: "Recepty", route: "/recepty" },
];

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users/me", {
          withCredentials: true,
        });

        // ✅ DEBUG pro kontrolu v konzoli
        console.log("✅ /users/me:", res.data);

        setIsLoggedIn(true);
        setIsAdmin(res.data.isAdmin === true);
      } catch (error) {
        console.log("❌ Uživatel není přihlášen");
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/users/logout", {}, {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      setIsAdmin(false);
      navigate("/"); // nebo window.location.href = "/";
    } catch (err) {
      console.error("Chyba při odhlášení:", err.message);
    }
  };

  return (
    <div className="relative top-0 left-0 right-0 z-50 bg-white text-black shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 font-semibold">
        <p className="text-xl font-bold">Restaurace</p>
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            {/* Standardní odkazy */}
            {navlink.map((element) => (
              <NavigationMenuItem key={element.route}>
                <NavigationMenuLink asChild>
                  <Link
                    to={element.route}
                    className="hover:text-red-600 transition-colors duration-200"
                  >
                    {element.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            {/* Pokud není přihlášený */}
            {!isLoggedIn && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/auth"
                    className="hover:text-blue-600 font-semibold"
                  >
                    Přihlásit se
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}

            {/* Pokud je přihlášený admin */}
            {isLoggedIn && isAdmin && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/recepty/pridat"
                    className="text-red-600 font-bold"
                  >
                    Přidat
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}

            {/* Pokud je přihlášený kdokoli */}
            {isLoggedIn && (
              <NavigationMenuItem>
                <button
                  onClick={handleLogout}
                  className="text-black hover:text-gray-700 ml-2"
                >
                  Odhlásit se
                </button>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
