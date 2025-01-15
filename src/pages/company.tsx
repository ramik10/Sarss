import Image from "next/image";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
const Home = () => {
  const router = useRouter()
  useEffect(()=>{
      const value = localStorage.getItem("company")
      if(value!=="1"){
        router.push("/")
      }
      return
    },[])
  return (
    <div className="relative min-h-screen flex flex-col">
      <header className="bg-[#1B4242] w-full h-[54px] text-white flex justify-end items-center px-6">
        <nav className="flex gap-6">
          <Link href="/">
          <div className="text-white text-xl cursor-pointer hover:text-gray-300">
            Home
          </div>
          </Link>
          <Link href="/login">
          <div className="text-white text-xl cursor-pointer hover:text-gray-300">
            Login
          </div>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <div className="relative w-1/4 sm:w-1/6 h-[72px] m-5">
          <Image
            src="/sar.png"
            alt="Sars image"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>

        <section className="flex py-10 md:py-32 px-16 md:px-32">
            <div className="relative h-[627px] w-[625px] max-h-[627px] max-w-[625px] border-white rounded-sm border-2">
            <Image
            src="/sar.png"
            alt="Sars image"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
            </div>
        </section>
      </main>


      <footer className="bg-[#1B4242] w-full h-[54px] text-white flex items-center justify-center">
        <p>&copy; 2025 GCELT All Rights Reserved. Developed & Maintained by SARSS</p>
      </footer>
    </div>
  );
};

export default Home;