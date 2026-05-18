"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const newsData = [
  {
    id: 1,
    category: "주요뉴스",
    title: "PrimeFix, 차세대 AI 로봇 제어 솔루션 대규모 수주 성공",
    summary: "글로벌 자동차 제조사와 500억 규모의 스마트 팩토리 제어 시스템 공급 계약을 체결하며 기술력을 인정받았습니다.",
    date: "2026.05.18",
    image: "/images/news_ai_robot.png",
    tag: "MAJOR"
  },
  {
    id: 2,
    category: "보도자료",
    title: "2026 로보월드 박람회 참가, 미래형 유지보수 플랫폼 공개",
    summary: "현장에서 원격으로 진단하고 수리하는 'Prime-Remote' 기술을 선보여 업계 관계자들의 큰 관심을 끌었습니다.",
    date: "2026.05.15",
    image: "/images/news_exhibition.png",
    tag: "PRESS"
  },
  {
    id: 3,
    category: "프라임픽스스토리",
    title: "기술 그 이상의 가치, PrimeFix 엔지니어링 팀 인터뷰",
    summary: "멈춤 없는 혁신을 만드는 사람들의 이야기. 현장에서 땀 흘리는 엔지니어들이 말하는 PrimeFix의 기업 문화.",
    date: "2026.05.10",
    image: "/images/news_team.png",
    tag: "STORY"
  },
  {
    id: 4,
    category: "주요뉴스",
    title: "탄소중립 기술 혁신을 통한 ESG 경영 등급 'A' 획득",
    summary: "에너지 효율을 극대화하는 스마트 팩토리 솔루션을 통해 친환경 경영 성과를 공식적으로 인정받았습니다.",
    date: "2026.05.08",
    image: "/images/news_ai_robot.png",
    tag: "MAJOR"
  },
  {
    id: 5,
    category: "보도자료",
    title: "PrimeFix 기술 연구소, 국내 최대 규모 로봇 센터 개소",
    summary: "대한민국 로봇 산업의 메카가 될 새로운 기술 센터에서 차세대 자동화 로직을 연구합니다.",
    date: "2026.05.05",
    image: "/images/news_exhibition.png",
    tag: "PRESS"
  }
];

const tabs = ["전체", "주요뉴스", "보도자료", "프라임픽스스토리"];

const Newsroom = () => {
  const [activeTab, setActiveTab] = useState("전체");

  const filteredNews = activeTab === "전체" 
    ? newsData 
    : newsData.filter(item => item.category === activeTab);

  return (
    <section id="newsroom" className="py-32 bg-[#f8fafc]">
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-blue-600 font-black tracking-widest text-sm mb-4 uppercase"
            >
              Latest Insights
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl font-black text-slate-900 tracking-tighter"
            >
              뉴스룸
            </motion.h2>
          </div>

          <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? "bg-slate-900 text-white shadow-lg" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="relative">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredNews.map((news, idx) => (
                <motion.div
                  key={news.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-500"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-8 left-8">
                      <span className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-[0.7rem] font-black text-slate-900 shadow-xl border border-white/20 uppercase tracking-widest">
                        {news.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-10">
                    <p className="text-blue-600 text-xs font-black mb-4 tracking-tighter">{news.date}</p>
                    <h3 className="text-2xl font-bold text-slate-900 mb-5 leading-tight group-hover:text-blue-600 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-slate-500 text-[0.95rem] leading-relaxed mb-10 line-clamp-2 font-medium opacity-80">
                      {news.summary}
                    </p>
                    <div className="flex items-center gap-3 text-slate-900 font-black text-xs uppercase tracking-widest group/btn border-t border-slate-50 pt-8 mt-auto">
                      Read More 
                      <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Newsletter Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 bg-[#0a0f1a] rounded-[3.5rem] p-12 md:p-24 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-16"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none"></div>
          <div className="absolute -top-48 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>

          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">
              PRIME<span className="text-blue-500">FIX</span> 기자단 모집
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed opacity-90">
              PRIMEFIX의 혁신적인 기술과 변화하는 산업 현장의 소식을 <br className="hidden md:block" />
              가장 앞서 전달할 열정적인 기자단을 모집합니다.
            </p>
          </div>

          <div className="relative z-10 w-full lg:w-auto">
            <Link 
              href="/inquiry_board.html"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-12 py-6 rounded-2xl md:rounded-full font-black text-lg md:text-xl transition-all shadow-2xl hover:shadow-blue-500/30 whitespace-nowrap active:scale-95 gap-3"
            >
              기자단 신청하기
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsroom;
