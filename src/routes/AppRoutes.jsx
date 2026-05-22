import { useState } from "react"
import { Routes, Route } from "react-router"
import { Home }     from "../pages/Home"
import { Detalhe }  from "../pages/Detalhe"
import { Anunciar } from "../pages/Anunciar"

export function AppRoutes() {

  const [busca, setBusca] = useState("")

  return (
    <Routes>
      <Route path="/"            element={<Home busca={busca} setBusca={setBusca} />} />
      <Route path="/detalhe/:id" element={<Detalhe />} />
      <Route path="/anunciar"    element={<Anunciar />} />
    </Routes>
  )
}