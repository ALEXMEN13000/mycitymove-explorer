import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { ActivityCard } from "@/components/ActivityCard";
import { ActivityFilters } from "@/components/ActivityFilters";
import { useSearchParams } from "react-router-dom";

const activities = [
  {
    title: "Cours de Tennis",
    category: "Sport",
    subcategory: "Tennis",
    location: "Tennis Club Marseille",
    district: "8ème arrondissement",
    time: "10:00",
    dayOfWeek: "Lundi",
    imageUrl: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6",
    clubName: "Tennis Club Marseille",
    clubLogo: "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.8
  },
  {
    title: "Cours de Piano",
    category: "Musique",
    subcategory: "Piano",
    location: "Conservatoire de Marseille",
    price: 35,
    level: "Tous niveaux",
    time: "14:00",
    dayOfWeek: "Mardi",
    imageUrl: "https://images.unsplash.com/photo-1552422535-c45813c61732",
    clubName: "Conservatoire de Marseille",
    clubLogo: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.6
  },
  {
    title: "Séance de Yoga",
    category: "Bien-être",
    subcategory: "Yoga",
    location: "Studio Zen Marseille",
    price: 20,
    level: "Tous niveaux",
    time: "09:00",
    dayOfWeek: "Mercredi",
    imageUrl: "https://images.unsplash.com/photo-1599447421416-3414500d18a5",
    clubName: "Studio Zen",
    clubLogo: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.9
  },
  {
    title: "Cours de Théâtre",
    category: "Art",
    subcategory: "Théâtre",
    location: "Théâtre National de Marseille",
    price: 30,
    level: "Débutant",
    time: "16:00",
    dayOfWeek: "Jeudi",
    imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf",
    clubName: "Théâtre National",
    clubLogo: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.7
  },
  {
    title: "Cours de Natation",
    category: "Sport",
    subcategory: "Natation",
    location: "Piscine Municipale Marseille",
    price: 15,
    level: "Débutant",
    time: "17:00",
    dayOfWeek: "Lundi",
    imageUrl: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50",
    clubName: "Piscine Municipale",
    clubLogo: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.5
  },
  {
    title: "Cours de Guitare",
    category: "Musique",
    subcategory: "Guitare",
    location: "École de Musique Marseille",
    price: 30,
    level: "Intermédiaire",
    time: "18:00",
    dayOfWeek: "Mardi",
    imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1",
    clubName: "École de Musique Marseille",
    clubLogo: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.4
  },
  {
    title: "Cours de Danse Classique",
    category: "Danse",
    subcategory: "Classique",
    location: "Studio de Danse Marseille",
    price: 28,
    level: "Débutant",
    time: "15:00",
    dayOfWeek: "Mercredi",
    imageUrl: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434",
    clubName: "Studio de Danse Marseille",
    clubLogo: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.8
  },
  {
    title: "Atelier Peinture",
    category: "Art",
    subcategory: "Peinture",
    location: "Atelier des Arts Marseille",
    price: 40,
    level: "Tous niveaux",
    time: "14:00",
    dayOfWeek: "Samedi",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
    clubName: "Atelier des Arts Marseille",
    clubLogo: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.6
  },
  {
    title: "Cours de Boxe",
    category: "Sport",
    subcategory: "Boxe",
    location: "Club de Boxe Marseille",
    price: 22,
    level: "Débutant",
    time: "19:00",
    dayOfWeek: "Vendredi",
    imageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed",
    clubName: "Club de Boxe Marseille",
    clubLogo: "https://images.unsplash.com/photo-1509563268479-0f004cf3f58b?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.7
  },
  {
    title: "Méditation Guidée",
    category: "Bien-être",
    subcategory: "Méditation",
    location: "Centre Mindfulness Marseille",
    price: 15,
    level: "Tous niveaux",
    time: "08:00",
    dayOfWeek: "Dimanche",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    clubName: "Centre Mindfulness Marseille",
    clubLogo: "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.9
  },
  {
    title: "Cours de Football",
    category: "Sport",
    subcategory: "Football",
    location: "Stade Vélodrome",
    price: 18,
    level: "Tous niveaux",
    time: "16:00",
    dayOfWeek: "Mercredi",
    imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    clubName: "Stade Vélodrome",
    clubLogo: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.8
  },
  {
    title: "Atelier Photographie",
    category: "Art",
    subcategory: "Photographie",
    location: "Studio Photo Marseille",
    price: 45,
    level: "Intermédiaire",
    time: "10:00",
    dayOfWeek: "Samedi",
    imageUrl: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848",
    clubName: "Studio Photo Marseille",
    clubLogo: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.5
  },
  {
    title: "Cours de Violon",
    category: "Musique",
    subcategory: "Violon",
    location: "Conservatoire de Marseille",
    price: 40,
    level: "Débutant",
    time: "16:30",
    dayOfWeek: "Jeudi",
    imageUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec",
    clubName: "Conservatoire de Marseille",
    clubLogo: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.6
  },
  {
    title: "Pilates",
    category: "Bien-être",
    subcategory: "Pilates",
    location: "Centre Fitness Marseille",
    price: 25,
    level: "Tous niveaux",
    time: "12:00",
    dayOfWeek: "Mardi",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a",
    clubName: "Centre Fitness Marseille",
    clubLogo: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.7
  },
  {
    title: "Cours de Basketball",
    category: "Sport",
    subcategory: "Basketball",
    location: "Palais des Sports Marseille",
    price: 20,
    level: "Débutant",
    time: "17:30",
    dayOfWeek: "Vendredi",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    clubName: "Palais des Sports Marseille",
    clubLogo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.6
  }
];

const marseille_districts = [
  "1er arrondissement",
  "2ème arrondissement",
  "3ème arrondissement",
  "4ème arrondissement",
  "5ème arrondissement",
  "6ème arrondissement",
  "7ème arrondissement",
  "8ème arrondissement",
  "9ème arrondissement",
  "10ème arrondissement",
  "11ème arrondissement",
  "12ème arrondissement",
  "13ème arrondissement",
  "14ème arrondissement",
  "15ème arrondissement",
  "16ème arrondissement",
];

const daysOfWeek = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .replace(/cours\s+de\s+/g, 'cours ')
    .replace(/séance\s+de\s+/g, 'séance ')
    .replace(/atelier\s+de\s+/g, 'atelier ')
    .replace(/\s+de\s+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const Activities = () => {
  const [searchParams] = useSearchParams();
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("best");
  const [filters, setFilters] = useState({
    club: "",
    time: "",
    dayOfWeek: "",
    district: "",
  });

  useEffect(() => {
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const search = searchParams.get("search");

    let result = [...activities];

    // Appliquer les filtres de catégorie et sous-catégorie depuis l'URL
    if (category) {
      result = result.filter(activity => {
        // Gérer les cas spéciaux comme "bien-être"
        const normalizedCategory = activity.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedParam = category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return normalizedCategory === normalizedParam;
      });
    }
    if (subcategory) {
      result = result.filter(activity => {
        const normalizedSubcategory = activity.subcategory.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedParam = subcategory.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return normalizedSubcategory === normalizedParam;
      });
    }

    // Appliquer les autres filtres
    if (filters.club && filters.club !== "all") {
      result = result.filter(activity => activity.clubName === filters.club);
    }
    if (filters.dayOfWeek && filters.dayOfWeek !== "all") {
      result = result.filter(activity => activity.dayOfWeek === filters.dayOfWeek);
    }
    if (filters.time && filters.time !== "all") {
      result = result.filter(activity => activity.time === filters.time);
    }
    if (filters.district && filters.district !== "all") {
      result = result.filter(activity => activity.district === filters.district);
    }

    // Appliquer la recherche
    if (search) {
      setSearchQuery(search);
      const terms = normalizeText(search).split(" ");
      result = result.filter(activity => matchesSearchTerms(activity, terms));
    } else if (searchQuery) {
      const terms = normalizeText(searchQuery).split(" ");
      result = result.filter(activity => matchesSearchTerms(activity, terms));
    }

    // Appliquer le tri par note
    result.sort((a, b) => {
      if (sortOrder === "best") {
        return b.rating - a.rating;
      } else {
        return a.rating - b.rating;
      }
    });

    setFilteredActivities(result);
  }, [filters, searchQuery, sortOrder, searchParams]);

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order);
  };

  const matchesSearchTerms = (activity: any, searchTerms: string[]) => {
    const activityText = normalizeText(`${activity.title} ${activity.category} ${activity.subcategory} ${activity.location}`);
    
    const hasPrefix = searchTerms.some(term => ["cours", "séance", "atelier"].includes(term));
    if (hasPrefix) {
      const activityType = searchTerms.find(term => !["cours", "séance", "atelier"].includes(term));
      if (activityType) {
        return normalizeText(activity.title).includes(activityType) ||
               normalizeText(activity.subcategory).includes(activityType);
      }
    }
    
    return searchTerms.every(term => activityText.includes(term));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-center mb-6">
            Découvrez toutes nos activités
          </h1>
          <SearchBar 
            initialValue={searchQuery}
            onSearch={(value) => setSearchQuery(value)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filtres */}
          <div className="lg:col-span-1">
            <ActivityFilters
              onFiltersChange={handleFiltersChange}
              onSortChange={handleSortChange}
            />
          </div>

          {/* Liste des activités */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity, index) => (
                <ActivityCard
                  key={index}
                  title={activity.title}
                  category={activity.category}
                  location={activity.location}
                  imageUrl={activity.imageUrl}
                  clubName={activity.clubName}
                  clubLogo={activity.clubLogo}
                  rating={activity.rating}
                />
              ))}
            </div>
            {filteredActivities.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Aucune activité ne correspond à vos critères
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Activities;