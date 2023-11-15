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
            setEntityData(response.data);
        })
        .catch(error => {
            console.error(`Error al obtener datos de ${entity}:`, error);
        });
    };

    //* Crear un elemento
    const handleCreateEntity = () => {
        // Aquí puedes abrir un formulario o redirigir a una página para crear una nueva entidad
        console.log(`Crear nuevo registro en ${selectedEntity}`);
    };

    //* Editar un elemento
    const handleEditEntity = (entityId) => {
        // Aquí puedes abrir un formulario o redirigir a una página para editar el registro con el entityId
        console.log(`Editar registro en ${selectedEntity} con ID: ${entityId}`);
    };

    //* Borrar un elemento
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
                            {entityData.map(entity => (
                                <tr key={entity.id}>
                                    <td>{entity.id}</td>
                                    <td>{entity.nombre}</td>
                                    <td>{entity.email}</td>
                                    <td>{entity.telefono}</td>
                                    <td>
                                        <button onClick={() => handleEditEntity(entity.id)}>Editar</button>
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
                            {entityData.map(entity => (
                                <tr key={entity.id}>
                                    <td>{entity.id}</td>
                                    <td>{entity.nombre}</td>
                                    <td>{entity.email}</td>
                                    <td>{entity.telefono}</td>
                                    <td>
                                        <button onClick={() => handleEditEntity(entity.id)}>Editar</button>
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
                                    <th>ID del cliente</th>
                                    <th>ID del chofer</th>
                                    <th>Origen</th>
                                    <th>Destino</th>
                                    <th>Hora de partida</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entityData.map(entity => (
                                    <tr key={entity.id}>
                                        <td>{entity.clienteID}</td>
                                        <td>{entity.choferID}</td>
                                        <td>{entity.origen}</td>
                                        <td>{entity.destino}</td>
                                        <td>{entity.hora}</td>
                                        <td>
                                            {(() => {
                                            const fecha_original = new Date(entity.fecha);
                                            const dia = fecha_original.getDate();
                                            const mes = fecha_original.getMonth() + 1;
                                            const ano = fecha_original.getFullYear();
                                            const fechaFormateada = `${dia}-${mes}-${ano}`;
                                            return fechaFormateada;
                                            })()}
                                        </td>
                                        <td>{entity.estado}</td>
                                        <td>
                                            <button onClick={() => handleEditEntity(entity.id)}>Editar</button>
                                            <button onClick={() => handleDeleteEntity(entity.id)}>Borrar</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </>
                    );
                //TODO: agregar para evaluaciones y chats
            default:
                return null;
        }
    };

    return (
        <div className="contenedor_principal_admin">
            <div>
                <button onClick={() => handleEntitySelection('clientes')}>Clientes</button>
                <button onClick={() => handleEntitySelection('choferes')}>Choferes</button>
                <button onClick={() => handleEntitySelection('evaluaciones')}>Evaluaciones</button>
                <button onClick={() => handleEntitySelection('servicios')}>Servicios</button>
                <button onClick={() => handleEntitySelection('chats')}>Chats</button>
            </div>
            {selectedEntity && (
                <div>
                    <button onClick={handleCreateEntity}>Crear Nuevo</button>
                    <table>
                        <thead>
                    
                        </thead>
                        {renderEntityTable()}
                    </table>
                </div>
            )}
        </div>
    );
}

export default PrincipalAdmin;