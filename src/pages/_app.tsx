import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";

export default function App({ Component, pageProps }: AppProps) {
  return (<>
  <Image
   src="/background.png"
   alt="Background Image"
   layout="fill"
   objectFit="cover"
   priority
   className="brightness-[0.2] -z-10"
   />
  <Component {...pageProps} />
  </>)
}
