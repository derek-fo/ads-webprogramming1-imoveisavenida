import { useNavigate } from "react-router";
import houseIcon from "../assets/housesun.svg";
import magnifyIcon from "../assets/magnify.svg";

export function Navbar({ busca, setBusca }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-[#BCC5CC]/30 shadow-xs bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button
            onClick={() => navigate("/")}
            className="text-[#063154] font-extrabold text-lg sm:text-xl tracking-tight hover:opacity-90 transition-opacity flex items-center gap-2 text-left"
          >
            <img className="w-9 h-9 sm:w-10 sm:h-10 transform hover:scale-105 transition-transform" src={houseIcon} alt="logo" />
            <span className="leading-tight">
              Imóveis<br /><span className="text-[#025F67]">Avenida</span>
            </span>
          </button>

          <nav className="flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={() => navigate("/")}
              className="text-xs sm:text-sm font-bold text-[#063154] hover:text-[#025F67] px-3 py-2 rounded-full transition-colors"
            >
              Imóveis
            </button>
            <button
              onClick={() => navigate("/anunciar")}
              className="text-xs sm:text-sm font-bold bg-[#025F67] hover:bg-[#063154] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all shadow-xs active:scale-95"
            >
              + Anunciar
            </button>
          </nav>
        </div>

        {setBusca && (
          <div className="pb-4">
            <div className="flex items-center gap-3 border border-[#BCC5CC] rounded-full shadow-xs hover:shadow-md focus-within:shadow-md focus-within:border-[#025F67] transition-all px-4 py-2.5 sm:px-5 sm:py-3 max-w-2xl mx-auto bg-white">
              <input
                type="text"
                placeholder="Buscar por cidade, bairro ou tipo..."
                className="flex-1 text-xs sm:text-base outline-none text-[#063154] placeholder-[#BCC5CC] bg-transparent"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
              <img src={magnifyIcon} alt="Buscar" className="w-4 h-4 opacity-70" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}