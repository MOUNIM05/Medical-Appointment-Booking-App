import { Calendar, Clock, MapPin, X, Navigation } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Appointment } from '../data/mockData';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from 'react-router';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: (id: string) => void;
}

const statusConfig = {
  confirmed: { 
    label: 'Confirmé', 
    className: 'bg-gradient-to-r from-secondary to-green-500 text-white border-0',
    dotColor: 'bg-secondary'
  },
  pending: { 
    label: 'En attente', 
    className: 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0',
    dotColor: 'bg-yellow-400'
  },
  completed: { 
    label: 'Terminé', 
    className: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0',
    dotColor: 'bg-gray-400'
  },
  cancelled: { 
    label: 'Annulé', 
    className: 'bg-gradient-to-r from-destructive to-red-600 text-white border-0',
    dotColor: 'bg-destructive'
  }
};

export function AppointmentCard({ appointment, onCancel }: AppointmentCardProps) {
  const navigate = useNavigate();
  const statusInfo = statusConfig[appointment.status];
  const appointmentDate = new Date(appointment.date);

  return (
    <Card className="hover:shadow-lg transition-all border-0 overflow-hidden bg-white">
      <CardContent className="p-0">
        <div className="flex gap-0">
          {/* Color Accent Bar */}
          <div className={`w-1.5 flex-shrink-0 ${statusInfo.dotColor}`}></div>
          
          {/* Image Section */}
          <div className="relative w-24 flex-shrink-0">
            <img
              src={appointment.doctorImage}
              alt={appointment.doctorName}
              className="w-24 h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0 p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-base">{appointment.doctorName}</h3>
                <p className="text-xs text-muted-foreground">{appointment.doctorSpecialty}</p>
              </div>
              <Badge className={`${statusInfo.className} shadow-sm text-xs`}>
                {statusInfo.label}
              </Badge>
            </div>

            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="font-medium">{format(appointmentDate, 'EEEE d MMMM yyyy', { locale: fr })}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-7 h-7 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-3.5 h-3.5 text-secondary" />
                </div>
                <span className="font-medium">{appointment.time}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                </div>
                <span className="truncate text-muted-foreground">{appointment.address}</span>
              </div>
            </div>

            <div className="mt-3 flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                className="text-primary border-primary/40 bg-primary/5 text-xs h-8"
                onClick={() => navigate(`/itinerary/${appointment.id}`)}
              >
                <Navigation className="w-3.5 h-3.5 mr-1" />
                Itinéraire
              </Button>

              {appointment.status === 'confirmed' && onCancel && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/5 border-destructive/30 text-xs h-8"
                  onClick={() => onCancel(appointment.id)}
                >
                  <X className="w-3.5 h-3.5 mr-1" />
                  Annuler le rendez-vous
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
