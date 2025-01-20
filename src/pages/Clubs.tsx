import { useState } from 'react';
import { Header } from "../components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, Activity, Heart } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

// Types
interface Club {
  id: string;
  name: string;
  logo: string;
  categories: string[];
  location: string;
  district: string;
  rating: number;
  activitiesCount: number;
}

// Mock data
const mockClubs: Club[] = [
  {
    id: '1',
    name: 'Club Sportif Marseille',
    logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=60',
    categories: ['Football', 'Basketball'],
    location: 'Centre-ville',
    district: '13001',
    rating: 4.5,
    activitiesCount: 12
  },
  {
    id: '2',
    name: 'Tennis Club Phocéen',
    logo: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&auto=format&fit=crop&q=60',
    categories: ['Tennis'],
    location: 'Prado',
    district: '13008',
    rating: 4.8,
    activitiesCount: 8
  },
  {
    id: '3',
    name: 'Club Nautique Marseillais',
    logo: 'https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?w=800&auto=format&fit=crop&q=60',
    categories: ['Natation'],
    location: 'Vieux-Port',
    district: '13001',
    rating: 4.3,
    activitiesCount: 15
  },
  {
    id: '4',
    name: 'Yoga & Bien-être',
    logo: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800&auto=format&fit=crop&q=60',
    categories: ['Yoga'],
    location: 'Castellane',
    district: '13006',
    rating: 4.9,
    activitiesCount: 20
  },
  {
    id: '5',
    name: 'Boxing Club Marseille',
    logo: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&auto=format&fit=crop&q=60',
    categories: ['Boxe'],
    location: 'La Joliette',
    district: '13002',
    rating: 4.6,
    activitiesCount: 10
  },
  {
    id: '6',
    name: 'Dance Studio 13',
    logo: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=800&auto=format&fit=crop&q=60',
    categories: ['Danse'],
    location: 'Baille',
    district: '13005',
    rating: 4.7,
    activitiesCount: 18
  }
];

const ClubCard = ({ club }: { club: Club }) => {
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    // Si l'utilisateur n'est pas connecté
    if (!localStorage.getItem('user')) {
      toast({
        title: "Erreur lors de l'inscription",
        description: "Vous devez être connecté pour ajouter un club en favori",
        variant: "destructive",
      });
      return;
    }

    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
      description: `${club.name} a été ${isFavorite ? "retiré de" : "ajouté à"} vos favoris`,
    });
  };

  const getDistrictName = (district: string) => {
    const number = parseInt(district.slice(-2));
    return number === 1 ? '1er' : `${number}ème`;
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-4">
          <img 
            src={club.logo} 
            alt={`${club.name} logo`} 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <CardTitle className="text-xl">{club.name}</CardTitle>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin size={16} />
              <span>{club.location} ({getDistrictName(club.district)})</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          {club.categories.map((category) => (
            <span 
              key={category}
              className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {category}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="fill-yellow-400 text-yellow-400" size={16} />
            <span>{club.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Activity size={16} />
            <span>{club.activitiesCount} activités</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Voir plus</Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleFavoriteClick}
        >
          <Heart 
            className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} 
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

const Clubs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  // Filtrer les clubs
  const filteredClubs = mockClubs.filter(club => {
    const matchesSearch = searchQuery === '' || 
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase())) ||
      club.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || 
      club.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase());

    const matchesDistrict = selectedDistrict === 'all' || 
      club.district === selectedDistrict;

    return matchesSearch && matchesCategory && matchesDistrict;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8 text-[#102A43]">Clubs à Marseille</h1>
        
        {/* Filtres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Input
            placeholder="Rechercher un club..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              <SelectItem value="football">Football</SelectItem>
              <SelectItem value="basketball">Basketball</SelectItem>
              <SelectItem value="tennis">Tennis</SelectItem>
              <SelectItem value="natation">Natation</SelectItem>
              <SelectItem value="yoga">Yoga</SelectItem>
              <SelectItem value="boxe">Boxe</SelectItem>
              <SelectItem value="danse">Danse</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger>
              <SelectValue placeholder="Arrondissement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les arrondissements</SelectItem>
              <SelectItem value="13001">1er - Vieux Port, Le Panier</SelectItem>
              <SelectItem value="13002">2ème - La Joliette, Arenc</SelectItem>
              <SelectItem value="13003">3ème - Belle de Mai, Saint-Mauront</SelectItem>
              <SelectItem value="13004">4ème - Les Chartreux, Les Cinq Avenues</SelectItem>
              <SelectItem value="13005">5ème - Le Camas, La Conception</SelectItem>
              <SelectItem value="13006">6ème - Castellane, Notre-Dame du Mont</SelectItem>
              <SelectItem value="13007">7ème - Le Pharo, Saint-Victor</SelectItem>
              <SelectItem value="13008">8ème - Le Prado, Les Goudes</SelectItem>
              <SelectItem value="13009">9ème - Mazargues, La Pointe Rouge</SelectItem>
              <SelectItem value="13010">10ème - Saint-Loup, La Capelette</SelectItem>
              <SelectItem value="13011">11ème - La Valentine, Les Accates</SelectItem>
              <SelectItem value="13012">12ème - Les Trois Lucs, Saint-Barnabé</SelectItem>
              <SelectItem value="13013">13ème - Château-Gombert, La Rose</SelectItem>
              <SelectItem value="13014">14ème - Le Canet, Les Arnavaux</SelectItem>
              <SelectItem value="13015">15ème - Les Crottes, La Cabucelle</SelectItem>
              <SelectItem value="13016">16ème - L'Estaque, Saint-Henri</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Liste des clubs */}
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Aucun club ne correspond à vos critères de recherche
          </div>
        )}
      </main>
      <Toaster />
    </div>
  );
};

export default Clubs; 