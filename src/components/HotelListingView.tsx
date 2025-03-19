
import React from 'react';
import { hotelCategories } from '../data/hotelListings';
import HotelCategoryCard from './HotelCategoryCard';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';

const HotelListingView: React.FC = () => {
  return (
    <div className="w-full h-full overflow-auto bg-white p-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-8">
          Discover your new favourite stay
        </h1>
        
        {/* Mobile view (carousel) */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {hotelCategories.map((category) => (
                <CarouselItem key={category.id} className="basis-4/5">
                  <HotelCategoryCard category={category} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
        
        {/* Desktop view (grid) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-4">
          {hotelCategories.map((category) => (
            <HotelCategoryCard 
              key={category.id} 
              category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelListingView;
