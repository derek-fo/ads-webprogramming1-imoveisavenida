import { useForm } from "react-hook-form";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import CardImovel from "../components/CardImovel";
import magnifyIcon from "../assets/magnify.svg";

export function Pesquisar({ onNavegar, onSelecionarImovel }) {
  const { register, handleSubmit } = useForm();

  const [imoveis, setImoveis] = useState([]);

  const [semResultado, setSemResultado] = useState(false);

  async function pesquisaImoveis(data) {
    try {
      const resposta = await fetch("http://localhost:3000/imoveis");
      if (!resposta.ok) throw new Error("Erro ao consultar os imóveis");

      const dados = await resposta.json();

      const resultado = dados.filter(
        (imovel) =>
          imovel.titulo.toUpperCase().includes(data.pesquisa.toUpperCase()) ||
          imovel.cidade.toUpperCase().includes(data.pesquisa.toUpperCase()) ||
          imovel.bairro.toUpperCase().includes(data.pesquisa.toUpperCase()) ||
          imovel.tipo.toUpperCase().includes(data.pesquisa.toUpperCase()),
      );

      if (resultado.length === 0) {
        setSemResultado(true);
        setImoveis([]);
      } else {
        setSemResultado(false);
        setImoveis(resultado);
      }
    } catch (erro) {
      console.log("Erro: ", erro.message);
    }
  }

  const listaImoveis = imoveis.map((imovel) => (
    <CardImovel
      key={imovel.id}
      imovel={imovel}
      onVerDetalhe={onSelecionarImovel}
    />
  ));

  return (
    <div>
      <Navbar onNavegar={onNavegar} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl text-center font-bold text-gray-900 mb-6">
          Pesquisa de Imóveis
        </h2>

        <form
          className="flex mx-auto items-center gap-3 border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow px-5 py-3 mb-8 max-w-2xl bg-white"
          onSubmit={handleSubmit(pesquisaImoveis)}
        >
          <img
            className="w-5 h-5 opacity-40 shrink-0"
            src={magnifyIcon}
            alt="magnify icon"
          />

          <input
            type="text"
            required
            placeholder="Buscar por cidade, bairro, tipo ou nome..."
            className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
            {...register("pesquisa")}
          />
          <input
            type="submit"
            value="Pesquisar"
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-full cursor-pointer transition-colors shrink-0"
          />
        </form>

        {semResultado && (
          <div className="flex flex-col items-center py-20 gap-3 text-center">
            <span className="text-5xl">🏠</span>
            <h3 className="text-lg font-semibold text-gray-700">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-sm text-gray-400">
              Tente buscar por outra cidade, bairro ou tipo.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listaImoveis}
        </div>
      </main>
    </div>
  );
}
