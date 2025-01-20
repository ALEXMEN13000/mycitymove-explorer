import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface ActivityCardProps {
  id?: string;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  clubLogo: string;
  clubName: string;
  rating: number;
}

export const ActivityCard = ({ 
  id, 
  title, 
  category, 
  location, 
  imageUrl,
  clubLogo,
  clubName,
  rating
}: ActivityCardProps) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    const urlId = title.toLowerCase()
      .replace(/séance de /g, 'seance-de-')
      .replace(/cours de /g, 'cours-de-')
      .replace(/ /g, '-')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    navigate(`/activity/${urlId}`);
  };

  const handleRatingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const urlId = title.toLowerCase()
      .replace(/séance de /g, 'seance-de-')
      .replace(/cours de /g, 'cours-de-')
      .replace(/ /g, '-')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    navigate(`/activity/${urlId}/reviews`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge 
            className="bg-white text-black flex items-center gap-1 cursor-pointer hover:bg-gray-100"
            onClick={handleRatingClick}
          >
            <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
            {rating.toFixed(1)}
          </Badge>
          <Badge className="bg-accent">{category}</Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-gray-500 line-clamp-1">{location}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button 
          variant="outline" 
          className="flex-1 mr-4"
          onClick={handleDetailsClick}
        >
          Voir les détails
        </Button>
        <Avatar className="h-10 w-10 border-2 border-white shadow-md" title={clubName}>
          <AvatarImage src={clubLogo} alt={clubName} />
        </Avatar>
      </CardFooter>
    </Card>
  );
};