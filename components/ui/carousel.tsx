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
    <div className="relative w-full max-w-6xl mx-auto overflow-x-hidden">
      {/* Main carousel container */}
      <div 
        className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
              style={{ height: 'min(600px, 70vh)', minWidth: '100%' }}
            >
              <div className="relative w-full h-full">
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 sm:p-8 text-center">
                  <h3 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
                    {slide.title}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      if (slide.onClick) {
                        slide.onClick();
                      } else {
                        handleSlideClick(index);
                      }
                    }}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer touch-manipulation text-sm sm:text-base"
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
      <div className="flex justify-center items-center mt-4 sm:mt-6 space-x-3 sm:space-x-4 px-4">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handlePreviousClick()
          }}
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-full transition-colors touch-manipulation"
          title={t("carouselPreviousSlide")}
          aria-label={t("carouselPreviousSlide")}
        >
          <IconArrowNarrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 rotate-180" />
        </button>

        {/* Dots indicator */}
        <div className="flex space-x-1.5 sm:space-x-2 flex-wrap justify-center gap-y-1">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setCurrent(index)
              }}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors touch-manipulation ${
                current === index ? 'bg-gray-800' : 'bg-gray-300'
              }`}
              aria-label={`${t("carouselPreviousSlide")} ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleNextClick()
          }}
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-full transition-colors touch-manipulation"
          title={t("carouselNextSlide")}
          aria-label={t("carouselNextSlide")}
        >
          <IconArrowNarrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
