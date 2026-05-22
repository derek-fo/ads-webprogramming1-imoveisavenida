import { useNavigate } from "react-router";
import houseIcon from "../assets/housesun.svg";
import magnifyIcon from "../assets/magnify.svg";

// busca e setBusca vêm do main.jsx via Home → Navbar
export function Navbar({ busca, setBusca }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 shadow-sm bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="text-red-600 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            {/* trocar pelo logo do seu projeto */}
            <img className="w-10 h-10" src={houseIcon} alt="logo" />
            Imóveis<br></br>Avenida
          </button>

          <nav className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="text-sm font-medium text-gray-700 hover:text-red-700 hover:underline px-4 py-2 rounded-full transition-colors"
            >
              Imóveis
            </button>
            <button
              onClick={() => navigate("/anunciar")}
              className="text-sm font-medium bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full transition-colors"
            >
              + Anunciar
            </button>
          </nav>
        </div>

        {setBusca && (
          <div className="pb-4">
            <div className="flex items-center gap-3 border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow px-5 py-3 max-w-2xl mx-auto bg-white">
              <input
                type="text"
                placeholder="Buscar por cidade, bairro ou tipo..."
                className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
              <img src={magnifyIcon} alt="Buscar" className="w-4 h-4 " />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
