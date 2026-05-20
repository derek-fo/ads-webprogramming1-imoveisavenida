import { Routes, Route } from 'react-router'

import { Home } from '../pages/Home'
import { Anunciar } from '../pages/Anunciar'

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/anunciar" element={<Anunciar />} />
        </Routes>
    )
}
    