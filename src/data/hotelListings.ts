
export interface HotelCategory {
  id: string;
  name: string;
  image: string;
}

export const hotelCategories: HotelCategory[] = [
  {
    id: "houseboat",
    name: "Houseboat",
    image: "/lovable-uploads/d5a5c6d8-99cc-45e6-b655-ffa19279f683.png"
  },
  {
    id: "villa",
    name: "Villa",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "resort",
    name: "Resort",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "all-inclusive",
    name: "All inclusive",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "apartment",
    name: "Apartment",
    image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&h=600"
  }
];
