import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MapPin,
  Plus,
  Server,
  Zap,
  Network,
  MoreVertical,
  Pencil,
  Trash2,
  Globe,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Location {
  id: number;
  name: string;
  city: string;
  country: string;
  datacenter: string;
  serversTotal: number;
  serversActive: number;
  bandwidth: string;
  status: 'active' | 'maintenance' | 'offline';
}

const ProviderLocations = () => {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: 1,
      name: 'М9',
      city: 'Москва',
      country: 'Россия',
      datacenter: 'DataLine M9',
      serversTotal: 450,
      serversActive: 423,
      bandwidth: '100 Гбит/с',
      status: 'active',
    },
    {
      id: 2,
      name: 'Цветочная',
      city: 'Санкт-Петербург',
      country: 'Россия',
      datacenter: 'Selectel SPb',
      serversTotal: 280,
      serversActive: 265,
      bandwidth: '40 Гбит/с',
      status: 'active',
    },
    {
      id: 3,
      name: 'Франкфурт',
      city: 'Франкфурт',
      country: 'Германия',
      datacenter: 'Equinix FR5',
      serversTotal: 180,
      serversActive: 172,
      bandwidth: '100 Гбит/с',
      status: 'active',
    },
    {
      id: 4,
      name: 'Амстердам',
      city: 'Амстердам',
      country: 'Нидерланды',
      datacenter: 'NL-IX',
      serversTotal: 120,
      serversActive: 0,
      bandwidth: '40 Гбит/с',
      status: 'maintenance',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLocation, setNewLocation] = useState({
    name: '',
    city: '',
    country: 'Россия',
    datacenter: '',
    bandwidth: '',
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Активна</Badge>;
      case 'maintenance':
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">Обслуживание</Badge>;
      case 'offline':
        return <Badge className="bg-red-500/10 text-red-600 border-red-200">Офлайн</Badge>;
      default:
        return null;
    }
  };

  const handleAddLocation = () => {
    const newId = Math.max(...locations.map(l => l.id)) + 1;
    setLocations([...locations, {
      ...newLocation,
      id: newId,
      serversTotal: 0,
      serversActive: 0,
      status: 'active',
    }]);
    setNewLocation({ name: '', city: '', country: 'Россия', datacenter: '', bandwidth: '' });
    setIsDialogOpen(false);
  };

  const handleDeleteLocation = (id: number) => {
    setLocations(locations.filter(l => l.id !== id));
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Локации</h1>
          <p className="text-muted-foreground">Управляйте дата-центрами и локациями</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Добавить локацию
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новая локация</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Название</Label>
                  <Input
                    placeholder="М10"
                    value={newLocation.name}
                    onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Город</Label>
                  <Input
                    placeholder="Москва"
                    value={newLocation.city}
                    onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Страна</Label>
                <Select
                  value={newLocation.country}
                  onValueChange={(value) => setNewLocation({ ...newLocation, country: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Россия">Россия</SelectItem>
                    <SelectItem value="Германия">Германия</SelectItem>
                    <SelectItem value="Нидерланды">Нидерланды</SelectItem>
                    <SelectItem value="Финляндия">Финляндия</SelectItem>
                    <SelectItem value="США">США</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Дата-центр</Label>
                <Input
                  placeholder="DataLine M10"
                  value={newLocation.datacenter}
                  onChange={(e) => setNewLocation({ ...newLocation, datacenter: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Канал</Label>
                <Input
                  placeholder="100 Гбит/с"
                  value={newLocation.bandwidth}
                  onChange={(e) => setNewLocation({ ...newLocation, bandwidth: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  Отмена
                </Button>
                <Button className="flex-1" onClick={handleAddLocation}>
                  Добавить
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Locations Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {locations.map((location) => (
          <Card key={location.id} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{location.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {location.city}, {location.country}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(location.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="w-4 h-4 mr-2" />
                      Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDeleteLocation(location.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                <Globe className="w-4 h-4 inline mr-1" />
                {location.datacenter}
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <Server className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-lg font-bold">{location.serversActive}</p>
                  <p className="text-xs text-muted-foreground">из {location.serversTotal}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <Zap className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-lg font-bold">{Math.round((location.serversActive / location.serversTotal) * 100) || 0}%</p>
                  <p className="text-xs text-muted-foreground">загрузка</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <Network className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-lg font-bold">{location.bandwidth.split(' ')[0]}</p>
                  <p className="text-xs text-muted-foreground">Гбит/с</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProviderLocations;
