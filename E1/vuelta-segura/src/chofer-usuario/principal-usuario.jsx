import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import coche from '../assets/coche.png';
import calendario from '../assets/calendario.png';
import star from '../assets/star.png';
import NavBar from '../navbar/navbar';
import { AuthContext } from "../auth/AuthContext";
import "./principal.css"
import { format } from 'date-fns';

const PrincipalUsuario = () => {
    const { token, id, setToken, setID, tipo, nombre, setNombre, setTipo } = useContext(AuthContext); // Accede al user desde AuthContext
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
    const [authorized, setAuthorized] = useState(true); // Estado para controlar la autorización

    const [error, setError] = useState('');
    const [show, setShow] = useState([]); // Agregado estado para 'show'

    const [servicios, setServicios] = useState([]); // Inicializar como array vacío
    const [puntuaciones, setPuntuaciones] = useState({});

        useEffect(() => {
            console.log("ID:", id)
            console.log("Tipo:", tipo)
            console.log("Nombre:", nombre)
            console.log("Token:", token)
            // Verifica si el usuario es un cliente antes de realizar la solicitud
            if (tipo === "cliente") {
                const config = {
                    method: 'get',
                    url: `${import.meta.env.VITE_BACKEND_URL}/scope/protectedCliente`,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                axios(config)
                    .then((response) => {
                        console.log("weno cliente");
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

            if (tipo === "cliente" || "admin") {
                const config2 = {
                    method: 'get',
                    url: `${import.meta.env.VITE_BACKEND_URL}/scope/protectedServicioCliente`,
                    headers: {
                        'Authorization': `Bearer ${token}`
                        }
                };
                console.log(config2);
                axios(config2)
                    .then((response) => {
                        console.log("weno servicio authorized");
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
                setMsg("No se ha registrado como cliente");
                console.log("No se ha registrado");
                setAuthorized(false);
            }
        }, [token, id]);

        //* Ver los servicios del cliente
        useEffect(() => {
            const handleShow = async () => {
                try {
                    const show = await axios.get(
                        `${import.meta.env.VITE_BACKEND_URL}/servicios/buscar-por-id`, 
                        {
                            params: { clienteID: id },
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                        }
                    );
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

    //* Crear servicios
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fecha || !hora || !origen || !destino) {
            // Mostrar mensaje de error o realizar otras acciones
            console.error('Todos los campos son obligatorios');
            setError('Todos los campos son obligatorios');
            return;
        }

        try {            
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/servicios`, {
                clienteID: id,
                fecha,
                estado: "Por confirmar",
                hora,
                origen,
                destino
            }, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

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

    //* Obtener servicios confirmados al cargar la página o cambiar a la vista 'evaluar'
    useEffect(() => {
        if (view === 'evaluar') {
        obtenerServiciosConfirmados();
        }
    }, [view]);

    //* Función para obtener servicios confirmados
    const obtenerServiciosConfirmados = () => {
        // Hacer la solicitud para obtener los servicios con estado "Agendado"
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/servicios/agendados`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then(response => {
            console.log("Servicio confirmed", response.data);
            setServicios(response.data);
        })
        .catch(error => {
            console.error('Error al obtener servicios agendados:', error);
        });
    };

    //* Evaluar el servicio (crear evaluación)
    const enviarEvaluacion = async (servicioId, puntuacion) => {
        try {

            //* Obtenemos la información del servicio, incluido el ID del chofer
            const servicioResponse = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/servicios/${servicioId}`,
                {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    },
                }
            );
            const chofer = servicioResponse.data.choferID;
            console.log("response:", servicioResponse);
            console.log("id chofer eval:", chofer);

            //* Convertir clienteID a entero
            const clienteIDInt = parseInt(id, 10);

            const response = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/evaluaciones`, // Reemplaza '/evaluaciones' con tu ruta real
                {
                    clienteID: clienteIDInt,
                    choferID: chofer,
                    comentario: "Puntuación enviada correctamente a la base de datos",
                    calificacion: puntuacion
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log('Evaluación enviada con éxito:', response.data);
            setServicios(prevServicios => prevServicios.filter(servicio => servicio.id !== servicioId));
            setView('agendar');
            setView('evaluar');
        } catch (error) {
            console.error('Error al enviar la evaluación:', error.response.data);
        }
    };

    //* Cambiar formato de fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd-MM-yyyy');
    };

    const setPuntuacionServicio = (servicioId, puntuacion) => {
        setPuntuaciones(prevState => ({
            ...prevState,
            [servicioId]: puntuacion
        }));
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
                    <div className="box" onClick={() => setView('evaluar')}>
                        <img 
                            src={star} 
                            alt="evaluacion" 
                            onMouseEnter={() => setIsChatearImageHovered(true)}
                            onMouseLeave={() => setIsChatearImageHovered(false)} 
                            className={isChatearImageHovered ? 'enlarged' : ''}
                            />
                        <h2>Evaluar</h2>
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
                <div className={view === 'evaluar' ? 'info active' : 'info'}>
                    <section className="step">
                    <h2>Evaluar servicios confirmados</h2>
                    {servicios.length > 0 ? (
                        <div>
                        <p>Selecciona la puntuación para cada servicio:</p>
                        <table className='tabla_servicios'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Origen</th>
                                    <th>Destino</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {servicios.map(servicio => (
                                <tr key={servicio.id}>
                                <td>{servicio.id}</td>
                                <td>{formatDate(servicio.fecha)}</td>
                                <td>{servicio.hora}</td>
                                <td>{servicio.origen}</td>
                                <td>{servicio.destino}</td>
                                <td>
                                    <select
                                    value={puntuaciones[servicio.id] || 0}
                                    onChange={e => setPuntuacionServicio(servicio.id, Number(e.target.value))}
                                    >
                                    {[0, 1, 2, 3, 4, 5].map(valor => (
                                        <option key={valor} value={valor}>
                                        {valor}
                                        </option>
                                    ))}
                                    </select>
                                    <button className="evaluar-button" onClick={() => enviarEvaluacion(servicio.id, puntuaciones[servicio.id])}>
                                        Evaluar
                                    </button>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    ) : (
                        <p>No hay servicios confirmados para evaluar.</p>
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
);
};
export default PrincipalUsuario;
