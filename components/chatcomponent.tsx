import React, { useState, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { Badge } from "./ui/badge";
import Messages from "./messages";
import MedicalSupplementDialog from "./MedicalSupplementDialog";

// Define Supplement type
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

// Props type
type Props = {
  reportData?: string;
};

// Predefined questions array
const predefinedQuestions = [
  "What are my legal rights in this situation?",
  "What legal actions can I take?",
  "What documents do I need?",
  "What is the legal procedure?",
  "What are the potential outcomes?",
  "How long will this process take?"
];

// Predefined Questions Component
const PredefinedQuestions = ({
  onQuestionClick,
}: {
  onQuestionClick: (q: string) => void;
}) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {predefinedQuestions.map((question, index) => (
      <button
        key={index}
        onClick={() => onQuestionClick(question)}
        className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
      >
        {question}
      </button>
    ))}
  </div>
);

// Supplements data
const supplements: Supplement[] = [
  {
    id: 1,
    name: "Vitamin D3",
    description: "5000 IU Daily Supplement for Optimal Health",
    image: "/images/vitamin_d.jpg",
    badges: ["Bone Health", "Immune Support"],
    price: 199,
    reviewCount: 245,
    averageRating: 4,
    ingredients: [
      "Vitamin D3 (Cholecalciferol)",
      "Olive Oil",
      "Gelatin",
      "Glycerin"
    ],
    benefits: [
      "Supports bone health",
      "Boosts immune system",
      "Improves mood",
      "Enhances calcium absorption"
    ],
    dosage: "1 softgel daily"
  },
  {
    id: 2,
    name: "Omega-3 Fish Oil",
    description: "1000mg High Potency DHA/EPA Supplement",
    image: "/images/omega_3.jpg",
    badges: ["Heart Health", "Brain Function"],
    price: 256,
    reviewCount: 189,
    averageRating: 4,
    ingredients: [
      "Omega-3 Fish Oil Concentrate",
      "Natural Lemon Flavor",
      "Gelatin",
      "Glycerin"
    ],
    benefits: [
      "Supports heart health",
      "Enhances brain function",
      "Reduces inflammation",
      "Supports joint health"
    ],
    dosage: "1-2 softgels daily"
  },
  {
    id: 3,
    name: "Probiotics",
    description: "50 Billion CFU Advanced Digestive Support",
    image: "/images/probiotics.jpg",
    badges: ["Gut Health", "Immune Support"],
    price: 399,
    reviewCount: 312,
    averageRating: 4,
    ingredients: [
      "Lactobacillus Acidophilus",
      "Bifidobacterium Longum",
      "Streptococcus Thermophilus",
      "Prebiotic Fiber"
    ],
    benefits: [
      "Supports digestive health",
      "Boosts immune system",
      "Balances gut microbiome",
      "Reduces bloating"
    ],
    dosage: "1 capsule daily"
  }
];

const MedicalSupplementCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSupplement, setSelectedSupplement] = useState<Supplement | null>(null);

  const handleSupplementClick = (supplement: Supplement) => {
    setSelectedSupplement(supplement);
    setIsOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {supplements.map((supplement) => (
          <div
            key={supplement.id}
            onClick={() => handleSupplementClick(supplement)}
            className="p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 relative mb-3">
                <img
                  src={supplement.image}
                  alt={`${supplement.name} Supplement`}
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">{supplement.name}</h3>
                <p className="text-sm text-gray-600">{supplement.description}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {supplement.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="mt-2 font-bold text-green-600">
                ₹{supplement.price.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MedicalSupplementDialog 
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        selectedSupplement={selectedSupplement}
      />
    </>
  );
};

const ChatComponent: React.FC<Props> = ({ reportData }) => {
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading
  } = useChat({
    api: "/api/medichatgemini",
    body: {
      data: {
        reportData: reportData || ''
      }
    },
    initialMessages: [
      {
        id: "1",
        role: "system",
        content: "I can try to help you understand your general rights in a given situation. To provide more accurate information, could you please provide me with details about the situation or the specific legal rights you are referring to?"
      }
    ]
  });

  // Handle predefined question click
  const handlePredefinedQuestionClick = (question: string) => {
    handleInputChange({
      target: { value: question },
    } as React.ChangeEvent<HTMLTextAreaElement>);
  };

  return (
    <div className="h-full bg-muted/50 relative flex flex-col min-h-[50vh] rounded-xl p-4 gap-4">
      {/* Badge for Document Status */}
      <Badge
        variant="outline"
        className={`absolute right-3 top-1.5 ${
          reportData ? "bg-[#00B612] text-white" : ""
        }`}
      >
        {reportData ? "✓ Document Added" : "No Document Added"}
      </Badge>

      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Legal Consultation</h2>
        <p className="text-sm text-muted-foreground">
          Ask questions about your legal situation or select from common legal queries below.
        </p>
      </div>

      {/* Predefined Questions */}
      <PredefinedQuestions onQuestionClick={handlePredefinedQuestionClick} />

      {/* Scrollable Message Container */}
      <div className="flex-1 overflow-y-auto">
        <Messages messages={messages} isLoading={isLoading} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2"
      >
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type your legal question..."
          className="min-h-[60px] w-full resize-none rounded-xl"
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input}
          className="h-[60px] w-[60px] shrink-0 rounded-xl bg-[#D90013] text-white hover:bg-[#B80011]"
        >
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <CornerDownLeft className="h-6 w-6" />
          )}
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
};

export default ChatComponent;