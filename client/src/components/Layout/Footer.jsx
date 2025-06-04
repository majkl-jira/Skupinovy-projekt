import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Instagram, Facebook } from "lucide-react"; 

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setStatus({ type: "", message: "" });
      
      const response = await axios.post("http://localhost:5000/email/contact", {
        email,
        subject,
        message
      });
      
      setStatus({ type: "success", message: "Email byl úspěšně odeslán!" });
      
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setStatus({ 
        type: "error", 
        message: "Nepodařilo se odeslat email. Zkuste to prosím později." 
      });
      console.error("Chyba při odesílání emailu:", error);
    }
  };

  return (
    <footer className="bg-black text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sledujte nás</h3>
            <div className="flex space-x-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                <Instagram size={32} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                <Facebook size={32} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Vaření je radost</h3>
            <p className="mb-4">
                a tahle stránka je plná chutné inspirace.
                Najdete tu osvědčené recepty, tipy do kuchyně a nápady pro každodenní i výjimečné chvíle.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Napište mi</h3>
            
            {status.message && (
              <div 
                className={`mb-4 p-3 rounded text-white ${
                  status.type === "success" ? "bg-green-500" : "bg-red-700"
                }`}
              >
                {status.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Váš email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                required
              />
              <Input
                type="text"
                placeholder="Předmět"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                required
              />
              <textarea
                placeholder="Vaše zpráva"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-24 p-3 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/60"
                required
              />
              <Button type="submit" className="bg-white hover:bg-gray-700 w-full">
                Odeslat
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p>© {new Date().getFullYear()} Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
}