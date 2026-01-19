import {
  Gift,
  Gamepad2,
  Plane,
  Ticket,
  ShoppingBag,
  Utensils,
  Sparkles,
  Heart,
  Star,
  Music,
  Camera,
  Home,
  Car,
  Palette,
  Trophy,
  Users,
  Phone,
  Laptop,
  Tv,
  Headphones,
  LucideIcon,
} from 'lucide-react';

// Map of icon names to components for Builder.io selection
const iconMap: Record<string, LucideIcon> = {
  gift: Gift,
  gamepad: Gamepad2,
  plane: Plane,
  ticket: Ticket,
  shopping: ShoppingBag,
  utensils: Utensils,
  sparkles: Sparkles,
  heart: Heart,
  star: Star,
  music: Music,
  camera: Camera,
  home: Home,
  car: Car,
  palette: Palette,
  trophy: Trophy,
  users: Users,
  phone: Phone,
  laptop: Laptop,
  tv: Tv,
  headphones: Headphones,
};

interface IconCard {
  icon: string;
  title: string;
  description: string;
}

interface IconCardsGridProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  cards?: IconCard[];
  columns?: number;
  iconColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  cardBackgroundColor?: string;
  cardHoverColor?: string;
  sectionBackgroundColor?: string;
}

export const IconCardsGrid = ({
  sectionTitle = "Gifts we would love to receive!",
  sectionSubtitle = "Certain items, services and experiences are particularly helpful for granting wishes. Here are some of the things we're often looking for:",
  cards = [
    { icon: "gamepad", title: "Technology & Gaming", description: "Consoles, tablets, VR headsets" },
    { icon: "plane", title: "Travel Experiences", description: "Flights, hotel stays, theme parks" },
    { icon: "ticket", title: "Event Tickets", description: "Sports, concerts, attractions" },
    { icon: "gift", title: "Toys & Games", description: "Board games, outdoor equipment" },
    { icon: "shopping", title: "Gift Vouchers", description: "Retail, entertainment, dining" },
    { icon: "utensils", title: "Experiences", description: "Cooking classes, adventure activities" },
    { icon: "sparkles", title: "Special Items", description: "Costumes, party supplies, decorations" },
    { icon: "heart", title: "Services", description: "Professional services, entertainment" },
  ],
  columns = 4,
  iconColor = "text-primary",
  titleColor = "text-gray-900",
  descriptionColor = "text-gray-600",
  cardBackgroundColor = "bg-gray-50",
  cardHoverColor = "hover:bg-primary/5",
  sectionBackgroundColor = "bg-white",
}: IconCardsGridProps) => {
  const getGridCols = () => {
    switch (columns) {
      case 2: return "md:grid-cols-2";
      case 3: return "md:grid-cols-3";
      case 4: return "md:grid-cols-4";
      default: return "md:grid-cols-4";
    }
  };

  return (
    <section className={`py-16 ${sectionBackgroundColor}`}>
      <div className="container mx-auto px-4">
        {sectionTitle && (
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
            {sectionTitle}
          </h2>
        )}
        {sectionSubtitle && (
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            {sectionSubtitle}
          </p>
        )}
        <div className={`grid grid-cols-2 ${getGridCols()} gap-6`}>
          {cards.map((card, index) => {
            const IconComponent = iconMap[card.icon] || Gift;
            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center p-6 rounded-lg ${cardBackgroundColor} ${cardHoverColor} transition-colors`}
              >
                <IconComponent className={`w-10 h-10 ${iconColor} mb-3`} />
                <h3 className={`font-semibold ${titleColor} mb-1`}>{card.title}</h3>
                <p className={`text-sm ${descriptionColor}`}>{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IconCardsGrid;
