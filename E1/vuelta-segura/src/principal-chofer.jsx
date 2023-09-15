import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import historial from './assets/historia.png';
import calendario from './assets/calendario.png';
import chat from './assets/charla.png';
import NavBar from './navbar';
import "./principal.css"

function PrincipalChofer() {
    const [view, setView] = useState('');
    const [isCalendarImageHovered, setIsCalendarImageHovered] = useState(false);
    const [isHistorialImageHovered, setIsHistorialImageHovered] = useState(false);
    const [isChatearImageHovered, setIsChatearImageHovered] = useState(false);

    return (
        <div className="contenedor_principal">
            <nav className="navbar">
                <NavBar />
            </nav>

            <div className="OpcionesContainer">
                <h1>Seleccione qué desea hacer</h1>
                <div className="boxContainer">
                    <div className="box" onClick={() => setView('disponibilidad')}>
                        <img 
                            src={calendario} 
                            alt="disponibilidad" 
                            onMouseEnter={() => setIsCalendarImageHovered(true)}
                            onMouseLeave={() => setIsCalendarImageHovered(false)} 
                            className={isCalendarImageHovered ? 'enlarged' : ''}
                            />
                        <h2>Agendar disponibilidad</h2>
                    </div>
                    <div className="box" onClick={() => setView('historial')}>
                        <img 
                            src={historial} 
                            alt="historial" 
                            onMouseEnter={() => setIsHistorialImageHovered(true)}
                            onMouseLeave={() => setIsHistorialImageHovered(false)} 
                            className={isHistorialImageHovered ? 'enlarged' : ''}
                            />
                        <h2>Ver mi historial</h2>
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
            <div className={view === 'disponibilidad' ? 'info active' : 'info'}>
                <section className="step">
                    <h2>Seleccione los días de la semana en los que esté disponible</h2>
                    <div className="dias-semana">
                        <label className='label'>
                            <input type="checkbox" name="lunes" /> Lunes
                            <br></br>
                            <br></br>
                            Inicio <input type="time" id="inicio-lun" className="hora"/>
                            Fin <input type="time" id="fin-lun" className="hora"/>
                        </label>
                        <label className='label'>
                            <input type="checkbox" name="martes" /> Martes
                            <br></br>
                            <br></br>
                            Inicio <input type="time" id="inicio-mar" className="hora"/>
                            Fin <input type="time" id="fin-mar" className="hora"/>
                        </label>
                        <label className='label'>
                            <input type="checkbox" name="miercoles" /> Miércoles
                            <br></br>
                            <br></br>
                            Inicio <input type="time" id="inicio-mie" className="hora"/>
                            Fin <input type="time" id="fin-mie" className="hora"/>
                        </label>
                        <label className='label'>
                            <input type="checkbox" name="jueves" /> Jueves
                            <br></br>
                            <br></br>
                            Inicio <input type="time" id="inicio-jue" className="hora"/>
                            Fin <input type="time" id="fin-jue" className="hora"/>
                        </label>
                        <label className='label'>
                            <input type="checkbox" name="viernes" /> Viernes
                            <br></br>
                            <br></br>
                            Inicio <input type="time" id="inicio-vie" className="hora"/>
                            Fin <input type="time" id="fin-vie" className="hora"/>
                        </label>
                        <label className='label'>
                            <input type="checkbox" name="sabado" /> Sábado
                            <br></br>
                            <br></br>
                            Inicio <input type="time" id="inicio-sab" className="hora"/>
                            Fin <input type="time" id="fin-sab" className="hora"/>
                        </label>
                        <label className='label'>
                            <input type="checkbox" name="domingo" /> Domingo
                            <br></br>
                            <br></br>
                            Inicio <input type="time" id="inicio-dom" className="hora"/>
                            Fin <input type="time" id="fin-dom" className="hora"/>
                        </label>
                    </div>
                    <button className='enviar'>
                        Enviar preferencias
                    </button>
                </section>
                </div>

                <div className={view === 'historial' ? 'info active' : 'info'}>
                    <section className="step">
                        <h2>A continuación podrás ver tus solicitudes anteriores</h2>
                        <table className='tabla_solicitudes'>
                            <thead>
                                <tr>
                                <th>Cliente</th>
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
                        <Link to="/chat_usuario">
                            <button className='chat_usuarior'>
                                Cliente
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

export default PrincipalChofer;