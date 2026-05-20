import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar"
import CardImovel from "../components/CardImovel"

export function Home({ onNavegar, onSelecionarImovel }) {

  const [imoveis, setImoveis] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

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

  return (
    <div>
      <Navbar onNavegar={onNavegar} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
          </div>
        ) : erro ? (
          <div className="text-center py-20">
            <p className="text-red-500 font-semibold">{erro}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 text-rose-500 underline"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {imoveis.length > 0 ? "Imóveis disponíveis" : "Nenhum imóvel encontrado"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {imoveis.map(imovel => (
                <CardImovel
                  key={imovel.id}
                  imovel={imovel}
                  onVerDetalhe={onSelecionarImovel}
                />
              ))}
            </div>
          </>
        )}

      </main>
    </div>
  )
}