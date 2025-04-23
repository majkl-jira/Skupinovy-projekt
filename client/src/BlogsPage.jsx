import Layout from "./components/Layout/Layout";
import { Button } from "./components/ui/button";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import BlogCard from "./components/BlogCard/BlogCard";

//výchozí konfigurace pro axios
axios.defaults.withCredentials = true;

export default function BlogsPage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsRes = await axios.get("http://localhost:5000/blogs");
        setBlogs(blogsRes.data);
        try {
          const userRes = await axios.get("http://localhost:5000/users/me");
          setIsAdmin(userRes.data.isAdmin);
        } catch (userError) {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Chyba při načítání dat:", error);
        setError("Nepodařilo se načíst blogy.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRegister = async () => {
    try {
      const createUser = await axios.post(
        "http://localhost:5000/users/register",
        {
          name: values.name,
          email: values.email,
          password: values.password,
        }
      );
      if (createUser) {
        console.log("Registrace úspěšná!");
        window.location.reload();
      }
      setValues({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Chyba při registraci:", error);
      alert(
        "Registrace se nezdařila: " + (error.response?.data || "Neznámá chyba")
      );
    }
  };
  const handleLogin = async () => {
    try {
      const createUser = await axios.post("http://localhost:5000/users/login", {
        email: values.email,
        password: values.password,
      });
      if (createUser) {
        console.log("Přihlášení úspěšné!");
        window.location.reload();
      }
      setValues({});
    } catch (error) {
      console.error("Chyba při přihlášení:", error);
      alert(
        "Přihlášení se nezdařilo: " + (error.response?.data || "Neznámá chyba")
      );
    }
  };
  const handleCreate = async () => {
    try {
      const isLoggedIn = await axios.get("http://localhost:5000/users/me");
      if (isLoggedIn) {
        return navigate("/blog/pridat");
      }
    } catch (error) {
      console.error("Chyba při ověřování přihlášení:", error);
      alert("Musíte být přihlášen jako admin pro přidání blogu.");
    }
  };
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/users/logout");
      console.log("Odhlášení úspěšné!");
      window.location.reload();
    } catch (error) {
      console.error("Chyba při odhlašování:", error);
    }
  };
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center text-white bg-black">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-700 rounded w-1/4 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-gray-800 rounded-lg p-4 h-80">
                  <div className="h-32 bg-gray-700 rounded mb-4"></div>
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4">Načítám blogy...</p>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      
      <section className="relative w-full h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex">
          <div className="absolute w-full h-full bg-cover bg-center">
            <img
              src="/images/blogsbackground.jpg"
              className="object-cover w-full h-full"
              alt="Hero obrázek Blogů"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div className="absolute px-16 max-w-xl text-left">
          <h1 className="text-4xl md:text-6xl font-bold">Blogy</h1>
          <p className="text-lg md:text-xl mt-4">
            Zde najdete všechny blogy, které jsem napsal během svého studia v USA.
          </p>
        </div>
      </section>
      <main className="max-w-screen  bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-end items-center mb-8">
            <div className="flex space-x-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Sign Up</Button>
                </DialogTrigger>
                <DialogContent className="max-w-full">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="account" className="max-w-screen mt-12">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="account">Register</TabsTrigger>
                      <TabsTrigger value="password">Login</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                      <Card>
                        <CardHeader>
                          <CardTitle>Register</CardTitle>
                          <CardDescription>
                            Make changes to your account here. Click save when
                            you're done.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              value={values.name}
                              required
                              onChange={(e) =>
                                setValues((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              value={values.email}
                              onChange={(e) =>
                                setValues((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              type="password"
                              value={values.password}
                              onChange={(e) =>
                                setValues((prev) => ({
                                  ...prev,
                                  password: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button onClick={handleRegister}>Save changes</Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                    <TabsContent value="password">
                      <Card>
                        <CardHeader>
                          <CardTitle>Login</CardTitle>
                          <CardDescription>
                            Login to your account here. Click login when you're done.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              value={values.email}
                              onChange={(e) =>
                                setValues((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              type="password"
                              value={values.password}
                              onChange={(e) =>
                                setValues((prev) => ({
                                  ...prev,
                                  password: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button onClick={handleLogin}>Login</Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                  </Tabs>
                  <DialogFooter></DialogFooter>
                </DialogContent>
              </Dialog>
              {isAdmin && <Button onClick={handleCreate}>Přidat</Button>}
                <Button onClick={handleLogout} className="ml-2">
                  Odhlásit
                </Button>
              
            </div>
          </div>
          {error && (
            <div className="bg-red-500 text-white p-4 rounded mb-4">
              {error}
            </div>
          )}
          {blogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg">Zatím zde nejsou žádné blogy.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard blog={blog} key={blog._id} />
              ))}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
