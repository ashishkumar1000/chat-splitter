
import React from 'react';
import { HotelCategory } from '../data/hotelListings';
import { cn } from '../lib/utils';

interface HotelCategoryCardProps {
  category: HotelCategory;
  className?: string;
}

const HotelCategoryCard: React.FC<HotelCategoryCardProps> = ({ 
  category,
  className
}) => {
  return (
    <div 
      className={cn(
        "relative rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl",
        className
      )}
    >
      <div className="aspect-square w-full h-full bg-muted">
        <img 
          src={category.image} 
          alt={category.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-300">
        <div className="flex items-center space-x-2">
          <span className="inline-block h-1.5 w-10 bg-primary rounded-full"></span>
          <span className="text-sm font-medium text-white/90">Premium Choice</span>
        </div>
        <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <div className="flex items-center mt-2 text-white/80 text-sm">
          <span className="mr-3">From $199/night</span>
          <div className="flex items-center">
            <span className="mr-1">★★★★★</span>
            <span>(42)</span>
          </div>
        </div>
        
        {/* Info button that appears on hover */}
        <div className="mt-4 overflow-hidden h-0 group-hover:h-9 transition-all duration-300">
          <button className="px-4 py-2 bg-white/90 text-neutral-800 rounded-md text-sm font-medium hover:bg-white transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCategoryCard;
