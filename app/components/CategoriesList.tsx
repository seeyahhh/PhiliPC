import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
];

const CategoriesList: React.FC = () => {
    const [scrollIndex, setScrollIndex] = useState(0);

    const visibleCount = 5; // Number of images visible at once
    const maxIndex = images.length - visibleCount;

    const nextSlide = (): void => {
        setScrollIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    const prevSlide = (): void => {
        setScrollIndex((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className="relative mx-auto max-w-7xl p-4">
            {/* Slider viewport */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${scrollIndex * (100 / visibleCount)}%)` }}
                >
                    {images.map((src, idx) => (
                        <div
                            key={idx}
                            className={`w-1/5 shrink-0 p-1`}
                        >
                            <Image
                                src={src}
                                alt={`Slide ${idx + 1}`}
                                width={200}
                                height={200}
                                className="h-48 w-full rounded-lg object-cover shadow-md"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Prev button */}
            {scrollIndex > 0 && (
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 -left-13 z-20 -translate-y-1/2 rounded-full bg-white/70 p-2 text-black hover:bg-white dark:bg-gray-400/70"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
            )}

            {/* Next Button */}
            {scrollIndex < maxIndex && (
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 -right-13 z-20 -translate-y-1/2 rounded-full bg-white/70 p-2 text-black hover:bg-white dark:bg-gray-400/70"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            )}
        </div>
    );
};

export default CategoriesList;
