
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Visualizador de Exactitud del MVP
        </h1>
        <p className="text-slate-600 mt-1">Analogía de la Diana para Veracidad y Precisión</p>
      </div>
    </header>
  );
};

export default Header;
