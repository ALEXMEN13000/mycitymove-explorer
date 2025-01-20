import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#102A43] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:contact@clubcenter.fr" className="hover:text-gray-300">
                  contact@clubcenter.fr
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>123 rue des Sports, 75000 Paris</span>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Horaires</h3>
            <div className="space-y-2">
              <p>Lundi - Vendredi : 9h - 20h</p>
              <p>Samedi : 10h - 18h</p>
              <p>Dimanche : Fermé</p>
            </div>
          </div>

          {/* Suivez-nous */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[#1A365D] text-center text-gray-400">
          © 2024 CLUBCENTER. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
} 