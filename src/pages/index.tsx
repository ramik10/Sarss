import Image from "next/image"

const AlternatingImageDescription = () => {
  const items = [
    {
      imgSrc: '/white.png',
      alt: 'Image 1',
      description: 'This is the description for the first image.',
    },
    {
      imgSrc: '/white.png',
      alt: 'Image 2',
      description: 'This is the description for the second image.',
    },
    {
      imgSrc: '/white.png',
      alt: 'Image 3',
      description: 'This is the description for the third image.',
    },
  ];

  return (
    <div className="container mx-auto my-8 px-4 max-w-5xl">
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center gap-6 my-8 ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
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
      <AlternatingImageDescription/>
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