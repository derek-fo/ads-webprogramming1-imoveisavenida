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
  const { register, handleSubmit, reset, setFocus } = useForm(); // hook para regidtro, organizar dados, resetar formulario e focar no campo
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
      const resposta = await fetch("http://localhost:3000/imoveis", { // requisicao para cadastrar imovel no db
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

      await resposta.json();
      alert("Imóvel cadastrado com sucesso!");
    } catch (erro) {
      console.log(`Erro: ${erro.message}`);
    }

    setComodidades([]);
    reset();
  }

  function toggleComodidade(item) { // adiociona ou remove comodidade conforme clicado
    setComodidades((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item],
    );
  }

  useEffect(() => {
    setFocus("titulo");
  }, [setFocus]);

  return (
    <div className="bg-[#F7F6F2] min-h-screen font-sans antialiased">
      <Navbar onNavegar={onNavegar} />

      <main className="max-w-2xl mx-auto px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#063154] tracking-tight">
            Anunciar imóvel
          </h2>
          <p className="text-[#BCC5CC] text-sm mt-1.5 font-medium">
            Preencha as informações do seu imóvel para começar a faturar
          </p>
        </div>

        <form 
          className="space-y-5 bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-[#BCC5CC]/40" 
          onSubmit={handleSubmit(cadastraImovel)}
        >
 
          <div>
            <span className="block text-sm font-bold text-[#063154] mb-2">
              Fotos do imóvel
            </span>
            <label 
              htmlFor="fotos" 
              className="border-2 border-dashed border-[#BCC5CC] rounded-xl p-6 sm:p-8 flex flex-col items-center gap-2 bg-[#F7F6F2]/50 hover:bg-[#F7F6F2] hover:border-[#025F67] cursor-pointer transition-all dynamic-focus group"
            >
              <p className="text-xs sm:text-sm font-semibold text-[#063154]">Cole o link da imagem do seu imóvel</p>
              <input
                type="url"
                id="fotos"
                placeholder="https://exemplo.com/foto.jpg"
                className="w-full rounded-xl border border-[#BCC5CC] px-4 py-3 text-sm text-[#063154] placeholder-[#BCC5CC] bg-[#F7F6F2]/20 focus:outline-none focus:ring-2 focus:ring-[#025F67] focus:border-transparent transition-all"
                {...register("foto")}
              />
            </label>
          </div>

          <div>
            <label
              htmlFor="titulo"
              className="block text-sm font-bold text-[#063154] mb-1.5"
            >
              Título do anúncio <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="titulo"
              required
              placeholder='"Apartamento com vista para o mar"'
              className="w-full rounded-xl border border-[#BCC5CC] px-4 py-3 text-sm text-[#063154] placeholder-[#BCC5CC] bg-[#F7F6F2]/20 focus:outline-none focus:ring-2 focus:ring-[#025F67] focus:border-transparent transition-all"
              {...register("titulo")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="tipo"
                className="block text-sm font-bold text-[#063154] mb-1.5"
              >
                Tipo de imóvel <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="tipo"
                  required
                  className="w-full rounded-xl border border-[#BCC5CC] px-4 py-3 text-sm text-[#063154] focus:outline-none focus:ring-2 focus:ring-[#025F67] bg-white transition-all appearance-none"
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
            </div>

            <div>
              <label
                htmlFor="cidade"
                className="block text-sm font-bold text-[#063154] mb-1.5"
              >
                Cidade <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="cidade"
                required
                placeholder="Ex: Pelotas"
                className="w-full rounded-xl border border-[#BCC5CC] px-4 py-3 text-sm text-[#063154] placeholder-[#BCC5CC] focus:outline-none focus:ring-2 focus:ring-[#025F67] transition-all"
                {...register("cidade")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="bairro"
                className="block text-sm font-bold text-[#063154] mb-1.5"
              >
                Bairro <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="bairro"
                required
                placeholder="Ex: Moinhos de Vento"
                className="w-full rounded-xl border border-[#BCC5CC] px-4 py-3 text-sm text-[#063154] placeholder-[#BCC5CC] focus:outline-none focus:ring-2 focus:ring-[#025F67] transition-all"
                {...register("bairro")}
              />
            </div>

            <div>
              <label
                htmlFor="disponivel"
                className="block text-sm font-bold text-[#063154] mb-1.5"
              >
                Disponível a partir de <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="disponivel"
                required
                className="w-full rounded-xl border border-[#BCC5CC] px-4 py-3 text-sm text-[#063154] focus:outline-none focus:ring-2 focus:ring-[#025F67] transition-all bg-white"
                {...register("disponivel")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="preco"
                className="block text-sm font-bold text-[#063154] mb-1.5"
              >
                Preço por noite (R$) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="preco"
                required
                min="1"
                placeholder="Ex: 320"
                className="w-full rounded-xl border border-[#BCC5CC] px-4 py-3 text-sm text-[#063154] placeholder-[#BCC5CC] focus:outline-none focus:ring-2 focus:ring-[#025F67] transition-all"
                {...register("preco")}
              />
            </div>

            <div>
              <label
                htmlFor="capacidade"
                className="block text-sm font-bold text-[#063154] mb-1.5"
              >
                Capacidade (pessoas) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="capacidade"
                required
                min="1"
                placeholder="Ex: 4"
                className="w-full rounded-xl border border-[#BCC5CC] px-4 py-3 text-sm text-[#063154] placeholder-[#BCC5CC] focus:outline-none focus:ring-2 focus:ring-[#025F67] transition-all"
                {...register("capacidade")}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#063154] mb-2">
              Comodidades
            </label>
            <div className="flex flex-wrap gap-2">
              {comodidadesOpcoes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleComodidade(item)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition-all flex items-center gap-2 shadow-sm min-h-10 select-none ${
                    comodidades.includes(item)
                      ? "bg-[#025F67] text-white border-[#025F67] scale-[1.02]"
                      : "bg-white text-[#063154] border-[#BCC5CC] hover:border-[#025F67] hover:bg-[#F7F6F2]/40" 
                  }`}
                >
                  <img 
                    src={
                      item === "Wi-fi" ? wifiIcon : 
                      item === "Garagem" ? garageIcon :
                      item === "Piscina" ? poolIcon :
                      item === "Churrasqueira" ? bbqIcon :
                      item === "Elevador" ? elevatorIcon :
                      item === "TV" ? tvIcon :
                      item === "Ar Condicionado" ? acIcon :
                      item === "Roupa de cama" ? bedIcon : undefined
                    }
                    alt={item}
                    className={`w-4 h-4 transition-all ${comodidades.includes(item) ? "brightness-0 invert" : "opacity-80"}`} 
                  />
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-[#BCC5CC]/30">
            <input
              type="reset"
              value="Limpar"
              onClick={() => setComodidades([])}
              className="w-full sm:w-auto bg-[#BCC5CC]/30 hover:bg-[#BCC5CC]/50 text-[#063154] font-bold text-sm px-6 py-3.5 rounded-xl cursor-pointer transition-colors text-center min-h-12"
            />
            <input
              type="submit"
              value="Publicar anúncio"
              className="w-full sm:w-auto bg-[#025F67] hover:bg-[#063154] text-white font-bold text-sm px-8 py-3.5 rounded-xl cursor-pointer transition-all transform active:scale-95 shadow-md shadow-[#025F67]/20 text-center min-h-12"
            />
          </div>
        </form>
      </main>
    </div>
  );
}