// components/Navbar.js
import Link from "next/link";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { images, transcriptions, textEmb } = useAppContext();

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white">
            Home
          </Link>
        </li>
        {images.length > 0 && (
          <li>
            <Link href="/reorder" className="text-white">
              Reordenar Imagens
            </Link>
          </li>
        )}
        {transcriptions.length > 0 && (
          <li>
            <Link href="/transcriptions" className="text-white">
              Transcrições
            </Link>
          </li>
        )}
        {textEmb.length > 0 && (
          <li>
            <Link href="/chat" className="text-white">
              Chat
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
