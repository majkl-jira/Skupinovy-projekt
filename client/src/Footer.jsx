import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <footer className="bg-blue-700 text-white w-full p-8">
      <div className="w-full px-4">
        <h3 className="text-xl font-semibold mb-6 text-center">Kontaktujte mě</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center w-full">
          <Input
            type="email"
            placeholder="Váš email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 px-4 rounded-lg"
            required
          />
          <Input
            type="text"
            placeholder="Předmět"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full py-3 px-4 rounded-lg"
            required
          />
          <textarea
            placeholder="Vaše zpráva"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 p-4 rounded-lg text-white"
            required
          />
          <Button type="submit" className="bg-blue-900 hover:bg-blue-800 px-8 py-3 text-lg">
            Odeslat
          </Button>
        </form>
      </div>
    </footer>
  );
}
