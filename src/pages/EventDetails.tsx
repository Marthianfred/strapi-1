import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface TipoTicket {
  id: number;
  attributes: {
    nombre: string;
    precio: number;
    cantidad: number;
  };
}

interface Event {
  id: number;
  attributes: {
    nombre: string;
    descripcion: string;
    fecha: string;
    ciudades: {
      data: Array<{
        attributes: {
          nombre: string;
        };
      }>;
    };
    tiposTicket: {
      data: TipoTicket[];
    };
  };
}

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/eventos/${id}?populate=ciudades,tiposTicket`);
        setEvent(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Cargando detalles del evento...</div>;
  }

  if (!event) {
    return <div className="text-center py-8">Evento no encontrado</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{event.attributes.nombre}</h1>
      <p className="text-gray-600 mb-4">Fecha: {new Date(event.attributes.fecha).toLocaleString()}</p>
      <p className="text-gray-600 mb-4">
        Ciudades: {event.attributes.ciudades.data.map(city => city.attributes.nombre).join(', ')}
      </p>
      <p className="mb-6">{event.attributes.descripcion}</p>

      <h2 className="text-2xl font-semibold mb-4">Tickets Disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {event.attributes.tiposTicket.data.map((ticket) => (
          <div key={ticket.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{ticket.attributes.nombre}</h3>
            <p className="text-gray-600 mb-2">Precio: ${ticket.attributes.precio}</p>
            <p className="text-gray-600 mb-4">Disponibles: {ticket.attributes.cantidad}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetails;