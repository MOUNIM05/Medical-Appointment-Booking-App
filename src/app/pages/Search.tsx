import { useState, useEffect } from 'react';
import { Search as SearchIcon, ArrowLeft, Filter } from 'lucide-react';
import { Input } from '../components/ui/input';
import { DoctorCard } from '../components/DoctorCard';
import { mockDoctors } from '../data/mockData';
import { useNavigate, useSearchParams } from 'react-router';
import { Button } from '../components/ui/button';

export function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedSpecialty, setSelectedSpecialty] = useState(searchParams.get('specialty') || '');
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = mockDoctors.filter((doctor) => {
      const matchesQuery = !query || 
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query) ||
        doctor.city.toLowerCase().includes(query);
      
      const matchesSpecialty = !selectedSpecialty || 
        doctor.specialty === selectedSpecialty;
      
      return matchesQuery && matchesSpecialty;
    });
    setFilteredDoctors(filtered);
  }, [searchQuery, selectedSpecialty]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1>Rechercher un médecin</h1>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Nom, spécialité, ville..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
          {selectedSpecialty && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Spécialité:</span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedSpecialty('')}
                className="bg-secondary text-secondary-foreground"
              >
                {selectedSpecialty}
                <span className="ml-2">×</span>
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        <p className="text-sm text-muted-foreground mb-4">
          {filteredDoctors.length} médecin{filteredDoctors.length !== 1 ? 's' : ''} trouvé{filteredDoctors.length !== 1 ? 's' : ''}
        </p>

        <div className="space-y-4">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Aucun résultat trouvé</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
