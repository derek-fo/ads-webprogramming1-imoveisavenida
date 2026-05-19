import { Routes, Route } from 'react-router'

import { Home } from '../pages/Home'
import { Anunciar } from '../pages/Anunciar'
import { Pesquisar } from '../pages/Pesquisar'



export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/anunciar" element={<Anunciar />} />
            <Route path="/pesquisar" element={<Pesquisar />} />
        </Routes>
    )
}
    