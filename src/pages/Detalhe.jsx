import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import backArrowIcon from "../assets/arrowleft.svg";
import starIcon from "../assets/star.svg";
import wifiIcon from "../assets/wifi.svg";
import garageIcon from "../assets/garage.svg";
import poolIcon from "../assets/pool.svg";
import bbqIcon from "../assets/bbq.svg";
import elevatorIcon from "../assets/elevator.svg";
import tvIcon from "../assets/tv.svg";
import acIcon from "../assets/ac.svg";
import bedIcon from "../assets/bed.svg";

export function Detalhe() {
  const navigate = useNavigate();
  const location = useLocation(); // hook para acessar o estado enviado na navegacao do detalhe na home
  const imovel = location.state?.imovel;

  const { register, handleSubmit, reset } = useForm();
  const [reservas, setReservas] = useState(imovel?.reservas || []);
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);

  const iconMap = {
    "Wi-fi": wifiIcon,
    "Garagem": garageIcon,
    "Piscina": poolIcon,
    "Churrasqueira": bbqIcon,
    "Elevador": elevatorIcon,
    "TV": tvIcon,
    "Ar Condicionado": acIcon,
    "Roupa de cama": bedIcon,
  };

  if (!imovel) {
    return (
      <div className="bg-[#F7F6F2] min-h-screen">
        <Navbar />
        <div className="text-center py-20 max-w-xs mx-auto px-4">
          <p className="text-[#063154]/70 font-semibold mb-4">Imóvel não encontrado.</p>
          <button
            onClick={() => navigate("/")}
            className="text-[#025F67] font-bold underline text-sm hover:text-[#063154]"
          >
            Voltar para a listagem
          </button>
        </div>
      </div>
    );
  }

  const totalReservas = reservas.length; // calculo de reservas, hospedes e dias 
  const mediaHospedes =
    totalReservas > 0
      ? (reservas.reduce((acc, r) => acc + r.hospedes, 0) / totalReservas).toFixed(1) // reduce para calcular valores 
      : 0;

  const mediaDias =
    totalReservas > 0
      ? (
          reservas.reduce((acc, r) => {
            const diff = (new Date(r.checkOut) - new Date(r.checkIn)) / (1000 * 60 * 60 * 24);
            return acc + diff;
          }, 0) / totalReservas
        ).toFixed(1)
      : 0;

  async function cadastraReserva(data) {
    if (!data.nome || !data.checkIn || !data.checkOut) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }
    if (new Date(data.checkOut) <= new Date(data.checkIn)) {
      setErro("A data de check-out deve ser posterior ao check-in.");
      return;
    }
    setErro("");

    const novaReserva = {
      nome: data.nome,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      hospedes: Number(data.hospedes),
    };

    const reservasAtualizadas = [...reservas, novaReserva];

    try {
      const resposta = await fetch(`http://localhost:3000/imoveis/${imovel.id}`, { 
        method: "PATCH", // metodos patch utilizado para atualizar o imovel com a nova reserva 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservas: reservasAtualizadas }),
      });

      if (!resposta.ok) throw new Error("Erro ao salvar a reserva");
      setReservas(reservasAtualizadas);
      setEnviado(true);
    } catch (err) {
      console.log("Erro:", err.message);
    }

    reset();
  }

  return (
    <div className="bg-[#F7F6F2] min-h-screen font-sans antialiased">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#063154] hover:text-[#025F67] hover:underline mb-4 transition-colors group"
        >
          <img src={backArrowIcon} alt="Voltar" className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Voltar para listagem
        </button>

        <h1 className="text-xl sm:text-3xl font-extrabold text-[#063154] tracking-tight mb-2">
          {imovel.titulo}
        </h1>
        
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-[#063154]/70 mb-5">
          {imovel.avaliacao > 0 && (
            <span className="flex items-center gap-1 bg-[#2F9D94]/10 text-[#025F67] px-2 py-0.5 rounded-md">
              <img src={starIcon} alt="Avaliação" className="w-3 h-3 brightness-0 sepia hue-rotate-[120deg] saturate-200" />
              <b>{imovel.avaliacao}</b>
            </span>
          )}
          <span>·</span>
          <span>{totalReservas} reserva{totalReservas !== 1 ? "s" : ""}</span>
          <span>·</span>
          <span className="text-[#063154]/90">{imovel.bairro}, {imovel.cidade}</span>
        </div>

        <div className="sm:grid-cols-4 gap-2 h-56 sm:h-96 mb-6 sm:mb-8 rounded-2xl overflow-hidden shadow-xs border border-[#BCC5CC]/30 bg-white">
          <div className="sm:col-span-2 sm:row-span-2 bg-[#BCC5CC]/10 flex items-center justify-center h-full">
            {imovel.foto ? (
              <img src={imovel.foto} alt={imovel.titulo} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-[#BCC5CC]">

              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">

          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#BCC5CC]/30">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#063154]">
                  {imovel.tipo} em {imovel.cidade}
                </h2>
                <p className="text-[#063154]/60 text-xs sm:text-sm font-medium mt-0.5">
                  Até {imovel.capacidade} hóspedes · Disponível a partir de: {imovel.disponivel}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#025F67]/10 flex items-center justify-center text-[#025F67] shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            {imovel.comodidades && imovel.comodidades.length > 0 && (
              <div className="border-b border-[#BCC5CC]/30 pb-6">
                <h3 className="text-base sm:text-lg font-bold text-[#063154] mb-4">O que este lugar oferece</h3>
                <div className="grid grid-cols-2 gap-3.5">
                  {imovel.comodidades.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#063154]/80">
                      <div className="w-5 h-5 flex items-center justify-center shrink-0">
                        {(() => {
                          const icon = iconMap[item];
                          return icon ? (
                            <img src={icon} alt={item} className="w-full h-full object-contain filter brightness-0 opacity-75" />
                          ) : null;
                        })()}
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-b border-[#BCC5CC]/30 pb-2">
              <h3 className="text-base sm:text-lg font-bold text-[#063154] mb-3">Desempenho do imóvel</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 sm:p-4 bg-white rounded-xl border border-[#BCC5CC]/20 text-center shadow-xs">
                  <p className="text-lg sm:text-xl font-extrabold text-[#025F67]">{totalReservas}</p>
                  <p className="text-xxs sm:text-xs font-bold text-[#063154]/50 uppercase mt-0.5 tracking-wider">Reservas</p>
                </div>
                <div className="p-3 sm:p-4 bg-white rounded-xl border border-[#BCC5CC]/20 text-center shadow-xs">
                  <p className="text-lg sm:text-xl font-extrabold text-[#025F67]">{mediaHospedes}</p>
                  <p className="text-xxs sm:text-xs font-bold text-[#063154]/50 uppercase mt-0.5 tracking-wider">Média hósp.</p>
                </div>
                <div className="p-3 sm:p-4 bg-white rounded-xl border border-[#BCC5CC]/20 text-center shadow-xs">
                  <p className="text-lg sm:text-xl font-extrabold text-[#025F67]">{mediaDias}d</p>
                  <p className="text-xxs sm:text-xs font-bold text-[#063154]/50 uppercase mt-0.5 tracking-wider">Média dias</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#063154] mb-4">
                Reservas registradas
                <span className="ml-2 text-xs font-semibold text-[#063154]/50">({totalReservas})</span>
              </h3>

              {reservas.length === 0 ? (
                <div className="bg-white rounded-xl p-6 text-center text-[#063154]/40 text-xs sm:text-sm border border-dashed border-[#BCC5CC]">
                  Nenhuma reserva registrada para este anúncio.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {reservas.map((r, index) => {
                    const dias = Math.ceil((new Date(r.checkOut) - new Date(r.checkIn)) / (1000 * 60 * 60 * 24));
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-white border border-[#BCC5CC]/30 rounded-xl shadow-2xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#025F67] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                            {r.nome[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-[#063154] text-xs sm:text-sm">{r.nome}</p>
                            <p className="text-[#063154]/50 text-xxs sm:text-xs font-medium mt-0.5">
                              {r.checkIn} → {r.checkOut} · <span className="font-bold text-[#025F67]">{dias} diária{dias !== 1 ? "s" : ""}</span>
                            </p>
                          </div>
                        </div>
                        <span className="text-xxs font-bold bg-[#F7F6F2] text-[#063154] px-2.5 py-1 rounded-full border border-[#BCC5CC]/30 shrink-0">
                          {r.hospedes} hósp.
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 mt-4 lg:mt-0">
            <div className="sticky top-24 border border-[#BCC5CC]/40 rounded-2xl shadow-md p-5 sm:p-6 bg-white">
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-xl sm:text-2xl font-black text-[#063154]">R$ {imovel.preco}</span>
                <span className="text-[#063154]/60 text-xs font-medium">/ noite</span>
              </div>

              <h4 className="font-bold text-sm text-[#063154] uppercase tracking-wider mb-3">Agendar Estadia</h4>

              <form className="space-y-3.5" onSubmit={handleSubmit(cadastraReserva)}>
                <div className="border border-[#BCC5CC] rounded-xl overflow-hidden divide-y divide-[#BCC5CC] bg-[#F7F6F2]/30">
                  <div className="grid grid-cols-2 divide-x divide-[#BCC5CC]">
                    <div className="p-2.5">
                      <label className="block text-xxs font-black text-[#063154]/70 tracking-wide mb-0.5">Check-in</label>
                      <input type="date" required className="w-full text-xs font-semibold text-[#063154] outline-none bg-transparent" {...register("checkIn")} />
                    </div>
                    <div className="p-2.5">
                      <label className="block text-xxs font-black text-[#063154]/70 tracking-wide mb-0.5">Check-out</label>
                      <input type="date" required className="w-full text-xs font-semibold text-[#063154] outline-none bg-transparent" {...register("checkOut")} />
                    </div>
                  </div>

                  <div className="p-2.5">
                    <label className="block text-xxs font-black text-[#063154]/70 tracking-wide mb-0.5">Hóspedes</label>
                    <select required className="w-full text-xs font-semibold text-[#063154] outline-none bg-transparent" {...register("hospedes")}>
                      {Array.from({ length: imovel.capacidade }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} hóspede{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <input
                  type="text"
                  required
                  placeholder="Seu nome completo"
                  className="w-full border border-[#BCC5CC] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#063154] font-medium placeholder-[#BCC5CC] focus:outline-none focus:ring-2 focus:ring-[#025F67] focus:border-transparent transition-all"
                  {...register("nome")}
                />

                {erro && <p className="text-xxs font-bold text-red-500 bg-red-50 p-2 rounded-lg border border-red-200">{erro}</p>}
                {enviado && <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl px-3 py-2.5 text-center">✅ Reserva enviada com sucesso!</div>}

                <input
                  type="submit"
                  value="Confirmar Reserva"
                  className="w-full bg-[#025F67] hover:bg-[#063154] text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl cursor-pointer transition-all transform active:scale-[0.98] shadow-xs"
                />
              </form>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}