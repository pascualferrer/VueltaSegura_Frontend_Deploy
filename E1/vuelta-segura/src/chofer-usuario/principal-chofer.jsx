import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import historial from '../assets/historia.png';
import calendario from '../assets/calendario.png';
import star from '../assets/star.png';
import NavBar from '../navbar/navbar';
import "./principal.css";
import { AuthContext } from "../auth/AuthContext";
import { format } from 'date-fns';

function PrincipalChofer() {
    const { token, id, setToken, setID, tipo, nombre, setNombre, setTipo } = useContext(AuthContext); // Accede al user desde AuthContext
    const [msg, setMsg] = useState("");
    const [servicios, setServicios] = useState([]);
    const [serviciosConNombres, setServiciosConNombres] = useState([]);
    const [historialServicios, setHistorialServicios] = useState([]);

    const [view, setView] = useState('');
    const [isCalendarImageHovered, setIsCalendarImageHovered] = useState(false);
    const [isHistorialImageHovered, setIsHistorialImageHovered] = useState(false);
    const [isChatearImageHovered, setIsChatearImageHovered] = useState(false);
    const [authorized, setAuthorized] = useState(true); // Estado para controlar la autorización


    const [error, setError] = useState('');
    const [show, setShow] = useState([]); // Agregado estado para 'show'

    const [evaluaciones, setEvaluaciones] = useState([]);

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
        };
        if (tipo === "chofer" || "admin") {
            const config2 = {
                method: 'get',
                url: `${import.meta.env.VITE_BACKEND_URL}/scope/protectedServicioChofer`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            console.log(config2);
            axios(config2)
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
        const all = {
            method: 'get',
            url: `${import.meta.env.VITE_BACKEND_URL}/servicios/all`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios(all)
            .then(response => {
                // Iterar sobre los servicios y obtener información adicional
                const serviciosPromises = response.data.map(servicio => {
                    if (servicio.choferID === null) {
                        const url = `${import.meta.env.VITE_BACKEND_URL}/clientes/${servicio.clienteID}`;
                        return axios.get(url, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        .then(cliente => {
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
                    } else {
                        return null; // Si el servicio tiene un chofer asignado, devolver null para filtrarlo
                    }
                });
                // Una vez que todas las solicitudes hayan terminado, actualiza el estado
                Promise.all(serviciosPromises)
                    .then(serviciosConNombres => {
                        // Filtra servicios que puedan ser null (por errores)
                        const serviciosValidos = serviciosConNombres.filter(servicio => servicio !== null);
                        setServiciosConNombres(serviciosValidos);
                    })
                    .catch(error => {
                        console.error('Error al obtener información del cliente:', error);
                    });
            })
            .catch(error => {
                console.error('Error al obtener servicios:', error);
            });
    }, [view]);

    //* Realizar una solicitud PUT para actualizar choferID y el estado del servicio
    const handleSeleccionar = (servicioId) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/servicios/${servicioId}`;
        const data = {
            choferID: id,
            estado: "Agendado",
        };
        axios.put(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Servicio actualizado con éxito:', response.data);
            // Después de seleccionar, redirigir a la vista de historial
            setView('historial');
        })
        .catch(error => {
            console.error('Error al actualizar el servicio:', error);
        });
    };

    //* Obtener historial de servicios cuando view es 'historial'
    useEffect(() => {
        if (view === 'historial') {
            const url = `${import.meta.env.VITE_BACKEND_URL}/servicios/historial-chofer`;
            const config = {
                params: { choferID: id },
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            };
            axios.get(url, config)
                .then(response => {
                    setHistorialServicios(response.data);
                })
                .catch(error => {
                    console.error('Error al obtener historial de servicios:', error);
                });
        }
    }, [view, token]);

    //* Cancelar un viaje
    const handleCancelService = (servicioId) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/servicios/${servicioId}`;
        const data = {
            choferID: null,
            estado: "Por confirmar", // Puedes ajustar el estado según tus necesidades
        };

        axios.put(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Servicio cancelado con éxito:', response.data);
        })
        .catch(error => {
            console.error('Error al cancelar el servicio:', error);
        });
        setView('disponibilidad');
    };

    //* Ver las evaluaciones del chofer
    useEffect(() => {
        const choferINT = parseInt(id, 10);
        if (view === 'evaluacion') {
            const url = `${import.meta.env.VITE_BACKEND_URL}/evaluaciones/buscar-por-id`;
            axios.get(url, {
                params: { choferID: choferINT },
            })
            .then(response => {
                setEvaluaciones(response.data);
                console.log("response evals:", response.data);
            })
            .catch(error => {
                console.error('Error al obtener evaluaciones del chofer:', error);
            });
        }
    }, [view]);

    //* Cambiar formato de fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd-MM-yyyy');
    };
    
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
                        <div className="box" onClick={() => setView('evaluacion')}>
                            <img 
                                src={star} 
                                alt="evaluacion" 
                                onMouseEnter={() => setIsChatearImageHovered(true)}
                                onMouseLeave={() => setIsChatearImageHovered(false)} 
                                className={isChatearImageHovered ? 'enlarged' : ''}
                                />
                            <h2>Ver evaluaciones</h2>
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
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviciosConNombres.map(servicio => (
                                    <tr key={servicio.id}>
                                        <td>{servicio.nombreCliente}</td>
                                        <td>{servicio.origen}</td>
                                        <td>{servicio.destino}</td>
                                        <td>{servicio.hora}</td>
                                        <td>
                                            {(() => {
                                            const fecha_original = new Date(servicio.fecha);
                                            const dia = fecha_original.getDate();
                                            const mes = fecha_original.getMonth() + 1;
                                            const ano = fecha_original.getFullYear();
                                            const fechaFormateada = `${dia}-${mes}-${ano}`;
                                            return fechaFormateada;
                                            })()}
                                        </td>
                                        <td>{servicio.estado}</td>
                                        <td>
                                            <button3 onClick={() => handleSeleccionar(servicio.id)}>Seleccionar</button3>
                                        </td>
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
                                    {historialServicios.map(servicio => (
                                        <tr key={servicio.id}>
                                            <td>{servicio.Cliente.nombre}</td>
                                            <td>
                                                {(() => {
                                                const fecha_original = new Date(servicio.fecha);
                                                const dia = fecha_original.getDate();
                                                const mes = fecha_original.getMonth() + 1;
                                                const ano = fecha_original.getFullYear();
                                                const fechaFormateada = `${dia}-${mes}-${ano}`;
                                                return fechaFormateada;
                                                })()}
                                            </td>
                                            <td>{servicio.hora}</td>
                                            <td>{servicio.origen}</td>
                                            <td>{servicio.destino}</td>
                                            <td>
                                                <button onClick={() => handleCancelService(servicio.id)}>
                                                    Cancelar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </div>

                    <div className={view === 'evaluacion' ? 'info active' : 'info'}>
                        <section className="step">
                        <h2>Evaluaciones recibidas</h2>
                            {evaluaciones.length > 0 ? (
                                <table className='tabla_evaluaciones'>
                                    <thead>
                                        <tr>
                                            <th>ID de la evaluación</th>
                                            <th>Cliente</th>
                                            <th>Fecha de Creación</th>
                                            <th>Puntuación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {evaluaciones.map(evaluacion => (
                                            <tr key={evaluacion.id}>
                                                <td>{evaluacion.id}</td>
                                                <td>{evaluacion.Cliente ? evaluacion.Cliente.nombre : 'Nombre no disponible'}</td>
                                                <td>{formatDate(evaluacion.createdAt)}</td>
                                                <td>{evaluacion.calificacion}/5</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No hay evaluaciones recibidas.</p>
                            )}
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