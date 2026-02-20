import { ArrowLeft, MapPin, Navigation, Clock3, Footprints } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { mockAppointments } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const steps = [
  { title: 'Départ', desc: 'Rue de la Paix, Paris', icon: 'start' },
  { title: 'Arrêt bus 24', desc: 'Prendre direction Montparnasse', icon: 'bus' },
  { title: 'Marcher 300m', desc: 'Rue du Docteur Roux', icon: 'walk' },
  { title: 'Arrivée', desc: 'Cabinet médical', icon: 'end' },
];

export function Itinerary() {
  const navigate = useNavigate();
  const { id } = useParams();
  const appointment = mockAppointments.find((a) => a.id === id || a.doctorId === id);

  if (!appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <p>Aucun itinéraire trouvé.</p>
          <Button onClick={() => navigate('/appointments')}>Mes rendez-vous</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb] pb-16">
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Itinéraire</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        <Card className="rounded-3xl overflow-hidden border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="relative h-64 bg-gradient-to-br from-[#eef1ff] via-white to-[#f1f5ff]">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="220" height="220" viewBox="0 0 220 220">
                  <path
                    d="M30 190 C80 150, 110 140, 130 100 S180 40, 190 30"
                    stroke="#5a6ff0"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="30" cy="190" r="10" fill="#ef4444" />
                  <circle cx="190" cy="30" r="10" fill="#22c55e" />
                </svg>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-xs text-slate-600 shadow">
                {appointment.address}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 rounded-2xl">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock3 className="w-4 h-4 text-[#5a6ff0]" />
              <span>Durée estimée: 28 min</span>
            </div>
            <div className="space-y-3">
              {steps.map((step) => (
                <div key={step.title} className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-2xl bg-[#eef1ff] flex items-center justify-center text-[#5a6ff0]">
                    {step.icon === 'start' && <MapPin className="w-4 h-4" />}
                    {step.icon === 'end' && <MapPin className="w-4 h-4" />}
                    {step.icon === 'bus' && <Navigation className="w-4 h-4" />}
                    {step.icon === 'walk' && <Footprints className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{step.title}</p>
                    <p className="text-xs text-slate-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-gradient-to-r from-[#5a6ff0] to-[#6ad0f5]">Démarrer</Button>
              <Button variant="outline" className="border-[#dfe3ff] text-[#5a6ff0]" onClick={() => navigate('/appointments')}>
                Mes RDV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
