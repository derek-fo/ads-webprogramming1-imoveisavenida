import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Navbar } from "../components/Navbar"
import { CardImovel } from "../components/CardImovel"
import { Footer } from "../components/Footer"

const categorias = [
  { label: "Todos",        value: "" },
  { label: "Casas",        value: "Casa" },
  { label: "Apartamentos", value: "Apartamento" },
  { label: "Kitnets",      value: "Kitnet" },
  { label: "Chácaras",     value: "Chácara" },
  { label: "Lofts",        value: "Loft" },
  { label: "Studios",      value: "Studio" },
]

export function Home({ busca, setBusca }) {
  const navigate = useNavigate()

  const [imoveis,   setImoveis]   = useState([])
  const [loading,   setLoading]   = useState(true)
  const [erro,      setErro]      = useState(null)
  const [categoria, setCategoria] = useState("")

  useEffect(() => {
    async function buscaImoveis() {
      try {
        setLoading(true)
        const resposta = await fetch("http://localhost:3000/imoveis")
        if (!resposta.ok) throw new Error("Não foi possível carregar os imóveis.")
        const dados = await resposta.json()
        setImoveis(dados)
      } catch (err) {
        setErro(err.message)
      } finally {
        setLoading(false)
      }
    }
    buscaImoveis()
  }, [])

  const imoveisFiltrados = imoveis.filter((im) => {
    const termo = busca.toLowerCase()
    const matchBusca =
      !termo ||
      im.titulo.toLowerCase().includes(termo) ||
      im.cidade.toLowerCase().includes(termo) ||
      im.bairro.toLowerCase().includes(termo) ||
      im.tipo.toLowerCase().includes(termo)
    const matchCategoria = !categoria || im.tipo === categoria
    return matchBusca && matchCategoria
  })

  function verDetalhe(imovel) {
    navigate(`/detalhe/${imovel.id}`, { state: { imovel } })
  }

  return (
    <div>
      <Navbar busca={busca} setBusca={setBusca} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ── Filtro de categorias — fica logo abaixo do header, como no Airbnb ── */}
        <div className="flex gap-8 overflow-x-auto pb-4 mb-6 border-b border-gray-100">
          {categorias.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategoria(cat.value)}
              className={`pb-2 border-b-2 whitespace-nowrap transition-all text-sm font-medium -mb-4 ${
                categoria === cat.value
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#404F68]" />
          </div>

        ) : erro ? (
          <div className="text-center py-20">
            <p className="text-red-500 font-semibold">{erro}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-[#404F68] underline text-sm"
            >
              Tentar novamente
            </button>
          </div>

        ) : imoveisFiltrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="text-5xl">🏠</span>
            <h3 className="text-lg font-semibold text-gray-700">Nenhum imóvel encontrado</h3>
            <p className="text-sm text-gray-500 text-center max-w-xs">
              Nenhum resultado para "{busca || categoria}".
            </p>
            <button
              onClick={() => { setBusca(""); setCategoria("") }}
              className="text-[#404F68] text-sm font-medium hover:underline"
            >
              Limpar filtros
            </button>
          </div>

        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {imoveisFiltrados.map((imovel) => (
              <CardImovel
                key={imovel.id}
                imovel={imovel}
                onVerDetalhe={verDetalhe}
              />
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}
