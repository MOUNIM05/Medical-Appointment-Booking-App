import { Card, CardContent } from './ui/card';

interface SpecialtyCardProps {
  name: string;
  icon: string;
  onClick: () => void;
}

const gradients = [
  'from-blue-400 to-blue-500',
  'from-green-400 to-green-500',
  'from-purple-400 to-purple-500',
  'from-pink-400 to-pink-500',
  'from-orange-400 to-orange-500',
  'from-teal-400 to-teal-500',
  'from-indigo-400 to-indigo-500',
  'from-rose-400 to-rose-500',
];

export function SpecialtyCard({ name, icon, onClick }: SpecialtyCardProps) {
  // Generate a consistent gradient based on the name
  const gradientIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length;
  const gradient = gradients[gradientIndex];

  return (
    <Card 
      className="hover:shadow-xl transition-all cursor-pointer hover:scale-105 border-0 overflow-hidden group bg-white"
      onClick={onClick}
    >
      <CardContent className="p-0 flex flex-col items-center justify-center min-h-[120px] relative">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
        
        {/* Icon Circle */}
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow relative z-10`}>
          <span className="text-3xl filter drop-shadow-sm">{icon}</span>
        </div>
        
        {/* Name */}
        <span className="text-sm font-medium text-center px-3 relative z-10">{name}</span>
      </CardContent>
    </Card>
  );
}