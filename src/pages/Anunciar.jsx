import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import uploadIcon from "../assets/upload.svg";
import wifiIcon from "../assets/wifi.svg";
import garageIcon from "../assets/garage.svg";
import poolIcon from "../assets/pool.svg";
import bbqIcon from "../assets/bbq.svg";
import elevatorIcon from "../assets/elevator.svg";
import tvIcon from "../assets/tv.svg";
import acIcon from "../assets/ac.svg";
import bedIcon from "../assets/bed.svg";

export function Anunciar({ onNavegar }) {
  const { register, handleSubmit, reset, setFocus } = useForm();

  const [comodidades, setComodidades] = useState([]);

  const comodidadesOpcoes = [
    "Wi-fi",
    "Piscina",
    "Garagem",
    "Churrasqueira",
    "Elevador",
    "TV",
    "Ar Condicionado",
    "Roupa de cama",
  ];

  async function cadastraImovel(data) {
    const titulo = data.titulo;
    const tipo = data.tipo;
    const cidade = data.cidade;
    const bairro = data.bairro;
    const preco = Number(data.preco);
    const capacidade = Number(data.capacidade);
    const disponivel = data.disponivel;
    const foto = data.foto;

    try {
      const resposta = await fetch("http://localhost:3000/imoveis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          tipo,
          cidade,
          bairro,
          preco,
          capacidade,
          disponivel,
          foto,
          comodidades,
          avaliacao: 0,
          reservas: [],
        }),
      });

      if (!resposta.ok) throw new Error("Erro ao cadastrar o imóvel");

      const novoImovel = await resposta.json();
      alert("Imóvel cadastrado com sucesso!");
    } catch (erro) {
      console.log(`Erro: ${erro.message}`);
    }

    setComodidades([]);
    reset();
  }

  function toggleComodidade(item) {
    setComodidades((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item],
    );
  }

  useEffect(() => {
    setFocus("titulo");
  }, []);

  return (
    <div>
      <Navbar onNavegar={onNavegar} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Anunciar imóvel
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Preencha as informações do seu imóvel
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(cadastraImovel)}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Foto do imóvel
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center gap-2 bg-gray-50 hover:border-red-700 transition-colors">
              <img
                className="w-10 h-10 text-gray-400"
                src={uploadIcon}
                alt="upload icon"
              />
              <p className="text-sm text-gray-500">Adicionar foto</p>
              <input
                type="file"
                id="foto"
                accept="image/*"
                className="hidden w-full mt-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring1 focus:ring-red-700 bg-white"
                {...register("foto")}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="titulo"
              className="block text-sm font-semibold text-gray-700 mb-1.5"
            >
              Título do anúncio <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="titulo"
              required
              placeholder='"Apartamento com vista para o mar"'
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-700"
              {...register("titulo")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="tipo"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Tipo de imóvel <span className="text-red-500">*</span>
              </label>
              <select
                id="tipo"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-700 bg-white"
                {...register("tipo")}
              >
                <option value="">Selecione...</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Chácara">Chácara</option>
                <option value="Loft">Loft</option>
                <option value="Studio">Studio</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="cidade"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Cidade <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="cidade"
                required
                placeholder="Ex: Pelotas"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-700"
                {...register("cidade")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="bairro"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Bairro <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="bairro"
                required
                placeholder="Ex: Moinhos de Vento"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-700"
                {...register("bairro")}
              />
            </div>

            <div>
              <label
                htmlFor="disponivel"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Disponível a partir de <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="disponivel"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-700"
                {...register("disponivel")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="preco"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Preço por noite (R$) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="preco"
                required
                min="1"
                placeholder="Ex: 320"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-700"
                {...register("preco")}
              />
            </div>

            <div>
              <label
                htmlFor="capacidade"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Capacidade (pessoas) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="capacidade"
                required
                min="1"
                placeholder="Ex: 4"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-700"
                {...register("capacidade")}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="comodidades"
              className="block text-sm font-semibold text-gray-700 mb-1.5"
            >
              Comodidades
            </label>
            <div className="flex flex-wrap gap-2">
              {comodidadesOpcoes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleComodidade(item)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all shadow-sm flex items-center gap-2 ${
                    comodidades.includes(item)
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-gray-400" 
                  }`}
                >
                  <img src={item === "Wi-fi" ? wifiIcon : 
                    item === "Garagem" ? garageIcon :
                    item === "Garagem" ? garageIcon :
                    item === "Piscina" ? poolIcon :
                    item === "Churrasqueira" ? bbqIcon :
                    item === "Elevador" ? elevatorIcon :
                    item === "TV" ? tvIcon :
                    item === "Ar Condicionado" ? acIcon :
                    item === "Roupa de cama" ? bedIcon : void 0}
                    alt={item}
                    className={`w-4 h-4 ${comodidades.includes(item) ? "brightness-0 invert" : ""}`} />
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <input
              type="submit"
              value="Publicar anúncio"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl cursor-pointer transition-colors"
            />
            <input
              type="reset"
              value="Limpar"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm px-6 py-3.5 rounded-xl cursor-pointer transition-colors"
            />
          </div>
        </form>
      </main>
    </div>
  );
}
