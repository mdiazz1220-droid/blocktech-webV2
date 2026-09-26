/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Box,
  Layers,
  Cpu,
  Globe,
  BarChart2,
  Send,
  CheckCircle2,
  Mic,
  Music,
  Radio,
  Video,
  FileText,
  MessageSquare,
  ArrowRight,
  X,
  Sliders,
  ChevronRight,
  ChevronLeft,
  Users,
  TrendingUp,
  Shield
} from 'lucide-react';
import { LegalModal } from './components/LegalModal';
import { LegalPage, LegalRoute } from './components/LegalPage';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'studio' | 'agents' | 'api'>('studio');
  const [subCategory, setSubCategory] = useState<string>('Generador de Voz IA');
  
  // 5 Soluciones Panels Carousel state & timer
  const [activeSolucionIdx, setActiveSolucionIdx] = useState<number>(0);
  const [solucionesTimerPaused, setSolucionesTimerPaused] = useState<boolean>(false);

  useEffect(() => {
    if (solucionesTimerPaused) return;
    const interval = setInterval(() => {
      setActiveSolucionIdx((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, [solucionesTimerPaused]);
  
  // Hero player audio simulation
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackTime, setPlaybackTime] = useState<number>(42); // seconds
  const [audioInputText, setAudioInputText] = useState<string>('¡Hola! Bienvenido a Block Tech Agencia. Experimenta síntesis de voz con IA hiperrealista sin latencia.');
  const [selectedVoice, setSelectedVoice] = useState<string>('Sofía - Cálida y Natural');

  // Interactive Agent Simulator state
  const [messages, setMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string; time: string }>>([
    { sender: 'agent', text: '¡Hola! ¿En qué puedo ayudarte hoy?', time: '10:42 AM' },
    { sender: 'user', text: 'Necesito ayuda para revisar el estado de mi despliegue.', time: '10:43 AM' },
    { sender: 'agent', text: 'Tu servicio "BlockTech-v4-prod" está activo con 99.98% de disponibilidad y 24ms de latencia de audio.', time: '10:43 AM' },
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [isAgentSpeaking, setIsAgentSpeaking] = useState<boolean>(false);

  // Modals
  const [showContact, setShowContact] = useState<boolean>(false);
  const [showContactSales, setShowContactSales] = useState<boolean>(false);
  const [activeCategoryModal, setActiveCategoryModal] = useState<string | null>(null);
  // Independent legal routing (/terminos, /privacidad, /cookies)
  const getInitialLegalRoute = (): LegalRoute | null => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
    const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
    if (path === 'terminos' || hash === 'terminos') return 'terminos';
    if (path === 'privacidad' || hash === 'privacidad') return 'privacidad';
    if (path === 'cookies' || hash === 'cookies') return 'cookies';
    return null;
  };

  const [legalRoute, setLegalRoute] = useState<LegalRoute | null>(getInitialLegalRoute);

  const handleNavigateLegal = (route: LegalRoute) => {
    window.history.pushState({}, '', `/${route}`);
    setLegalRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    window.history.pushState({}, '', '/');
    setLegalRoute(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setLegalRoute(getInitialLegalRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (legalRoute === 'terminos') {
      document.title = 'Términos y Condiciones | blockTech';
    } else if (legalRoute === 'privacidad') {
      document.title = 'Política de Privacidad y Tratamiento de Datos | blockTech';
    } else if (legalRoute === 'cookies') {
      document.title = 'Política de Cookies | blockTech';
    } else {
      document.title = 'Block Tech Agencia - Audio e IA que suena humano';
    }
  }, [legalRoute]);

  const [legalModalState, setLegalModalState] = useState<{ isOpen: boolean; tab: 'terms' | 'privacy' | 'cookies' }>({
    isOpen: false,
    tab: 'terms'
  });

  // Playback timer effect
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackTime((prev) => (prev >= 260 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle TTS Web Speech API synthesis for interactive demo
  const handleSynthesize = (textToSpeak?: string) => {
    const text = textToSpeak || audioInputText;
    if (!text) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isPlaying) {
        setIsPlaying(false);
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      // Toggle play state fallback
      setIsPlaying(!isPlaying);
    }
  };

  // Agent chat send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMsg = {
      sender: 'user' as const,
      text: userInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    const userQuery = userInput;
    setUserInput('');

    // Simulated Agent response
    setIsAgentSpeaking(true);
    setTimeout(() => {
      let reply = 'He recibido tu consulta sobre "' + userQuery + '". Procesando síntesis de audio neuronal...';
      if (userQuery.toLowerCase().includes('hola') || userQuery.toLowerCase().includes('buenas')) {
        reply = '¡Hola! ¿Cómo puedo ayudarte a construir tu próxima solución de voz e IA?';
      } else if (userQuery.toLowerCase().includes('precio') || userQuery.toLowerCase().includes('costo')) {
        reply = 'Block Tech Agencia ofrece planes adaptados y API desde $0.001 por segundo sintetizado.';
      } else if (userQuery.toLowerCase().includes('voz') || userQuery.toLowerCase().includes('clon')) {
        reply = 'Puedes clonar voces con menos de 3 segundos de audio de referencia en Block Tech Studio.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsAgentSpeaking(false);

      // Speak agent reply
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(reply);
        utt.lang = 'es-ES';
        window.speechSynthesis.speak(utt);
      }
    }, 1000);
  };

  // Format seconds into MM:SS.ms
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}.12`;
  };

  // Render independent legal route page if accessed (/terminos, /privacidad, /cookies)
  if (legalRoute) {
    return (
      <LegalPage
        route={legalRoute}
        onNavigateHome={handleNavigateHome}
        onNavigateTo={handleNavigateLegal}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#111111] flex flex-col font-['Geist',sans-serif] selection:bg-black selection:text-white">
      {/* TOP NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-200/80 bg-[#F7F7F5]/80 backdrop-blur-md transition-all">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 flex justify-between items-center h-[72px]">
          <div className="flex items-center gap-8 lg:gap-12">
            <a href="#" className="text-xl font-bold tracking-tighter text-zinc-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-black rounded-full inline-block"></span>
              Block Tech Agencia
            </a>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
              <a href="#producto" className="transition-colors hover:text-black">
                Productos
              </a>
              <a href="#soluciones" className="transition-colors hover:text-black">
                Soluciones
              </a>
              <a href="#clientes" className="transition-colors hover:text-black">
                Clientes
              </a>
              <a href="#precios" className="transition-colors hover:text-black">
                Precios
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowContact(true)}
              className="bg-black text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all hover:scale-[1.03] active:scale-[0.98] shadow-sm cursor-pointer"
            >
              Contacto
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow pt-[130px] sm:pt-[150px] pb-16">
        {/* HERO SECTION */}
        <section className="max-w-[1280px] mx-auto px-6 sm:px-8 mb-[80px] lg:mb-[120px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-[44px] sm:text-[64px] lg:text-[76px] font-semibold tracking-[-0.03em] leading-[1.05] text-black"
              >
                Convertimos procesos en sistemas inteligentes
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <button
                  onClick={() => setShowContact(true)}
                  className="bg-black text-white px-7 py-3.5 rounded-full font-medium transition-all hover:scale-[1.03] active:scale-[0.98] shadow-md text-sm cursor-pointer"
                >
                  Contacto
                </button>
                <button
                  onClick={() => setShowContactSales(true)}
                  className="bg-transparent border border-zinc-300 text-black px-7 py-3.5 rounded-full font-medium transition-all hover:bg-zinc-100 text-sm cursor-pointer"
                >
                  Hablar con ventas
                </button>
              </motion.div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 flex justify-start lg:justify-end">
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-zinc-600 text-base sm:text-lg leading-relaxed max-w-sm pt-2"
              >
                Integramos inteligencia artificial, automatización y tecnología para hacer que tu empresa trabaje mejor.
              </motion.p>
            </div>
          </div>
        </section>

        {/* HERO PRODUCT PANEL */}
        <section id="producto" className="scroll-mt-28 max-w-[1280px] mx-auto px-6 sm:px-8 mb-[120px]">
          <div className="bg-[#F3F2EF] rounded-3xl p-6 sm:p-8 flex flex-col relative overflow-hidden border border-[#E7E7E4] min-h-[580px] justify-between shadow-sm">
            
            {/* Top Bar Tabs & Header info */}
            <div className="flex flex-col gap-4 z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex bg-white/90 backdrop-blur-sm p-1.5 rounded-full border border-zinc-200/90 shadow-sm">
                  <button
                    onClick={() => setActiveTab('studio')}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeTab === 'studio' ? 'bg-black text-white shadow-sm' : 'text-zinc-600 hover:text-black'
                    }`}
                  >
                    Block Sales AI
                  </button>
                  <button
                    onClick={() => setActiveTab('agents')}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeTab === 'agents' ? 'bg-black text-white shadow-sm' : 'text-zinc-600 hover:text-black'
                    }`}
                  >
                    Block OPS AI
                  </button>
                  <button
                    onClick={() => setActiveTab('api')}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeTab === 'api' ? 'bg-black text-white shadow-sm' : 'text-zinc-600 hover:text-black'
                    }`}
                  >
                    Block Control AI
                  </button>
                </div>

                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-zinc-200/90 flex items-center gap-2 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 relative -ml-4"></span>
                  <span className="text-xs sm:text-sm font-semibold text-zinc-800">
                    {activeTab === 'studio' && 'Automatización Comercial'}
                    {activeTab === 'agents' && 'Automatización Administrativa'}
                    {activeTab === 'api' && 'Optimización de Procesos'}
                  </span>
                </div>
              </div>

              {/* Sub-header description */}
              <p className="text-xs sm:text-sm font-medium text-zinc-600 max-w-2xl bg-white/60 backdrop-blur-md p-3.5 rounded-2xl border border-zinc-200/60 shadow-2xs">
                Somos una empresa que hacemos <strong className="text-black font-semibold">soluciones a medida</strong> de la necesidad del cliente utilizando diferentes modelos de IA y servicios en la nube.
              </p>
            </div>

            {/* Vibrant Background Pastel Gradients */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 overflow-hidden">
              <div className="w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full bg-gradient-to-tr from-rose-300 via-pink-300 to-orange-200 blur-3xl absolute -ml-48 -mt-12 opacity-70"></div>
              <div className="w-[350px] sm:w-[480px] h-[350px] sm:h-[480px] rounded-full bg-gradient-to-tr from-indigo-200 via-purple-300 to-blue-300 blur-3xl absolute opacity-70"></div>
              <div className="w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full bg-gradient-to-tr from-emerald-200 to-teal-300 blur-3xl absolute ml-48 mt-24 opacity-60"></div>
              <div className="w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] rounded-full bg-gradient-to-tr from-sky-200 to-blue-300 blur-3xl absolute ml-80 -mt-20 opacity-60"></div>
            </div>

            {/* Interactive Product Showcase Center Module */}
            <div className="z-10 my-6 flex flex-col items-center justify-center w-full">
              <AnimatePresence mode="wait">
                {activeTab === 'studio' && (
                  <motion.div
                    key="sales"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-3xl bg-white/90 backdrop-blur-xl border border-white rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                  >
                    <div className="md:col-span-6 flex flex-col gap-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full w-fit">
                        Block Sales AI
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                        Automatización Comercial Inteligente
                      </h3>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong className="text-black">Bots inteligentes para WhatsApp:</strong> Respuestas inmediatas 24/7 en lenguaje natural.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong className="text-black">Sistema de calificación de clientes:</strong> Identificación en tiempo real de prospectos de alto valor.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong className="text-black">Seguimiento automático de leads:</strong> Nutrición periódica de prospectos sin intervención humana.</span>
                        </li>
                      </ul>
                      <button
                        onClick={() => setShowContact(true)}
                        className="mt-2 bg-black text-white px-5 py-2.5 rounded-full text-xs font-semibold w-fit hover:scale-105 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                      >
                        Implementar Comercial AI <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Interactive WhatsApp Sales Mockup */}
                    <div className="md:col-span-6 bg-emerald-950 text-white rounded-2xl p-4 border border-emerald-800/50 shadow-inner flex flex-col gap-3">
                      <div className="flex items-center justify-between border-b border-emerald-800/80 pb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs text-black">
                            WA
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">Bot Comercial WhatsApp</span>
                            <span className="text-[10px] text-emerald-400 font-mono">En línea • Calificación IA activa</span>
                          </div>
                        </div>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded">
                          Block Sales AI
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div className="bg-emerald-900/60 p-2.5 rounded-xl max-w-[85%] border border-emerald-700/40">
                          <p className="text-emerald-100">¡Hola! Quisiera saber el precio de su plan de automatización para mi negocio.</p>
                          <span className="text-[9px] text-emerald-400 block text-right mt-1">10:41 AM</span>
                        </div>
                        <div className="bg-zinc-900 p-2.5 rounded-xl max-w-[88%] ml-auto border border-emerald-500/30">
                          <p className="text-white">¡Hola! Con gusto. Para enviarte la propuesta ideal, ¿cuántos clientes potenciales atiendes al mes aproximadamente?</p>
                          <span className="text-[9px] text-emerald-400 block text-right mt-1">10:41 AM</span>
                        </div>
                        <div className="bg-emerald-900/60 p-2.5 rounded-xl max-w-[85%] border border-emerald-700/40">
                          <p className="text-emerald-100">Alrededor de 300 prospectos mensuales por WhatsApp.</p>
                          <span className="text-[9px] text-emerald-400 block text-right mt-1">10:42 AM</span>
                        </div>
                        <div className="bg-zinc-900 p-2.5 rounded-xl max-w-[88%] ml-auto border border-emerald-500/30">
                          <p className="text-emerald-300 font-semibold text-[11px]">✓ Lead Calificado (Scoring: 92/100)</p>
                          <p className="text-white mt-1">¡Excelente! He agendado una llamada con nuestro asesor y enviado la presentación a tu correo.</p>
                          <span className="text-[9px] text-emerald-400 block text-right mt-1">10:42 AM</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'agents' && (
                  <motion.div
                    key="ops"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-3xl bg-white/90 backdrop-blur-xl border border-white rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                  >
                    <div className="md:col-span-6 flex flex-col gap-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full w-fit">
                        Block OPS AI
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                        Automatización Administrativa
                      </h3>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                          <span><strong className="text-black">Contabilización automática de facturación:</strong> Procesamiento OCR e inteligencia en documentos contables.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                          <span><strong className="text-black">Emisión automática de documento soporte:</strong> Generación y validación directa sin errores humanos.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                          <span><strong className="text-black">Reportes automáticos y organización documental:</strong> Consolidación de información en la nube.</span>
                        </li>
                      </ul>
                      <button
                        onClick={() => setShowContact(true)}
                        className="mt-2 bg-black text-white px-5 py-2.5 rounded-full text-xs font-semibold w-fit hover:scale-105 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                      >
                        Optimizar Administración <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Interactive OPS Document Pipeline Mockup */}
                    <div className="md:col-span-6 bg-slate-900 text-white rounded-2xl p-4 border border-slate-700 shadow-inner flex flex-col gap-3">
                      <div className="flex items-center justify-between border-b border-slate-700 pb-2.5">
                        <span className="text-xs font-bold text-white flex items-center gap-2">
                          <FileText className="w-4 h-4 text-indigo-400" /> Pipeline Facturación & Documentos
                        </span>
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-mono px-2 py-0.5 rounded">
                          Block OPS AI
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
                          <div>
                            <span className="text-slate-300 font-semibold block text-[11px]">1. Factura Proveedor N° 4092</span>
                            <span className="text-[10px] text-slate-400">OCR Extracción completada (100% precisión)</span>
                          </div>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">Completado</span>
                        </div>

                        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
                          <div>
                            <span className="text-slate-300 font-semibold block text-[11px]">2. Generación Documento Soporte</span>
                            <span className="text-[10px] text-indigo-300">Validado e integrado con sistema de Dian/Nube</span>
                          </div>
                          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded">Emitido</span>
                        </div>

                        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
                          <div>
                            <span className="text-slate-300 font-semibold block text-[11px]">3. Reporte Diario Consolidado</span>
                            <span className="text-[10px] text-slate-400">Enviado automáticamente a Gerencia por email</span>
                          </div>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">Enviado</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'api' && (
                  <motion.div
                    key="control"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-3xl bg-white/90 backdrop-blur-xl border border-white rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                  >
                    <div className="md:col-span-6 flex flex-col gap-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 px-3 py-1 rounded-full w-fit">
                        Block Control AI
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                        Optimización de Procesos
                      </h3>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                          <span><strong className="text-black">Automatización de tareas repetitivas:</strong> Eliminación de cuellos de botella en la operación diaria.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                          <span><strong className="text-black">Conexión e integración multinube:</strong> Sincronización entre CRM, ERP y bases de datos.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                          <span><strong className="text-black">Control y monitoreo en tiempo real:</strong> Tableros ejecutivos con alertas automáticas.</span>
                        </li>
                      </ul>
                      <button
                        onClick={() => setShowContact(true)}
                        className="mt-2 bg-black text-white px-5 py-2.5 rounded-full text-xs font-semibold w-fit hover:scale-105 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                      >
                        Automatizar Flujos <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Interactive Workflow Control Monitor */}
                    <div className="md:col-span-6 bg-purple-950 text-white rounded-2xl p-4 border border-purple-800/60 shadow-inner flex flex-col gap-3">
                      <div className="flex items-center justify-between border-b border-purple-800/80 pb-2.5">
                        <span className="text-xs font-bold text-white flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-purple-400" /> Monitor de Flujos de Trabajo
                        </span>
                        <span className="text-[10px] bg-purple-500/20 text-purple-300 font-mono px-2 py-0.5 rounded">
                          Block Control AI
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-purple-900/50 p-3 rounded-xl border border-purple-700/50">
                          <span className="text-[10px] text-purple-300 uppercase block font-semibold">Tareas Ejecutadas</span>
                          <span className="text-xl font-bold text-white">28,420</span>
                          <span className="text-[9px] text-emerald-400 block mt-0.5">100% Automatizado</span>
                        </div>
                        <div className="bg-purple-900/50 p-3 rounded-xl border border-purple-700/50">
                          <span className="text-[10px] text-purple-300 uppercase block font-semibold">Horas Ahorradas</span>
                          <span className="text-xl font-bold text-white">184 hrs</span>
                          <span className="text-[9px] text-purple-200 block mt-0.5">Este mes</span>
                        </div>
                      </div>

                      <div className="bg-zinc-900 p-3 rounded-xl border border-purple-500/30 text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-purple-200">Integración de Sistemas</span>
                          <span className="text-[9px] text-emerald-400 font-mono">En tiempo real</span>
                        </div>
                        <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full w-[94%]"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* TRUST STRIP & LOGO MARQUEE */}
        <section className="max-w-[1280px] mx-auto px-6 sm:px-8 text-center mb-10">
          <p className="text-base sm:text-lg font-medium text-zinc-700 max-w-3xl mx-auto leading-relaxed">
            Ayudamos a emprendedores a automatizar ventas, atención y procesos usando inteligencia artificial, sin necesidad de contratar empleados.
          </p>
        </section>

        <section className="w-full overflow-hidden mb-[120px] py-4">
          <div className="animate-marquee flex items-center gap-16 sm:gap-24">
            {[...Array(2)].map((_, loopIdx) => (
              <React.Fragment key={loopIdx}>
                <div className="flex items-center gap-2 text-zinc-400 font-bold text-lg sm:text-xl uppercase tracking-tighter italic hover:text-black transition-colors cursor-pointer">
                  <Sparkles className="w-6 h-6" /> OPENAI
                </div>
                <div className="flex items-center gap-2 text-zinc-400 font-bold text-lg sm:text-xl uppercase tracking-tighter italic hover:text-black transition-colors cursor-pointer">
                  <Zap className="w-6 h-6" /> MAKE.COM
                </div>
                <div className="flex items-center gap-2 text-zinc-400 font-bold text-lg sm:text-xl uppercase tracking-tighter italic hover:text-black transition-colors cursor-pointer">
                  <Layers className="w-6 h-6" /> ZAPIER
                </div>
                <div className="flex items-center gap-2 text-zinc-400 font-bold text-lg sm:text-xl uppercase tracking-tighter italic hover:text-black transition-colors cursor-pointer">
                  <MessageSquare className="w-6 h-6" /> WHATSAPP CLOUD API
                </div>
                <div className="flex items-center gap-2 text-zinc-400 font-bold text-lg sm:text-xl uppercase tracking-tighter italic hover:text-black transition-colors cursor-pointer">
                  <Cpu className="w-6 h-6" /> ANTHROPIC
                </div>
                <div className="flex items-center gap-2 text-zinc-400 font-bold text-lg sm:text-xl uppercase tracking-tighter italic hover:text-black transition-colors cursor-pointer">
                  <Globe className="w-6 h-6" /> GOOGLE CLOUD
                </div>
                <div className="flex items-center gap-2 text-zinc-400 font-bold text-lg sm:text-xl uppercase tracking-tighter italic hover:text-black transition-colors cursor-pointer">
                  <Box className="w-6 h-6" /> N8N
                </div>
                <div className="flex items-center gap-2 text-zinc-400 font-bold text-lg sm:text-xl uppercase tracking-tighter italic hover:text-black transition-colors cursor-pointer">
                  <BarChart2 className="w-6 h-6" /> AWS AI
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* SOLUCIONES OVERVIEW & 5 INTERACTIVE PANELS CAROUSEL */}
        <section id="soluciones" className="scroll-mt-28 max-w-[1280px] mx-auto px-6 sm:px-8 mb-[140px]">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-black tracking-tight mb-4 leading-tight">
              Transformamos la manera en que los emprendedores trabajan, usando inteligencia artificial para que vendan más, operen mejor y puedan escalar sus negocios
            </h2>
            <p className="text-zinc-600 text-lg sm:text-xl font-medium">
              ¿Qué podemos construir para tu negocio?
            </p>
          </div>

          {/* Carousel Navigation Tabs & Progress Timer Bar */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-2 border-b border-zinc-200">
              {[
                { id: 0, label: '⚙️ Automatizamos' },
                { id: 1, label: '🧠 Implementamos IA' },
                { id: 2, label: '📊 Organizamos y analizamos' },
                { id: 3, label: '🌐 Digitalizamos' },
                { id: 4, label: '🚀 Hacemos crecer el negocio' },
              ].map((panel) => (
                <button
                  key={panel.id}
                  onClick={() => {
                    setActiveSolucionIdx(panel.id);
                    setSolucionesTimerPaused(true);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeSolucionIdx === panel.id
                      ? 'bg-black text-white shadow-md scale-105'
                      : 'bg-zinc-100 text-zinc-600 hover:text-black hover:bg-zinc-200'
                  }`}
                >
                  {panel.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5 Moving Panels Slider */}
          <div 
            className="relative overflow-hidden rounded-3xl bg-[#F3F2EF] border border-[#E7E7E4] p-6 sm:p-10 shadow-sm min-h-[460px] flex flex-col justify-between"
            onMouseEnter={() => setSolucionesTimerPaused(true)}
            onMouseLeave={() => setSolucionesTimerPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSolucionIdx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full"
              >
                {activeSolucionIdx === 0 && (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl sm:text-3xl">⚙️</span>
                        <div>
                          <h3 className="text-xl sm:text-3xl font-bold text-black">Automatizamos</h3>
                          <p className="text-xs sm:text-sm text-zinc-500">Optimizamos flujos de trabajo repetitivos y procesos clave</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full">
                        01 / 05
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                      {[
                        'Automatizamos procesos.',
                        'Automatizamos tareas repetitivas.',
                        'Automatizamos ventas.',
                        'Automatizamos seguimiento de clientes.',
                        'Automatizamos reportes.',
                        'Automatizamos respuestas.',
                        'Automatizamos documentos.',
                        'Automatizamos flujos de trabajo.',
                        'Automatizamos operaciones.',
                        'Conectamos herramientas.',
                        'Integramos plataformas.',
                        'Eliminamos tareas manuales.',
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-zinc-200/80 shadow-2xs flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                          <span className="text-xs sm:text-sm text-zinc-800 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSolucionIdx === 1 && (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl sm:text-3xl">🧠</span>
                        <div>
                          <h3 className="text-xl sm:text-3xl font-bold text-black">Implementamos IA</h3>
                          <p className="text-xs sm:text-sm text-zinc-500">Construimos el cerebro inteligente de tu organización</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded-full">
                        02 / 05
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                      {[
                        'Creamos asistentes de IA.',
                        'Diseñamos agentes inteligentes.',
                        'Creamos chatbots.',
                        'Automatizamos la atención al cliente.',
                        'Generamos contenido con IA.',
                        'Procesamos documentos con IA.',
                        'Analizamos información.',
                        'Extraemos datos automáticamente.',
                        'Creamos sistemas inteligentes.',
                        'Integramos IA en los procesos.',
                        'Convertimos información en decisiones.',
                        'Construimos el cerebro de tu negocio.',
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-zinc-200/80 shadow-2xs flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                          <span className="text-xs sm:text-sm text-zinc-800 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSolucionIdx === 2 && (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl sm:text-3xl">📊</span>
                        <div>
                          <h3 className="text-xl sm:text-3xl font-bold text-black">Organizamos y analizamos</h3>
                          <p className="text-xs sm:text-sm text-zinc-500">Centralización y control analítico en tiempo real</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full">
                        03 / 05
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                      {[
                        'Centralizamos información.',
                        'Organizamos datos.',
                        'Creamos dashboards.',
                        'Visualizamos métricas.',
                        'Generamos reportes.',
                        'Analizamos resultados.',
                        'Medimos indicadores.',
                        'Detectamos oportunidades.',
                        'Mejoramos decisiones.',
                        'Controlamos operaciones.',
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-zinc-200/80 shadow-2xs flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="text-xs sm:text-sm text-zinc-800 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSolucionIdx === 3 && (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl sm:text-3xl">🌐</span>
                        <div>
                          <h3 className="text-xl sm:text-3xl font-bold text-black">Digitalizamos</h3>
                          <p className="text-xs sm:text-sm text-zinc-500">Transformación digital integral y desarrollo a medida</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                        04 / 05
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                      {[
                        'Creamos páginas web.',
                        'Creamos tiendas online.',
                        'Diseñamos portales.',
                        'Creamos sistemas internos.',
                        'Digitalizamos procesos.',
                        'Centralizamos archivos.',
                        'Diseñamos experiencias digitales.',
                        'Integramos las herramientas de tu negocio.',
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-zinc-200/80 shadow-2xs flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-xs sm:text-sm text-zinc-800 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSolucionIdx === 4 && (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl sm:text-3xl">🚀</span>
                        <div>
                          <h3 className="text-xl sm:text-3xl font-bold text-black">Hacemos crecer el negocio</h3>
                          <p className="text-xs sm:text-sm text-zinc-500">Escalabilidad, eficiencia operativa y retorno de inversión</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono bg-rose-100 text-rose-800 font-bold px-3 py-1 rounded-full">
                        05 / 05
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                      {[
                        'Optimizamos ventas.',
                        'Gestionamos clientes.',
                        'Mejoramos la productividad.',
                        'Reducimos errores.',
                        'Ahorramos tiempo.',
                        'Mejoramos la experiencia del cliente.',
                        'Escalamos operaciones.',
                        'Potenciamos negocios.',
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-zinc-200/80 shadow-2xs flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                          <span className="text-xs sm:text-sm text-zinc-800 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Bottom Controls & Dots */}
            <div className="flex items-center justify-between pt-6 border-t border-zinc-200/80 mt-6">
              <button
                onClick={() => setShowContact(true)}
                className="bg-black text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:scale-105 transition-transform cursor-pointer flex items-center gap-2 shadow-sm"
              >
                Solicitar Diagnóstico <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveSolucionIdx(i);
                      setSolucionesTimerPaused(true);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeSolucionIdx === i ? 'w-8 bg-black' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CLIENTES Y CASOS DE ÉXITO SECTION */}
        <section id="clientes" className="scroll-mt-28 max-w-[1280px] mx-auto px-6 sm:px-8 mb-[140px]">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold bg-zinc-200 text-black px-3 py-1 rounded-full">
              Nuestros Clientes
            </span>
            <div className="h-px bg-zinc-300 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-6">
              <h2 className="text-3xl sm:text-5xl font-semibold text-black leading-tight">
                Empresas y emprendedores que transforman sus negocios
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="text-zinc-600 text-base sm:text-lg">
                Descubre cómo la inteligencia artificial y la automatización impulsan el crecimiento, ahorran tiempo y escalan las operaciones de nuestros clientes.
              </p>
            </div>
          </div>

          {/* Client Testimonials / Use Cases Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              {
                name: 'Carlos Mendoza',
                role: 'CEO & Fundador, TiendaNativa',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
                badge: '⚙️ Automatización & Ventas',
                quote: '“Implementamos agentes de atención en WhatsApp y respuesta con IA. Reducimos el tiempo de respuesta a 0 segundos y aumentamos las ventas en un 320% en 3 meses.”',
                metric: '+320% en ventas',
                metricLabel: 'Conversión acelerada'
              },
              {
                name: 'Sofía Arango',
                role: 'Directora Operativa, Grupo Inmobiliario Innova',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
                badge: '🧠 Agentes de IA & Procesos',
                quote: '“El agente de IA califica clientes en tiempo real y agendamientos automáticos sin intervención manual. Ahorramos más de 50 horas operativas cada mes.”',
                metric: '50 hrs/mes',
                metricLabel: 'Ahorro operativo'
              },
              {
                name: 'Mateo Benítez',
                role: 'Gerente General, LogísticaExpress',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
                badge: '📊 Dashboards y Datos',
                quote: '“Centralizamos todos los datos de pedidos, despachos e indicadores clave en dashboards inteligentes. Ahora tomamos decisiones preventivas en minutos.”',
                metric: '99.4%',
                metricLabel: 'Precisión de entregas'
              },
              {
                name: 'Valentina Ríos',
                role: 'CMO, EduTech Latam',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
                badge: '🚀 Escalabilidad & Digitalización',
                quote: '“Integramos chatbots de voz y asistentes personalizados para más de 15,000 estudiantes. Escalamos la atención de soporte sin contratar personal extra.”',
                metric: 'x4 Capacidad',
                metricLabel: 'Sin fricción'
              }
            ].map((client, idx) => (
              <div
                key={idx}
                className="bg-[#FCFCFB] rounded-3xl p-6 sm:p-8 border border-[#E7E7E4] flex flex-col justify-between hover:shadow-lg transition-all relative overflow-hidden group"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={client.image}
                      alt={client.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-black/5"
                    />
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-black group-hover:text-amber-600 transition-colors">
                        {client.name}
                      </h4>
                      <p className="text-xs text-zinc-500 font-medium">{client.role}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full border border-zinc-200/80 whitespace-nowrap">
                    {client.badge}
                  </span>
                </div>

                <p className="text-sm text-zinc-700 italic leading-relaxed mb-6 font-normal">
                  {client.quote}
                </p>

                <div className="pt-4 border-t border-zinc-200/70 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-zinc-400 uppercase font-semibold tracking-wider block">
                      {client.metricLabel}
                    </span>
                    <span className="text-lg font-extrabold text-black">
                      {client.metric}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowContact(true)}
                    className="text-xs font-semibold text-black hover:text-amber-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    Ver caso completo <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Banner Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#F3F2EF] rounded-2xl p-6 border border-[#E7E7E4]">
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-black block">+120</span>
              <span className="text-xs text-zinc-600 font-medium">Procesos automatizados</span>
            </div>
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-black block">98.5%</span>
              <span className="text-xs text-zinc-600 font-medium">Satisfacción de clientes</span>
            </div>
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-black block">+15k</span>
              <span className="text-xs text-zinc-600 font-medium">Horas ahorradas</span>
            </div>
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-black block">24/7</span>
              <span className="text-xs text-zinc-600 font-medium">Operación continua</span>
            </div>
          </div>
        </section>



        {/* PRICING SECTION */}
        <section id="precios" className="scroll-mt-28 max-w-[1280px] mx-auto px-6 sm:px-8 mb-[140px]">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-black tracking-tight mb-6 leading-tight">
              Cada empresa tiene procesos diferentes. Por eso, en Block Tech no trabajamos con soluciones genéricas ni precios estándar
            </h2>
            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              Diseñamos cada sistema inteligente de acuerdo con las necesidades, procesos y herramientas de tu negocio. La inversión se determina a partir de dos componentes:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FCFCFB] rounded-3xl p-8 border border-[#E7E7E4] flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Starter</span>
                <h3 className="text-3xl font-bold text-black mt-2 mb-1">Gratis</h3>
                <p className="text-xs text-zinc-500 mb-6">Para probar la plataforma y prototipos rápidos.</p>
                <ul className="space-y-3 text-sm text-zinc-600 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black" /> 10,000 caracteres de prueba</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black" /> Acceso a Block Tech Studio</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black" /> Latencia estándar</li>
                </ul>
              </div>
              <button onClick={() => setShowContact(true)} className="w-full bg-zinc-100 hover:bg-zinc-200 text-black py-3 rounded-full font-medium text-sm transition-colors cursor-pointer">
                Comenzar gratis
              </button>
            </div>

            <div className="bg-black text-white rounded-3xl p-8 border border-black flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-emerald-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                Popular
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Pro Agencias</span>
                <h3 className="text-3xl font-bold text-white mt-2 mb-1">$99 <span className="text-xs font-normal text-zinc-400">/ mes</span></h3>
                <p className="text-xs text-zinc-400 mb-6">Para agencias y equipos con proyectos activos.</p>
                <ul className="space-y-3 text-sm text-zinc-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 1,000,000 caracteres / mes</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Agentes conversacionales en vivo</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Clonación de voz de ultra fidelidad</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Soporte prioritario</li>
                </ul>
              </div>
              <button onClick={() => setShowContact(true)} className="w-full bg-white hover:bg-zinc-100 text-black py-3 rounded-full font-medium text-sm transition-colors cursor-pointer">
                Contactar Ventas
              </button>
            </div>

            <div className="bg-[#FCFCFB] rounded-3xl p-8 border border-[#E7E7E4] flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Enterprise</span>
                <h3 className="text-3xl font-bold text-black mt-2 mb-1">Personalizado</h3>
                <p className="text-xs text-zinc-500 mb-6">Para empresas con alto volumen y SLA dedicado.</p>
                <ul className="space-y-3 text-sm text-zinc-600 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black" /> Volumen ilimitado</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black" /> Despliegue dedicado</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black" /> Modelos de voz a medida</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black" /> Acuerdo de nivel de servicio (SLA)</li>
                </ul>
              </div>
              <button onClick={() => setShowContactSales(true)} className="w-full bg-zinc-100 hover:bg-zinc-200 text-black py-3 rounded-full font-medium text-sm transition-colors cursor-pointer">
                Hablar con un asesor
              </button>
            </div>
          </div>
        </section>

        {/* SIGN OFF CTA SECTION */}
        <section className="max-w-[1280px] mx-auto px-6 sm:px-8 mb-[120px] text-center flex flex-col items-center">
          <h2 className="text-4xl sm:text-6xl font-semibold text-black mb-8 max-w-3xl leading-tight">
            El futuro de la voz comienza aquí
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => setShowContact(true)}
              className="bg-black text-white px-8 py-3.5 rounded-full font-medium transition-all hover:scale-105 shadow-md text-sm cursor-pointer"
            >
              Contacto
            </button>
            <button
              onClick={() => setShowContactSales(true)}
              className="bg-transparent border border-zinc-300 text-black px-8 py-3.5 rounded-full font-medium transition-all hover:bg-zinc-100 text-sm cursor-pointer"
            >
              Hablar con ventas
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-zinc-200 bg-[#F7F7F5] py-10 mt-auto">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <span className="text-lg font-bold tracking-tight text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-black rounded-full inline-block"></span>
              Block Tech Agencia
            </span>
            <span className="text-xs sm:text-sm text-zinc-500">
              © {new Date().getFullYear()} Block Tech Agencia. Diseñado para precisión.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs sm:text-sm text-zinc-600 font-medium">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              Twitter
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              GitHub
            </a>
            <a
              id="footer-terminos-btn"
              href="/terminos"
              onClick={(e) => {
                e.preventDefault();
                handleNavigateLegal('terminos');
              }}
              className="hover:text-black transition-colors cursor-pointer text-xs sm:text-sm text-zinc-600 font-medium"
            >
              Términos
            </a>
            <a
              id="footer-privacidad-btn"
              href="/privacidad"
              onClick={(e) => {
                e.preventDefault();
                handleNavigateLegal('privacidad');
              }}
              className="hover:text-black transition-colors cursor-pointer text-xs sm:text-sm text-zinc-600 font-medium"
            >
              Privacidad
            </a>
            <a
              id="footer-cookies-btn"
              href="/cookies"
              onClick={(e) => {
                e.preventDefault();
                handleNavigateLegal('cookies');
              }}
              className="hover:text-black transition-colors cursor-pointer text-xs sm:text-sm text-zinc-600 font-medium"
            >
              Cookies
            </a>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <AnimatePresence>
        {/* Contact Modal */}
        {showContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full border border-zinc-200 shadow-2xl relative"
            >
              <button
                onClick={() => setShowContact(false)}
                className="absolute top-5 right-5 text-zinc-400 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-semibold text-black mb-2">Contacto - Block Tech Agencia</h3>
              <p className="text-sm text-zinc-500 mb-6">
                Déjanos tu mensaje o escríbenos directamente a{' '}
                <a href="mailto:soporte@blocktech.agency" className="text-black font-semibold hover:underline">
                  soporte@blocktech.agency
                </a>
              </p>

              <form onSubmit={(e) => { e.preventDefault(); alert('¡Gracias por contactar a Block Tech Agencia! Te responderemos muy pronto.'); setShowContact(false); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Nombre Completo</label>
                  <input type="text" required placeholder="Tu nombre" className="w-full border border-zinc-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Correo Electrónico</label>
                  <input type="email" required placeholder="nombre@empresa.com" className="w-full border border-zinc-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Mensaje</label>
                  <textarea rows={3} placeholder="¿Cómo podemos ayudarte?" className="w-full border border-zinc-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-black text-white py-3 rounded-xl font-medium text-sm hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer">
                  Enviar Mensaje
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Contact Sales Modal */}
        {showContactSales && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full border border-zinc-200 shadow-2xl relative"
            >
              <button
                onClick={() => setShowContactSales(false)}
                className="absolute top-5 right-5 text-zinc-400 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-semibold text-black mb-2">Hablar con Ventas</h3>
              <p className="text-sm text-zinc-500 mb-6">
                Modelos a medida o contacto directo con nuestro equipo en{' '}
                <a href="mailto:soporte@blocktech.agency" className="text-black font-semibold hover:underline">
                  soporte@blocktech.agency
                </a>
              </p>

              <form onSubmit={(e) => { e.preventDefault(); alert('Consulta recibida. Un asesor de Block Tech Agencia se pondrá en contacto pronto.'); setShowContactSales(false); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Nombre Completo</label>
                  <input type="text" required placeholder="Nombre" className="w-full border border-zinc-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Email Corporativo</label>
                  <input type="email" required placeholder="nombre@empresa.com" className="w-full border border-zinc-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Detalles del Proyecto</label>
                  <textarea rows={3} placeholder="Describe el volumen estimado o necesidades de tu empresa..." className="w-full border border-zinc-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-black text-white py-3 rounded-xl font-medium text-sm hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer">
                  Enviar Consulta
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Category Detail Modal */}
        {activeCategoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full border border-zinc-200 shadow-2xl relative"
            >
              <button
                onClick={() => setActiveCategoryModal(null)}
                className="absolute top-5 right-5 text-zinc-400 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <span className="p-3 bg-zinc-100 rounded-2xl text-black font-bold">
                  {activeCategoryModal === 'Música' && <Music className="w-6 h-6" />}
                  {activeCategoryModal === 'SFX' && <Radio className="w-6 h-6" />}
                  {activeCategoryModal === 'Voces' && <Mic className="w-6 h-6" />}
                  {activeCategoryModal === 'Imagen y Video' && <Video className="w-6 h-6" />}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-black">Módulo de {activeCategoryModal}</h3>
                  <span className="text-xs text-zinc-500">Block Tech Agencia Studio</span>
                </div>
              </div>

              <p className="text-sm text-zinc-600 mb-6">
                Explora las capacidades multimodales de {activeCategoryModal}. Genera resultados de alta fidelidad en menos de 100ms.
              </p>

              <div className="bg-[#F3F2EF] p-4 rounded-2xl border border-zinc-200 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleSynthesize(`Muestra de audio de prueba de ${activeCategoryModal}.`)}
                    className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>
                  <span className="text-xs font-semibold text-black">Muestra de prueba: {activeCategoryModal} v4</span>
                </div>
                <span className="text-xs font-mono text-zinc-500">48kHz / 24-bit</span>
              </div>

              <button
                onClick={() => setActiveCategoryModal(null)}
                className="w-full bg-black text-white py-3 rounded-xl font-medium text-sm hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Cerrar vista previa
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Legal Center Modal: Términos & Condiciones y Política de Privacidad (Ley 1581 de 2012) */}
      <LegalModal
        isOpen={legalModalState.isOpen}
        initialTab={legalModalState.tab}
        onClose={() => setLegalModalState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
