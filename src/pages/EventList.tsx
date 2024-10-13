import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  attributes: {
    nombre: string;
    fecha: string;
    ciudades: {
      data: Array<{
        attributes: {
          nombre: string;
        };
      }>;
    };
  };
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/eventos?populate=ciudades');
        setEvents(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Cargando eventos...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Eventos Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link key={event.id} to={`/events/${event.id}`} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{event.attributes.nombre}</h2>
              <p className="text-gray-600 mb-2">Fecha: {new Date(event.attributes.fecha).toLocaleDateString()}</p>
              <p className="text-gray-600">
                Ciudades: {event.attributes.ciudades.data.map(city => city.attributes.nombre).join(', ')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventList;