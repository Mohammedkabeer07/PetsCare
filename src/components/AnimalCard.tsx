import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Info } from 'lucide-react';

interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  description: string;
  imageUrl: string;
  status: 'available' | 'adopted';
}

export function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <Card className="overflow-hidden group bg-dark-surface border-dark-border rounded-none transition-all duration-500 hover:border-gold/30">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={animal.imageUrl || `https://picsum.photos/seed/${animal.name}/800/600`}
          alt={animal.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 right-6">
          <Badge className={`rounded-none px-3 py-1 text-[10px] uppercase tracking-widest border-none ${animal.status === 'available' ? 'bg-gold text-black' : 'bg-muted-text text-white'}`}>
            {animal.status}
          </Badge>
        </div>
      </div>
      <CardContent className="p-8">
        <div className="flex justify-between items-baseline mb-4">
          <h3 className="text-2xl font-serif font-light text-white tracking-wide">{animal.name}</h3>
          <span className="text-gold text-xs font-serif italic">{animal.age} years</span>
        </div>
        <p className="text-[11px] text-muted-text uppercase tracking-[0.2em] mb-6">
          {animal.breed} • {animal.species}
        </p>
        <p className="text-muted-text text-sm leading-relaxed font-light line-clamp-3">
          {animal.description}
        </p>
      </CardContent>
      <CardFooter className="px-8 pb-8 pt-0 flex gap-4">
        <Button variant="outline" className="flex-1 rounded-none border-dark-border text-muted-text hover:border-gold hover:text-gold transition-all text-[10px] uppercase tracking-widest h-12">
          Details
        </Button>
        <Button className="flex-1 bg-transparent border border-gold text-gold hover:bg-gold hover:text-black transition-all rounded-none text-[10px] uppercase tracking-widest h-12">
          Adopt
        </Button>
      </CardFooter>
    </Card>
  );
}
