// ============================================================
// CardImovel.jsx — Card de imóvel estilo Airbnb
// Igual ao CardFilme.jsx do projeto de filmes:
// recebe um objeto "imovel" como prop e exibe seus dados.
// A prop "onVerDetalhe" navega para a página de detalhe ao clicar.
// ============================================================

function CardImovel({ imovel, onVerDetalhe }) {
  return (
    // Card clicável — ao clicar chama a função do pai passando o imóvel
    <div
      className="cursor-pointer group"
      onClick={() => onVerDetalhe(imovel)}
    >

      {/* ── Área da imagem ── */}
      <div className="relative overflow-hidden rounded-xl aspect-square mb-3 bg-gray-200">

        {imovel.foto ? (
          // Se tiver URL de foto, exibe a imagem com zoom suave no hover
          <img
            src={imovel.foto}
            alt={imovel.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          // Placeholder cinza quando não há foto cadastrada
          // TODO: substituir pelo <img> quando o campo foto for preenchido
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Sem foto</span>
          </div>
        )}

        {/* Badge do tipo do imóvel no canto superior esquerdo */}
        <span className="absolute top-3 left-3 bg-white text-gray-700 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
          {imovel.tipo}
        </span>

        {/* Ícone de favoritar no canto superior direito */}
        {/* TODO: implementar funcionalidade de favoritar */}
        <button
          className="absolute top-3 right-3 text-white hover:text-rose-400 transition-colors"
          onClick={(e) => e.stopPropagation()} // impede abrir o detalhe ao clicar
        >
          <svg className="w-6 h-6 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

      </div>

      {/* ── Informações do imóvel ── */}
      <div className="space-y-0.5">

        {/* Linha título + avaliação */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-1">
            {imovel.titulo}
          </h3>
          {/* Avaliação com estrela — só aparece se maior que 0 */}
          {imovel.avaliacao > 0 && (
            <span className="text-sm text-gray-800 shrink-0 flex items-center gap-0.5">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {imovel.avaliacao}
            </span>
          )}
        </div>

        {/* Localização */}
        <p className="text-gray-500 text-sm">{imovel.bairro}, {imovel.cidade}</p>

        {/* Capacidade */}
        <p className="text-gray-500 text-sm">Até {imovel.capacidade} hóspedes</p>

        {/* Preço */}
        <p className="text-sm pt-1">
          <span className="font-semibold text-gray-900">R$ {imovel.preco}</span>
          <span className="text-gray-500"> / noite</span>
        </p>

      </div>
    </div>
  )
}

export default CardImovel
