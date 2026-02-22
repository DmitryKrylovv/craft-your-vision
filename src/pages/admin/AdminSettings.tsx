import { useState } from 'react';
import {
  Settings,
  Globe,
  Mail,
  Shield,
  Database,
  Bell,
  Palette,
  Save,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Настройки</h1>
        <p className="text-muted-foreground text-sm mt-1">Конфигурация платформы</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="gap-1.5"><Globe className="w-4 h-4" />Общие</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5"><Bell className="w-4 h-4" />Уведомления</TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5"><Shield className="w-4 h-4" />Безопасность</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Основные настройки</CardTitle>
              <CardDescription>Общая конфигурация платформы</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Название платформы</Label>
                  <Input defaultValue="Plooza" />
                </div>
                <div className="space-y-2">
                  <Label>Домен</Label>
                  <Input defaultValue="plooza.com" />
                </div>
                <div className="space-y-2">
                  <Label>Email поддержки</Label>
                  <Input defaultValue="support@plooza.com" />
                </div>
                <div className="space-y-2">
                  <Label>Email администратора</Label>
                  <Input defaultValue="admin@plooza.com" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Модерация</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground">Автомодерация отзывов</p>
                      <p className="text-xs text-muted-foreground">AI проверка отзывов перед публикацией</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground">Премодерация статей</p>
                      <p className="text-xs text-muted-foreground">Статьи требуют одобрения перед публикацией</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground">Автоверификация провайдеров</p>
                      <p className="text-xs text-muted-foreground">Автоматическое одобрение провайдеров по критериям</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="gap-2"><Save className="w-4 h-4" />Сохранить</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Уведомления</CardTitle>
              <CardDescription>Настройка email и push-уведомлений</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Новые регистрации', desc: 'Уведомлять о новых пользователях', checked: false },
                { label: 'Заявки провайдеров', desc: 'Уведомлять о новых заявках', checked: true },
                { label: 'Жалобы', desc: 'Уведомлять о жалобах пользователей', checked: true },
                { label: 'Статьи на модерации', desc: 'Уведомлять о новых статьях', checked: true },
                { label: 'Критические ошибки', desc: 'Уведомлять об ошибках платформы', checked: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.checked} />
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <Button className="gap-2"><Save className="w-4 h-4" />Сохранить</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-base">Безопасность</CardTitle>
              <CardDescription>Настройки безопасности платформы</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: '2FA для админов', desc: 'Обязательная двухфакторная аутентификация', checked: true },
                { label: 'Rate limiting', desc: 'Ограничение запросов API', checked: true },
                { label: 'IP whitelist', desc: 'Ограничить доступ к админке по IP', checked: false },
                { label: 'Логирование действий', desc: 'Запись всех действий администраторов', checked: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.checked} />
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <Button className="gap-2"><Save className="w-4 h-4" />Сохранить</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
