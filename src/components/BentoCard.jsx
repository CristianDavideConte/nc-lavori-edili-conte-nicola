import React from "react";

export default function BentoCard({
  children,
  className = "",
  href,
  bg = "bg-white dark:bg-slate-800",
  noPadding = false,
}) {
  const Tag = href ? "a" : "div";
  const paddingClass = noPadding ? "p-0" : "p-8 md:p-10";

  return (
    <Tag
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`
        rounded-[2.5rem] border border-slate-200/50 dark:border-white/5
        shadow-sm overflow-hidden flex flex-col h-full w-full transition-all duration-300
        ${bg} ${className} ${href ? "hover:scale-[1.02] active:scale-[0.98] cursor-pointer" : ""}
      `}
    >
      <div className={`${paddingClass} flex flex-col h-full w-full`}>
        {children}
      </div>
    </Tag>
  );
}
