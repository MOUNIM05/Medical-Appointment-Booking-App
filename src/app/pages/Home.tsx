import { useMemo, useState } from 'react';
import {
  Calendar,
  MessageSquare,
  ShieldCheck,
  Pill,
  MapPin,
  Star,
  ChevronRight,
  PhoneCall,
  Clock3,
  Home as HomeIcon,
  Search,
  User,
  Bell,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { mockDoctors, mockAppointments } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';

export function Home() {
  const navigate = useNavigate();
  const [notifEnabled, setNotifEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('notif') === 'on';
  });

  const recommended = useMemo(() => mockDoctors.slice(0, 3), []);
  const upcoming = useMemo(
    () =>
      mockAppointments
        .filter((apt) => apt.status === 'confirmed' && new Date(apt.date) >= new Date())
        .slice(0, 3),
    []
  );

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-[#0f172a]">
      <div className="max-w-md mx-auto px-4 pb-28 pt-6 space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Bonjour</p>
            <p className="font-semibold text-lg">Andrea Kusuma</p>
          </div>
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#e5e7ff] to-white border border-white shadow-sm flex items-center justify-center">
            <User className="w-5 h-5 text-[#5a6ff0]" />
          </div>
        </div>

        {/* Hero card */}
        <Card className="rounded-3xl border-0 shadow-xl overflow-hidden bg-white relative">
          <CardContent className="p-5 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#eef1ff] via-white to-[#f1f5ff] opacity-90 pointer-events-none rounded-3xl blur-md"></div>
            <div className="relative flex gap-4">
              <div className="flex-1 space-y-2">
                <p className="text-sm text-slate-600">Simple ways for</p>
                <h1 className="text-2xl font-semibold leading-snug">
                  Healthy <span className="text-[#5a6ff0]">Life</span>
                </h1>
                <div className="flex gap-2 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock3 className="w-3.5 h-3.5 text-[#5a6ff0]" />
                    <span>09:45</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span>Today</span>
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#5a6ff0] to-[#6ad0f5] border-0 shadow-md text-white"
                  onClick={() => navigate('/search')}
                >
                  Commencer
                </Button>
              </div>
              <div className="w-24 h-28 rounded-2xl overflow-hidden bg-gradient-to-b from-[#e7ecff] to-white shadow-inner flex items-end justify-center">
                <img
                  src="https://images.unsplash.com/photo-1550831107-1553da8c8464?w=320"
                  alt="Doctor"
                  className="h-28 w-full object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications banner */}
        <Card className="border border-[#dfe3ff] bg-[#eef1ff] rounded-2xl shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#5a6ff0]">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Rappels automatiques</p>
              <p className="text-xs text-slate-600">24h et 1h avant votre rendez-vous.</p>
            </div>
            <Button
              size="sm"
              variant={notifEnabled ? 'secondary' : 'default'}
              className={notifEnabled ? 'bg-white text-[#5a6ff0] border-[#dfe3ff]' : 'bg-gradient-to-r from-[#5a6ff0] to-[#6ad0f5] text-white'}
              onClick={() => {
                const next = !notifEnabled;
                setNotifEnabled(next);
                localStorage.setItem('notif', next ? 'on' : 'off');
              }}
            >
              {notifEnabled ? 'Activé' : 'Activer'}
            </Button>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'RDV', icon: Calendar, path: '/appointments' },
            { label: 'Messages', icon: MessageSquare, path: '/messages' },
            { label: 'Assurance', icon: ShieldCheck, path: '/protection' },
            { label: 'Pharmacie', icon: Pill, path: '/search' },
          ].map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center gap-2 bg-white rounded-2xl shadow-sm p-3 border border-slate-100 hover:shadow-md transition"
              onClick={() => navigate(item.path)}
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#eef1ff] to-white flex items-center justify-center text-[#5a6ff0]">
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-700">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Rechercher un médecin ou spécialité"
              className="pl-11 h-11 rounded-xl border-slate-200 bg-slate-50 text-sm"
              onFocus={() => navigate('/search')}
              readOnly
            />
          </div>
        </div>

        {/* Recommended doctors */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Médecins recommandés</h2>
            <button
              className="text-xs text-[#5a6ff0] font-medium flex items-center gap-1"
              onClick={() => navigate('/search')}
            >
              Voir tout <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recommended.map((doctor) => (
              <Card
                key={doctor.id}
                className="border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
                onClick={() => navigate(`/doctor/${doctor.id}`)}
              >
                <CardContent className="p-3 flex gap-3 items-center">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{doctor.name}</p>
                    <p className="text-xs text-slate-500">{doctor.specialty}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="font-semibold text-slate-700">{doctor.rating}</span>
                      </div>
                      <span>({doctor.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#5a6ff0]" />
                      <span className="truncate">{doctor.city}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-[#5a6ff0] to-[#6ad0f5] text-white text-xs h-9 px-3"
                  >
                    Messages
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* History / messages */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Historique</h2>
            <button
              className="text-xs text-[#5a6ff0] font-medium flex items-center gap-1"
              onClick={() => navigate('/appointments')}
            >
              Tout voir <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {upcoming.map((apt) => (
              <Card
                key={apt.id}
                className="rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition"
              >
                <CardContent className="p-3 flex items-center gap-3">
                  <img
                    src={apt.doctorImage}
                    alt={apt.doctorName}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">{apt.doctorName}</p>
                    <p className="text-xs text-slate-500">{apt.doctorSpecialty}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                      <Clock3 className="w-3.5 h-3.5 text-[#5a6ff0]" />
                      <span>
                        {new Date(apt.date).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                        })}{' '}
                        • {apt.time}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-[#5a6ff0] border-[#dfe3ff] bg-[#f5f6ff] text-xs h-9 px-3"
                    onClick={() => navigate('/appointments')}
                  >
                    Messages
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA card */}
        <Card className="rounded-3xl border-0 shadow-xl overflow-hidden bg-gradient-to-br from-[#5a6ff0] to-[#6ad0f5] text-white relative">
          <CardContent className="p-5 relative z-10 space-y-3">
            <h3 className="text-lg font-semibold">Votre santé, notre priorité</h3>
            <p className="text-sm text-white/80">
              Couverture santé et assurances adaptées à vos besoins.
            </p>
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white text-[#5a6ff0] font-semibold"
                onClick={() => navigate('/appointments')}
              >
                Prendre RDV
              </Button>
              <Button size="sm" className="bg-white/10 border-white/30 text-white" onClick={() => navigate('/protection')}>
                Assurance
              </Button>
            </div>
          </CardContent>
          <div className="absolute right-4 bottom-2 w-24 h-28 overflow-hidden rounded-2xl bg-white/15">
            <img
              src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=320"
              alt="Doctor promo"
              className="w-full h-full object-cover"
            />
          </div>
        </Card>
      </div>

    </div>
  );
}
