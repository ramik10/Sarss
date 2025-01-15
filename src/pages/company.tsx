import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import StudentTable from '../components/studentTable';

const Company: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const value = localStorage.getItem("company");
    if (value !== "1") {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-[#1B4242]">
      <header className="bg-[#1B4242]/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/">
                <div className="relative w-32 h-8 cursor-pointer">
                  <Image
                    src="/sar.png"
                    alt="SARSS Logo"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
              </Link>
              <nav className="hidden md:flex gap-6">
                <Link href="/">
                  <div className="text-white hover:text-gray-300 transition-colors">
                    Home
                  </div>
                </Link>
                <Link href="/about">
                  <div className="text-white hover:text-gray-300 transition-colors">
                    About Us
                  </div>
                </Link>
              </nav>
            </div>
            <nav className="flex gap-6">
              <Link href="/login">
                <div className="text-white text-xl cursor-pointer hover:text-gray-300">
                  Login
                </div>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Student Data</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Access and manage student data efficiently and effectively.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <StudentTable />
          </div>
        </div>
      </main>

      <footer className="bg-[#1B4242]/95 backdrop-blur-sm text-white py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold mb-2">About SARSS</h3>
              <p className="text-sm text-gray-300">
                Dedicated to providing the latest updates and insights to our community.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold mb-2">Quick Links</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-300">
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/terms">Terms of Service</Link>
                <Link href="/contact">Contact Us</Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold mb-2">Connect With Us</h3>
              <p className="text-sm text-gray-300">
                Follow us on social media for the latest updates.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2025 GCELT All Rights Reserved.</p>
            <p>Developed & Maintained by SARSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Company;