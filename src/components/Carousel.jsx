import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRefs = useRef([]);
  const prevIndex = useRef(0);
  const direction = useRef(1);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const minSwipeDistance = 50;

  const nextSlide = () => {
    direction.current = 1;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    direction.current = -1;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (idx) => {
    if (idx === currentIndex) return;
    direction.current = idx > currentIndex ? 1 : -1;
    setCurrentIndex(idx);
  };

  const onTouchStart = (e) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (!images || images.length === 0) return;

    if (images.length === 1 || currentIndex === prevIndex.current) {
      gsap.set(imageRefs.current, {
        opacity: 0,
        scale: 0.5,
        xPercent: 0,
        zIndex: 0,
      });
      gsap.set(imageRefs.current[currentIndex], {
        opacity: 1,
        scale: 1,
        xPercent: 0,
        zIndex: 10,
      });
      prevIndex.current = currentIndex;
      return;
    }

    const oldImg = imageRefs.current[prevIndex.current];
    const newImg = imageRefs.current[currentIndex];
    const dir = direction.current;

    gsap.set(newImg, { zIndex: 10 });
    gsap.set(oldImg, { zIndex: 5 });

    gsap.to(oldImg, {
      scale: 0.9,
      opacity: 0,
      xPercent: dir * -50,
      duration: 0.3,
      ease: "power3.in",
    });

    gsap.fromTo(
      newImg,
      { scale: 1.4, opacity: 0, xPercent: dir * 50 },
      {
        scale: 1,
        opacity: 1,
        xPercent: 0,
        duration: 0.6,
        ease: "power3.out",
      },
    );

    prevIndex.current = currentIndex;
  }, [currentIndex, images]);

  if (!images || images.length === 0)
    return (
      <div className="h-48 bg-gray-200 dark:bg-slate-700 rounded flex items-center justify-center">
        Nessuna foto
      </div>
    );

  return (
    <div
      className="relative w-full h-48 md:h-64 bg-gray-100 dark:bg-slate-900 rounded-lg overflow-hidden group touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {images.map((img, index) => (
        <img
          key={index}
          ref={(el) => (imageRefs.current[index] = el)}
          src={`${import.meta.env.BASE_URL}${img.replace(/^\//, "")}`}
          alt={`Cantiere foto ${index + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-0 pointer-events-none"
        />
      ))}

      {images.length > 1 && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white w-8 h-8 rounded-full opacity-0 md:group-hover:opacity-100 transition pointer-events-auto flex items-center justify-center border border-white/20 shadow-sm"
          >
            &#8592;
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white w-8 h-8 rounded-full opacity-0 md:group-hover:opacity-100 transition pointer-events-auto flex items-center justify-center border border-white/20 shadow-sm"
          >
            &#8594;
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-auto bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-white scale-125 shadow-sm"
                    : "bg-white/50 hover:bg-white/90"
                }`}
                aria-label={`Vai alla foto ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
