"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, Settings, PenTool, Activity, ArrowRight, MessageSquare } from 'lucide-react';
import MaintenanceVideo from '@/components/MaintenanceVideo';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const MaintenancePage = () => {
  return (
    <main className="bg-[#0c0e12] min-h-screen pt-48 px-10 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
        >
          <span className="inline-block text-blue-500 font-bold text-sm tracking-[0.2em] mb-8 uppercase">
            Innovative Future
          </span>
          <h1 className="text-7xl md:text-9xl font-black text-white mb-24 tracking-tighter leading-none bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            PrimeFix <br />
            Dynamics
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-12 py-16 border-t border-white/10 overflow-hidden">
            <span className="text-gray-600 font-extrabold text-lg uppercase tracking-widest">Core Business</span>
            <p className="text-3xl md:text-5xl font-bold text-gray-200 leading-tight tracking-tight">
              지능형 Physical AI 및 첨단 로보틱스 솔루션 개발을 통해 산업의 디지털 혁신을 선도합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-12 py-16 border-t border-white/10">
            <span className="text-gray-600 font-extrabold text-lg uppercase tracking-widest">Main Purpose</span>
            <p className="text-4xl md:text-6xl font-black text-blue-500 leading-tight tracking-tighter">
              "기술을 통해 인간의 삶을 더 안전하고 <br />효율적으로 풍요롭게 만드는 것."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-12 py-16 border-t border-white/10">
            <span className="text-gray-600 font-extrabold text-lg uppercase tracking-widest">Future Vision</span>
            <p className="text-2xl md:text-3xl font-medium text-gray-400 leading-relaxed max-w-3xl">
              단순한 자동화를 넘어, 기계가 인간을 깊이 이해하고 조화롭게 협력하는 초지능형 물리 생태계를 구축합니다.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Robot Maintenance Video Section */}
      <MaintenanceVideo />
    </main>
  );
};

export default MaintenancePage;
