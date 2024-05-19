// pages/_app.js
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { AppProvider } from "../context/AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Navbar />
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
