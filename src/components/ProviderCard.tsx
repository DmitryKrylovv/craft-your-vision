import { Star, MapPin, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ProviderCardProps {
  id?: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  location: string;
  since: string;
  minPrice: string;
  features: string[];
  isPopular?: boolean;
}

const ProviderCard = ({
  id = 'timeweb',
  name,
  logo,
  rating,
  reviewCount,
  location,
  since,
  minPrice,
  features,
  isPopular = false,
}: ProviderCardProps) => {
  return (
    <div className="relative bg-card rounded-xl sm:rounded-2xl border border-border card-hover overflow-hidden">
      {isPopular && (
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
          <span className="badge-blue text-[10px] sm:text-xs">Популярный</span>
        </div>
      )}

      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold text-primary flex-shrink-0">
            {logo}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">{name}</h3>
            <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-primary text-primary" />
              <span className="font-semibold text-foreground text-sm sm:text-base">{rating}</span>
              <span className="text-xs sm:text-sm text-muted-foreground">({reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>С {since}</span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
          {features.slice(0, 3).map((feature) => (
            <div key={feature} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <span className="text-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
          <div>
            <div className="text-xs sm:text-sm text-muted-foreground">от</div>
            <div className="text-xl sm:text-2xl font-bold text-foreground">{minPrice}</div>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base px-3 sm:px-4" asChild>
            <Link to={`/provider/${id}`}>
              Подробнее
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
