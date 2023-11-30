import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import NavBar from '../navbar/navbar';
import "./principal-admin.css";
import { AuthContext } from "../auth/AuthContext";


function PrincipalAdmin() {
    const {token, setToken, id, setID, nombre, setNombre, tipo, setTipo } = useContext(AuthContext);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [entityData, setEntityData] = useState([]);
    const [msg, setMsg] = useState("");
    const [authorized, setAuthorized] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editingIndexServicio, setEditingIndexServicio] = useState(null);
    const [editingIndexEvaluacion, setEditingIndexEvaluacion] = useState(null);

    //* Mantener sesión
    useEffect(() => {
        console.log("ID:", id)
        console.log("Tipo:", tipo)
        console.log("Nombre:", nombre)
        console.log("Token:", token)
        // Verifica si el usuario es un chofer antes de realizar la solicitud
        if (tipo === "admin") {
            console.log(token);
            const config = {
                method: 'get',
                url: `${import.meta.env.VITE_BACKEND_URL}/scope/protectedCliente`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            console.log(config);
            axios(config)
                .then((response) => {
                    console.log("weno admin en clientes");
                    console.log(response);
                    setMsg(response.data.message);
                    setAuthorized(true);
                })
                .catch((error) => {
                    console.log("nao nao");
                    console.log(error);
                    setMsg(error.message);
                });
            const config2 = {
                method: 'get',
                url: `${import.meta.env.VITE_BACKEND_URL}/scope/protectedServicio`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            console.log(config2);
            axios(config2)
                .then((response) => {
                    console.log("weno admin en servicios");
                    console.log(response);
                    setMsg(response.data.message);
                    setAuthorized(true);
                })
                .catch((error) => {
                    console.log("nao nao");
                    console.log(error);
                    setMsg(error.message);
                });
            const config3 = {
                method: 'get',
                url: `${import.meta.env.VITE_BACKEND_URL}/scope/protectedChofer`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            console.log(config3);
            axios(config3)
                .then((response) => {
                    console.log("weno admin en choferes");
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

    //* Elegir la entidad
    const handleEntitySelection = (entity) => {
        console.log(`Selected Entity: ${entity}`);
        setSelectedEntity(entity);
        setEditingIndex(null);
        loadEntityData(entity);
    };
    

    //* Obtener todos los resultados de un elemento
    const loadEntityData = (entity) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/${entity}/all`; // Ajusta la URL según tu API
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const sortedData = response.data.sort((a, b) => a.id - b.id);
            setEntityData(response.data);
        })
        .catch(error => {
            console.error(`Error al obtener datos de ${entity}:`, error);
        });
    };

    //* Editar un elemento cliente o chofer
    const handleEditEntity = (entityId, index) => {
        setEditingIndex(index);
    };

    //* Borrar un chofer o cliente
    const handleDeleteEntity = (entityId) => {
        // Realiza una solicitud DELETE para borrar el registro con el entityId
        const url = `${import.meta.env.VITE_BACKEND_URL}/${selectedEntity}/${entityId}`; // Ajusta la URL según tu API
        axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            // Después de borrar el registro, actualiza la lista de datos
            loadEntityData(selectedEntity);
            console.log(`Registro en ${selectedEntity} con ID ${entityId} eliminado con éxito`);
        })
        .catch(error => {
            console.error(`Error al eliminar registro en ${selectedEntity}:`, error);
        });
    };

    //* Obtener todos los resultados de evaluaciones
    const loadEvaluacionesData = () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/evaluaciones/all`;
        axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then(response => {
        const sortedData = response.data.sort((a, b) => a.id - b.id);
        setEntityData(response.data);
        })
        .catch(error => {
        console.error('Error al obtener datos de evaluaciones:', error);
        });
    };

    ///* Para editar choferes o clientes
    const handleInputChange = (e, index, field) => {
        const newValue = e.target.value;
        // Crea una copia de la matriz de datos y actualiza el valor del campo editado
        const updatedEntityData = [...entityData];
        updatedEntityData[index][field] = newValue;
        setEntityData(updatedEntityData);
    };
    //* Guardar cambios para choferes o clientes
    const handleSaveEdit = (entityId, entity) => {
        // Realiza una solicitud PUT para guardar los cambios en el servidor
        const updatedEntity = entityData[editingIndex];
        console.log("entidad seleccionada:", selectedEntity);
        const url = `${import.meta.env.VITE_BACKEND_URL}/${selectedEntity}/${entityId}`;
        axios.put(url, updatedEntity, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('${entity} actualizado con éxito:', response.data);
            setEditingIndex(null);
            loadEntityData(entity);
        })
        .catch(error => {
            console.error('Error al actualizar el cliente:', error);
        });
    };

    //* Función para manejar la edición de un servicio
    const handleEditServicio = (servicioId, index) => {
        setEditingIndexServicio(index);
    };

    //* Función para manejar la guarda de un servicio editado
    const handleSaveEditServicio = (servicioId) => {
        // Realiza una solicitud PUT para guardar los cambios en el servidor
        const updatedServicio = entityData[editingIndexServicio];
        const url = `${import.meta.env.VITE_BACKEND_URL}/servicios/${servicioId}`;
        axios.put(url, updatedServicio, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Servicio actualizado con éxito:', response.data);
            setEditingIndexServicio(null); // Restablece el índice de edición
            loadEntityData('servicios'); // Recarga los datos de servicios
        })
        .catch(error => {
            console.error('Error al actualizar el servicio:', error);
        });
    };

    //* Borrar un chofer o cliente
    const handleDeleteServicio = (entityId) => {
        // Realiza una solicitud DELETE para borrar el registro con el entityId
        const url = `${import.meta.env.VITE_BACKEND_URL}/servicios/${entityId}`; // Ajusta la URL según tu API
        axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            // Después de borrar el registro, actualiza la lista de datos
            loadEntityData(selectedEntity);
            console.log(`Registro en ${selectedEntity} con ID ${entityId} eliminado con éxito`);
        })
        .catch(error => {
            console.error(`Error al eliminar registro en ${selectedEntity}:`, error);
        });
    };

    //* Editar una evaluación
    const handleEditEvaluacion = (evaluacionId, index) => {
        setEditingIndexEvaluacion(index);
    };

    //* Guardar cambios de una evaluación
    const handleSaveEditEvaluacion = (evaluacionId) => {
        const updatedEvaluacion = entityData[editingIndexEvaluacion];
        const url = `${import.meta.env.VITE_BACKEND_URL}/evaluaciones/${evaluacionId}`;
        axios.put(url, updatedEvaluacion, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then(response => {
        console.log('Evaluación actualizada con éxito:', response.data);
        setEditingIndexEvaluacion(null);
        loadEvaluacionesData();
        })
        .catch(error => {
        console.error('Error al actualizar la evaluación:', error);
        });
    };

    //* Borrar una evaluación
    const handleDeleteEvaluacion = (evaluacionId) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/evaluaciones/${evaluacionId}`;
        axios.delete(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then(response => {
        loadEvaluacionesData();
        console.log(`Evaluación con ID ${evaluacionId} eliminada con éxito`);
        })
        .catch(error => {
        console.error(`Error al eliminar la evaluación:`, error);
        });
    };

    //* Para definir cómo se ve la tabla según la entidad
    const renderEntityTable = () => {
        switch (selectedEntity) {
            case 'clientes':
                return (
                    <>
                        <thead>
                            <tr>
                                <th>ID del cliente</th>
                                <th>Nombre del cliente</th>
                                <th>Email</th>
                                <th>Teléfono</th>

                            </tr>
                        </thead>
                        <tbody>
                            {entityData.map((entity, index) => (
                                <tr key={entity.id}>
                                    <td>{entity.id}</td>
                                    <td>{index === editingIndex ? <input type="text" value={entity.nombre} onChange={(e) => handleInputChange(e, index, 'nombre')} /> : entity.nombre}</td>
                                    <td>{index === editingIndex ? <input type="text" value={entity.email} onChange={(e) => handleInputChange(e, index, 'email')} /> : entity.email}</td>
                                    <td>{index === editingIndex ? <input type="text" value={entity.telefono} onChange={(e) => handleInputChange(e, index, 'telefono')} /> : entity.telefono}</td>
                                    <td>
                                        {index === editingIndex ? (
                                            <button onClick={() => handleSaveEdit(entity.id, "clientes")}>Guardar</button>
                                        ) : (
                                            <button onClick={() => handleEditEntity(entity.id, index)}>Editar</button>
                                        )}
                                        <button onClick={() => handleDeleteEntity(entity.id)}>Borrar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                );
            case 'choferes':
                return (
                    <>
                        <thead>
                            <tr>
                                <th>ID del chofer</th>
                                <th>Nombre del chofer</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entityData.map((entity, index) => (
                                <tr key={entity.id}>
                                    <td>{entity.id}</td>
                                    <td>{index === editingIndex ? <input type="text" value={entity.nombre} onChange={(e) => handleInputChange(e, index, 'nombre')} /> : entity.nombre}</td>
                                    <td>{index === editingIndex ? <input type="text" value={entity.email} onChange={(e) => handleInputChange(e, index, 'email')} /> : entity.email}</td>
                                    <td>{index === editingIndex ? <input type="text" value={entity.telefono} onChange={(e) => handleInputChange(e, index, 'telefono')} /> : entity.telefono}</td>
                                    <td>
                                        {index === editingIndex ? (
                                            <button onClick={() => handleSaveEdit(entity.id, "choferes")}>Guardar</button>
                                        ) : (
                                            <button onClick={() => handleEditEntity(entity.id, index)}>Editar</button>
                                        )}
                                        <button onClick={() => handleDeleteEntity(entity.id)}>Borrar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                );
                case 'servicios':
                    return (
                        <>
                            <thead>
                                <tr>
                                    <th>ID del servicio</th>
                                    <th>ID del cliente</th>
                                    <th>ID del chofer</th>
                                    <th>Origen</th>
                                    <th>Destino</th>
                                    <th>Hora de partida</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entityData.map((servicio, index) => (
                                    <tr key={servicio.id}>
                                        <td>
                                            {servicio.id}
                                        </td>
                                        <td>
                                            {index === editingIndexServicio ? (
                                                <input type="text" value={servicio.clienteID} onChange={(e) => handleInputChange(e, index, 'clienteID')} />
                                            ) : (
                                                servicio.clienteID
                                            )}
                                        </td>
                                        <td>
                                            {index === editingIndexServicio ? (
                                                <input type="text" value={servicio.choferID} onChange={(e) => handleInputChange(e, index, 'choferID')} />
                                            ) : (
                                                servicio.choferID
                                            )}
                                        </td>
                                        <td>
                                            {index === editingIndexServicio ? (
                                                <input type="text" value={servicio.origen} onChange={(e) => handleInputChange(e, index, 'origen')} />
                                            ) : (
                                                servicio.origen
                                            )}
                                        </td>
                                        <td>
                                            {index === editingIndexServicio ? (
                                                <input type="text" value={servicio.destino} onChange={(e) => handleInputChange(e, index, 'destino')} />
                                            ) : (
                                                servicio.destino
                                            )}
                                        </td>
                                        <td>
                                            {index === editingIndexServicio ? (
                                                <input
                                                    type="time"
                                                    value={servicio.hora}
                                                    onChange={(e) => handleInputChange(e, index, 'hora')}
                                                />
                                            ) : (
                                                servicio.hora
                                            )}
                                        </td>
                                        <td>
                                            {index === editingIndexServicio ? (
                                                <input
                                                    type="date"
                                                    value={servicio.fecha}
                                                    onChange={(e) => handleInputChange(e, index, 'fecha')}
                                                />
                                            ) : (
                                                (() => {
                                                    const fecha_original = new Date(servicio.fecha);
                                                    const dia = fecha_original.getDate();
                                                    const mes = fecha_original.getMonth() + 1;
                                                    const ano = fecha_original.getFullYear();
                                                    const fechaFormateada = `${dia}-${mes}-${ano}`;
                                                    return fechaFormateada;
                                                })()
                                            )}
                                        </td>
                                        <td>
                                            {index === editingIndexServicio ? (
                                                <input type="text" value={servicio.estado} onChange={(e) => handleInputChange(e, index, 'estado')} />
                                            ) : (
                                                servicio.estado
                                            )}
                                        </td>
                                        <td>
                                            {index === editingIndexServicio ? (
                                                <button onClick={() => handleSaveEditServicio(servicio.id)}>Guardar</button>
                                            ) : (
                                                <button onClick={() => handleEditServicio(servicio.id, index)}>Editar</button>
                                            )}
                                            <button onClick={() => handleDeleteServicio(servicio.id)}>Borrar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    );
                    case 'evaluaciones':
                        return (
                            <>
                                <thead>
                                <tr>
                                    <th>ID de la evaluación</th>
                                    <th>ID del cliente</th>
                                    <th>ID del chofer</th>
                                    <th>Calificación</th>
                                </tr>
                                </thead>
                                <tbody>
                                {entityData.map((evaluacion, index) => (
                                    <tr key={evaluacion.id}>
                                    <td>{evaluacion.id}</td>
                                    <td>
                                        {index === editingIndexEvaluacion ? (
                                        <input type="text" value={evaluacion.clienteID} onChange={(e) => handleInputChange(e, index, 'clienteID')} />
                                        ) : (
                                        evaluacion.clienteID
                                        )}
                                    </td>
                                    <td>
                                        {index === editingIndexEvaluacion ? (
                                        <input type="text" value={evaluacion.choferID} onChange={(e) => handleInputChange(e, index, 'choferID')} />
                                        ) : (
                                        evaluacion.choferID
                                        )}
                                    </td>
                                    <td>
                                        {index === editingIndexEvaluacion ? (
                                        <input type="text" value={evaluacion.calificacion} onChange={(e) => handleInputChange(e, index, 'calificacion')} />
                                        ) : (
                                        evaluacion.calificacion
                                        )}
                                    </td>
                                    <td>
                                        {index === editingIndexEvaluacion ? (
                                        <button onClick={() => handleSaveEditEvaluacion(evaluacion.id)}>Guardar</button>
                                        ) : (
                                        <button onClick={() => handleEditEvaluacion(evaluacion.id, index)}>Editar</button>
                                        )}
                                        <button onClick={() => handleDeleteEvaluacion(evaluacion.id)}>Borrar</button>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </>
                            );
            default:
                return null;
        }
    };

    return (
        <div>
            <nav className="navbar">
                <NavBar />
            </nav>
                <div className="contenedor_principal_admin">
                    <div>
                        <button onClick={() => handleEntitySelection('clientes')}>Clientes</button>
                        <button onClick={() => handleEntitySelection('choferes')}>Choferes</button>
                        <button onClick={() => handleEntitySelection('evaluaciones')}>Evaluaciones</button>
                        <button onClick={() => handleEntitySelection('servicios')}>Servicios</button>
                    </div>
                    {selectedEntity && (
                        <div>
                            <table>
                                <thead>
                                </thead>
                                {renderEntityTable()}
                            </table>
                        </div>
                    )}
                </div>
        </div>
    );
}

export default PrincipalAdmin;