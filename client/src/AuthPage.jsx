import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import axios from "axios";
import Layout from "./components/Layout/Layout";

axios.defaults.withCredentials = true;

export default function AuthPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/users/register", values);
      alert("Registrace úspěšná");
      setValues({ name: "", email: "", password: "" });
    } catch (err) {
      alert("Chyba při registraci: " + (err.response?.data || "Neznámá chyba"));
    }
  };

  const handleLogin = async () => {
    try {
      await axios.post(
        "http://localhost:5000/users/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true, // DŮLEŽITÉ pro cookie/session
        }
      );
  
      alert("Přihlášení úspěšné");
  
      // Reload, aby Navbar vyhodnotil přihlášení
      window.location.href = "/";
    } catch (err) {
      alert("Chyba při přihlášení: " + (err.response?.data || "Neznámá chyba"));
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <Tabs defaultValue="register" className="max-w-md mx-auto">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="register">Registrace</TabsTrigger>
            <TabsTrigger value="login">Přihlášení</TabsTrigger>
          </TabsList>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Registrace</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Jméno</Label>
                  <Input
                    id="name"
                    value={values.name}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={values.email}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="password">Heslo</Label>
                  <Input
                    id="password"
                    type="password"
                    value={values.password}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, password: e.target.value }))
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleRegister}>Registrovat</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Přihlášení</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={values.email}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="password">Heslo</Label>
                  <Input
                    id="password"
                    type="password"
                    value={values.password}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, password: e.target.value }))
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleLogin}>Přihlásit</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
