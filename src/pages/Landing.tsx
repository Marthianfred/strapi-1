import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-5xl font-bold mb-6">Creadores Momentum</h1>
      <p className="text-2xl mb-8 text-center max-w-2xl">
        Conectamos a los creadores con su audiencia a través de experiencias únicas y memorables.
      </p>
      <Link to="/events" className="bg-white text-blue-600 px-8 py-3 rounded-full text-xl font-semibold hover:bg-blue-100 transition duration-300">
        Descubre Eventos
      </Link>
    </div>
  );
};

export default Landing;