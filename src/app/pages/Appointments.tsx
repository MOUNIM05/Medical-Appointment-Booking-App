import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { AppointmentCard } from '../components/AppointmentCard';
import { mockAppointments } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';

export function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState(mockAppointments);
  const [cancelId, setCancelId] = useState<string | null>(null);

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === 'confirmed' && new Date(apt.date) >= new Date()
  );

  const pastAppointments = appointments.filter(
    (apt) => apt.status === 'completed' || new Date(apt.date) < new Date()
  );

  const handleCancelConfirm = () => {
    if (cancelId) {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === cancelId ? { ...apt, status: 'cancelled' as const } : apt
        )
      );
      setCancelId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Mes rendez-vous</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="upcoming">
              À venir ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Passés ({pastAppointments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onCancel={setCancelId}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Vous n'avez aucun rendez-vous à venir
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4 mt-6">
            {pastAppointments.length > 0 ? (
              pastAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun rendez-vous passé</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={!!cancelId} onOpenChange={() => setCancelId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Annuler le rendez-vous ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir annuler ce rendez-vous ? Cette action ne peut
              pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Non, garder</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelConfirm}
              className="bg-destructive hover:bg-destructive/90"
            >
              Oui, annuler
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
