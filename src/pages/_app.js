import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const hideNavbarOnIndex = router.pathname === "/";
  const hideFooterOnIndex = router.pathname === "/";
  const overflowYAuto = !hideNavbarOnIndex;
  return (
    <div className={`h-screen ${overflowYAuto ? "overflow-y-auto" : ""}`}>
      {!hideNavbarOnIndex && <Navbar />}
      <Component {...pageProps} />
      {!hideFooterOnIndex && <Footer />}
    </div>
  );
}
