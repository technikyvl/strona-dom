"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useId, useEffect } from "react";

interface SlideData {
  title: string;
  button: string;
  src: string;
}

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePreviousClick();
      } else if (event.key === 'ArrowRight') {
        handleNextClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current]);

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
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
    } else if (isRightSwipe) {
      handlePreviousClick();
    }
  };

  const id = useId();

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main carousel container */}
      <div 
        className="relative overflow-hidden rounded-2xl bg-gray-100"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 relative"
              style={{ height: '600px' }}
            >
              <div className="relative w-full h-full">
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                  <h3 className="text-3xl md:text-5xl font-bold mb-6">
                    {slide.title}
                  </h3>
                  <button
                    onClick={() => handleSlideClick(index)}
                    className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors text-lg"
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
          title="Poprzedni slajd"
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
          title="Następny slajd"
        >
          <IconArrowNarrowRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
