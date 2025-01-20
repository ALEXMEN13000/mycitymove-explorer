import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Star, ArrowUpDown } from 'lucide-react'

interface ActivityFiltersProps {
  onFiltersChange: (filters: any) => void
  onSortChange: (sort: string) => void
}

export function ActivityFilters({ onFiltersChange, onSortChange }: ActivityFiltersProps) {
  const [filters, setFilters] = useState({
    club: 'all',
    time: 'all',
    dayOfWeek: 'all',
    district: 'all',
  })

  const [sortOrder, setSortOrder] = useState('best')

  // Générer les horaires par tranches de 30 minutes
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 6; hour < 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        slots.push(time)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  const districts = [
    "1er arrondissement", "2ème arrondissement", "3ème arrondissement",
    "4ème arrondissement", "5ème arrondissement", "6ème arrondissement",
    "7ème arrondissement", "8ème arrondissement", "9ème arrondissement",
    "10ème arrondissement", "11ème arrondissement", "12ème arrondissement",
    "13ème arrondissement", "14ème arrondissement", "15ème arrondissement",
    "16ème arrondissement"
  ]

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleSortClick = () => {
    const newOrder = sortOrder === 'best' ? 'worst' : 'best'
    setSortOrder(newOrder)
    onSortChange(newOrder)
  }

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filtres</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSortClick}
          className="flex items-center gap-2"
        >
          <Star className="h-4 w-4" fill={sortOrder === 'best' ? 'currentColor' : 'none'} />
          {sortOrder === 'best' ? 'Mieux notés' : 'Moins bien notés'}
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Arrondissement</Label>
          <Select
            value={filters.district}
            onValueChange={(value) => handleFilterChange('district', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir un arrondissement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les arrondissements</SelectItem>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Jour</Label>
          <Select
            value={filters.dayOfWeek}
            onValueChange={(value) => handleFilterChange('dayOfWeek', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir un jour" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les jours</SelectItem>
              {daysOfWeek.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Horaire</Label>
          <Select
            value={filters.time}
            onValueChange={(value) => handleFilterChange('time', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir un horaire" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les horaires</SelectItem>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Club</Label>
          <Select
            value={filters.club}
            onValueChange={(value) => handleFilterChange('club', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir un club" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les clubs</SelectItem>
              <SelectItem value="zen-studio">Zen Studio</SelectItem>
              <SelectItem value="power-gym">Power Gym</SelectItem>
              {/* À compléter avec la liste réelle des clubs */}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
} 