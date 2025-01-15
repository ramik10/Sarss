import Image from "next/image";
import Link from 'next/link';
const Home = () => {

    return(
        <div className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/api/placeholder/1920/1080"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B4242]/10 to-[#1B4242]/20" />
      </div>

      <header className="bg-[#1B4242] shadow-md relative z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <div className="relative w-32 h-8">
        <Image
          src="/sar.png"
          alt="SARSS Logo"
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
      <nav className="flex gap-8 items-center">
        <Link href="/">
          <div className="text-white hover:text-gray-200 transition-colors font-medium">
            Home
          </div>
        </Link>
      </nav>
    </div>
  </div>
</header>

    <main className="flex-1 py-12 relative z-10">
        
      </main>

      <footer className="bg-[#1B4242] text-white py-4 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">&copy; 2025 GCELT All Rights Reserved.</p>
            <p className="text-sm">Developed & Maintained by SARSS</p>
          </div>
        </div>
      </footer>
    </div>)
}

export default Home;