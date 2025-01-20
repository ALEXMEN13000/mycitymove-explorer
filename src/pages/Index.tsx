import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ActivityCard } from "@/components/ActivityCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Sélection des activités populaires
const popularActivities = [
  {
    title: "Séance de Yoga",
    category: "Bien-être",
    location: "Studio Zen Marseille",
    imageUrl: "https://images.unsplash.com/photo-1599447421416-3414500d18a5",
    clubName: "Studio Zen",
    clubLogo: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.9
  },
  {
    title: "Cours de Tennis",
    category: "Sport",
    location: "Tennis Club Marseille",
    imageUrl: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6",
    clubName: "Tennis Club Marseille",
    clubLogo: "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.8
  },
  {
    title: "Cours de Théâtre",
    category: "Art",
    location: "Théâtre National de Marseille",
    imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf",
    clubName: "Théâtre National",
    clubLogo: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=100&h=100&fit=crop&auto=format&q=80",
    rating: 4.7
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-20 md:pt-24 pb-12">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#102A43] leading-tight">
            Trouvez votre club idéal à Marseille
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez les meilleures activités sportives et culturelles près de chez vous
          </p>
          <div className="px-4 md:px-0 mb-12">
            <SearchBar />
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center px-4 md:px-12 mb-16">
            <Button 
              asChild 
              size="lg" 
              className="bg-[#4299E1] hover:bg-[#3182CE] text-lg py-6 px-8 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <Link to="/register" className="flex items-center justify-center gap-2">
                Inscris-toi dès maintenant
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg"
              className="bg-[#4299E1] hover:bg-[#3182CE] text-lg py-6 px-8 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <Link to="/club/register" className="flex items-center justify-center gap-2">
                Propose des activités d'exception
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="space-y-8 md:space-y-12">
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Catégories
            </h2>
            <CategoryGrid />
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
              Activités populaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularActivities.map((activity, index) => (
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
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;