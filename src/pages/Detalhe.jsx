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
  const location = useLocation();
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
      <div>
        <Navbar />
        <div className="text-center py-20">
          <p className="text-gray-500 mb-4">Imóvel não encontrado.</p>
          <button
            onClick={() => navigate("/")}
            className="text-[#404F68] underline text-sm"
          >
            Voltar para a listagem
          </button>
        </div>
      </div>
    );
  }

  const totalReservas = reservas.length;
  const mediaHospedes =
    totalReservas > 0
      ? (
          reservas.reduce((acc, r) => acc + r.hospedes, 0) / totalReservas
        ).toFixed(1)
      : 0;

  const mediaDias =
    totalReservas > 0
      ? (
          reservas.reduce((acc, r) => {
            const diff =
              (new Date(r.checkOut) - new Date(r.checkIn)) /
              (1000 * 60 * 60 * 24);
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
      const resposta = await fetch(
        `http://localhost:3000/imoveis/${imovel.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reservas: reservasAtualizadas }),
        },
      );

      if (!resposta.ok) throw new Error("Erro ao salvar a reserva");
      setReservas(reservasAtualizadas);
      setEnviado(true);
    } catch (err) {
      console.log("Erro:", err.message);
    }

    reset();
  }

  return (
    <div>
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:underline mb-4"
        >
          <img src={backArrowIcon} alt="Voltar" className="w-4 h-4" />
          Voltar para listagem
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {imovel.titulo}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
          {imovel.avaliacao > 0 && (
            <span className="flex items-center gap-1">
              <img src={starIcon} alt="Avaliação" className="w-3.5 h-3.5" />
              <b>{imovel.avaliacao}</b>
            </span>
          )}
          <span>·</span>
          <span>
            {totalReservas} reserva{totalReservas !== 1 ? "s" : ""}
          </span>
          <span>·</span>
          <span>
            {imovel.bairro}, {imovel.cidade}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:grid-rows-2 h-64 sm:h-96 mb-8 rounded-2xl overflow-hidden">
          <div className="col-span-2 row-span-2 bg-gray-200 flex items-center justify-center">
            {imovel.foto ? (
              <img
                src={imovel.foto}
                alt={imovel.titulo}
                className="w-full h-full object-cover"
              />
            ) : (
              // TODO: substituir por <img> quando tiver foto cadastrada
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-xs">Foto principal</span>
              </div>
            )}
          </div>

          {/* Fotos secundárias — TODO: adicionar URLs reais */}
          <div className="hidden sm:flex bg-gray-100 items-center justify-center text-gray-300 text-xs">
            Foto 2
          </div>
          <div className="hidden sm:flex bg-gray-100 items-center justify-center text-gray-300 text-xs">
            Foto 3
          </div>
          <div className="hidden sm:flex bg-gray-100 items-center justify-center text-gray-300 text-xs">
            Foto 4
          </div>
          <div className="hidden sm:flex bg-gray-100 items-center justify-center text-gray-300 text-xs">
            Foto 5
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {imovel.tipo} em {imovel.cidade}
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  Até {imovel.capacidade} hóspedes · Disponível:{" "}
                  {imovel.disponivel}
                </p>
              </div>

              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>

            {imovel.comodidades && imovel.comodidades.length > 0 && (
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  O que este lugar oferece
                </h3>
                <div className="grid grid-cols-2 gap-3 pb-4">
                  {imovel.comodidades.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-gray-700"
                    >
                      <div className="w-5 h-5 flex items-center justify-center shrink-0">
                        {(() => {
                          const icon = iconMap[item];
                          return icon ? (
                            <img
                              src={icon}
                              alt={item}
                              className="w-full h-full object-contain grayscale opacity-80"
                            />
                          ) : null;
                        })()}
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Estatísticas do imóvel
              </h3>
              <div className="grid grid-cols-3 gap-4 pb-6">
                <div className="p-4 text-center">
                  <p className="text-xl font-bold text-gray-900">
                    {totalReservas}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Total de reservas
                  </p>
                </div>

                <div className="p-4 text-center">
                  <p className="text-xl font-bold text-gray-900">
                    {mediaHospedes}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Média de hóspedes
                  </p>
                </div>

                <div className="p-4 text-center">
                  <p className="text-xl font-bold text-gray-900">
                    {mediaDias}d
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Média de dias</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Reservas realizadas
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({totalReservas})
                </span>
              </h3>

              {reservas.length === 0 ? (
                <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-400 text-sm border border-dashed border-gray-200">
                  Nenhuma reserva registrada ainda.
                </div>
              ) : (
                <div className="space-y-3">
                  {reservas.map((r, index) => {
                    const dias = Math.ceil(
                      (new Date(r.checkOut) - new Date(r.checkIn)) /
                        (1000 * 60 * 60 * 24),
                    );
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#F2F2F2] text-[#404F68] flex items-center justify-center font-bold text-sm shrink-0">
                            {r.nome[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {r.nome}
                            </p>
                            <p className="text-gray-400 text-xs mt-0.5">
                              {r.checkIn} → {r.checkOut} · {dias} dia
                              {dias !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full shrink-0">
                          {r.hospedes} hósp.
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-200 rounded-2xl shadow-lg p-6 bg-white">
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-2xl font-bold text-gray-900">
                  R$ {imovel.preco}
                </span>
                <span className="text-gray-500 text-sm">/ noite</span>
              </div>

              <h4 className="font-semibold text-gray-900 mb-4">
                Fazer reserva
              </h4>

              <form
                className="space-y-3"
                onSubmit={handleSubmit(cadastraReserva)}
              >
                <div className="border border-gray-300 rounded-xl overflow-hidden divide-y divide-gray-300">
                  <div className="grid grid-cols-2 divide-x divide-gray-300">
                    <div className="p-3">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        CHECK-IN
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full text-sm text-gray-800 outline-none bg-transparent"
                        {...register("checkIn")}
                      />
                    </div>

                    <div className="p-3">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        CHECK-OUT
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full text-sm text-gray-800 outline-none bg-transparent"
                        {...register("checkOut")}
                      />
                    </div>
                  </div>

                  <div className="p-3">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      HÓSPEDES
                    </label>
                    <select
                      required
                      className="w-full text-sm text-gray-800 outline-none bg-transparent"
                      {...register("hospedes")}
                    >
                      {Array.from(
                        { length: imovel.capacidade },
                        (_, i) => i + 1,
                      ).map((n) => (
                        <option key={n} value={n}>
                          {n} hóspede{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <input
                  type="text"
                  required
                  placeholder="Seu nome completo"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#7A859D]"
                  {...register("nome")}
                />

                {erro && <p className="text-xs text-red-500">{erro}</p>}
                
                {enviado && (
                  <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 text-center">
                    ✅ Reserva registrada com sucesso!
                  </div>
                )}

                <input
                  type="submit"
                  value="Reservar agora"
                  className="w-full bg-[#404F68] hover:bg-[#7A859D] text-white font-bold text-sm py-3.5 rounded-xl cursor-pointer transition-colors"
                />
              </form>

              <p className="text-xs text-gray-400 text-center mt-3">
                Você não será cobrado agora
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
