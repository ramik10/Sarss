import Image from "next/image";
import Link from 'next/link'

const AlternatingImageDescription = () => {
  const items = [
    {
      imgSrc: "/white.png",
      alt: "Image 1",
      description: "This is the description for the first image.",
    },
    {
      imgSrc: "/white.png",
      alt: "Image 2",
      description: "This is the description for the second image.",
    },
    {
      imgSrc: "/white.png",
      alt: "Image 3",
      description: "This is the description for the third image.",
    },
  ];

  return (
    <div className="container mx-auto my-8 px-4 max-w-5xl">
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center gap-6 my-8 ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <div className="relative overflow-hidden rounded-lg md:w-1/2 w-full">
            <Image
              src={item.imgSrc}
              alt={item.alt}
              width={500}
              height={300}
              className="w-full h-auto rounded-lg transform transition duration-300 hover:scale-105 hover:brightness-110"
            />
          </div>
          <p className="w-full md:w-1/2 text-lg text-white transition duration-300 hover:text-gray-900 hover:translate-y-1">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

const Home = () => {

  return (
    <div className="relative min-h-screen flex flex-col">
      <header className="bg-[#1B4242] w-full h-[54px] text-white flex justify-end items-center px-6">
        <nav className="flex gap-6">
          <Link href="/login">
          <div className="text-white text-xl cursor-pointer hover:text-gray-300">
            Login
          </div>
          </Link>
          <Link href="/">
          <div className="text-white text-xl cursor-pointer hover:text-gray-300">
            About Us
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

        <section className="max-w-7xl mx-auto px-4">
          <AlternatingImageDescription />
        </section>
      </main>


      <footer className="bg-[#1B4242] w-full h-[54px] text-white flex items-center justify-center">
        <p>&copy; 2025 GCELT All Rights Reserved. Developed & Maintained by SARSS</p>
      </footer>
    </div>
  );
};

export default Home;
