import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Euro, CheckCircle2, Navigation } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { mockDoctors } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';

export function BookingConfirmation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const doctorId = searchParams.get('doctorId');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  
  const doctor = mockDoctors.find((d) => d.id === doctorId);

  if (!doctor || !date || !time) {
    navigate('/');
    return null;
  }

  const appointmentDate = parseISO(date);

  const handleConfirm = () => {
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/appointments');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Confirmation</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="text-center mb-6">
          <h2 className="mb-2">Confirmez votre rendez-vous</h2>
          <p className="text-muted-foreground">
            Vérifiez les informations avant de confirmer
          </p>
        </div>

        {/* Doctor Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{doctor.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{doctor.specialty}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointment Details */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Date</p>
                <p className="text-muted-foreground">
                  {format(appointmentDate, 'EEEE d MMMM yyyy', { locale: fr })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Heure</p>
                <p className="text-muted-foreground">{time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Adresse</p>
                <p className="text-muted-foreground">
                  {doctor.address}, {doctor.city}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-[#dfe3ff] text-[#5a6ff0] bg-[#f5f6ff]"
              onClick={() => navigate(`/itinerary/${doctor.id}`)}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Voir l'itinéraire
            </Button>

            <div className="flex items-start gap-3 pt-4 border-t border-border">
              <Euro className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Tarif</p>
                <p className="text-muted-foreground">{doctor.price}€</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient Info */}
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4">Informations patient</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">Nom complet</p>
                <p className="text-muted-foreground">Jean Dupont</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Email</p>
                <p className="text-muted-foreground">jean.dupont@email.com</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Téléphone</p>
                <p className="text-muted-foreground">06 12 34 56 78</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4">
        <div className="max-w-md mx-auto">
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
            onClick={handleConfirm}
          >
            Confirmer le rendez-vous
          </Button>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={handleSuccessClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-secondary-foreground" />
              </div>
              <DialogTitle className="text-2xl">Rendez-vous confirmé !</DialogTitle>
              <DialogDescription>
                Votre rendez-vous avec {doctor.name} a été confirmé pour le{' '}
                {format(appointmentDate, 'd MMMM yyyy', { locale: fr })} à {time}.
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Un email de confirmation vous a été envoyé.
            </p>
            <Button className="w-full bg-primary" onClick={handleSuccessClose}>
              Voir mes rendez-vous
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
