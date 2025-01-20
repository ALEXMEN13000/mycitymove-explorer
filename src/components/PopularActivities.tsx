import { Link } from "react-router-dom";

const activities = [
  {
    id: 1,
    title: "Cours de Tennis",
    location: "Tennis Club Marseille",
    price: "25€ par séance",
    category: "Sport",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6",
    link: "/activity/cours-de-tennis"
  },
  {
    id: 2,
    title: "Cours de Piano",
    location: "Conservatoire de Marseille",
    price: "35€ par heure",
    category: "Musique",
    image: "https://images.unsplash.com/photo-1552422535-c45813c61732",
    link: "/activity/cours-de-piano"
  },
  {
    id: 3,
    title: "Cours de Théâtre",
    location: "Théâtre National de Marseille",
    price: "30€ par séance",
    category: "Art",
    image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5",
    link: "/activity/cours-de-theatre"
  }
];

export function PopularActivities() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-[#102A43]">Activités populaires</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative aspect-[4/3]">
              <img 
                src={activity.image} 
                alt={activity.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-black/75 text-white px-4 py-1 rounded-full text-sm">
                  {activity.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-[#102A43]">{activity.title}</h3>
              <p className="text-gray-600 mb-4">{activity.location}</p>
              <p className="text-lg font-semibold mb-6 text-[#102A43]">{activity.price}</p>
              <Link 
                to={activity.link}
                className="block w-full bg-[#102A43] text-white text-center py-3 rounded-xl hover:bg-[#1A365D] transition-colors"
              >
                Voir les détails
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 