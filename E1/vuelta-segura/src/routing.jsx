import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HowItWorks from './HowItWorks.jsx'
import App from './App.jsx'

function Routing() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/HowItWorks'} element={<HowItWorks/>}/>
                <Route path={'/'} element={<App/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing
