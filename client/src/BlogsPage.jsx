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
import { Input } from "./components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BlogsPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleRegister = async () => {
    const createUser = await axios.post(
      "http://localhost:5000/users/register",
      {
        name: values.name,
        email: values.email,
        password: values.password,
      }
    );
    if (createUser) {
      localStorage.setItem("token", createUser.data.token);
    }
    setValues({
      name: "",
      email: "",
      password: "",
    });
  };


  const handleLogin = async () => {
    const createUser = await axios.post(
      "http://localhost:5000/users/login",
      {
        email: values.email,
        password: values.password,
      }
    );
    if (createUser) {
      localStorage.setItem("token", createUser.data.token);
    }
    setValues({});
  };

  const handleCreate = async () => {
    const isLoggedIn = await axios.get("http://localhost:5000/users/me",
      {
        headers : {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    if(isLoggedIn){
      return navigate("/blog/pridat")
    }
  }

  return (
    <Layout>
      <main className="max-w-screen mt-12">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Sign Up</Button>
          </DialogTrigger>
          <DialogContent className="max-w-full">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
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
                      Make changes to your account here. Click save when you're
                      done.
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
                      <Label htmlFor="email">email</Label>
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
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you'll be logged
                      out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="email">email</Label>
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
                    <Button onClick={handleLogin}>Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button onClick={handleCreate}>Přidat</Button>
      </main>
    </Layout>
  );
}
