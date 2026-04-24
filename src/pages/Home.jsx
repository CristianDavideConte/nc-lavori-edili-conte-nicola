import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  EfficientamentoIcon,
  RistrutturazioniIcon,
  CostruzioniIcon,
} from "../components/Icons";
import BentoCard from "../components/BentoCard";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pageRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroImageRef = useRef(null);
  const servicesRef = useRef(null);

  useLayoutEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      gsap.set([heroContentRef.current.children, heroImageRef.current], {
        opacity: 0,
        y: 30,
      });
      gsap.set(heroImageRef.current, { scale: 0.95 });

      tl.to(pageRef.current, { autoAlpha: 1, duration: 0.5 })
        .to(
          heroContentRef.current.children,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .to(
          heroImageRef.current,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.2)",
          },
          "-=0.6",
        );

      const cards = gsap.utils.toArray(".service-card");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 60%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="bg-white dark:bg-slate-950"
      style={{ visibility: "hidden" }}
    >
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-24 md:py-0 px-6">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div ref={heroContentRef} className="w-full md:flex-1 text-left z-20">
            <h1 className="text-sm tracking-[0.2em] font-bold text-blue-600 mb-6 uppercase">
              N.C. Lavori Edili — Lugo
            </h1>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] mb-8 tracking-tighter">
              Edilizia di sostanza, <br />
              risultati che durano.
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-lg mb-10 leading-relaxed font-medium">
              Dalle ristrutturazioni d'interni alle grandi opere civili.
              Esperienza costruttiva e profonda conoscenza del territorio.
            </p>

            <div className="flex flex-wrap gap-4 font-bold">
              <Link
                to="/cantieri"
                className="px-8 py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Guarda i lavori
              </Link>
              <Link
                to="/contatti"
                className="px-8 py-4 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all duration-300"
              >
                Chiedi un sopralluogo
              </Link>
            </div>
          </div>

          <div ref={heroImageRef} className="w-full md:flex-1 relative">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-slate-50 dark:border-slate-900">
              <img
                src="cantieri/wip.jpg"
                alt="Cantiere"
                className="w-full h-[320px] md:h-[520px] object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-2 md:-bottom-10 md:-left-10 bg-blue-600 text-white p-7 md:p-10 rounded-[2.5rem] shadow-2xl z-20">
              <p className="text-4xl md:text-5xl font-black mb-1">25+</p>
              <p className="text-[10px] uppercase tracking-widest font-black opacity-90 leading-tight">
                Anni di <br />
                esperienza
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={servicesRef}
        className="py-24 md:py-32 px-6 bg-slate-50 dark:bg-slate-900/40"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center md:text-left">
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-slate-900 dark:text-white">
              I nostri servizi.
            </h3>
            <div className="w-20 h-2 bg-blue-600 rounded-full mx-auto md:mx-0"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BentoCard className="service-card">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-8">
                <RistrutturazioniIcon />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                Ristrutturazioni
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                Interventi completi per interni ed esterni: dal consolidamento
                strutturale alle finiture di pregio.
              </p>
            </BentoCard>

            <BentoCard className="service-card">
              <div className="w-14 h-14 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 mb-8">
                <EfficientamentoIcon />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                Efficientamento
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                Cappotti termici e isolamento per migliorare il comfort
                abitativo e ridurre i costi energetici.
              </p>
            </BentoCard>

            <BentoCard className="service-card">
              <div className="w-14 h-14 bg-amber-50 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 mb-8">
                <CostruzioniIcon />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                Nuove Costruzioni
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                Realizzazione di edifici residenziali e industriali con i più
                alti standard di sicurezza.
              </p>
            </BentoCard>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 dark:bg-blue-700 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tighter">
            Hai un progetto in mente?
          </h3>
          <p className="text-blue-100 text-lg mb-10 opacity-80 font-medium">
            Sopralluoghi gratuiti e consulenza tecnica senza impegno.
          </p>
          <Link
            to="/contatti"
            className="inline-block px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:scale-110 active:scale-95 transition-all shadow-2xl"
          >
            Parla con noi
          </Link>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
}
