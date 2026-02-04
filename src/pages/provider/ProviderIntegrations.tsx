import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Link2,
  Server,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Settings,
  ExternalLink,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  serversCount?: number;
  url?: string;
  apiKey?: string;
}

const ProviderIntegrations = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'vmmanager',
      name: 'VMmanager',
      description: 'ISPsystem панель виртуализации',
      logo: '🖥️',
      status: 'connected',
      lastSync: '5 минут назад',
      serversCount: 423,
      url: 'https://vm.cloudpro.ru',
    },
    {
      id: 'proxmox',
      name: 'Proxmox VE',
      description: 'Open-source платформа виртуализации',
      logo: '🔷',
      status: 'disconnected',
    },
    {
      id: 'billmanager',
      name: 'BILLmanager',
      description: 'Биллинговая система ISPsystem',
      logo: '💳',
      status: 'error',
      lastSync: '2 часа назад',
      url: 'https://bill.cloudpro.ru',
    },
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleTestConnection = async () => {
    setIsTesting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsTesting(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Подключено
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-200 gap-1">
            <XCircle className="w-3 h-3" />
            Ошибка
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="gap-1">
            <XCircle className="w-3 h-3" />
            Не подключено
          </Badge>
        );
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Интеграции</h1>
        <p className="text-muted-foreground">
          Подключите панели управления для автоматизации
        </p>
      </div>

      {/* Info Banner */}
      <Card className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800">
        <CardContent className="p-4 flex items-start gap-3">
          <Link2 className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Автоматическая синхронизация
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              После подключения панели, серверы будут автоматически синхронизироваться с маркетплейсом
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Integrations List */}
      <div className="space-y-4">
        {integrations.map((integration) => (
          <Card key={integration.id} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{integration.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold">{integration.name}</h3>
                    {getStatusBadge(integration.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {integration.description}
                  </p>

                  {integration.status === 'connected' && (
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        <Server className="w-4 h-4 inline mr-1" />
                        {integration.serversCount} серверов
                      </span>
                      <span className="text-muted-foreground">
                        <RefreshCw className="w-4 h-4 inline mr-1" />
                        {integration.lastSync}
                      </span>
                      {integration.url && (
                        <a
                          href={integration.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Открыть панель
                        </a>
                      )}
                    </div>
                  )}

                  {integration.status === 'error' && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertTriangle className="w-4 h-4" />
                      Ошибка подключения. Проверьте настройки API.
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {integration.status === 'connected' && (
                    <Button variant="outline" size="sm" className="gap-2">
                      <RefreshCw className="w-4 h-4" />
                      Синхронизировать
                    </Button>
                  )}
                  <Dialog open={isConfigOpen && selectedIntegration?.id === integration.id} onOpenChange={setIsConfigOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={integration.status === 'disconnected' ? 'default' : 'outline'}
                        size="sm"
                        className="gap-2"
                        onClick={() => setSelectedIntegration(integration)}
                      >
                        <Settings className="w-4 h-4" />
                        {integration.status === 'disconnected' ? 'Подключить' : 'Настройки'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                          <span className="text-2xl">{integration.logo}</span>
                          {integration.name}
                        </DialogTitle>
                        <DialogDescription>
                          Настройте подключение к {integration.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label>URL панели</Label>
                          <Input
                            placeholder="https://panel.example.com"
                            defaultValue={integration.url}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>API ключ</Label>
                          <Input
                            type="password"
                            placeholder="••••••••••••••••"
                            defaultValue={integration.apiKey}
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                          <div>
                            <p className="text-sm font-medium">Автосинхронизация</p>
                            <p className="text-xs text-muted-foreground">Каждые 5 минут</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex gap-3 pt-4">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={handleTestConnection}
                            disabled={isTesting}
                          >
                            {isTesting ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Проверка...
                              </>
                            ) : (
                              'Проверить соединение'
                            )}
                          </Button>
                          <Button className="flex-1" onClick={() => setIsConfigOpen(false)}>
                            Сохранить
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Custom Integration */}
      <Card className="mt-6 border-dashed">
        <CardContent className="p-6 text-center">
          <Link2 className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          <h3 className="font-semibold mb-1">Нужна другая интеграция?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Свяжитесь с нами для подключения вашей панели управления
          </p>
          <Button variant="outline">Связаться с поддержкой</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderIntegrations;
