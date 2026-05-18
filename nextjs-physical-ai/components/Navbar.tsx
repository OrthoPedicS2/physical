"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ChevronRight, Globe, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menuData = [
  {
    title: "회사소개",
    sub: ["기업이념 및 비전", "CEO 인사말", "연혁", "글로벌 네트워크", "찾아오시는 길"]
  },
  {
    title: "사업분야",
    sub: ["스마트팩토리 구축", "예방 정비", "로봇관제"]
  },
  {
    title: "유지보수",
    sub: []
  },
  {
    title: "투자정보",
    sub: []
  },
  {
    title: "뉴스룸",
    sub: []
  },
  {
    title: "고객지원",
    sub: ["문의게시판", "자유게시판"]
  }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = `fixed top-0 left-0 w-full z-[1000] transition-all duration-300 border-b ${
    isScrolled || isHovered 
      ? 'bg-white text-gray-900 border-gray-200 py-3 md:py-4 shadow-lg' 
      : 'bg-transparent text-white border-white/10 py-5 md:py-6'
  }`;

  const logoColor = isScrolled || isHovered ? 'text-blue-600' : 'text-blue-400';

  return (
    <header 
      className={navClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1440px] mx-auto px-10 flex justify-between items-center relative">
        {/* Logo */}
        <div className="text-xl md:text-2xl font-black tracking-tighter flex items-center shrink-0">
          <Link href="/">
            PRIME<span className={logoColor}>FIX</span>
          </Link>
        </div>

        {/* Main GNB */}
        <nav className="hidden lg:flex gap-10 xl:gap-16">
          {menuData.map((item, idx) => {
            let href = `/ir-redirect?target=${item.title}`; 
            if (item.title === "회사소개") href = "company-info.html";
            if (item.title === "유지보수") href = "maintenance.html";
            if (item.title === "투자정보") href = "ir.html";
            if (item.title === "뉴스룸") href = "/newsroom";
            if (item.title === "고객지원") href = "inquiry_board.html";
            
            return (
              <Link 
                key={idx} 
                href={href} 
                className="font-bold text-[0.95rem] hover:text-blue-500 transition-all relative group py-2 flex items-center gap-2"
              >
                {item.title}
                {(item.title === "사업분야" || item.title === "고객지원") && (
                  <span className="opacity-60 text-[10px] group-hover:rotate-180 transition-transform duration-300">
                    <ChevronDown size={14} />
                  </span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            );
          })}
        </nav>

        {/* Right Utils */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-8 text-[0.95rem] font-bold tracking-tight">
            <Link href="/login" className="hover:text-blue-500 transition-colors whitespace-nowrap">로그인</Link>
            <Link href="/profile" className="hover:text-blue-500 transition-colors whitespace-nowrap">나의 정보</Link>
            <div className={`w-[1px] h-4 ${isScrolled || isHovered ? 'bg-gray-300' : 'bg-white/20'}`}></div>
            <div className="flex items-center gap-3">
              <button className="text-blue-500 font-black">KO</button>
              <span className="opacity-20 text-[10px]">|</span>
              <button className="opacity-40 hover:opacity-100 transition-all font-medium">EN</button>
            </div>
          </div>
          <button 
            className="p-1 ml-2 hover:text-blue-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={28} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl overflow-hidden"
          >
            <div className="max-w-[1440px] mx-auto px-10 py-12 grid grid-cols-6 gap-8">
              {menuData.filter(item => item.sub.length > 0).map((item, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                  <h4 className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">
                    {item.title}
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {item.sub.map((sub, sIdx) => (
                      <li key={sIdx}>
                        <Link 
                          href="#" 
                          className="text-gray-700 text-sm font-medium hover:text-blue-600 hover:translate-x-1 transition-all inline-block"
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[2000] backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[85%] max-w-[400px] h-full bg-white z-[2001] shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-xl font-black text-gray-900 tracking-tighter">
                  Prime<span className="text-blue-600">Fix</span>
                </span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-900">
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {menuData.map((item, idx) => {
                  let href = `/ir-redirect?target=${item.title}`; 
                  if (item.title === "회사소개") href = "company-info.html";
                  if (item.title === "유지보수") href = "maintenance.html";
                  if (item.title === "투자정보") href = "ir.html";
                  if (item.title === "뉴스룸") href = "/newsroom";
                  if (item.title === "고객지원") href = "inquiry_board.html";

                  if (item.sub.length === 0) {
                    return (
                      <div key={idx} className="border-b border-gray-100 last:border-0">
                        <Link 
                          href={href}
                          className="w-full flex justify-between items-center py-5 font-bold text-lg text-gray-900"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.title}
                          <ChevronRight size={18} className="text-gray-300" />
                        </Link>
                      </div>
                    );
                  }

                  return (
                    <div key={idx} className="border-b border-gray-100 last:border-0">
                      <button 
                        className="w-full flex justify-between items-center py-5 font-bold text-lg text-gray-900"
                        onClick={() => setActiveMobileMenu(activeMobileMenu === idx ? null : idx)}
                      >
                        {item.title}
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform duration-300 ${activeMobileMenu === idx ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} 
                        />
                      </button>
                    <AnimatePresence>
                      {activeMobileMenu === idx && (
                        <motion.ul 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-gray-50 rounded-xl mb-4 px-5 py-3 flex flex-col gap-3"
                        >
                          {item.sub.map((sub, sIdx) => (
                            <li key={sIdx}>
                              <Link href="#" className="text-gray-600 font-medium text-sm py-2 block">
                                {sub}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-10 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/login" className="bg-blue-600 text-white text-center py-4 rounded-xl font-bold">로그인</Link>
                  <Link href="/support" className="bg-gray-100 text-gray-900 text-center py-4 rounded-xl font-bold">고객센터</Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
