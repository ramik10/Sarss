import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";
import Link from "next/link";
import { SetStateAction, useState } from "react";


const ClickableBoxesWithModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (title: SetStateAction<string>) => {
    setModalTitle(title);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalTitle("");
  };

  return (
    <div className="container mx-auto my-16 px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-32 mb-6">
        {["Student", "College", "Company"].map((title) => (
          <div
            key={title}
            className="w-48 h-48 bg-[#1B4242] text-white flex items-center justify-center rounded-lg cursor-pointer transition-transform transform hover:scale-125 hover:shadow-xl hover:bg-white hover:text-[#1B4242]"
            onClick={() => openModal(`${title} Login`)}
          >
            <span className="text-2xl font-semibold">{title}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-white text-lg md:w-3/4 mx-auto">
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
      </p>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              ✕
            </button>
            <LoginForm
              title={modalTitle}
              onCancel={closeModal}
              onSubmit={(data) => {
                console.log("Submitted data:", data);
                closeModal();
              }}
              onForgotPassword={() => alert("Forgot password clicked!")}
            />
          </div>
        </div>
      )}
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
          <ClickableBoxesWithModal />
        </section>

      </main>

      <footer className="bg-[#1B4242] w-full h-[54px] text-white flex items-center justify-center">
        <p>&copy; 2025 GCELT All Rights Reserved. Developed & Maintained by SARSS</p>
      </footer>
    </div>
  );
};

export default Home;