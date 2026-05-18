"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Newsroom from '@/components/Newsroom';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollToTop from '@/components/ScrollToTop';

export default function NewsroomPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <SmoothScroll />
      <Navbar />
      
      {/* Hero spacing for standalone page */}
      <div className="pt-32">
        <Newsroom />
      </div>

      {/* Footer / CTA if needed */}
      <section className="py-24 bg-white border-t border-slate-100 flex items-center justify-center text-slate-900 px-10">
        <div className="container text-center">
          <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Stay <span className="text-blue-600">Connected</span></h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            PrimeFix의 최신 기술 트렌드와 산업 동향을 놓치지 마세요.
          </p>
        </div>
      </section>

      <footer className="py-12 bg-slate-900 text-slate-500 text-center text-sm font-medium">
        <div className="container">
          <p>© 2026 PrimeFix Dynamics. All rights reserved.</p>
        </div>
      </footer>

      <ScrollToTop />
    </main>
  );
}
