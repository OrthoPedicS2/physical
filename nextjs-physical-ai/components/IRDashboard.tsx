'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  BarChart3, 
  Mail, 
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Download
} from 'lucide-react';

// --- Mock Data Generator ---
const generateData = () => {
    const base = 254500;
    return Array.from({ length: 20 }, (_, i) => ({
        time: i,
        price: base + Math.sin(i * 0.5) * 5000 + Math.random() * 2000
    }));
};

export default function IRDashboard() {
  const [stockData, setStockData] = useState(generateData());
  const [currentPrice, setCurrentPrice] = useState(254500);
  const [prevPrice, setPrevPrice] = useState(252000);
  
  // Real-time fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const diff = (Math.random() - 0.45) * 1000; // Slighly biased towards growth
        return Math.round(prev + diff);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const changePrice = currentPrice - prevPrice;
  const changeRate = (changePrice / prevPrice) * 100;
  const isUp = changePrice >= 0;

  // Simple SVG Sparkline
  const sparklinePoints = useMemo(() => {
    const min = Math.min(...stockData.map(d => d.price));
    const max = Math.max(...stockData.map(d => d.price));
    const range = max - min;
    const width = 200;
    const height = 60;
    
    return stockData.map((d, i) => {
      const x = (i / (stockData.length - 1)) * width;
      const y = height - ((d.price - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
  }, [stockData]);

  return (
    <section id="ir-info" className="py-24 bg-[#e2e8f0]"> {/* Steel Gray Background */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left: Stock Dashboard Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3 bg-white rounded-3xl p-8 shadow-2xl border border-slate-200"
          >
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-slate-400 text-sm font-bold tracking-widest uppercase mb-1">Stock Information</h3>
                <h2 className="text-4xl font-black text-slate-900 flex items-center gap-3">
                  PrimeFix <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">003670</span>
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Real-time KOSPI</span>
                <p className="text-slate-900 font-bold">LIVE</p>
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-8 mb-12">
              <div className="flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={currentPrice}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-6xl font-black tracking-tighter text-slate-900"
                  >
                    {currentPrice.toLocaleString()}
                    <span className="text-2xl ml-2 font-bold text-slate-400">KRW</span>
                  </motion.span>
                </AnimatePresence>
              </div>
              
              <div className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xl ${isUp ? 'text-red-500 bg-red-50' : 'text-blue-600 bg-blue-50'}`}>
                {isUp ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
                <span>{Math.abs(changePrice).toLocaleString()}</span>
                <span className="text-sm">({changeRate.toFixed(2)}%)</span>
              </div>
            </div>

            {/* Mini Sparkline Chart */}
            <div className="relative h-24 w-full bg-slate-50 rounded-2xl p-4 flex items-center overflow-hidden">
               <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 200 60">
                 <polyline
                    fill="none"
                    stroke={isUp ? "#ef4444" : "#2563eb"}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={sparklinePoints}
                 />
                 <path
                    d={`M 0 60 L ${sparklinePoints} L 200 60 Z`}
                    fill={`url(#gradient-${isUp ? 'up' : 'down'})`}
                    opacity="0.1"
                 />
                 <defs>
                   <linearGradient id="gradient-up" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#ef4444" />
                     <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                   </linearGradient>
                   <linearGradient id="gradient-down" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#2563eb" />
                     <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                   </linearGradient>
                 </defs>
               </svg>
            </div>
          </motion.div>

          {/* Right: Financial Indicators */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 flex flex-col gap-2"
          >
            <h3 className="text-slate-500 font-black text-lg mb-4 pl-2">주요 재무 지표 (2023)</h3>
            {[
              { label: "매출액", value: "4조 7,599억" },
              { label: "영업이익", value: "359억" },
              { label: "당기순이익", value: "439억" },
              { label: "자산총계", value: "7조 3,450억" },
              { label: "부채비율", value: "141.2%" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
                <span className="text-slate-500 font-bold">{item.label}</span>
                <span className="text-slate-900 font-black">{item.value}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom: News Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <FileText className="text-blue-600" /> PrimeFix 투자 뉴스
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { category: "NEWS", title: "PrimeFix, 차세대 AI 로봇 제어 솔루션 대규모 수주 성공", date: "2026.05.18" },
              { category: "ANALYSIS", title: "2분기 실적 전망 '맑음', 스마트팩토리 수요 폭증 수혜", date: "2026.05.15" },
              { category: "REPORT", title: "탄소중립 기술 혁신을 통한 ESG 경영 등급 'A' 획득", date: "2026.05.12" },
            ].map((news, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
              >
                <span className="text-xs font-black text-blue-600 tracking-tighter">{news.category}</span>
                <h4 className="text-lg font-bold text-slate-900 mt-3 leading-tight h-14 overflow-hidden">
                  {news.title}
                </h4>
                <p className="text-slate-400 text-sm mt-4 font-medium">{news.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
