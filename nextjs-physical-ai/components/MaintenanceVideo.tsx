"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ClipboardList, 
  Truck, 
  Hammer, 
  MonitorCheck, 
  ArrowRight
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "장애 접수 및 원격 진단",
    desc: "로그 분석 및 에러 코드 확인",
    icon: <ClipboardList className="w-8 h-8 text-blue-400" />
  },
  {
    number: "02",
    title: "현장 출동 및 정밀 분석",
    desc: "제어반 PLC 시퀀스 및 하드웨어 점검",
    icon: <Truck className="w-8 h-8 text-blue-400" />
  },
  {
    number: "03",
    title: "수리 및 맞춤형 가공",
    desc: "프로그램 로직 수정 및 파츠 정밀 가공",
    icon: <Hammer className="w-8 h-8 text-blue-400" />
  },
  {
    number: "04",
    title: "시운전 및 모니터링",
    desc: "최종 구동 테스트 및 대시보드 연동",
    icon: <MonitorCheck className="w-8 h-8 text-blue-400" />
  }
];

export default function MaintenanceVideo() {
  return (
    <section id="maintenance-video" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-working-on-a-circuit-board-43231-large.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
      </div>

      <div className="container relative z-10 px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6"
          >
            멈춤 없는 혁신, <br />
            <span className="text-blue-500">PrimeFix가 증명합니다</span>
          </motion.h2>
          <motion.div 
             initial={{ scaleX: 0 }}
             whileInView={{ scaleX: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.2 }}
             className="w-24 h-1 bg-blue-600 mx-auto"
          />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] h-full transition-all duration-500 hover:bg-white/10 hover:border-blue-500/50 hover:-translate-y-2">
                <div className="flex justify-between items-start mb-6">
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="p-4 bg-blue-500/10 rounded-2xl"
                  >
                    {step.icon}
                  </motion.div>
                  <span className="text-4xl font-black text-white/10 group-hover:text-blue-500/20 transition-colors">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 break-keep">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
                
                {/* Arrow indicator for horizontal flow on desktop */}
                {idx < steps.length - 1 && (
                   <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                      <ArrowRight className="w-6 h-6 text-blue-500/30" />
                   </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <a href="inquiry_board.html" className="group relative inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white font-black text-lg rounded-full overflow-hidden transition-all hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
            긴급 출동 / 유지보수 문의하기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
