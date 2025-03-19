
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
        "relative rounded-xl overflow-hidden group cursor-pointer transition-transform hover:scale-105",
        className
      )}
    >
      <div className="aspect-square md:aspect-[4/5] w-full h-full">
        <img 
          src={category.image} 
          alt={category.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-xl font-semibold text-white">{category.name}</h3>
      </div>
    </div>
  );
};

export default HotelCategoryCard;
