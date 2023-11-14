import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import historial from '../assets/historia.png';
import calendario from '../assets/calendario.png';
import chat from '../assets/charla.png';
import NavBar from '../navbar/navbar';
import "./principal.css";
import { AuthContext } from "../auth/AuthContext";


function PrincipalChofer() {
    const { token, id, setToken, setID, tipo, nombre, setNombre, setTipo } = useContext(AuthContext); // Accede al user desde AuthContext
    const [msg, setMsg] = useState("");
    const [servicios, setServicios] = useState([]);
    const [serviciosConNombres, setServiciosConNombres] = useState([]);

    const [view, setView] = useState('');
    const [isCalendarImageHovered, setIsCalendarImageHovered] = useState(false);
    const [isHistorialImageHovered, setIsHistorialImageHovered] = useState(false);
    const [isChatearImageHovered, setIsChatearImageHovered] = useState(false);
    const [authorized, setAuthorized] = useState(true); // Estado para controlar la autorización


    const [error, setError] = useState('');
    const [show, setShow] = useState([]); // Agregado estado para 'show'

    //* Mantener sesión
    useEffect(() => {
        console.log("ID:", id)
        console.log("Tipo:", tipo)
        console.log("Nombre:", nombre)
        console.log("Token:", token)
        // Verifica si el usuario es un chofer antes de realizar la solicitud
        if (tipo === "chofer") {
            console.log(token);
            const config = {
                method: 'get',
                url: `${import.meta.env.VITE_BACKEND_URL}/scope/protectedChofer`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            console.log(config);
            axios(config)
                .then((response) => {
                    console.log("weno chofer");
                    console.log(response);
                    setMsg(response.data.message);
                    setAuthorized(true);
                })
                .catch((error) => {
                    console.log("nao nao");
                    console.log(error);
                    setMsg(error.message);
                });
        } else {
            // Si el usuario no es un cliente, establecer un mensaje de error o redirigir
            setMsg("No se ha registrado como chofer");
            console.log("No se ha registrado");
            setAuthorized(false);
        }
    }, [token, id]);

    //* Ver viajes disponibles
    useEffect(() => {
        // Hacer la solicitud para obtener los servicios disponibles
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/servicios/all`)
            .then(response => {
                // Iterar sobre los servicios y obtener información adicional
                const serviciosPromises = response.data.map(servicio => {
                    const url = `${import.meta.env.VITE_BACKEND_URL}/clientes/${servicio.clienteID}`;
                    return axios.get(url, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then(cliente => {
                        console.log("cliente", cliente.data.nombre);
                        // Crear un nuevo objeto con la información del servicio y el nombre del cliente
                        return {
                            ...servicio,
                            nombreCliente: cliente.data.nombre,
                        };
                    })
                    .catch(error => {
                        console.error('Error al obtener información del cliente:', error);
                        return null; // Manejar el error aquí, por ejemplo, podrías asignar un nombre predeterminado
                    });
                });
                // Una vez que todas las solicitudes hayan terminado, actualiza el estado
                Promise.all(serviciosPromises)
                    .then(serviciosConNombres => {
                        // Filtra servicios que puedan ser null (por errores)
                        const serviciosValidos = serviciosConNombres.filter(servicio => servicio !== null);
                        console.log('Nombres de clientes:', serviciosValidos.map(servicio => servicio.nombreCliente));
                        setServiciosConNombres(serviciosValidos);
                        console.log("servicio", serviciosConNombres);
                    })
                    .catch(error => {
                        console.error('Error al obtener información del cliente:', error);
                    });
            })
            .catch(error => {
                console.error('Error al obtener servicios:', error);
            });
    }, []);
    
    return (
        <div className="contenedor_principal">
            <nav className="navbar">
                <NavBar />
            </nav>
            {!authorized ? (
                <h1>
                    Debe iniciar sesión o registrarse.
                </h1>
            ) : (
                <>
                <div className="OpcionesContainer">
                    <h1>Seleccione qué desea hacer </h1>
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
                        <h2>Viajes disponibles</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre de cliente</th>
                                    <th>Origen</th>
                                    <th>Destino</th>
                                    <th>Hora de partida</th>
                                    <th>Fecha</th>
                                    {/* Agrega más campos según la estructura de tu servicio */}
                                </tr>
                            </thead>
                            <tbody>
                                {serviciosConNombres.map(servicio => (
                                    <tr key={servicio.id}>
                                        <td>{servicio.nombreCliente}</td>
                                        <td>{servicio.origen}</td>
                                        <td>{servicio.destino}</td>
                                        <td>{servicio.hora}</td>
                                        <td>{servicio.fecha}</td>
                                        {/* Agrega más celdas según la estructura de tu servicio */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
            </>
            )}
        <footer>
            <p>Derechos de autor &copy; 2023 Vuelta Segura</p>
        </footer>

    </div>
)
}

export default PrincipalChofer;