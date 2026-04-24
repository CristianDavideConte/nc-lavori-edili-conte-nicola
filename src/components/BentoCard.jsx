import { Link } from "react-router-dom";

export default function BentoCard({
  children,
  className = "",
  href,
  to,
  bg = "bg-white dark:bg-slate-800",
  noPadding = false,
}) {
  const paddingClass = noPadding ? "p-0" : "p-8 md:p-10";

  const isInternal = !!to;
  const isExternal = !!href;
  const Tag = isInternal ? Link : isExternal ? "a" : "div";

  return (
    <Tag
      to={to}
      href={href}
      target={isExternal && href.startsWith("http") ? "_blank" : undefined}
      rel={
        isExternal && href.startsWith("http")
          ? "noopener noreferrer"
          : undefined
      }
      className={`
        rounded-[2.5rem] border border-slate-200/50 dark:border-white/5
        shadow-sm overflow-hidden flex flex-col h-full w-full transition-all duration-300
        ${bg} ${className}
        ${isInternal || isExternal ? "hover:scale-[1.02] active:scale-[0.98] cursor-pointer" : ""}
      `}
    >
      <div className={`${paddingClass} flex flex-col h-full w-full`}>
        {children}
      </div>
    </Tag>
  );
}
