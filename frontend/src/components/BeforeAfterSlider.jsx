import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

const BeforeAfterSlider = ({ beforeImage, afterImage, title, description }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMove = useCallback((clientX) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percentage = (x / rect.width) * 100;
            setSliderPosition(percentage);
        }
    }, []);

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
    };

    useEffect(() => {
        const handleMouseUp = () => setIsDragging(false);
        const handleMouseMove = (e) => {
            if (isDragging) handleMove(e.clientX);
        };
        const handleTouchMove = (e) => {
            if (isDragging) handleMove(e.touches[0].clientX);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging, handleMove]);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-[#D1B68A] text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Transformation</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-[#182527] mb-4">{title || "Witness the Change"}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{description || "Slide to see how we transform spaces from ordinary to extraordinary."}</p>
                </div>

                <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl select-none" ref={containerRef}>
                    {/* After Image (Full width background) */}
                    <div className="absolute inset-0">
                        <img src={afterImage} alt="After" className="w-full h-full object-cover" />
                        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest backdrop-blur-md">
                            After
                        </div>
                    </div>

                    {/* Before Image (Clipped) */}
                    <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ width: `${sliderPosition}%` }}
                    >
                        <img src={beforeImage} alt="Before" className="h-full max-w-none object-cover aspect-[16/9]" style={{ width: containerRef.current?.offsetWidth || '100%' }} />
                        <div className="absolute top-4 left-4 bg-white/90 text-[#182527] px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest backdrop-blur-md shadow-sm">
                            Before
                        </div>
                    </div>

                    {/* Slider Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                        style={{ left: `${sliderPosition}%` }}
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#182527] transition-transform hover:scale-110 active:scale-95">
                            <ChevronsLeftRight className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BeforeAfterSlider;
