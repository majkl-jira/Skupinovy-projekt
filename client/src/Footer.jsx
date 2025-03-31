import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email odeslán tvůrci: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-[#3C3B6E] text-white w-full p-8">
      <div className="container mx-auto">
        <h3 className="text-xl font-semibold mb-6 text-center">Kontaktujte mě</h3>
        <form onSubmit={handleSubmit} className="flex gap-4 justify-center">
          <Input
            type="email"
            placeholder="Váš email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-md py-3 px-4 rounded-lg"
            required
          />
          <Button
            type="submit"
            className="bg-[#B22234] hover:bg-[#a21d23] px-8 py-3 text-lg"
          >
            Odeslat
          </Button>
        </form>
      </div>
    </footer>
  );
}
