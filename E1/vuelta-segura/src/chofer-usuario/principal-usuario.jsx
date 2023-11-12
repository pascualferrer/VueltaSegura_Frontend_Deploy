import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import coche from '../assets/coche.png';
import calendario from '../assets/calendario.png';
import chat from '../assets/charla.png';
import NavBar from '../navbar/navbar';
import { AuthContext } from "../auth/AuthContext";
import "./principal.css"

const PrincipalUsuario = () => {
    const { token, user } = useContext(AuthContext); // Accede al user desde AuthContext
    const [msg, setMsg] = useState("");
    const [solicitudes, setSolicitudes] = useState([]);
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');

    const [view, setView] = useState('');
    const [isCalendarImageHovered, setIsCalendarImageHovered] = useState(false);
    const [isNuevoViajeImageHovered, setIsNuevoViajeImageHovered] = useState(false);
    const [isChatearImageHovered, setIsChatearImageHovered] = useState(false);

    const [error, setError] = useState('');
    const [show, setShow] = useState([]); // Agregado estado para 'show'

    const config = {
            'method' : 'get',
            'url' : `${import.meta.env.VITE_BACKEND_URL}/scope/protectedCliente`,
            'headers' : {
                'Authorization' : `Bearer ${token}`
            } 
        }

        useEffect(() => {
        const handleShow = async () => { //* Para ver los servicios del cliente
            //? Ver ClienteCheck?
            try {
                const show = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/servicios/buscar-por-id`, {
                        params: { clienteID: user.id },
                    });
                    console.log('Tabla:', show.data);
                    setError(null);
                    setShow(show.data);
    
            } catch (error) {
                console.error('Error al enviar datos:', error);
                setError('Error al enviar datos.');
            }
        };
        if (view === 'solicitudes') {
            handleShow();
        }
    }, [view]);

    const handleSubmit = async (e) => { //* Para crear servicios
        e.preventDefault();

        if (!fecha || !hora || !origen || !destino) {
            // Mostrar mensaje de error o realizar otras acciones
            console.error('Todos los campos son obligatorios');
            setError('Todos los campos son obligatorios');
            return;
        }


        const userType = e.target.userType.value;
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/servicios`, {
                clienteID: user.id,
                fecha,
                estado: "Por confirmar",
                hora,
                origen,
                destino
            }
            );

            console.log('Datos enviados con éxito:', response.data);
            setError(null);

            // Almacena las solicitudes en el estado
            setSolicitudes(response.data);

            setView('solicitudes');


        } catch (error) {
            console.error('Error al enviar datos:', error);
            setError('Error al enviar datos. Por favor, verifica la información.');
        }
    };

return (
    <div className="contenedor_principal">
        <nav className="navbar">
            <NavBar />
        </nav>

        <div className="OpcionesContainer">
            <h1>Seleccione qué desea hacer</h1>
            <div className="boxContainer">
                <div className="box" onClick={() => setView('agendar')}>
                    <img 
                        src={coche} 
                        alt="viaje" 
                        onMouseEnter={() => setIsNuevoViajeImageHovered(true)}
                        onMouseLeave={() => setIsNuevoViajeImageHovered(false)} 
                        className={isNuevoViajeImageHovered ? 'enlarged' : ''}
                        />
                    <h2>Agendar nuevo viaje</h2>
                </div>
                <div className="box" onClick={() => setView('solicitudes')}>
                    <img 
                        src={calendario} 
                        alt="disponibilidad" 
                        onMouseEnter={() => setIsCalendarImageHovered(true)}
                        onMouseLeave={() => setIsCalendarImageHovered(false)} 
                        className={isCalendarImageHovered ? 'enlarged' : ''}
                        />
                    <h2>Ver mis solicitudes</h2>
                </div>
                <div className="box" onClick={() => setView('chat')}>
                    <img 
                        src={chat} 
                        alt="chat" 
                        onMouseEnter={() => setIsChatearImageHovered(true)}
                        onMouseLeave={() => setIsChatearImageHovered(false)} 
                        className={isChatearImageHovered ? 'enlarged' : ''}
                        />
                    <h2>Chatear</h2>
                </div>
            </div>
        </div>

        <div className="SeleccionContainer">
            <div className={view === 'agendar' ? 'info active' : 'info'}>
                <section className="step">
                    <form className="from-cliente" onSubmit={handleSubmit}>
                    <label>
                    <div>    
                        Fecha
                    </div>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                    </label>
                    <br />
                    <label>
                    <div>    
                        Hora
                    </div>
                    <input
                        type="time"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                    />
                    </label >
                    <br />
                    <label>
                    <div>    
                        Origen
                    </div>
                    <input
                        type="text"
                        value={origen}
                        onChange={(e) => setOrigen(e.target.value)}
                    />
                    </label>
                    <br />
                    <label>
                    <div>    
                        Destino
                    </div>
                    <input
                        type="text"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                    />
                    </label>
                    <br />
                    <input type="hidden" name="userType" value="servicio"/>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit">Agendar Solicitud </button>
                </form>


                </section>

            </div>
            <div className={view === 'solicitudes' ? 'info active' : 'info'}>
                <section className="step">
                    <h2>A continuación podrás ver tus solicitudes anteriores</h2>
                    
                    {show.length > 0 ? (
                        <table className='tabla_solicitudes'>
                            <thead>
                                <tr>
                                    <th>Precio</th>
                                    <th>Tipo</th>
                                    <th>Hora</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                    <th>Origen</th>
                                    <th>Destino</th>
                                </tr>
                            </thead>
                            <tbody>
                                {show.map(servicio => (
                                    <tr key={servicio.id}>
                                        <td>{servicio.precio}</td>
                                        <td>{servicio.tipo}</td>
                                        <td>{servicio.hora}</td>
                                        <td>{servicio.fecha}</td>
                                        <td>{servicio.estado}</td>
                                        <td>{servicio.origen}</td>
                                        <td>{servicio.destino}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay solicitudes anteriores.</p>
                    )}
                </section>
            </div>

            <div className={view === 'chat' ? 'info active' : 'info'}>
                <section className="step">
                    <h2>Selecciona con quién quieres hablar</h2>
                    <Link to="/chat_admin">
                        <button className='chat_admin'>
                            Administrador
                        </button>
                    </Link>
                    <Link to="/chat_chofer">
                        <button className='chat_chofer'>
                            Chofer
                        </button>
                    </Link>
                    <h2>También puedes intentar</h2>
                    <Link to="/faq">
                        <button className='preguntas_frecuentes'>
                            Preguntas frecuentes
                        </button>
                    </Link>

                </section>
            </div>
        </div>

        <footer>
            <p>Derechos de autor &copy; 2023 Vuelta Segura</p>
        </footer>

    </div>
);
};

export default PrincipalUsuario;
