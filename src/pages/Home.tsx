import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Bienvenido a Creadores Momentum</h1>
      <p className="text-xl mb-8">Descubre los mejores eventos en tu ciudad y asegura tus entradas ahora.</p>
      <Link to="/events" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
        Ver eventos disponibles
      </Link>
    </div>
  );
};

export default Home;