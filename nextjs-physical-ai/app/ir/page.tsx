'use client';

import Navbar from "@/components/Navbar";
import IRDashboard from "@/components/IRDashboard";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";
import { motion } from 'framer-motion';
import { Download, ExternalLink, Calendar, PieChart, Users, Building2 } from "lucide-react";

export default function IRPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      <SmoothScroll />
      <Navbar />
      
      {/* Hero Header */}
      <section className="pt-40 pb-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="text-blue-500 font-bold tracking-widest uppercase mb-4 block">Investor Relations</span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">투명한 경영, <br/>지속 가능한 성장의 약속</h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl">
              PrimeFix는 주주 여러분과의 긴밀한 소통과 투명한 정보 공개를 통해 신뢰받는 기업이 되겠습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Integrated Dashboard Section */}
      <IRDashboard />

      {/* Additional IR Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* IR Schedule */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">IR 주요 일정</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { date: '2026.05.25', title: '2026년 1분기 실적 컨퍼런스 콜' },
                  { date: '2026.06.10', title: '테크 포럼: Physical AI의 미래' },
                  { date: '2026.06.30', title: '기관투자자 대상 NDR' }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="text-blue-600 font-bold whitespace-nowrap">{item.date}</span>
                    <span className="text-slate-600 font-medium">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Governance */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">기업 지배구조</h3>
              </div>
              <p className="text-slate-500 mb-6 font-medium">이사회 중심의 책임 경영과 효율적인 내부 통제 시스템을 통해 주주 권익 보호에 앞장섭니다.</p>
              <button className="text-sm font-black flex items-center gap-2 text-slate-900 hover:text-blue-600 transition-colors">
                지배구조 보고서 보기 <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Shareholder Service */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">주주 서비스</h3>
              </div>
              <p className="text-slate-500 mb-6 font-medium">실시간 주가 조회 알림 신청 및 주주 전용 뉴스레터 구독 서비스를 제공합니다.</p>
              <button className="w-full py-4 bg-slate-100 rounded-2xl font-bold hover:bg-slate-200 transition-colors">
                뉴스레터 구독 신청
              </button>
            </div>

          </div>

          {/* Electronic Disclosure (DART) */}
          <div className="mt-12 bg-slate-900 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">금융감독원 전자공시(DART)</h3>
              <p className="text-slate-400">PrimeFix의 최근 공시 자료를 실시간으로 확인하실 수 있습니다.</p>
            </div>
            <a 
              href="https://dart.fss.or.kr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-6 md:mt-0 px-8 py-4 bg-blue-600 rounded-full font-black flex items-center gap-3 hover:bg-blue-700 transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            >
              DART 공시 보러가기 <ExternalLink className="w-5 h-5" />
            </a>
            <BarChart3 className="absolute right-[-20px] bottom-[-20px] w-64 h-64 text-white opacity-5 pointer-events-none" />
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white border-top border-slate-200 text-center">
        <p className="text-slate-400">&copy; 2026 PrimeFix Dynamics. All rights reserved.</p>
      </footer>

      <ScrollToTop />
    </main>
  );
}
