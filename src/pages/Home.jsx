import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { CardImovel } from "../components/CardImovel";
import { Footer } from "../components/Footer";

const categorias = [
  { label: "Todos", value: "" },
  { label: "Casas", value: "Casa" },
  { label: "Apartamentos", value: "Apartamento" },
  { label: "Lofts", value: "Loft" },
  { label: "Studios", value: "Studio" },
];

export function Home({ busca, setBusca }) {
  const navigate = useNavigate();

  const [imoveis, setImoveis] = useState([]); // estados para imoveis, carregamento, erro e categoria
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [categoria, setCategoria] = useState("");

  useEffect(() => { // busca dados no db
    async function buscaImoveis() {
      try {
        setLoading(true);
        const resposta = await fetch("http://localhost:3000/imoveis");
        if (!resposta.ok)
          throw new Error("Não foi possível carregar os imóveis.");
        const dados = await resposta.json();
        setImoveis(dados);
      } catch (err) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    }
    buscaImoveis();
  }, []);

  const imoveisFiltrados = imoveis.filter((im) => { // filtro para mostrar imovel conforme digitado no buscar
    const termo = busca.toLowerCase();
    const matchBusca =
      !termo ||
      im.titulo.toLowerCase().includes(termo) ||
      im.cidade.toLowerCase().includes(termo) ||
      im.bairro.toLowerCase().includes(termo) ||
      im.tipo.toLowerCase().includes(termo);
    const matchCategoria = !categoria || im.tipo === categoria;
    return matchBusca && matchCategoria;
  });

  function verDetalhe(imovel) {
    navigate(`/detalhe/${imovel.id}`, { state: { imovel } });
  }

  return (
    <div className="bg-[#F7F6F2] min-h-screen flex flex-col font-sans antialiased">
      <Navbar busca={busca} setBusca={setBusca} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex-1 w-full">
        <div className="flex justify-center gap-6 sm:gap-8 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-[#BCC5CC]/30 snap-x">
          {categorias.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategoria(cat.value)}
              className={`pb-2 border-b-2 whitespace-nowrap transition-all text-xs sm:text-sm font-bold snap-start -mb-0.5 ${
                categoria === cat.value
                  ? "border-[#025F67] text-[#025F67]"
                  : "border-transparent text-[#063154]/50 hover:text-[#063154] hover:border-[#BCC5CC]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-3 border-[#025F67] border-t-transparent" />
          </div>
        ) : erro ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#BCC5CC]/30 p-6 shadow-xs max-w-md mx-auto">
            <p className="text-red-500 font-bold">{erro}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-[#025F67] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#063154] transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        ) : imoveisFiltrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 bg-white rounded-2xl border border-[#BCC5CC]/40 max-w-md mx-auto px-4">
            <h3 className="text-base font-bold text-[#063154]">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-xs text-[#063154]/60 text-center">
              Não encontramos resultados para "{busca || categoria}".
            </p>
            <button
              onClick={() => {
                setBusca("");
                setCategoria("");
              }}
              className="mt-2 text-[#025F67] text-xs font-bold hover:underline"
            >
              Limpar todos os filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
            {imoveisFiltrados.map((imovel) => ( // percorre os imoveis filtrados e mostra o card
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
  );
}
