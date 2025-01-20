import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Clock, Euro, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

// Base de données exemple (à remplacer par une vraie API)
const activitiesData = {
  'seance-de-yoga': {
    title: "Séance de Yoga",
    description: "Découvrez notre séance de yoga adaptée à tous les niveaux. Notre instructeur expérimenté vous guidera à travers différentes postures et exercices de respiration pour améliorer votre bien-être physique et mental.",
    category: "Bien-être",
    rating: 4.5,
    reviewsCount: 12,
    price: "20€ / séance",
    location: "Studio Zen, 19 rue Henri Barbusse, 13001 Marseille",
    schedule: {
      monday: ["10:00", "15:00", "18:00"],
      wednesday: ["9:00", "14:00", "17:00"],
      friday: ["11:00", "16:00", "19:00"]
    },
    instructor: "Sarah M.",
    clubName: "Studio Zen",
    clubLogo: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=100&h=100&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1599447421416-3414500d18a5",
      "https://images.unsplash.com/photo-1588286840104-8957b019727f",
      "https://images.unsplash.com/photo-1599447421275-6a0b5b651b4c"
    ]
  },
  'cours-de-tennis': {
    title: "Cours de Tennis",
    description: "Apprenez ou perfectionnez votre tennis avec nos cours adaptés à votre niveau. Nos coachs professionnels vous accompagnent dans votre progression avec des exercices personnalisés et des conseils techniques.",
    category: "Sport",
    rating: 4.8,
    reviewsCount: 8,
    price: "25€ / heure",
    location: "Tennis Club Marseille, 123 avenue du Prado, 13008 Marseille",
    schedule: {
      tuesday: ["9:00", "14:00", "17:00"],
      thursday: ["10:00", "15:00", "18:00"],
      saturday: ["9:00", "11:00", "14:00"]
    },
    instructor: "Thomas B.",
    clubName: "Tennis Club Marseille",
    clubLogo: "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=100&h=100&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6",
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0",
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff"
    ]
  },
  'cours-de-theatre': {
    title: "Cours de Théâtre",
    description: "Développez votre créativité et votre confiance en vous avec nos cours de théâtre. Dans une ambiance conviviale, vous explorerez différentes techniques d'expression et travaillerez sur des textes variés.",
    category: "Art",
    rating: 4.7,
    reviewsCount: 15,
    price: "30€ / séance",
    location: "Théâtre National, 54 rue de la République, 13002 Marseille",
    schedule: {
      monday: ["14:00", "18:00"],
      wednesday: ["15:00", "19:00"],
      saturday: ["10:00", "14:00"]
    },
    instructor: "Marc L.",
    clubName: "Théâtre National",
    clubLogo: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=100&h=100&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf",
      "https://images.unsplash.com/photo-1611088136383-06d0d6b85765",
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca"
    ]
  },
  'cours-de-piano': {
    title: "Cours de Piano",
    description: "Découvrez l'art du piano dans notre conservatoire renommé. Nos professeurs expérimentés vous guideront dans votre apprentissage musical, que vous soyez débutant ou avancé.",
    category: "Musique",
    rating: 4.6,
    reviewsCount: 10,
    price: "35€ / séance",
    location: "Conservatoire de Marseille, 2 Place Auguste Carli, 13001 Marseille",
    schedule: {
      monday: ["14:00", "16:00", "18:00"],
      wednesday: ["10:00", "14:00", "16:00"],
      friday: ["14:00", "16:00", "18:00"]
    },
    instructor: "Claire D.",
    clubName: "Conservatoire de Marseille",
    clubLogo: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=100&h=100&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1552422535-c45813c61732",
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0",
      "https://images.unsplash.com/photo-1571974599782-87624638275e"
    ]
  },
  'cours-de-natation': {
    title: "Cours de Natation",
    description: "Apprenez à nager ou perfectionnez votre technique avec nos maîtres-nageurs qualifiés. Cours adaptés à tous les niveaux dans une piscine moderne et sécurisée.",
    category: "Sport",
    rating: 4.5,
    reviewsCount: 18,
    price: "15€ / séance",
    location: "Piscine Municipale Marseille, 15 Boulevard Louis Armand, 13008 Marseille",
    schedule: {
      monday: ["10:00", "14:00", "17:00"],
      wednesday: ["10:00", "14:00", "17:00"],
      saturday: ["9:00", "11:00", "14:00"]
    },
    instructor: "Nicolas P.",
    clubName: "Piscine Municipale",
    clubLogo: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=100&h=100&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50",
      "https://images.unsplash.com/photo-1622737133809-d95047b9e673",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7"
    ]
  },
  'cours-de-guitare': {
    title: "Cours de Guitare",
    description: "Initiez-vous à la guitare ou perfectionnez votre jeu avec nos cours personnalisés. Du classique au rock, explorez différents styles musicaux dans une ambiance décontractée.",
    category: "Musique",
    rating: 4.4,
    reviewsCount: 14,
    price: "30€ / séance",
    location: "École de Musique Marseille, 45 Rue Saint-Pierre, 13005 Marseille",
    schedule: {
      tuesday: ["14:00", "16:00", "18:00"],
      thursday: ["14:00", "16:00", "18:00"],
      saturday: ["10:00", "14:00"]
    },
    instructor: "Antoine R.",
    clubName: "École de Musique Marseille",
    clubLogo: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=100&h=100&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1",
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0",
      "https://images.unsplash.com/photo-1556449895-a33c9dba33dd"
    ]
  },
  'cours-de-danse-classique': {
    title: "Cours de Danse Classique",
    description: "Découvrez l'élégance de la danse classique dans notre studio professionnel. Nos professeurs expérimentés vous accompagnent dans votre progression technique et artistique.",
    category: "Danse",
    rating: 4.8,
    reviewsCount: 20,
    price: "28€ / séance",
    location: "Studio de Danse Marseille, 25 Rue Paradis, 13001 Marseille",
    schedule: {
      tuesday: ["14:00", "16:00", "18:00"],
      thursday: ["14:00", "16:00", "18:00"],
      saturday: ["10:00", "14:00"]
    },
    instructor: "Marie P.",
    clubName: "Studio de Danse Marseille",
    clubLogo: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=100&h=100&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434",
      "https://images.unsplash.com/photo-1499720843949-d9e6f318dca0",
      "https://images.unsplash.com/photo-1547153760-18fc86324498"
    ]
  },
  'atelier-peinture': {
    title: "Atelier Peinture",
    description: "Exprimez votre créativité dans notre atelier de peinture. Du dessin aux techniques mixtes, développez votre style personnel avec nos artistes professionnels.",
    category: "Art",
    rating: 4.6,
    reviewsCount: 16,
    price: "40€ / séance",
    location: "Atelier des Arts Marseille, 30 Rue des Arts, 13001 Marseille",
    schedule: {
      wednesday: ["14:00", "16:00", "18:00"],
      friday: ["14:00", "16:00", "18:00"],
      saturday: ["10:00", "14:00"]
    },
    instructor: "Sophie L.",
    clubName: "Atelier des Arts Marseille",
    clubLogo: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=100&h=100&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
      "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c"
    ]
  },
  'cours-de-boxe': {
    title: "Cours de Boxe",
    description: "Découvrez la boxe dans un environnement dynamique et sécurisé. Améliorez votre condition physique et apprenez les techniques de self-défense avec nos coachs expérimentés.",
    category: "Sport",
    rating: 4.7,
    reviewsCount: 22,
    price: "22€ / séance",
    location: "Club de Boxe Marseille, 55 Boulevard Baille, 13006 Marseille",
    schedule: {
      monday: ["18:00", "19:30"],
      wednesday: ["18:00", "19:30"],
      friday: ["18:00", "19:30"]
    },
    instructor: "David M.",
    clubName: "Club de Boxe Marseille",
    clubLogo: "https://images.unsplash.com/photo-1509563268479-0f004cf3f58b?w=100&h=100&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed",
      "https://images.unsplash.com/photo-1517438322307-e67111335449",
      "https://images.unsplash.com/photo-1622599511051-16f55a1234d0"
    ]
  },
  'meditation-guidee': {
    title: "Méditation Guidée",
    description: "Trouvez votre équilibre intérieur avec nos séances de méditation guidée. Dans un cadre apaisant, apprenez des techniques de respiration et de pleine conscience.",
    category: "Bien-être",
    rating: 4.9,
    reviewsCount: 25,
    price: "15€ / séance",
    location: "Centre Mindfulness Marseille, 10 Rue Dragon, 13006 Marseille",
    schedule: {
      tuesday: ["8:00", "12:00", "18:00"],
      thursday: ["8:00", "12:00", "18:00"],
      sunday: ["9:00", "11:00"]
    },
    instructor: "Laura B.",
    clubName: "Centre Mindfulness Marseille",
    clubLogo: "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=100&h=100&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
      "https://images.unsplash.com/photo-1593811167562-9cef47bfc4a7",
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597"
    ]
  },
  'cours-de-football': {
    title: "Cours de Football",
    description: "Développez vos compétences footballistiques dans l'enceinte mythique du Stade Vélodrome. Nos entraîneurs qualifiés vous aident à progresser techniquement et tactiquement.",
    category: "Sport",
    rating: 4.8,
    reviewsCount: 30,
    price: "18€ / séance",
    location: "Stade Vélodrome, Boulevard Michelet, 13008 Marseille",
    schedule: {
      wednesday: ["14:00", "16:00", "18:00"],
      saturday: ["10:00", "14:00", "16:00"]
    },
    instructor: "Julien T.",
    clubName: "Stade Vélodrome",
    clubLogo: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&h=100&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
      "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c",
      "https://images.unsplash.com/photo-1600679472829-3044539ce8ed"
    ]
  }
};

export function ActivityDetails() {
  const { activityId } = useParams();
  const [activity, setActivity] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (activityId && activityId in activitiesData) {
      setActivity(activitiesData[activityId as keyof typeof activitiesData]);
    }
  }, [activityId]);

  if (!activity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Activité non trouvée</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{activity.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-yellow-400 stroke-yellow-400" />
            <span className="font-semibold">{activity.rating}</span>
            <Link to={`/activity/${activityId}/reviews`} className="text-blue-600 hover:underline">
              ({activity.reviewsCount} avis)
            </Link>
          </div>
          <span>•</span>
          <span>{activity.category}</span>
        </div>
      </div>

      {/* Galerie d'images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-2">
          <img
            src={activity.images[selectedImage]}
            alt={activity.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          {activity.images.map((image: string, index: number) => (
            index !== selectedImage && (
              <img
                key={image}
                src={image}
                alt={`${activity.title} ${index + 1}`}
                className="w-full h-44 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage(index)}
              />
            )
          ))}
        </div>
      </div>

      {/* Informations principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{activity.description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Horaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(activity.schedule).map(([day, times]) => (
                <div key={day} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold capitalize mb-2">{day}</h3>
                  <ul className="space-y-1">
                    {(times as string[]).map((time) => (
                      <li key={time} className="text-gray-600">{time}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Euro className="h-5 w-5 text-gray-400" />
                <span className="text-xl font-semibold">{activity.price}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                <span>{activity.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <span>Voir les horaires ci-contre</span>
              </div>
              <Button className="w-full">
                Réserver maintenant
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">À propos du club</h3>
            <div className="flex items-center gap-4">
              <img
                src={activity.clubLogo}
                alt={activity.clubName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{activity.clubName}</p>
                <p className="text-sm text-gray-600">Instructeur: {activity.instructor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section des avis */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Avis</h2>
          <Link 
            to={`/activity/${activityId}/reviews`}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Voir tous les avis
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
} 