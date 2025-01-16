import Image from "next/image";
import Link from "next/link";
import StudentDetailsForm from "@/components/forms/studentDetails";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface FormData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  contactInformation: string;
  schoolName: string;
  graduationDate: string;
  cgpa: string;
}


const Home = () => {
   const router = useRouter()
    useEffect(()=>{
        const value = localStorage.getItem("college")
        if(value!=="1"){
          router.push("/")
        }
        return
      },[])
  const handleSubmit = (formData: FormData) => {
    console.log("Form Data:", formData);
  };
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

        <section className="py-10 px-32 md:px-64">
        <StudentDetailsForm 
            title="Student Details"
            onSubmit={handleSubmit}
          />
        </section>

      </main>

      <footer className="bg-[#1B4242] w-full h-[54px] text-white flex items-center justify-center">
        <p>&copy; 2025 GCELT All Rights Reserved. Developed & Maintained by Campus Konnect</p>
      </footer>
    </div>
  );
};

export default Home;