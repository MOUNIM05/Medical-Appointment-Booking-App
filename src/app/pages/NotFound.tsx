import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Home } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page non trouvée</h2>
        <p className="text-muted-foreground mb-6">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90">
          <Home className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
}
