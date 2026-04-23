import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import BentoCard from "../components/BentoCard";

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MessageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
  </svg>
);
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function Contatti() {
  const pageRef = useRef(null);
  const heroContentRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(pageRef.current, { autoAlpha: 1, duration: 0.4 })

        .fromTo(
          heroContentRef.current.children,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
            stagger: 0.09,
            ease: "power3.out",
          },
          "-=0.2",
        )

        .fromTo(
          gridRef.current.children,
          { y: 40, scale: 0.95, autoAlpha: 0 },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.3,
            stagger: 0.07,
            ease: "back.out(1.2)",
          },
          "-=0.5",
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="bg-white dark:bg-slate-950 overflow-x-hidden min-h-screen"
      style={{ visibility: "hidden" }}
    >
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-24 lg:py-0 px-6 overflow-visible">
        <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div ref={heroContentRef} className="w-full lg:flex-1 text-left z-20">
            <h1 className="text-sm uppercase tracking-[0.3em] font-bold text-blue-600 mb-6">
              N.C Lavori Edili — Lugo
            </h1>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] mb-8 tracking-tighter">
              Mettiamoci <br /> in contatto.
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-lg mb-10 leading-relaxed font-medium">
              Esperti in ristrutturazioni e nuove costruzioni in tutta la
              Romagna. Contattaci per un preventivo gratuito.
            </p>
          </div>

          <div className="w-full lg:flex-[1.2] relative mt-10 lg:mt-0">
            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:min-h-[520px] content-center"
            >
              <BentoCard
                href="tel:+393336477943"
                className="border-blue-100 dark:border-blue-900/20"
                bg="bg-white dark:bg-slate-900"
              >
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                  <PhoneIcon />
                </div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                  Telefono
                </p>
                <h3 className="text-xl font-black text-blue-600 tracking-tight leading-none">
                  Chiamaci ora
                </h3>
              </BentoCard>

              <BentoCard
                href="https://wa.me/393336477943"
                className="border-green-100 dark:border-green-900/20"
                bg="bg-white dark:bg-slate-900"
              >
                <div className="w-12 h-12 bg-green-50 dark:bg-[#25D366]/10 rounded-2xl flex items-center justify-center text-[#25D366] mb-4">
                  <MessageIcon />
                </div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                  WhatsApp
                </p>
                <h3 className="text-xl font-black text-[#25D366] tracking-tight leading-none">
                  Chat Rapida
                </h3>
              </BentoCard>

              <BentoCard
                href="mailto:nicolaconte999@gmail.com"
                className="sm:col-span-2 border-red-100 dark:border-red-900/20"
                bg="bg-white dark:bg-slate-900"
              >
                <div className="w-12 h-12 bg-red-50 dark:bg-red-600/10 rounded-2xl flex items-center justify-center text-red-500 mb-4">
                  <MailIcon />
                </div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                  Email
                </p>
                <h3 className="text-lg font-black text-red-500 break-all leading-tight">
                  Mandaci un'email
                </h3>
              </BentoCard>

              <BentoCard
                className="sm:col-span-2"
                bg="bg-slate-50 dark:bg-slate-900/50"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">
                      Orari
                    </h4>
                    <p className="text-slate-900 dark:text-white font-black text-2xl tracking-tighter leading-none">
                      Lun — Ven
                    </p>
                    <p className="text-slate-500 font-bold text-lg italic mt-1 leading-none">
                      08:00 - 18:30
                    </p>
                  </div>
                  <div className="sm:text-right border-t sm:border-t-0 border-slate-200 dark:border-slate-800 pt-4 sm:pt-0 w-full sm:w-auto">
                    <p className="text-slate-900 dark:text-white font-black text-2xl tracking-tighter leading-none">
                      Sabato
                    </p>
                    <p className="text-blue-600 text-xs font-bold uppercase mt-1">
                      Su Appuntamento
                    </p>
                  </div>
                </div>
              </BentoCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
