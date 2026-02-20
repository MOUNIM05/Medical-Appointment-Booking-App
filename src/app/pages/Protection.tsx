import { ArrowLeft, ShieldCheck, Wallet, Check, Info } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useState } from 'react';

const plans = [
  { id: 'basic', name: 'Essentiel', price: 19, features: ['Consultations en ligne', 'Remboursement 70%', 'Support 24/7'] },
  { id: 'plus', name: 'Confort', price: 39, features: ['Consultations & examens', 'Remboursement 85%', 'Chambre particulière'], popular: true },
  { id: 'max', name: 'Premium', price: 59, features: ['Tout inclus', 'Remboursement 100%', 'Assistance internationale'] },
];

export function Protection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('plus');

  return (
    <div className="min-h-screen bg-[#f6f7fb] pb-20">
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Protection</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-5">
        <div className="bg-gradient-to-r from-[#5a6ff0] to-[#6ad0f5] rounded-3xl p-5 text-white shadow-lg flex gap-4 items-center">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Votre santé, notre priorité</h2>
            <p className="text-white/80 text-sm">Choisissez une couverture et payez votre prochain RDV.</p>
          </div>
          <Button className="bg-white text-[#5a6ff0]" onClick={() => navigate('/appointments')}>
            Mes RDV
          </Button>
        </div>

        <div className="grid gap-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`rounded-2xl border ${selected === plan.id ? 'border-[#5a6ff0] shadow-lg' : 'border-slate-200'} transition`}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{plan.name}</p>
                    <p className="text-2xl font-semibold">{plan.price}€ <span className="text-sm text-slate-500">/mois</span></p>
                  </div>
                  {plan.popular && (
                    <span className="text-xs bg-[#eef1ff] text-[#5a6ff0] px-3 py-1 rounded-full">Populaire</span>
                  )}
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#5a6ff0]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    className="bg-gradient-to-r from-[#5a6ff0] to-[#6ad0f5] text-white flex-1"
                    onClick={() => setSelected(plan.id)}
                  >
                    Choisir
                  </Button>
                  <Button variant="outline" className="text-[#5a6ff0] border-[#dfe3ff] bg-[#f5f6ff]" onClick={() => setSelected(plan.id)}>
                    <Wallet className="w-4 h-4 mr-2" />
                    Payer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex items-start gap-2 text-xs text-slate-500">
          <Info className="w-4 h-4 mt-0.5" />
          <p>Simulation: le paiement est mocké et aucune donnée n'est envoyée.</p>
        </div>
      </div>
    </div>
  );
}
