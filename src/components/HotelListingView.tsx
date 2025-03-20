
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
    <div className="w-full h-full overflow-auto bg-gradient-to-br from-white to-slate-50 p-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-8">
          <span className="text-sm font-medium text-primary/80 uppercase tracking-wider">Exclusive offers</span>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mt-1">
            Discover your perfect stay
          </h1>
          <p className="text-muted-foreground mt-2 max-w-lg">
            Explore our curated collection of exceptional accommodations tailored to your preferences.
          </p>
        </div>
        
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
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {hotelCategories.map((category) => (
            <HotelCategoryCard 
              key={category.id} 
              category={category}
            />
          ))}
        </div>
        
        <div className="mt-10 flex justify-center">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
            View All Accommodations
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelListingView;
