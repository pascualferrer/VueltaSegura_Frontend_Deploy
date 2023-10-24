import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import coche from '../assets/coche.png';
import calendario from '../assets/calendario.png';
import chat from '../assets/charla.png';
import NavBar from '../navbar/navbar';
import "./principal.css"

function PrincipalUsuario() {
    const [view, setView] = useState('');
    const [isCalendarImageHovered, setIsCalendarImageHovered] = useState(false);
    const [isNuevoViajeImageHovered, setIsNuevoViajeImageHovered] = useState(false);
    const [isChatearImageHovered, setIsChatearImageHovered] = useState(false);


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
                        <h2>Seleccione una fecha</h2>
                        <input type="date" id="fecha" className="fecha"/>
                        <h2>Seleccione un horario</h2>
                        <input type="time" id="hora" className="hora"/>
                        <h2>Seleccione un origen</h2>
                        <input type="text" id="origen" className="origen"/>
                        <h2>Seleccione un destino</h2>
                        <input type="text" id="destino" className="destino"/>
                    </section>

                </div>
                <div className={view === 'solicitudes' ? 'info active' : 'info'}>
                    <section className="step">
                        <h2>A continuación podrás ver tus solicitudes anteriores</h2>
                        <table className='tabla_solicitudes'>
                            <thead>
                                <tr>
                                <th>Nombre</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Origen</th>
                                <th>Destino</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Ejemplo</td>
                                <td>13-10-2000</td>
                                <td>16:20</td>
                                <td>San Joaquín</td>
                                <td>New York</td>
                                </tr>
                            </tbody>
                            </table>

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
}

export default PrincipalUsuario;