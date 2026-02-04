import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Upload,
  Save,
  Bell,
  Shield,
  Palette,
} from 'lucide-react';

const ProviderSettings = () => {
  const [company, setCompany] = useState({
    name: 'CloudPro Hosting',
    description: 'Надежный хостинг для вашего бизнеса. Более 5 лет на рынке, 1000+ довольных клиентов.',
    website: 'https://cloudpro.ru',
    email: 'info@cloudpro.ru',
    phone: '+7 (495) 123-45-67',
    address: 'Москва, ул. Примерная, д. 1',
    logo: '',
  });

  const [notifications, setNotifications] = useState({
    newOrders: true,
    reviews: true,
    lowBalance: true,
    systemUpdates: false,
    marketing: false,
  });

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Настройки</h1>
        <p className="text-muted-foreground">Управляйте профилем компании</p>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList>
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="w-4 h-4" />
            Компания
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Уведомления
          </TabsTrigger>
          <TabsTrigger value="branding" className="gap-2">
            <Palette className="w-4 h-4" />
            Брендинг
          </TabsTrigger>
        </TabsList>

        {/* Company Tab */}
        <TabsContent value="company" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Основная информация</CardTitle>
              <CardDescription>Эта информация отображается на вашей публичной странице</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Название компании</Label>
                <Input
                  value={company.name}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Описание</Label>
                <Textarea
                  value={company.description}
                  onChange={(e) => setCompany({ ...company, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Веб-сайт
                  </Label>
                  <Input
                    value={company.website}
                    onChange={(e) => setCompany({ ...company, website: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={company.email}
                    onChange={(e) => setCompany({ ...company, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Телефон
                  </Label>
                  <Input
                    value={company.phone}
                    onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Адрес
                  </Label>
                  <Input
                    value={company.address}
                    onChange={(e) => setCompany({ ...company, address: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="gap-2">
              <Save className="w-4 h-4" />
              Сохранить изменения
            </Button>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Уведомления</CardTitle>
              <CardDescription>Настройте, какие уведомления вы хотите получать</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Новые заказы</p>
                  <p className="text-sm text-muted-foreground">Уведомления о новых заказах клиентов</p>
                </div>
                <Switch
                  checked={notifications.newOrders}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, newOrders: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Отзывы</p>
                  <p className="text-sm text-muted-foreground">Уведомления о новых отзывах</p>
                </div>
                <Switch
                  checked={notifications.reviews}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, reviews: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Низкий баланс клиентов</p>
                  <p className="text-sm text-muted-foreground">Оповещения о клиентах с низким балансом</p>
                </div>
                <Switch
                  checked={notifications.lowBalance}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, lowBalance: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Обновления системы</p>
                  <p className="text-sm text-muted-foreground">Новости и обновления платформы</p>
                </div>
                <Switch
                  checked={notifications.systemUpdates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Маркетинговые рассылки</p>
                  <p className="text-sm text-muted-foreground">Советы и лучшие практики</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Логотип</CardTitle>
              <CardDescription>Загрузите логотип вашей компании (рекомендуется 200x200px)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={company.logo} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                    CP
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Загрузить изображение
                  </Button>
                  <p className="text-xs text-muted-foreground">PNG, JPG до 2MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Цветовая схема</CardTitle>
              <CardDescription>Настройте цвета для вашей публичной страницы</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Основной цвет</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-primary border" />
                    <Input defaultValue="#3B82F6" className="font-mono text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Акцентный цвет</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-secondary border" />
                    <Input defaultValue="#10B981" className="font-mono text-sm" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="gap-2">
              <Save className="w-4 h-4" />
              Сохранить изменения
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderSettings;
