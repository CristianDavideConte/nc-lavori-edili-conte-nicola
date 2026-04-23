export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 mt-auto text-center opacity-30 text-[10px] uppercase font-bold tracking-[0.4em] text-slate-500 dark:text-slate-400">
      <div className="max-w-6xl mx-auto px-6">
        <p>© {currentYear} N.C Lavori Edili di Nicola Conte — P.IVA TODO</p>
        <p className="mt-2 opacity-50 tracking-[0.2em] font-medium">
          Tutti i diritti riservati
        </p>
      </div>
    </footer>
  );
}
