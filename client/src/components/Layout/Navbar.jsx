import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const navlink = [
  {
    name: "Úvod",
    route: "/",
  },
  {
    name: "Blog",
    route: "/blog",
  },
  {
    name: "Galerie",
    route: "/galerie",
  },
];

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="container mx-auto px-4 flex items-center justify-between h-12">
        <p>Blog Americano</p>
        <div className="md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navlink.map((element) => (
                <NavigationMenuItem>
                  <Link to={`${element.route}`}>
                    <NavigationMenuLink>
                      <span>{element.name}</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}
