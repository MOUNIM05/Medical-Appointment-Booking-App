import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, ChevronRight, Bell, Lock, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { useEffect, useState } from 'react';

export function Profile() {
  const navigate = useNavigate();
  const [notifEnabled, setNotifEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('notif') === 'on';
  });

  useEffect(() => {
    localStorage.setItem('notif', notifEnabled ? 'on' : 'off');
  }, [notifEnabled]);

  const menuItems = [
    {
      icon: Bell,
      label: 'Notifications',
      onClick: () => setNotifEnabled((v) => !v),
    },
    {
      icon: Lock,
      label: 'Confidentialité et sécurité',
      onClick: () => {},
    },
    {
      icon: HelpCircle,
      label: 'Aide et support',
      onClick: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Mon profil</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Profile Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="mb-1">Jean Dupont</h2>
                <p className="text-muted-foreground text-sm">Patient</p>
              </div>
              <Button variant="outline" size="sm">
                Modifier
              </Button>
            </div>

            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">jean.dupont@email.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">06 12 34 56 78</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Né(e) le 15 mars 1990</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Paris, France</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Info */}
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4">Informations médicales</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">Groupe sanguin</p>
                <p className="text-muted-foreground">A+</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Allergies</p>
                <p className="text-muted-foreground">Aucune allergie connue</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Numéro de sécurité sociale</p>
                <p className="text-muted-foreground">1 90 03 75 116 001 23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card>
          <CardContent className="p-0">
            <div className="w-full flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span>Notifications (24h / 1h avant)</span>
              </div>
              <Switch checked={notifEnabled} onCheckedChange={setNotifEnabled} />
            </div>
            {menuItems.slice(1).map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full flex items-center justify-between p-4 hover:bg-accent transition-colors border-b border-border last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Logout */}
        <Button variant="outline" className="w-full text-destructive hover:text-destructive">
          <LogOut className="w-4 h-4 mr-2" />
          Se déconnecter
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Version 1.0.0
        </div>
      </div>
    </div>
  );
}
