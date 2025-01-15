import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

const student = () => {
  const router = useRouter()
  useEffect(()=>{
    const value = localStorage.getItem("student")
    if(value!=="1"){
      router.push("/")
    }
    return
  },[])

  const [student] = useState({
    name: "John Dam",
    roll: "CSE/2023/001",
    semester: "6th",
    department: "Computer Science",
    cgpa: "9.2",
    blogPosts: [
      { title: "My Experience with React", date: "2024-01-01", likes: 24 },
      { title: "Learning NextJS", date: "2024-01-15", likes: 15 }
    ]
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-[#1B4242] text-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src="/sar.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-semibold">Student Portal</span>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-gray-300 transition">Home</Link>
            <Link href="/profile" className="hover:text-gray-300 transition">Profile</Link>
            <Link href="/resume" className="hover:text-gray-300 transition">Resume</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src="/sar.png"
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
                <p className="text-gray-600">{student.roll}</p>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="font-medium">Department</span>
                  <span>{student.department}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="font-medium">Semester</span>
                  <span>{student.semester}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="font-medium">CGPA</span>
                  <span>{student.cgpa}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Total Posts</h3>
                <p className="text-3xl font-bold text-[#1B4242] mt-2">{student.blogPosts.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Total Likes</h3>
                <p className="text-3xl font-bold text-[#1B4242] mt-2">
                  {student.blogPosts.reduce((acc, post) => acc + post.likes, 0)}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Achievements</h3>
                <p className="text-3xl font-bold text-[#1B4242] mt-2">5</p>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Recent Blog Posts</h3>
                <button className="bg-[#1B4242] text-white px-4 py-2 rounded hover:bg-[#143333] transition">
                  New Post
                </button>
              </div>
              <div className="space-y-4">
                {student.blogPosts.map((post, index) => (
                  <div key={index} className="border-b pb-4">
                    <h4 className="text-lg font-semibold text-gray-800">{post.title}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-600">{post.date}</span>
                      <span className="text-gray-600">{post.likes} likes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#1B4242] text-white py-4 text-center">
        <p>&copy; 2025 GCELT All Rights Reserved. Developed & Maintained by SARSS</p>
      </footer>
    </div>
  );
};

export default student;