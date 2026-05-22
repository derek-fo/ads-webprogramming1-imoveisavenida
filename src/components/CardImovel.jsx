export function CardImovel({ imovel, onVerDetalhe }) {
  return (
    <div
      className="cursor-pointer group"
      onClick={() => onVerDetalhe(imovel)}
    >
      <div className="relative overflow-hidden rounded-xl aspect-square mb-3 bg-gray-200">

        {imovel.foto ? (
          <img
            src={imovel.foto}
            alt={imovel.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Sem foto</span>
          </div>
        )}

        <span className="absolute top-3 left-3 bg-white text-gray-700 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
          {imovel.tipo}
        </span>
      </div>

      <div className="space-y-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-1">
            {imovel.titulo}
          </h3>
          {imovel.avaliacao > 0 && (
            <span className="text-sm text-gray-800 shrink-0 flex items-center gap-0.5">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {imovel.avaliacao}
            </span>
          )}
        </div>

        <p className="text-gray-500 text-sm">{imovel.bairro}, {imovel.cidade}</p>
        <p className="text-gray-500 text-sm">Até {imovel.capacidade} hóspedes</p>
        <p className="text-sm pt-1">
          <span className="font-semibold text-gray-900">R$ {imovel.preco}</span>
          <span className="text-gray-500"> / noite</span>
        </p>

      </div>
    </div>
  )
}
