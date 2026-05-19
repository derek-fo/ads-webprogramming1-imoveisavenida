// ============================================================
// Detalhe.jsx — Página de Detalhe do Imóvel
// Atende os requisitos D e E do trabalho:
// D) Usuário faz reserva → dados salvos no array "reservas" da API
// E) Reservas listadas com cálculos: total, média de hóspedes e dias
// ============================================================

import { useForm } from "react-hook-form"
import { useState } from "react"
import { Navbar } from "./components/Navbar"

function Detalhe({ imovel, onNavegar }) {

  // useForm controla o formulário de reserva
  const { register, handleSubmit, reset } = useForm()

  // Guarda a lista de reservas — começa com as que já existem na API
  const [reservas, setReservas] = useState(imovel.reservas || [])

  // Chamada ao submeter o formulário de reserva (requisito D)
  async function cadastraReserva(data) {

    // Objeto com os dados da nova reserva
    const novaReserva = {
      nome:     data.nome,
      checkIn:  data.checkIn,
      checkOut: data.checkOut,
      hospedes: Number(data.hospedes)
    }

    // Junta as reservas antigas com a nova
    const reservasAtualizadas = [...reservas, novaReserva]

    try {
      // PATCH: atualiza SOMENTE o campo "reservas" do imóvel no Json Server
      // Diferente do PUT, que substituiria o imóvel inteiro
      const resposta = await fetch(`http://localhost:3000/imoveis/${imovel.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservas: reservasAtualizadas })
      })

      if (!resposta.ok) throw new Error("Erro ao salvar a reserva")

      // Atualiza a tela sem precisar recarregar a página
      setReservas(reservasAtualizadas)
      alert(`Reserva confirmada, ${data.nome}!`)

    } catch (erro) {
      console.log("Erro: ", erro.message)
    }

    reset() // limpa o formulário
  }

  // ── Cálculos — Requisito E ──────────────────────────────
  const totalReservas = reservas.length

  // Soma todos os hóspedes e divide pelo total de reservas
  const mediaHospedes = totalReservas > 0
    ? (reservas.reduce((soma, r) => soma + r.hospedes, 0) / totalReservas).toFixed(1)
    : 0

  // Calcula a média de dias entre checkIn e checkOut de cada reserva
  const mediaDias = totalReservas > 0
    ? (
        reservas.reduce((soma, r) => {
          const dias = (new Date(r.checkOut) - new Date(r.checkIn)) / (1000 * 60 * 60 * 24)
          return soma + dias
        }, 0) / totalReservas
      ).toFixed(1)
    : 0
  // ────────────────────────────────────────────────────────

  return (
    <div>
      <Navbar onNavegar={onNavegar} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Botão voltar */}
        <button
          onClick={() => onNavegar("lista")}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-rose-500 mb-4 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para listagem
        </button>

        {/* Título e localização */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          {imovel.titulo}
        </h2>
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
          {imovel.avaliacao > 0 && (
            <span className="flex items-center gap-1 text-gray-800 font-medium">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {imovel.avaliacao}
            </span>
          )}
          <span>·</span>
          <span>{totalReservas} reserva{totalReservas !== 1 ? "s" : ""}</span>
          <span>·</span>
          <span>{imovel.bairro}, {imovel.cidade}</span>
        </div>

        {/* ── Grade de fotos estilo Airbnb ── */}
        <div className="grid grid-cols-2 gap-2 h-64 sm:h-96 mb-8 rounded-2xl overflow-hidden">

          {/* Foto principal — ocupa a coluna esquerda inteira */}
          <div className="row-span-2 bg-gray-200 flex items-center justify-center text-gray-400">
            {imovel.foto ? (
              <img src={imovel.foto} alt={imovel.titulo} className="w-full h-full object-cover" />
            ) : (
              // TODO: substituir por <img> quando tiver foto cadastrada
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs">Foto principal</span>
              </div>
            )}
          </div>

          {/* Fotos secundárias — coluna direita */}
          {/* TODO: adicionar mais fotos quando disponíveis */}
          <div className="bg-gray-100 flex items-center justify-center text-gray-300 text-xs">Foto 2</div>
          <div className="bg-gray-100 flex items-center justify-center text-gray-300 text-xs">Foto 3</div>

        </div>

        {/* ── Grid: info + card de reserva ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Coluna esquerda: detalhes + estatísticas + histórico */}
          <div className="lg:col-span-2 space-y-8">

            {/* Detalhes básicos do imóvel */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {imovel.tipo} em {imovel.cidade}
                  </h3>
                  <p className="text-gray-500 text-sm mt-0.5">
                    Até {imovel.capacidade} hóspedes · Disponível: {imovel.disponivel}
                  </p>
                </div>
                {/* Avatar do proprietário — placeholder */}
                {/* TODO: substituir pela foto real do proprietário */}
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Comodidades */}
            {imovel.comodidades && imovel.comodidades.length > 0 && (
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  O que este lugar oferece
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {imovel.comodidades.map(item => (
                    <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 text-xs font-bold shrink-0">
                        ✓
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Estatísticas — Requisito E ── */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Estatísticas do imóvel
              </h3>
              <div className="grid grid-cols-3 gap-4">

                <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-rose-500">{totalReservas}</p>
                  <p className="text-xs text-gray-500 mt-1">Total de reservas</p>
                </div>

                <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-rose-500">{mediaHospedes}</p>
                  <p className="text-xs text-gray-500 mt-1">Média de hóspedes</p>
                </div>

                <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-rose-500">{mediaDias}d</p>
                  <p className="text-xs text-gray-500 mt-1">Média de dias</p>
                </div>

              </div>
            </div>

            {/* ── Lista de reservas — Requisito E ── */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Reservas realizadas ({totalReservas})
              </h3>

              {reservas.length === 0 ? (
                // Placeholder quando não há reservas
                <div className="border border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400 text-sm">
                  Nenhuma reserva registrada ainda.
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Percorre o array e exibe cada reserva */}
                  {reservas.map((r, index) => {
                    // Calcula quantos dias durou essa reserva
                    const dias = Math.ceil(
                      (new Date(r.checkOut) - new Date(r.checkIn)) / (1000 * 60 * 60 * 24)
                    )
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl"
                      >
                        {/* Avatar com inicial do nome */}
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm shrink-0">
                            {r.nome[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{r.nome}</p>
                            <p className="text-gray-400 text-xs mt-0.5">
                              {r.checkIn} → {r.checkOut} · {dias} dia{dias !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        {/* Badge de hóspedes */}
                        <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full shrink-0">
                          {r.hospedes} hósp.
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

          </div>

          {/* ── Coluna direita: Card de reserva — Requisito D ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-200 rounded-2xl shadow-lg p-6 bg-white">

              {/* Preço */}
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-2xl font-bold text-gray-900">R$ {imovel.preco}</span>
                <span className="text-gray-500 text-sm">/ noite</span>
              </div>

              <h4 className="font-semibold text-gray-900 mb-4">Fazer reserva</h4>

              {/* Formulário de reserva */}
              <form
                className="space-y-3"
                onSubmit={handleSubmit(cadastraReserva)}
              >

                {/* Check-in e Check-out lado a lado */}
                <div className="border border-gray-300 rounded-xl overflow-hidden divide-y divide-gray-300">
                  <div className="grid grid-cols-2 divide-x divide-gray-300">

                    <div className="p-3">
                      <label className="block text-xs font-bold text-gray-700 mb-1">CHECK-IN</label>
                      <input
                        type="date" required
                        className="w-full text-sm text-gray-800 outline-none bg-transparent"
                        {...register("checkIn")}
                      />
                    </div>

                    <div className="p-3">
                      <label className="block text-xs font-bold text-gray-700 mb-1">CHECK-OUT</label>
                      <input
                        type="date" required
                        className="w-full text-sm text-gray-800 outline-none bg-transparent"
                        {...register("checkOut")}
                      />
                    </div>

                  </div>

                  {/* Hóspedes */}
                  <div className="p-3">
                    <label className="block text-xs font-bold text-gray-700 mb-1">HÓSPEDES</label>
                    <select
                      required
                      className="w-full text-sm text-gray-800 outline-none bg-transparent"
                      {...register("hospedes")}
                    >
                      {/* Gera opções de 1 até a capacidade máxima do imóvel */}
                      {Array.from({ length: imovel.capacidade }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{n} hóspede{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Nome do hóspede */}
                <div>
                  <input
                    type="text" required
                    placeholder="Seu nome completo"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-rose-200"
                    {...register("nome")}
                  />
                </div>

                {/* Botão de confirmar */}
                <input
                  type="submit"
                  value="Reservar agora"
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm py-3.5 rounded-xl cursor-pointer transition-colors"
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
  )
}

export default Detalhe
