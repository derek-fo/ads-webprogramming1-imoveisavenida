import { useNavigate } from "react-router";
import houseIcon from "../assets/housesun.svg";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <button
            onClick={() => navigate("/")}
            className="text-red-600 hover:text-red-700 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2"
          >
           <img className="w-12 h-12" src={houseIcon} alt="house icon" />
            Imóveis<br></br>Avenida
          </button>

          <nav className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="text-sm font-medium text-gray-700 hover:text-red-700 hover:underline-offset-4 hover:underline  px-4 py-2 rounded-full transition-colors"
            >
              Imóveis
            </button>

            <button
              onClick={() => navigate("/pesquisar")}
              className="text-sm font-medium text-gray-700 hover:text-red-700 hover:underline-offset-4 hover:underline px-4 py-2 rounded-full transition-colors"
            >
              Pesquisar
            </button>

            <button
              onClick={() => navigate("/perfil")}
              className="text-sm font-medium text-gray-700 hover:text-red-700 hover:underline-offset-4 hover:underline px-4 py-2 rounded-full transition-colors"
            >
              Perfil
            </button>

            <button
              onClick={() => navigate("/anunciar")}
              className="text-sm font-medium bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full transition-colors"
            >
              + Anunciar
            </button>

          </nav>
        </div>
      </div>
    </header>
  )
}
