import { Star, MapPin, Euro, Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Doctor } from '../data/mockData';
import { useNavigate } from 'react-router';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-xl transition-all cursor-pointer border-0 overflow-hidden group bg-white" onClick={() => navigate(`/doctor/${doctor.id}`)}>
      <CardContent className="p-0">
        <div className="flex gap-0">
          {/* Image Section */}
          <div className="relative w-28 flex-shrink-0">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-28 h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"></div>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0 p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <h3 className="font-semibold truncate text-base">{doctor.name}</h3>
                <Badge variant="secondary" className="mt-1 bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20 text-xs">
                  {doctor.specialty}
                </Badge>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0 bg-yellow-50 px-2 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-sm">{doctor.rating}</span>
              </div>
            </div>
            
            <div className="mt-2 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span className="truncate">{doctor.address}, {doctor.city}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Euro className="w-3.5 h-3.5 text-secondary" />
                  <span className="font-medium text-foreground">{doctor.price}€</span>
                </div>
                <span className="text-border">•</span>
                <span>{doctor.experience} ans</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span className="font-medium text-secondary">
                  {doctor.nextAvailable}
                </span>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-md text-xs h-8 px-4">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                Réserver
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}