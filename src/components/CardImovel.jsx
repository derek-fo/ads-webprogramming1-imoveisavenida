export function CardImovel({ imovel, onVerDetalhe }) {
  return (
    <div
      className="cursor-pointer group flex flex-col"
      onClick={() => onVerDetalhe(imovel)}
    >
      {/* Container da Foto */}
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-square mb-3 bg-[#BCC5CC]/20 border border-[#BCC5CC]/20 shadow-xs">
        {imovel.foto ? (
          <img
            src={imovel.foto}
            alt={imovel.titulo}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#BCC5CC]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xxs font-medium tracking-wide uppercase">Sem imagem</span>
          </div>
        )}

        <span className="absolute top-3 left-3 bg-white/95 text-[#063154] text-xxs font-extrabold px-2.5 py-1 rounded-full shadow-xs backdrop-blur-xs tracking-wide uppercase border border-[#BCC5CC]/20">
          {imovel.tipo}
        </span>
      </div>

      {/* Conteúdo Textual */}
      <div className="space-y-1 px-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-[#063154] text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-[#025F67] transition-colors">
            {imovel.titulo}
          </h3>
          {imovel.avaliacao > 0 && (
            <span className="text-xs sm:text-sm text-[#063154] font-bold shrink-0 flex items-center gap-0.5">
              <svg className="w-3.5 h-3.5 fill-[#2F9D94] text-[#2F9D94]" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {imovel.avaliacao}
            </span>
          )}
        </div>

        <p className="text-[#063154]/60 text-xs sm:text-sm font-medium">{imovel.bairro}, {imovel.cidade}</p>
        <p className="text-[#063154]/50 text-xs font-medium">Capacidade: {imovel.capacidade} hóspedes</p>
        
        <p className="text-xs sm:text-sm pt-1 border-t border-[#BCC5CC]/15 mt-1">
          <span className="font-extrabold text-[#063154] text-sm sm:text-base">R$ {imovel.preco}</span>
          <span className="text-[#063154]/60 font-medium"> / noite</span>
        </p>
      </div>
    </div>
  );
}