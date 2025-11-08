import { useState, useEffect, useCallback } from 'react'
import { useHomeContent } from '../utils/contentService'

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const homeContent = useHomeContent()

  // Filter to only show active slides
  const slides = homeContent.heroSlider.filter(slide => slide.isActive)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  // Don't render if no active slides
  if (slides.length === 0) {
    return null
  }

  return (
    <section className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden bg-gray-900">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-contain"
            />

            {/* Caption */}
            <div className="absolute left-4 right-4 sm:left-8 sm:right-8 md:left-auto md:right-8 bottom-4 sm:bottom-8 md:top-1/2 md:transform md:-translate-y-1/2 text-white max-w-full md:max-w-md">
              <div className="bg-black bg-opacity-70 p-3 sm:p-4 md:p-6 rounded-lg">
                <h2 className="font-adamina text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">
                  {slide.title}
                </h2>
                <div className="text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {slide.subtitle}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 slider-nav z-10"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 slider-nav z-10"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((slide, index) => (
          <button
            key={`dot-${slide.id}`}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSlider
