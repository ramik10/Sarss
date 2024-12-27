import Image from "next/image";
import Link from "next/link";


const ClickableBoxes = () => {
  return (
    <div className="container mx-auto my-16 px-4 max-w-5xl">

      <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-32 mb-6">

        <Link href="/student">
          <div className="w-48 h-48 bg-[#1B4242] text-white flex items-center justify-center rounded-lg cursor-pointer transition-transform transform hover:scale-125 hover:shadow-xl hover:bg-white hover:text-[#1B4242]">
            <span className="text-2xl font-semibold">Student</span>
          </div>
        </Link>


        <Link href="/college">
          <div className="w-48 h-48 bg-[#1B4242] text-white flex items-center justify-center rounded-lg cursor-pointer transition-transform transform hover:scale-125 hover:shadow-xl hover:bg-white hover:text-[#1B4242]">
            <span className="text-2xl font-semibold">College</span>
          </div>
        </Link>

        <Link href="/company">
          <div className="w-48 h-48 bg-[#1B4242] text-white flex items-center justify-center rounded-lg cursor-pointer transition-transform transform hover:scale-125 hover:shadow-xl hover:bg-white hover:text-[#1B4242]">
            <span className="text-2xl font-semibold">Company</span>
          </div>
        </Link>
      </div>

      <p className="text-center text-white text-lg md:w-3/4 mx-auto">
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
      </p>
    </div>
  );
};

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <header className="bg-[#1B4242] w-full h-[54px] text-white flex justify-end items-center px-10 md:px-16">
        <nav className="flex gap-6">
        <Link href="/">
          <div className="text-white text-xl cursor-pointer hover:text-gray-300">
            Home
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

        <section className="flex flex-col items-center justify-center py-10 md:py-48">
          <ClickableBoxes />
        </section>

      </main>

      <footer className="bg-[#1B4242] w-full h-[54px] text-white flex items-center justify-center">
        <p>&copy; 2025 GCELT All Rights Reserved. Developed & Maintained by SARSS</p>
      </footer>
    </div>
  );
};

export default Home;