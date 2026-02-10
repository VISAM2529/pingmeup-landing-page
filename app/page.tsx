'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  Bell,
  MessageCircle,
  Users,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Star,
  Menu,
  X,
  Gift,
  FileText,
  Plane,
  Send,
  Check,
  PlayCircle,
  Zap,
  Shield,
  Clock,
  ChevronRight,
  Quote,
  Mail,
  Loader2,
  CheckCircle2,
  Rocket,
} from 'lucide-react';

// Smooth animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: "easeOut" as const,
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: "easeOut" as const,
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: "easeOut" as const,
    },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -8,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  },
};

// Subscribe Modal
function SubscribeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
    if (!isOpen) {
      // Reset state when modal closes
      setTimeout(() => {
        setEmail('');
        setStatus('idle');
        setErrorMsg('');
      }, 300);
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Card */}
          <motion.div
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient Header */}
            <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 px-8 pt-10 pb-12 text-center overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-400/20 rounded-full blur-2xl" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-4"
              >
                <Rocket className="w-8 h-8 text-white" />
              </motion.div>

              <motion.h2
                className="text-2xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {status === 'success' ? 'You\'re In! 🎉' : 'Get Early Access'}
              </motion.h2>
              <motion.p
                className="text-white/80 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {status === 'success'
                  ? 'Check your inbox for a welcome surprise'
                  : 'Be the first to know when we launch new features'
                }
              </motion.p>
            </div>

            {/* Body */}
            <div className="px-8 py-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-4"
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5, times: [0, 0.6, 1] }}
                    >
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </motion.div>
                    <p className="text-gray-700 font-medium mb-2">Welcome aboard!</p>
                    <p className="text-gray-500 text-sm mb-6">
                      We've sent a welcome email to <strong className="text-indigo-600">{email}</strong>
                    </p>
                    <motion.button
                      onClick={onClose}
                      className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Got it, thanks!
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email address
                    </label>
                    <div className="relative mb-3">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        ref={inputRef}
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                        placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                        disabled={status === 'loading'}
                      />
                    </div>

                    {errorMsg && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mb-3"
                      >
                        {errorMsg}
                      </motion.p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:from-indigo-700 hover:to-violet-700 transition-all disabled:opacity-70 shadow-lg shadow-indigo-600/20"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Subscribe & Get Started
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-xs text-gray-400 mt-4">
                      No spam, ever. We respect your inbox.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Navbar
function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="w-10 h-10 rounded-xl overflow-hidden "
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <img src="/icon.png" alt="PingMeUp" className="w-full h-full object-cover" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight">PingMeUp</span>
          </motion.div>

          <div className="hidden lg:flex items-center gap-1">
            {['Features', 'How It Works', 'Testimonials'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100/80 transition-all relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {/* <motion.a
              href="https://app.pingmeup.in/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.a> */}
            <motion.button
              onClick={onOpenModal}
              className="btn-shimmer px-5 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Get Started Free */}
              Get Early Access
            </motion.button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t overflow-hidden"
          >
            <div className="py-4 px-6">
              {['Features', 'How It Works', 'Testimonials'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-gray-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                onClick={onOpenModal}
                className="w-full mt-4 px-5 py-3 text-sm font-medium text-white bg-gray-900 rounded-xl block text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Get Started Free
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Hero Section
function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-screen pt-32 lg:pt-40 pb-20 overflow-hidden line-pattern">
      {/* Animated ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-200 rounded-full blur-[120px] opacity-40"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -right-32 w-96 h-96 bg-violet-200 rounded-full blur-[120px] opacity-40"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-rose-200 rounded-full blur-[100px] opacity-30"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div style={{ y, opacity, scale }} className="max-w-4xl mx-auto text-center">
          {/* Announcement */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            custom={0}
            // whileHover={{ scale: 1.05, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-premium border border-gray-100 mb-8 "
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-gray-600">Now with WhatsApp Business API</span>
            {/* <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
            </motion.span> */}
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8"
          >
            Customer reminders
            <br />
            <span className="relative inline-block">
              on autopilot
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
              >
                <motion.path
                  d="M2 8.5C50 3 100 3 150 8.5C200 14 250 3 298 8.5"
                  stroke="#818CF8"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                />
              </motion.svg>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            PingMeUp sends automated WhatsApp messages for appointment reminders, passport expiries, birthdays, and visa renewals. Your customers feel valued, you save hours.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              onClick={onOpenModal}
              variants={fadeInUp}
              custom={3}
              className="group btn-shimmer px-8 py-4 bg-gray-900 text-white rounded-full font-semibold flex items-center gap-3 shadow-2xl shadow-gray-900/20"
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)' }}
              whileTap={{ scale: 0.98 }}
            >
              Get Early Access
              {/* Start Free — No Card Needed */}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.button>
            {/* <motion.button
              variants={fadeInUp}
              custom={4}
              className="flex items-center gap-3 px-6 py-4 text-gray-700 font-medium hover:text-gray-900 transition-colors group"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{ boxShadow: ['0 4px 20px rgba(0,0,0,0.1)', '0 8px 30px rgba(99,102,241,0.2)', '0 4px 20px rgba(0,0,0,0.1)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <PlayCircle className="w-5 h-5 text-indigo-600" />
              </motion.div>
              Watch 2-min demo
            </motion.button> */}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  style={{ background: `hsl(${i * 50}, 70%, 85%)` }}
                  initial={{ opacity: 0, scale: 0, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.08, duration: 0.4, type: 'spring' }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                />
              ))}
            </div>
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 1.5 + i * 0.1, type: 'spring' }}
                  >
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </motion.span>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                <strong className="text-gray-900">500+</strong> travel agencies trust us
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 relative max-w-5xl mx-auto perspective-1000"
        >
          <motion.div
            className="border-gradient p-1"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex gap-1.5">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-red-400"
                    whileHover={{ scale: 1.3 }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-amber-400"
                    whileHover={{ scale: 1.3 }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-green-400"
                    whileHover={{ scale: 1.3 }}
                  />
                </div>
                <div className="flex-1 max-w-md mx-auto">
                  <div className="bg-white rounded-lg px-4 py-1.5 text-xs text-gray-400 text-center border">
                    app.pingmeup.com/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold">Good morning, Sam 👋</h3>
                    <p className="text-sm text-gray-500 mt-1">Here's what's happening today</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    + Add Customer
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Total Customers', value: '1,284', change: '+12%', icon: Users, color: 'bg-indigo-50' },
                    { label: 'Reminders Today', value: '23', change: '', icon: Bell, color: 'bg-violet-50' },
                    { label: 'Messages Sent', value: '2,847', change: '+18%', icon: Send, color: 'bg-emerald-50' },
                    { label: 'Delivery Rate', value: '99.2%', change: '', icon: Check, color: 'bg-amber-50' },
                  ].map((stat, i) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={i} className={`p-4 rounded-xl ${stat.color}`}>
                        <div className="flex items-center justify-between mb-2">
                          <IconComponent className="w-4 h-4 text-gray-400" />
                          {stat.change && <span className="text-xs text-emerald-600 font-medium">{stat.change}</span>}
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Upcoming */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Upcoming Reminders</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'John Sharma', type: 'Birthday', date: 'Tomorrow', icon: Gift, color: 'bg-pink-100 text-pink-600' },
                      { name: 'Priya Patel', type: 'Passport Expiry', date: 'In 7 days', icon: FileText, color: 'bg-orange-100 text-orange-600' },
                      { name: 'Amit Kumar', type: 'Visa Renewal', date: 'In 14 days', icon: Plane, color: 'bg-blue-100 text-blue-600' },
                    ].map((item, i) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                          <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.type}</p>
                          </div>
                          <span className="text-sm text-gray-400">{item.date}</span>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            className="absolute -right-8 top-1/4 hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Message Sent!</p>
                  <p className="text-xs text-gray-500">Birthday wish to John</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute -left-8 bottom-1/3 hidden lg:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">99.2% Delivered</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Features Bento Grid
function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      title: 'Customer Lifecycle Automation',
      description: 'Automate timely, personalized messages across the entire customer journey — from bookings and reminders to birthdays, feedback, and beyond.',
      icon: Plane,
      color: 'from-indigo-500 to-violet-500',
      size: 'large',
    },
    {
      title: 'Passport & Visa Alerts',
      description: 'Get notified 90, 60, and 30 days before document expiry.',
      icon: FileText,
      color: 'from-amber-500 to-orange-500',
      size: 'medium',
    },
    {
      title: 'WhatsApp Business API',
      description: 'Direct integration with official WhatsApp API for reliable delivery.',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-500',
      size: 'medium',
    },
    {
      title: 'Bulk Broadcasts',
      description: 'Promotional offers to all customers at once.',
      icon: Send,
      color: 'from-blue-500 to-indigo-500',
      size: 'small',
    },
    {
      title: 'Smart Customer CRM',
      description: 'All customer data in one secure place.',
      icon: Users,
      color: 'from-violet-500 to-purple-500',
      size: 'small',
    },
  ];

  return (
    <section id="features" ref={ref} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Features
          </motion.span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Everything your agency needs
          </h2>
          <p className="text-lg text-gray-600">
            Built specifically for travel agencies who want to keep customers engaged effortlessly.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Large feature */}
          <motion.div
            variants={fadeInUp}
            custom={0}
            whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}
            className="lg:col-span-2 lg:row-span-2 card-3d bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl p-8 lg:p-10 border border-indigo-100/50 transition-all duration-300"
          >
            {(() => {
              const IconComponent = features[0].icon; return (
                <motion.div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${features[0].color} flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <IconComponent className="w-7 h-7 text-white" />
                </motion.div>
              );
            })()}
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">{features[0].title}</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">{features[0].description}</p>

            {/* Mini previews for travel agencies */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              {/* Promotions & Fare Alerts */}
              {/* <motion.div
                className="bg-white rounded-2xl p-4 shadow-premium border border-gray-100"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold">
                    FA
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">Promotions & Fare Alerts</p>
                      <motion.span
                        className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.55, type: 'spring' }}
                      >
                        Live
                      </motion.span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Hi {`{name}`}, fares to {`{destination}`} dropped—save 20% with code <strong>TRAVEL20</strong>. Book now.
                    </p>
                    <p className="text-xs text-gray-400 mt-2">Delivered • Today at 11:12 AM</p>
                  </div>
                </div>
              </motion.div> */}

              {/* Trip Lifecycle Messaging */}
              <motion.div
                className="bg-white rounded-2xl p-4 shadow-premium border border-gray-100"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold">
                    TL
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">Trip Lifecycle</p>
                      <motion.span
                        className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.6, type: 'spring' }}
                      >
                        Upcoming
                      </motion.span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Hi John, your trip to {`{destination}`} departs in 3 days—here's your e‑ticket and packing checklist.
                    </p>
                    <p className="text-xs text-gray-400 mt-2">Scheduled • In 3 days</p>
                  </div>
                </div>
              </motion.div>

              {/* Birthday Message (restored) */}
              <motion.div
                className="bg-white rounded-2xl p-4 shadow-premium border border-gray-100"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold">
                    JS
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">Birthday Message</p>
                      <motion.span
                        className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.6, type: 'spring' }}
                      >
                        Sent
                      </motion.span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Happy Birthday, John! 🎂 Wishing you a wonderful year ahead. Thank you for being a valued customer of TravelPro Agency!
                    </p>
                    <p className="text-xs text-gray-400 mt-2">Delivered • Today at 9:00 AM</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Other features */}
          {features.slice(1).map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index + 1}
                whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}
                className="card-3d bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-sm transition-all duration-300"
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg`}
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// How It Works
function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { number: '01', title: 'Import Customers', description: 'Upload your customer list or add them manually with birthdays and document dates.' },
    { number: '02', title: 'Connect WhatsApp', description: 'Link your WhatsApp Business account in 2 minutes with our secure connection.' },
    { number: '03', title: 'Customize Messages', description: 'Set up personalized message templates for each reminder type.' },
    { number: '04', title: 'Go Autopilot', description: 'Sit back while PingMeUp handles all reminders automatically.' },
  ];

  return (
    <section id="how-it-works" ref={ref} className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-gray-900 text-white rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            How It Works
          </motion.span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Up and running in minutes
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="text-7xl font-black text-gray-100 mb-4 transition-colors group-hover:text-indigo-100"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.15 }}
              >
                {step.number}
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>

              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-10 right-0 translate-x-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.15, type: 'spring' }}
                >
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </motion.span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials
function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      quote: "Our customer retention improved by 35% since we started sending birthday wishes. PingMeUp made it effortless.",
      author: "Priya Sharma",
      role: "Owner",
      company: "Wanderlust Travels",
    },
    {
      quote: "We used to forget passport renewals all the time. Now we're proactive and customers love us for it.",
      author: "Rajesh Kumar",
      role: "Operations Head",
      company: "Globe Tours",
    },
    {
      quote: "The WhatsApp integration is flawless. Messages feel personal, not automated. That's the magic.",
      author: "Anita Desai",
      role: "Director",
      company: "SkyWay Travels",
    },
  ];

  return (
    <section id="testimonials" ref={ref} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Testimonials
          </motion.span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Trusted by 500+ agencies
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}
              className="card-3d bg-gray-50 rounded-3xl p-8 border border-gray-100 transition-all duration-300"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
              >
                <Quote className="w-10 h-10 text-indigo-200 mb-6" />
              </motion.div>
              <p className="text-gray-700 leading-relaxed mb-8">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {t.author.split(' ').map(n => n[0]).join('')}
                </motion.div>
                <div>
                  <p className="font-semibold text-gray-900">{t.author}</p>
                  <p className="text-sm text-gray-500">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Download App Section
function DownloadApp() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-gradient-to-br from-indigo-50 via-white to-violet-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              📱 Mobile App
            </motion.span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Take PingMeUp everywhere you go
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Download our mobile app and manage customer reminders on the go. Available for iOS and Android devices.
            </p>

            {/* App Store Buttons */}
            {/* <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <motion.a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors group"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                <div className="text-left">
                  <p className="text-xs text-gray-400">GET IT ON</p>
                  <p className="text-lg font-semibold">Google Play</p>
                </div>
              </motion.a>

              <motion.a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors group"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <p className="text-xs text-gray-400">Download on the</p>
                  <p className="text-lg font-semibold">App Store</p>
                </div>
              </motion.a>
            </motion.div> */}

            {/* Features list */}
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              {['Push Notifications', 'Offline Access', 'Quick Actions'].map((feature, i) => (
                <motion.span
                  key={i}
                  className="inline-flex items-center gap-2 text-sm text-gray-600"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <Check className="w-4 h-4 text-green-500" />
                  {feature}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-72 h-72 bg-indigo-200 rounded-full blur-[80px] opacity-50"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </div>

            {/* Phone frame */}
            <motion.div
              className="relative z-10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-64 h-[520px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.4rem] overflow-hidden">
                  {/* Phone screen content */}
                  <div className="bg-gradient-to-br from-indigo-600 to-violet-600 h-full p-6 flex flex-col">
                    {/* Status bar */}
                    <div className="flex justify-between items-center text-white text-xs mb-6">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-white/50 rounded-sm" />
                        <div className="w-4 h-2 bg-white/50 rounded-sm" />
                        <div className="w-6 h-3 bg-white rounded-sm" />
                      </div>
                    </div>

                    {/* App header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl overflow-hidden">
                        <img src="/icon.png" alt="PingMeUp" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-white font-bold text-lg">PingMeUp</span>
                    </div>

                    {/* Dashboard preview */}
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-4">
                      <p className="text-white/70 text-xs mb-2">Today's Reminders</p>
                      <p className="text-white text-3xl font-bold">23</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur rounded-2xl p-4 flex-1">
                      <p className="text-white/70 text-xs mb-3">Next Up</p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                          <div className="w-8 h-8 bg-pink-400/30 rounded-lg flex items-center justify-center">
                            <Gift className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">Birthday</p>
                            <p className="text-white/60 text-xs">John Sharma</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                          <div className="w-8 h-8 bg-orange-400/30 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">Passport</p>
                            <p className="text-white/60 text-xs">Priya Patel</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full" />
            </motion.div>

            {/* Floating notification */}
            <motion.div
              className="absolute -right-4 top-20 z-20"
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ delay: 0.8, type: 'spring' }}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Reminder Sent!</p>
                    <p className="text-xs text-gray-500">Just now</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Final CTA
function FinalCTA({ onOpenModal }: { onOpenModal: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          className="relative bg-gray-900 rounded-[2.5rem] p-12 lg:p-16 overflow-hidden"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[128px] opacity-30"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500 rounded-full blur-[100px] opacity-30"
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative text-center">
            <motion.h2
              className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Ready to delight your customers?
            </motion.h2>
            <motion.p
              className="text-gray-400 text-lg mb-10 max-w-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Join 500+ travel agencies who never miss an important customer date.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={onOpenModal}
                className="btn-shimmer px-8 py-4 bg-white text-gray-900 rounded-full font-semibold flex items-center gap-3"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Start Free Trial */}
                Get Early Access
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.button>
              <motion.a
                href="mailto:support@pingmeup.in"
                className="px-8 py-4 text-gray-400 font-medium hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Talk to Sales
              </motion.a>
            </motion.div>
            <motion.p
              className="text-gray-500 text-sm mt-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              ✓ 14-day free trial &nbsp;&nbsp; ✓ No credit card required &nbsp;&nbsp; ✓ Cancel anytime
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const linkMap: Record<string, string> = {
    Features: '/#features',
    Integrations: '/integrations',
    API: '/docs/api',
    Blog: '/blog',
    Careers: '/careers',
    Press: '/press',
  };
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <img src="/icon.png" alt="PingMeUp" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold">PingMeUp</span>
            </motion.div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              The smartest way for travel agencies to automate customer reminders via WhatsApp.
            </p>
          </div>

          {/* {[
            { title: 'Product', links: ['Features', 'Integrations', 'API'] },
            // { title: 'Company', links: ['Blog', 'Careers', 'Press'] }, // commented out per request
          ].map((group, i) => (
            <div key={i}>
              <h4 className="font-semibold text-gray-900 mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link, j) => (
                  <li key={j}>
                    <motion.a
                      href={linkMap[link] ?? '#'}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))} */}
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 PingMeUp. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <motion.a
              href="https://instagram.com/pingmeup.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              whileHover={{ scale: 1, y: -2 }}
              aria-label="Instagram"
            >

              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 2476 2476" id="instagram">
                <path d="M825.4 1238c0-227.9 184.7-412.7 412.6-412.7 227.9 0 412.7 184.8 412.7 412.7 0 227.9-184.8 412.7-412.7 412.7-227.9 0-412.6-184.8-412.6-412.7m-223.1 0c0 351.1 284.6 635.7 635.7 635.7s635.7-284.6 635.7-635.7-284.6-635.7-635.7-635.7S602.3 886.9 602.3 1238m1148-660.9c0 82 66.5 148.6 148.6 148.6 82 0 148.6-66.6 148.6-148.6s-66.5-148.5-148.6-148.5-148.6 66.5-148.6 148.5M737.8 2245.7c-120.7-5.5-186.3-25.6-229.9-42.6-57.8-22.5-99-49.3-142.4-92.6-43.3-43.3-70.2-84.5-92.6-142.3-17-43.6-37.1-109.2-42.6-229.9-6-130.5-7.2-169.7-7.2-500.3s1.3-369.7 7.2-500.3c5.5-120.7 25.7-186.2 42.6-229.9 22.5-57.8 49.3-99 92.6-142.4 43.3-43.3 84.5-70.2 142.4-92.6 43.6-17 109.2-37.1 229.9-42.6 130.5-6 169.7-7.2 500.2-7.2 330.6 0 369.7 1.3 500.3 7.2 120.7 5.5 186.2 25.7 229.9 42.6 57.8 22.4 99 49.3 142.4 92.6 43.3 43.3 70.1 84.6 92.6 142.4 17 43.6 37.1 109.2 42.6 229.9 6 130.6 7.2 169.7 7.2 500.3 0 330.5-1.2 369.7-7.2 500.3-5.5 120.7-25.7 186.3-42.6 229.9-22.5 57.8-49.3 99-92.6 142.3-43.3 43.3-84.6 70.1-142.4 92.6-43.6 17-109.2 37.1-229.9 42.6-130.5 6-169.7 7.2-500.3 7.2-330.5 0-369.7-1.2-500.2-7.2M727.6 7.5c-131.8 6-221.8 26.9-300.5 57.5-81.4 31.6-150.4 74-219.3 142.8C139 276.6 96.6 345.6 65 427.1 34.4 505.8 13.5 595.8 7.5 727.6 1.4 859.6 0 901.8 0 1238s1.4 378.4 7.5 510.4c6 131.8 26.9 221.8 57.5 300.5 31.6 81.4 73.9 150.5 142.8 219.3 68.8 68.8 137.8 111.1 219.3 142.8 78.8 30.6 168.7 51.5 300.5 57.5 132.1 6 174.2 7.5 510.4 7.5 336.3 0 378.4-1.4 510.4-7.5 131.8-6 221.8-26.9 300.5-57.5 81.4-31.7 150.4-74 219.3-142.8 68.8-68.8 111.1-137.9 142.8-219.3 30.6-78.7 51.6-168.7 57.5-300.5 6-132.1 7.4-174.2 7.4-510.4s-1.4-378.4-7.4-510.4c-6-131.8-26.9-221.8-57.5-300.5-31.7-81.4-74-150.4-142.8-219.3C2199.4 139 2130.3 96.6 2049 65c-78.8-30.6-168.8-51.6-300.5-57.5-132-6-174.2-7.5-510.4-7.5-336.3 0-378.4 1.4-510.5 7.5"></path>
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <main className="min-h-screen">
      <Navbar onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <Features />
      <HowItWorks />
      <Testimonials />
      <DownloadApp />
      <FinalCTA onOpenModal={openModal} />
      <Footer />
      <SubscribeModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}
