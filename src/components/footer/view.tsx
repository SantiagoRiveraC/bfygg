"use client";

import { FacebookLogo, InstagramLogo, TwitterLogo } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-6">
      <div className="container mx-auto px-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
        {/* Sección izquierda - Nombre y derechos */}
        <div>
          <h2 className="text-xl font-bold">Before You GoGo</h2>
          <p className="text-sm opacity-80">© {new Date().getFullYear()} Todos los derechos reservados</p>
        </div>

        {/* Sección central - Enlaces */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="/terminos" className="hover:underline">Términos y condiciones</a>
          <a href="/privacidad" className="hover:underline">Política de privacidad</a>
          <a href="/contacto" className="hover:underline">Contacto</a>
        </div>

        {/* Sección derecha - Redes Sociales */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookLogo size={24} weight="bold" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramLogo size={24} weight="bold" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <TwitterLogo size={24} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
  );
}
