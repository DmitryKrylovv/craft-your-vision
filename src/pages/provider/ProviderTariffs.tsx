import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Server,
  Plus,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  MoreVertical,
  Pencil,
  Trash2,
  Copy,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Tariff {
  id: number;
  name: string;
  type: 'vds' | 'dedicated' | 'cloud';
  cpu: number;
  ram: number;
  disk: number;
  diskType: 'SSD' | 'NVMe' | 'HDD';
  bandwidth: number;
  price: number;
  location: string;
  isActive: boolean;
  ordersCount: number;
}

const ProviderTariffs = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>([
    { id: 1, name: 'VDS Start', type: 'vds', cpu: 1, ram: 2, disk: 20, diskType: 'NVMe', bandwidth: 100, price: 299, location: 'Москва', isActive: true, ordersCount: 156 },
    { id: 2, name: 'VDS Pro', type: 'vds', cpu: 4, ram: 8, disk: 80, diskType: 'NVMe', bandwidth: 200, price: 890, location: 'Москва', isActive: true, ordersCount: 234 },
    { id: 3, name: 'VDS Business', type: 'vds', cpu: 8, ram: 16, disk: 160, diskType: 'NVMe', bandwidth: 500, price: 1790, location: 'Москва', isActive: true, ordersCount: 89 },
    { id: 4, name: 'VDS Enterprise', type: 'vds', cpu: 16, ram: 32, disk: 320, diskType: 'NVMe', bandwidth: 1000, price: 3490, location: 'Москва', isActive: false, ordersCount: 23 },
    { id: 5, name: 'Cloud S', type: 'cloud', cpu: 2, ram: 4, disk: 40, diskType: 'SSD', bandwidth: 100, price: 499, location: 'Франкфурт', isActive: true, ordersCount: 67 },
    { id: 6, name: 'Cloud M', type: 'cloud', cpu: 4, ram: 8, disk: 80, diskType: 'SSD', bandwidth: 200, price: 899, location: 'Франкфурт', isActive: true, ordersCount: 45 },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const filteredTariffs = activeTab === 'all' 
    ? tariffs 
    : tariffs.filter(t => t.type === activeTab);

  const toggleTariffStatus = (id: number) => {
    setTariffs(tariffs.map(t => 
      t.id === id ? { ...t, isActive: !t.isActive } : t
    ));
  };

  const deleteTariff = (id: number) => {
    setTariffs(tariffs.filter(t => t.id !== id));
  };

  const duplicateTariff = (tariff: Tariff) => {
    const newId = Math.max(...tariffs.map(t => t.id)) + 1;
    setTariffs([...tariffs, {
      ...tariff,
      id: newId,
      name: `${tariff.name} (копия)`,
      ordersCount: 0,
    }]);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Тарифы</h1>
          <p className="text-muted-foreground">Управляйте тарифными планами</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Новый тариф
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Создать тариф</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Название</Label>
                  <Input placeholder="VDS Ultra" />
                </div>
                <div className="space-y-2">
                  <Label>Тип</Label>
                  <Select defaultValue="vds">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vds">VDS</SelectItem>
                      <SelectItem value="cloud">Cloud</SelectItem>
                      <SelectItem value="dedicated">Dedicated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>vCPU</Label>
                  <Input type="number" placeholder="4" />
                </div>
                <div className="space-y-2">
                  <Label>RAM (GB)</Label>
                  <Input type="number" placeholder="8" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Диск (GB)</Label>
                  <Input type="number" placeholder="80" />
                </div>
                <div className="space-y-2">
                  <Label>Тип диска</Label>
                  <Select defaultValue="nvme">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nvme">NVMe</SelectItem>
                      <SelectItem value="ssd">SSD</SelectItem>
                      <SelectItem value="hdd">HDD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Канал (Мбит/с)</Label>
                  <Input type="number" placeholder="200" />
                </div>
                <div className="space-y-2">
                  <Label>Цена (₽/мес)</Label>
                  <Input type="number" placeholder="890" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Локация</Label>
                <Select defaultValue="moscow">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moscow">Москва (М9)</SelectItem>
                    <SelectItem value="spb">Санкт-Петербург</SelectItem>
                    <SelectItem value="frankfurt">Франкфурт</SelectItem>
                    <SelectItem value="amsterdam">Амстердам</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  Отмена
                </Button>
                <Button className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  Создать
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Все ({tariffs.length})</TabsTrigger>
          <TabsTrigger value="vds">VDS ({tariffs.filter(t => t.type === 'vds').length})</TabsTrigger>
          <TabsTrigger value="cloud">Cloud ({tariffs.filter(t => t.type === 'cloud').length})</TabsTrigger>
          <TabsTrigger value="dedicated">Dedicated ({tariffs.filter(t => t.type === 'dedicated').length})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Tariffs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTariffs.map((tariff) => (
          <Card key={tariff.id} className={`border-0 shadow-sm ${!tariff.isActive ? 'opacity-60' : ''}`}>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  tariff.type === 'vds' ? 'bg-blue-500/10' :
                  tariff.type === 'cloud' ? 'bg-purple-500/10' : 'bg-amber-500/10'
                }`}>
                  <Server className={`w-5 h-5 ${
                    tariff.type === 'vds' ? 'text-blue-600' :
                    tariff.type === 'cloud' ? 'text-purple-600' : 'text-amber-600'
                  }`} />
                </div>
                <div>
                  <CardTitle className="text-base">{tariff.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{tariff.location}</p>
                </div>
              </div>
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
                  <DropdownMenuItem onClick={() => duplicateTariff(tariff)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Дублировать
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleTariffStatus(tariff.id)}>
                    {tariff.isActive ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Скрыть
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Показать
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => deleteTariff(tariff.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Cpu className="w-4 h-4 text-muted-foreground" />
                  <span>{tariff.cpu} vCPU</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MemoryStick className="w-4 h-4 text-muted-foreground" />
                  <span>{tariff.ram} GB RAM</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HardDrive className="w-4 h-4 text-muted-foreground" />
                  <span>{tariff.disk} GB {tariff.diskType}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Network className="w-4 h-4 text-muted-foreground" />
                  <span>{tariff.bandwidth} Мбит/с</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t">
                <div>
                  <p className="text-2xl font-bold">{tariff.price} ₽</p>
                  <p className="text-xs text-muted-foreground">/месяц</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{tariff.ordersCount}</p>
                  <p className="text-xs text-muted-foreground">заказов</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProviderTariffs;
