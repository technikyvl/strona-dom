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

  const id = useId();

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-x-hidden">
      {/* Main carousel container */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-100">
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
              style={{ height: '600px', minWidth: '100%' }}
            >
              <div className="relative w-full h-full">
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                  <h3 className="text-2xl md:text-4xl font-bold mb-4">
                    {slide.title}
                  </h3>
                  <button
                    onClick={() => {
                      if (slide.onClick) {
                        slide.onClick();
                      } else {
                        handleSlideClick(index);
                      }
                    }}
                    className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
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
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={handlePreviousClick}
          className="w-12 h-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
          title={t("carouselPreviousSlide")}
        >
          <IconArrowNarrowRight className="w-6 h-6 text-gray-600 rotate-180" />
        </button>

        {/* Dots indicator */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                current === index ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNextClick}
          className="w-12 h-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
          title={t("carouselNextSlide")}
        >
          <IconArrowNarrowRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
