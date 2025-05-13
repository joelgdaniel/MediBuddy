import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle,
  DialogHeader,
  DialogFooter
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  HeartIcon, 
  ShoppingCartIcon, 
  StarIcon, 
  CheckIcon, 
  ShieldCheckIcon,
  TruckIcon
} from "lucide-react";

type Supplement = {
  id: number;
  name: string;
  description: string;
  image: string;
  badges: string[];
  price: number;
  reviewCount: number;
  averageRating: number;
  ingredients: string[];
  benefits: string[];
  dosage: string;
};

type MedicalSupplementDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSupplement: Supplement | null;
};

const MedicalSupplementDialog: React.FC<MedicalSupplementDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  selectedSupplement 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'reviews'>('details');

  const calculateTotalPrice = () => {
    return selectedSupplement 
      ? (selectedSupplement.price * quantity).toFixed(2) 
      : '0.00';
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, Math.min(10, quantity + change)));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${selectedSupplement?.name} to cart`);
    console.log(`Total Price: ₹${calculateTotalPrice()}`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon 
        key={index} 
        className={`h-4 w-4 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        fill={index < rating ? 'currentColor' : 'none'}
      />
    ));
  };

  if (!selectedSupplement) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[800px] max-h-[95vh] overflow-y-auto p-4">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl md:text-2xl font-bold truncate">
            {selectedSupplement.name}
          </DialogTitle>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {renderStars(selectedSupplement.averageRating)}
            </div>
            <span className="text-xs md:text-sm text-gray-500">
              ({selectedSupplement.reviewCount} reviews)
            </span>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Left Column - Image */}
          <div className="flex flex-col items-center">
            <div className="mb-2 w-full max-w-[250px]">
              <img
                src={selectedSupplement.image}
                alt={`${selectedSupplement.name} Supplement`}
                className="rounded-lg object-cover w-full h-auto aspect-square shadow-lg"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-1">
              {selectedSupplement.badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl md:text-3xl font-bold text-green-600">
                ₹{selectedSupplement.price.toFixed(2)}
              </span>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </Button>
                <span className="text-base font-medium">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-2">
              {['details', 'ingredients', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  className={`px-2 py-1 text-sm capitalize ${
                    activeTab === tab 
                    ? 'border-b-2 border-green-500 text-green-600 font-semibold' 
                    : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab(tab as any)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="h-[250px] overflow-y-auto pr-2">
              {activeTab === 'details' && (
                <div>
                  <p className="text-xs md:text-sm text-gray-700 mb-2">
                    {selectedSupplement.description}
                  </p>
                  <div className="space-y-1">
                    {selectedSupplement.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-xs md:text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div>
                  <h4 className="font-semibold mb-1 text-sm">Ingredients</h4>
                  <ul className="list-disc list-inside text-xs md:text-sm text-gray-700">
                    {selectedSupplement.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {renderStars(selectedSupplement.averageRating)}
                    </div>
                    <span className="text-xs text-gray-500">
                      {selectedSupplement.averageRating} out of 5
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {selectedSupplement.reviewCount} customer reviews
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Product Guarantees */}
        <div className="bg-gray-50 p-2 rounded-lg mt-2">
          <div className="grid grid-cols-3 gap-1">
            <div className="flex items-center justify-center space-x-1">
              <ShieldCheckIcon className="h-4 w-4 text-green-500" />
              <span className="text-xs">Quality</span>
            </div>
            <div className="flex items-center justify-center space-x-1">
              <TruckIcon className="h-4 w-4 text-blue-500" />
              <span className="text-xs">Free Ship</span>
            </div>
            <div className="flex items-center justify-center space-x-1">
              <HeartIcon className="h-4 w-4 text-red-500" />
              <span className="text-xs">Certified</span>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2 space-y-2 sm:space-y-0 sm:space-x-2">
          <Button 
            variant="outline"
            className="w-full flex items-center justify-center text-xs"
            size="sm"
          >
            <HeartIcon className="mr-1 h-3 w-3" />
            Favorites
          </Button>
          
          <Button 
            className="w-full flex items-center justify-center text-xs"
            onClick={handleAddToCart}
            size="sm"
          >
            <ShoppingCartIcon className="mr-1 h-3 w-3" />
            Add to Cart (₹{calculateTotalPrice()})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalSupplementDialog;