import Image from "next/image"

const Home = ()=>{
  return (
    <div className="relative min-h-screen">
    <div className="flex justify-end bg-[#1B4242] w-full h-[54px] max-h-[15%] text-white">
      <div className="w-[10%] max-w-[30%] h-[54px] max-h-[15%] mr-[5%]">
        <div className="flex justify-between mt-[5%]">
        <div className="text-white text-xl">
            Login
        </div>
        <div className="text-white text-xl">
            About Us
        </div>
        </div>
      </div>
    </div>
    <div className="w-full h-[90vh]">
      <div className="relative flex justify-start w-1/6 h-[72px] max-h-[8%] m-5">
        <Image src="/sar.png" alt="Sars image" layout="fill" objectFit="contain" />
      </div>
      <div className="max-h-[90%]">

      </div>
    </div>
    <div className="absolute bg-[#1B4242] w-full h-[54px] max-h-[15%] text-white bottom-0">
    <div>

    </div>
  </div>
  </div>
  )
}

export default Home