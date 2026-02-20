import { useMemo, useState } from 'react';
import { ArrowLeft, Star, MapPin, Euro, Calendar as CalendarIcon, Clock, Award, Video, Dot, Phone } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { mockDoctors } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export function DoctorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const doctor = mockDoctors.find((d) => d.id === id);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const online = useMemo(() => Math.random() > 0.2, []);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2>Médecin non trouvé</h2>
          <Button onClick={() => navigate('/')} className="mt-4">
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      navigate(`/booking/confirm?doctorId=${doctor.id}&date=${selectedDate}&time=${selectedTime}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Profil du médecin</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Doctor Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4 mb-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 space-y-1">
                <h2 className="mb-1">{doctor.name}</h2>
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground mb-2">
                  {doctor.specialty}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{doctor.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({doctor.reviewCount} avis)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Dot className={`w-5 h-5 ${online ? 'text-green-500' : 'text-gray-400'}`} />
                  <span className="text-sm text-muted-foreground">
                    {online ? 'En ligne • réponse immédiate' : 'Hors ligne'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="bg-gradient-to-r from-primary to-blue-600 flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Appel audio
              </Button>
              <Button
                variant="secondary"
                className="bg-gradient-to-r from-[#5a6ff0] to-[#6ad0f5] text-white border-0 flex-1"
                onClick={() => navigate(`/messages?doctorId=${doctor.id}`)}
              >
                <Video className="w-4 h-4 mr-2" />
                Appel vidéo
              </Button>
            </div>

            <div className="space-y-2 border-t border-border pt-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{doctor.address}, {doctor.city}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Euro className="w-4 h-4 text-muted-foreground" />
                <span>{doctor.price}€ la consultation</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-muted-foreground" />
                <span>{doctor.experience} ans d'expérience</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-2">À propos</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {doctor.about}
            </p>
          </CardContent>
        </Card>

        {/* Available Slots */}
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4">Choisir un créneau</h3>
            
            <div className="space-y-4">
              {doctor.availableSlots.map((daySlot) => {
                const date = parseISO(daySlot.date);
                const isSelected = selectedDate === daySlot.date;

                return (
                  <div key={daySlot.date} className="border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CalendarIcon className="w-4 h-4 text-primary" />
                      <span className="font-medium">
                        {format(date, 'EEEE d MMMM yyyy', { locale: fr })}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {daySlot.slots.map((time) => {
                        const isTimeSelected = isSelected && selectedTime === time;
                        return (
                          <button
                            key={time}
                            onClick={() => {
                              setSelectedDate(daySlot.date);
                              setSelectedTime(time);
                            }}
                            className={`px-3 py-2 rounded-md border transition-all ${
                              isTimeSelected
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-white border-border hover:border-primary'
                            }`}
                          >
                            <div className="flex items-center justify-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span className="text-sm">{time}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4">
        <div className="max-w-6xl mx-auto">
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
            disabled={!selectedDate || !selectedTime}
            onClick={handleBooking}
          >
            {selectedDate && selectedTime
              ? `Réserver pour le ${format(parseISO(selectedDate), 'd MMM', { locale: fr })} à ${selectedTime}`
              : 'Sélectionnez un créneau'}
          </Button>
        </div>
      </div>
    </div>
  );
}
