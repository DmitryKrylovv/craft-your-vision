import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Star,
  MessageSquare,
  Send,
  ThumbsUp,
  ThumbsDown,
  Clock,
  CheckCircle2,
  Filter,
} from 'lucide-react';

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  tariff: string;
  replied: boolean;
  reply?: string;
  replyDate?: string;
  helpful: number;
}

const ProviderReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      author: 'Алексей Михайлов',
      avatar: 'АМ',
      rating: 5,
      text: 'Отличный хостинг! Пользуюсь уже год, ни разу не было проблем. Техподдержка отвечает быстро, все вопросы решаются оперативно. Рекомендую!',
      date: '2 часа назад',
      tariff: 'VDS Pro 8GB',
      replied: false,
      helpful: 12,
    },
    {
      id: 2,
      author: 'Мария Козлова',
      avatar: 'МК',
      rating: 4,
      text: 'Хорошие тарифы, стабильная работа серверов. Единственное пожелание — добавить больше локаций в Европе.',
      date: '1 день назад',
      tariff: 'VDS Start 2GB',
      replied: true,
      reply: 'Спасибо за отзыв! Мы работаем над расширением сети и планируем открыть локации в Амстердаме и Лондоне в ближайшие месяцы.',
      replyDate: '12 часов назад',
      helpful: 8,
    },
    {
      id: 3,
      author: 'Дмитрий Волков',
      avatar: 'ДВ',
      rating: 2,
      text: 'Были серьезные проблемы с сетью в московском ДЦ на прошлой неделе. Простой составил около 4 часов, что критично для моего бизнеса.',
      date: '3 дня назад',
      tariff: 'VDS Business 16GB',
      replied: false,
      helpful: 3,
    },
    {
      id: 4,
      author: 'Анна Сидорова',
      avatar: 'АС',
      rating: 5,
      text: 'Переехали с другого хостинга и очень довольны! Миграцию сделали бесплатно, всё работает отлично.',
      date: '5 дней назад',
      tariff: 'Cloud M',
      replied: true,
      reply: 'Благодарим за доверие! Рады, что переезд прошел гладко.',
      replyDate: '4 дня назад',
      helpful: 15,
    },
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState('');

  const filteredReviews = activeTab === 'all' 
    ? reviews 
    : activeTab === 'pending' 
      ? reviews.filter(r => !r.replied)
      : reviews.filter(r => r.replied);

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const pendingCount = reviews.filter(r => !r.replied).length;

  const handleReply = () => {
    if (!selectedReview || !replyText.trim()) return;
    
    setReviews(reviews.map(r => 
      r.id === selectedReview.id 
        ? { ...r, replied: true, reply: replyText, replyDate: 'Только что' }
        : r
    ));
    setReplyText('');
    setSelectedReview(null);
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-500 fill-amber-500' : 'text-muted'}`}
        />
      ))}
    </div>
  );

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Отзывы</h1>
          <p className="text-muted-foreground">Управляйте отзывами клиентов</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="text-2xl font-bold">{averageRating}</span>
            </div>
            <p className="text-xs text-muted-foreground">Средний рейтинг</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold mb-1">{reviews.length}</p>
            <p className="text-xs text-muted-foreground">Всего отзывов</p>
          </CardContent>
        </Card>
        <Card className={`border-0 shadow-sm ${pendingCount > 0 ? 'bg-amber-50 dark:bg-amber-950/30' : ''}`}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold mb-1">{pendingCount}</p>
            <p className="text-xs text-muted-foreground">Без ответа</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Все ({reviews.length})</TabsTrigger>
          <TabsTrigger value="pending" className="gap-1">
            Без ответа
            {pendingCount > 0 && (
              <Badge variant="destructive" className="ml-1 h-5 px-1.5 text-xs">
                {pendingCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="replied">С ответом</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                  {review.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium">{review.author}</span>
                    {renderStars(review.rating)}
                    {!review.replied && (
                      <Badge className="bg-amber-500/10 text-amber-600 border-amber-200 gap-1">
                        <Clock className="w-3 h-3" />
                        Без ответа
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {review.tariff} • {review.date}
                  </p>
                  <p className="text-sm mb-3">{review.text}</p>

                  {/* Reply */}
                  {review.replied && review.reply && (
                    <div className="mt-3 p-3 rounded-lg bg-muted/50 border-l-2 border-primary">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Ваш ответ</span>
                        <span className="text-xs text-muted-foreground">{review.replyDate}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.reply}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-3">
                    {!review.replied && (
                      <Button
                        size="sm"
                        className="gap-2"
                        onClick={() => setSelectedReview(review)}
                      >
                        <MessageSquare className="w-4 h-4" />
                        Ответить
                      </Button>
                    )}
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.helpful}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reply Dialog */}
      <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ответить на отзыв</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{selectedReview.author}</span>
                  {renderStars(selectedReview.rating)}
                </div>
                <p className="text-sm text-muted-foreground">{selectedReview.text}</p>
              </div>
              <Textarea
                placeholder="Напишите ваш ответ..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={4}
              />
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setSelectedReview(null)}>
                  Отмена
                </Button>
                <Button className="flex-1 gap-2" onClick={handleReply} disabled={!replyText.trim()}>
                  <Send className="w-4 h-4" />
                  Отправить
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProviderReviews;
