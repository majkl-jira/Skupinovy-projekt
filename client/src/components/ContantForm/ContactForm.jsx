import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Email odeslán tvůrci:\n` +
        `Email: ${email}\n` +
        `Předmět: ${subject}\n` +
        `Zpráva: ${message}`
    );
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <footer className="max-w-7xl mx-auto p-8  grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="w-full flex items-center">
        <div className="flex flex-col">
          <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-2">
            Kontaktujte nás
          </h2>
          <p>Vyplňte prosím tento formulář, nebo použijte sociální sítě</p>
          <div className="mt-3">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Sociální sítě</h3>
            <div className="flex">
                <Instagram className="size-12"/>
                <Facebook className="size-12"/>
                <Twitter className="size-12"/>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-xl shadow-2xl">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Kontaktujte mě
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center"
        >
          <Input
            type="email"
            placeholder="Váš email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-3 px-4 rounded-lg"
            required
          />
          <Input
            type="text"
            placeholder="Předmět"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="py-3 px-4 rounded-lg"
            required
          />
          <textarea
            placeholder="Vaše zpráva"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="h-32 p-4 w-full rounded-lg "
            required
          />
          <Button
            type="submit"
            className="bg-blue-900 hover:bg-blue-800 px-8 py-3 text-lg"
          >
            Odeslat
          </Button>
        </form>
      </div>
    </footer>
  );
}
