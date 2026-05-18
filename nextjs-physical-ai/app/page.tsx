import Navbar from "@/components/Navbar";
import MaintenanceVideo from "@/components/MaintenanceVideo";
import IRDashboard from "@/components/IRDashboard";
import Newsroom from "@/components/Newsroom";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <SmoothScroll />
      <Navbar />
      
      {/* 1. Hero Section */}
      <section id="home" className="h-screen bg-black flex items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-gradient-to-br from-blue-900 via-black to-blue-900 animate-pulse"></div>
        </div>
        <div className="container relative z-10 text-center px-6">
          <motion_div_placeholder /> {/* Placeholder for motion if needed, but I'll use standard tags first if framer-motion is not available or just raw HTML since I don't see framer-motion import in existing files besides my new component */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            INTELLIGENT <br />
            <span className="text-blue-500">PrimeFix</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
            Revolutionizing the future of robotics and smart factory maintenance through state-of-the-art Physical AI solutions.
          </p>
        </div>
      </section>

      {/* 2. Business Section */}
      <section id="business-areas" className="py-24 bg-white flex flex-col items-center justify-center text-black px-10">
        <div className="max-w-[1440px] w-full">
          <h2 className="text-5xl font-black mb-12 tracking-tight">BUSINESS <span className="text-blue-600">AREAS</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              { title: '스마트팩토리 구축', desc: '지능형 제조 라인 설계 및 최적화', link: 'smart-factory.html' },
              { title: '예방 정비', desc: 'AI 기반 고장 예측 및 선제적 대응', link: 'preventive-maintenance.html' },
              { title: '로봇관제', desc: '실시간 로봇 함대 관리 및 통합 제어', link: 'robot-control.html' }
            ].map((item, idx) => (
              <a key={idx} href={item.link} className="group relative h-[450px] bg-gray-100 rounded-[2.5rem] overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-10 left-10">
                   <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">PrimeFix Solution</span>
                </div>
                <div className="absolute bottom-12 left-10 pr-10">
                  <h3 className="text-3xl font-black mb-3 leading-tight">{item.title}</h3>
                  <p className="text-gray-500 font-medium">{item.desc}</p>
                </div>
                <div className="absolute bottom-10 right-10 w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-200 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                   <i className="fas fa-arrow-right"></i>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <MaintenanceVideo />
      
      <IRDashboard />
      <Newsroom />

      {/* 4. ESG Section */}
      <section id="지속가능경영" className="py-24 bg-gray-900 flex items-center justify-center text-white px-10">
        <div className="container text-center">
          <h2 className="text-5xl font-black mb-6 uppercase">Sustainable <span className="text-blue-500">Future</span></h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">기술은 사람과 지구를 향해야 합니다. <br />ESG 경영을 통해 지속 가능한 로보틱스 생태계를 만듭니다.</p>
        </div>
      </section>

      <ScrollToTop />
    </main>
  );
}
