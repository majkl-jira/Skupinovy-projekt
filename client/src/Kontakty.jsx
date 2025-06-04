import Layout from "./components/Layout/Layout";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Kontakty() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 text-white">
        <h1 className="text-4xl font-bold mb-8">Kontaktujte nás</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Kontaktní informace */}
          <div className="space-y-6">
            <div className="flex items-center">
              <MapPin className="mr-3 text-primary" />
              <p>Receptarium s.r.o., U Receptu 42, 110 00 Praha</p>
            </div>

            <div className="flex items-center">
              <Phone className="mr-3 text-primary" />
              <p>+420 123 456 789</p>
            </div>

            <div className="flex items-center">
              <Mail className="mr-3 text-primary" />
              <p>info@receptarium.cz</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
