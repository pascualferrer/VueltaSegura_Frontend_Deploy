import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HowItWorks from './HowItWorks.jsx'
import App from './App.jsx'
import PrincipalUsuario from './principal-usuario.jsx';
import PrincipalChofer from './principal-chofer.jsx';

function Routing() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/HowItWorks'} element={<HowItWorks/>}/>
                <Route path={'/principal-usuario'} element={<PrincipalUsuario/>}/>
                <Route path={'/principal-chofer'} element={<PrincipalChofer/>}/>
                <Route path={'/'} element={<App/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing
