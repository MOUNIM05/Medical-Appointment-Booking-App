export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  address: string;
  city: string;
  rating: number;
  reviewCount: number;
  price: number;
  experience: number;
  nextAvailable: string;
  about: string;
  availableSlots: {
    date: string;
    slots: string[];
  }[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  address: string;
}

export const specialties = [
  { id: '1', name: 'Cardiologue', icon: '❤️' },
  { id: '2', name: 'Dentiste', icon: '🦷' },
  { id: '3', name: 'Dermatologue', icon: '💆' },
  { id: '4', name: 'Pédiatre', icon: '👶' },
  { id: '5', name: 'Ophtalmologue', icon: '👁️' },
  { id: '6', name: 'Gynécologue', icon: '👩‍⚕️' },
  { id: '7', name: 'Neurologue', icon: '🧠' },
  { id: '8', name: 'ORL', icon: '👂' },
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sophie Martin',
    specialty: 'Cardiologue',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    address: '15 Rue de la Santé',
    city: 'Paris 75014',
    rating: 4.8,
    reviewCount: 127,
    price: 80,
    experience: 12,
    nextAvailable: 'Aujourd\'hui',
    about: 'Spécialisée en cardiologie interventionnelle avec plus de 12 ans d\'expérience. Diplômée de la faculté de médecine de Paris.',
    availableSlots: [
      {
        date: '2026-02-20',
        slots: ['09:00', '10:30', '14:00', '15:30', '16:45']
      },
      {
        date: '2026-02-21',
        slots: ['09:30', '11:00', '14:30', '16:00']
      },
      {
        date: '2026-02-24',
        slots: ['10:00', '11:30', '13:30', '15:00', '16:30']
      }
    ]
  },
  {
    id: '2',
    name: 'Dr. Pierre Dubois',
    specialty: 'Dentiste',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    address: '42 Avenue des Champs',
    city: 'Paris 75008',
    rating: 4.9,
    reviewCount: 203,
    price: 70,
    experience: 15,
    nextAvailable: 'Demain',
    about: 'Expert en implantologie et esthétique dentaire. Formation continue en dentisterie moderne.',
    availableSlots: [
      {
        date: '2026-02-21',
        slots: ['08:30', '10:00', '11:30', '14:00', '15:30']
      },
      {
        date: '2026-02-22',
        slots: ['09:00', '10:30', '13:00', '14:30']
      }
    ]
  },
  {
    id: '3',
    name: 'Dr. Marie Leroy',
    specialty: 'Dermatologue',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
    address: '8 Boulevard Saint-Michel',
    city: 'Paris 75005',
    rating: 4.7,
    reviewCount: 156,
    price: 90,
    experience: 10,
    nextAvailable: 'Aujourd\'hui',
    about: 'Spécialisée en dermatologie médicale et esthétique. Traitement des pathologies cutanées et anti-âge.',
    availableSlots: [
      {
        date: '2026-02-20',
        slots: ['11:00', '14:30', '16:00']
      },
      {
        date: '2026-02-21',
        slots: ['09:00', '10:30', '14:00', '15:30', '17:00']
      },
      {
        date: '2026-02-23',
        slots: ['09:30', '11:00', '13:30', '15:00']
      }
    ]
  },
  {
    id: '4',
    name: 'Dr. Thomas Bernard',
    specialty: 'Pédiatre',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
    address: '23 Rue de Vaugirard',
    city: 'Paris 75015',
    rating: 5.0,
    reviewCount: 89,
    price: 65,
    experience: 8,
    nextAvailable: 'Demain',
    about: 'Pédiatre passionné par le suivi des enfants de 0 à 18 ans. Approche bienveillante et à l\'écoute.',
    availableSlots: [
      {
        date: '2026-02-21',
        slots: ['08:00', '09:30', '11:00', '14:30', '16:00']
      },
      {
        date: '2026-02-22',
        slots: ['08:30', '10:00', '11:30', '15:00']
      }
    ]
  },
  {
    id: '5',
    name: 'Dr. Claire Fontaine',
    specialty: 'Ophtalmologue',
    image: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=400',
    address: '56 Rue du Faubourg',
    city: 'Paris 75010',
    rating: 4.6,
    reviewCount: 178,
    price: 85,
    experience: 14,
    nextAvailable: 'Dans 2 jours',
    about: 'Ophtalmologue spécialisée en chirurgie réfractive et traitement des pathologies de la rétine.',
    availableSlots: [
      {
        date: '2026-02-22',
        slots: ['10:00', '11:30', '14:00', '15:30']
      },
      {
        date: '2026-02-23',
        slots: ['09:00', '10:30', '13:30', '15:00', '16:30']
      }
    ]
  },
  {
    id: '6',
    name: 'Dr. Laurent Rousseau',
    specialty: 'Neurologue',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400',
    address: '31 Avenue de la République',
    city: 'Paris 75011',
    rating: 4.8,
    reviewCount: 142,
    price: 95,
    experience: 16,
    nextAvailable: 'Aujourd\'hui',
    about: 'Neurologue expert en troubles neurologiques et pathologies dégénératives. Approche holistique du patient.',
    availableSlots: [
      {
        date: '2026-02-20',
        slots: ['13:00', '14:30', '16:00']
      },
      {
        date: '2026-02-21',
        slots: ['09:30', '11:00', '14:00', '15:30']
      }
    ]
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    doctorName: 'Dr. Sophie Martin',
    doctorSpecialty: 'Cardiologue',
    doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    date: '2026-02-25',
    time: '14:30',
    status: 'confirmed',
    address: '15 Rue de la Santé, Paris 75014'
  },
  {
    id: '2',
    doctorId: '3',
    doctorName: 'Dr. Marie Leroy',
    doctorSpecialty: 'Dermatologue',
    doctorImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
    date: '2026-03-05',
    time: '10:00',
    status: 'confirmed',
    address: '8 Boulevard Saint-Michel, Paris 75005'
  },
  {
    id: '3',
    doctorId: '2',
    doctorName: 'Dr. Pierre Dubois',
    doctorSpecialty: 'Dentiste',
    doctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    date: '2026-02-15',
    time: '09:00',
    status: 'completed',
    address: '42 Avenue des Champs, Paris 75008'
  }
];
