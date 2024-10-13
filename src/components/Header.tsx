import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Ticket className="mr-2" />
          <span className="text-xl font-bold">Creadores Momentum</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-200">Inicio</Link></li>
            <li><Link to="/events" className="hover:text-blue-200">Eventos</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;