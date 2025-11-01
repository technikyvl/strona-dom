"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useId } from "react";
import { useI18n } from "@/components/ui/lang";

interface SlideData {
  title: string;
  button: string;
  src: string;
  onClick?: () => void;
}

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const { t } = useI18n();

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      handleNextClick();
    }
    if (isRightSwipe) {
      handlePreviousClick();
    }
  };

  const id = useId();

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-x-hidden" style={{ position: 'relative', zIndex: 10 }}>
      {/* Main carousel container */}
      <div 
        className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ position: 'relative', zIndex: 11 }}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out will-change-transform"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 relative"
              style={{ 
                height: 'min(400px, 60vh)',
                minHeight: '350px',
                minWidth: '100%' 
              }}
            >
              <div className="relative w-full h-full">
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  style={{ pointerEvents: 'none' }}
                />
                <div className="absolute inset-0 bg-black/40 sm:bg-black/40" style={{ pointerEvents: 'none' }} />
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 sm:p-6 md:p-8 text-center" style={{ pointerEvents: 'none', zIndex: 10 }}>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mb-3 sm:mb-4 px-2 sm:px-4 max-w-[90%]" style={{ pointerEvents: 'none' }}>
                    {slide.title}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (slide.onClick) {
                        slide.onClick();
                      } else {
                        handleSlideClick(index);
                      }
                    }}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer touch-manipulation text-xs sm:text-sm md:text-base shadow-lg min-h-[40px] sm:min-h-[44px]"
                    style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
                  >
                    {slide.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex justify-center items-center mt-3 sm:mt-4 md:mt-6 space-x-2 sm:space-x-3 md:space-x-4 px-2 sm:px-4" style={{ position: 'relative', zIndex: 12 }}>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handlePreviousClick();
          }}
          className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 hover:bg-white active:bg-gray-100 rounded-full transition-colors touch-manipulation shadow-md border border-gray-200"
          title={t("carouselPreviousSlide")}
          aria-label={t("carouselPreviousSlide")}
          style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
        >
          <IconArrowNarrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700 rotate-180" />
        </button>

        {/* Dots indicator */}
        <div className="flex space-x-1.5 sm:space-x-2 flex-wrap justify-center gap-y-1 mx-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrent(index);
              }}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors touch-manipulation min-w-[10px] min-h-[10px] ${
                current === index ? 'bg-gray-800' : 'bg-gray-300'
              }`}
              aria-label={`${t("carouselPreviousSlide")} ${index + 1}`}
              style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleNextClick();
          }}
          className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 hover:bg-white active:bg-gray-100 rounded-full transition-colors touch-manipulation shadow-md border border-gray-200"
          title={t("carouselNextSlide")}
          aria-label={t("carouselNextSlide")}
          style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
        >
          <IconArrowNarrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
