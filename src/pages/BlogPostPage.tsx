import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogSidebar from '@/components/blog/BlogSidebar';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Eye, 
  MessageCircle, 
  Bookmark,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Calendar,
  ChevronLeft,
  Send,
  MoreHorizontal,
  Flag,
  Copy
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockPost = {
  id: '1',
  title: 'ТОП-10 провайдеров VPS в России: сравнение и рейтинг 2026',
  excerpt: 'Подробный обзор лучших VPS-провайдеров с анализом цен, производительности и качества поддержки.',
  content: `
## Введение

Выбор VPS-провайдера — это критически важное решение для любого проекта. От качества хостинга зависит стабильность работы вашего сайта или приложения, скорость загрузки и, как следствие, пользовательский опыт.

В этом обзоре мы детально разберём 10 лучших VPS-провайдеров в России, сравним их по ключевым параметрам и поможем вам сделать осознанный выбор.

## Критерии оценки

При составлении рейтинга мы учитывали следующие факторы:

- **Производительность** — скорость работы серверов, латентность
- **Надёжность** — uptime, качество оборудования
- **Техническая поддержка** — скорость и компетентность
- **Цена/качество** — соотношение стоимости к возможностям
- **Дополнительные услуги** — бэкапы, защита от DDoS, мониторинг

## 1. Timeweb Cloud

Timeweb Cloud занимает первое место благодаря отличному балансу цены и качества. Провайдер предлагает современное оборудование на базе NVMe SSD, мгновенное масштабирование и продвинутую панель управления.

**Плюсы:**
- Быстрые NVMe диски
- Удобная панель управления
- Отзывчивая поддержка 24/7

**Минусы:**
- Ограниченный выбор локаций
- Нет почасовой тарификации

## 2. Selectel

Selectel — один из старейших и крупнейших облачных провайдеров в России. Компания известна надёжной инфраструктурой и широким спектром услуг.

![Дата-центр Selectel](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop)

**Плюсы:**
- Собственные дата-центры
- Высокий уровень SLA (99.95%)
- Гибкая тарификация

**Минусы:**
- Выше средней цены
- Сложный интерфейс для новичков

## 3. REG.RU

REG.RU известен в первую очередь как регистратор доменов, но их VPS-хостинг также заслуживает внимания.

## Сравнительная таблица

| Провайдер | Мин. цена | NVMe | DDoS-защита | Поддержка |
|-----------|-----------|------|-------------|-----------|
| Timeweb | от 199₽ | ✅ | ✅ | 24/7 |
| Selectel | от 500₽ | ✅ | ✅ | 24/7 |
| REG.RU | от 249₽ | ✅ | ❌ | 24/7 |
| FirstVDS | от 169₽ | ❌ | ✅ | 24/7 |
| Beget | от 299₽ | ✅ | ✅ | 24/7 |

## Заключение

Выбор VPS-провайдера зависит от ваших конкретных потребностей. Для небольших проектов отлично подойдёт Timeweb Cloud с его доступными ценами. Для enterprise-решений рекомендуем обратить внимание на Selectel.

Помните, что хороший хостинг — это инвестиция в стабильность вашего проекта. Не экономьте на инфраструктуре!
  `,
  coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=800&fit=crop',
  author: {
    id: 'plooza',
    name: 'Plooza',
    username: 'plooza',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    bio: 'Официальный аккаунт команды Plooza',
  },
  publishedAt: '30 января 2026',
  updatedAt: '30 января 2026',
  views: 12470,
  likes: 342,
  dislikes: 12,
  commentsCount: 89,
  category: 'VPS/VDS',
  readTime: 15,
  tags: ['VPS', 'Хостинг', 'Рейтинг', 'Россия', 'Обзор'],
};

const mockComments = [
  {
    id: '1',
    author: {
      name: 'DevMaster',
      avatar: '👨‍💻',
      username: 'devmaster',
    },
    content: 'Отличный обзор! Сам пользуюсь Timeweb уже год — полностью согласен с оценкой. Единственное, иногда бывают небольшие задержки в техподдержке в ночное время.',
    createdAt: '2 часа назад',
    likes: 24,
    replies: [
      {
        id: '1-1',
        author: {
          name: 'Plooza',
          avatar: '🚀',
          username: 'plooza',
        },
        content: 'Спасибо за отзыв! Мы передадим ваш фидбек команде Timeweb.',
        createdAt: '1 час назад',
        likes: 8,
      }
    ]
  },
  {
    id: '2',
    author: {
      name: 'SysAdmin42',
      avatar: '🔧',
      username: 'sysadmin42',
    },
    content: 'А что насчёт FirstVDS? У них вроде самые низкие цены на рынке. Почему только 4 место?',
    createdAt: '5 часов назад',
    likes: 15,
    replies: []
  },
  {
    id: '3',
    author: {
      name: 'CloudNinja',
      avatar: '☁️',
      username: 'cloudninja',
    },
    content: 'Работаю с Selectel на крупном проекте — 100% uptime за последний год. Да, дороже, но оно того стоит для серьёзного бизнеса.',
    createdAt: 'Вчера',
    likes: 31,
    replies: []
  },
];

const BlogPostPage = () => {
  const { postId } = useParams();
  const [comment, setComment] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);

  const handleVote = (type: 'like' | 'dislike') => {
    setUserVote(userVote === type ? null : type);
  };

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      
      <main className="pt-16">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img 
            src={mockPost.coverImage} 
            alt={mockPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
            {/* Back Link */}
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Назад к блогу
            </Link>

            {/* Article Header */}
            <article className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="p-6 md:p-8">
                {/* Category & Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {mockPost.category}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {mockPost.publishedAt}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {mockPost.readTime} мин чтения
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    {mockPost.views.toLocaleString('ru-RU')}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                  {mockPost.title}
                </h1>

                {/* Author */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-6 border-b border-border">
                  <Link 
                    to={`/blog/profile/${mockPost.author.username}`}
                    className="flex items-center gap-3 group"
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={mockPost.author.avatar} />
                      <AvatarFallback>{mockPost.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {mockPost.author.name}
                      </div>
                      <div className="text-sm text-muted-foreground">@{mockPost.author.username}</div>
                    </div>
                  </Link>
                  <Button variant="outline" size="sm">Подписаться</Button>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div className="space-y-6 text-foreground">
                    {mockPost.content.split('\n\n').map((paragraph, index) => {
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={index} className="text-xl md:text-2xl font-bold mt-8 mb-4">
                            {paragraph.replace('## ', '')}
                          </h2>
                        );
                      }
                      if (paragraph.startsWith('![')) {
                        const match = paragraph.match(/!\[(.*?)\]\((.*?)\)/);
                        if (match) {
                          return (
                            <figure key={index} className="my-8">
                              <img 
                                src={match[2]} 
                                alt={match[1]} 
                                className="rounded-xl w-full"
                              />
                              <figcaption className="text-center text-sm text-muted-foreground mt-2">
                                {match[1]}
                              </figcaption>
                            </figure>
                          );
                        }
                      }
                      if (paragraph.startsWith('**')) {
                        return (
                          <p key={index} className="text-muted-foreground leading-relaxed">
                            {paragraph.split('\n').map((line, i) => (
                              <span key={i}>
                                {line.startsWith('- ') ? (
                                  <span className="block ml-4">• {line.replace('- ', '')}</span>
                                ) : (
                                  <strong className="text-foreground">{line.replace(/\*\*/g, '')}</strong>
                                )}
                              </span>
                            ))}
                          </p>
                        );
                      }
                      if (paragraph.startsWith('|')) {
                        const rows = paragraph.split('\n').filter(r => !r.includes('---'));
                        return (
                          <div key={index} className="overflow-x-auto my-6">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="border-b border-border">
                                  {rows[0]?.split('|').filter(Boolean).map((cell, i) => (
                                    <th key={i} className="text-left p-3 font-semibold text-foreground">
                                      {cell.trim()}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {rows.slice(1).map((row, rowIndex) => (
                                  <tr key={rowIndex} className="border-b border-border/50">
                                    {row.split('|').filter(Boolean).map((cell, cellIndex) => (
                                      <td key={cellIndex} className="p-3 text-muted-foreground">
                                        {cell.trim()}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                      if (paragraph.startsWith('- ')) {
                        return (
                          <ul key={index} className="space-y-2 text-muted-foreground">
                            {paragraph.split('\n').map((line, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                {line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={index} className="text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
                  {mockPost.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-sm bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-full cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between flex-wrap gap-4 mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-muted rounded-full">
                      <button 
                        onClick={() => handleVote('like')}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-l-full transition-colors ${
                          userVote === 'like' ? 'bg-green-500/20 text-green-500' : 'hover:bg-muted-foreground/10'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm font-medium">{mockPost.likes + (userVote === 'like' ? 1 : 0)}</span>
                      </button>
                      <div className="w-px h-6 bg-border" />
                      <button 
                        onClick={() => handleVote('dislike')}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-r-full transition-colors ${
                          userVote === 'dislike' ? 'bg-red-500/20 text-red-500' : 'hover:bg-muted-foreground/10'
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                        <span className="text-sm font-medium">{mockPost.dislikes + (userVote === 'dislike' ? 1 : 0)}</span>
                      </button>
                    </div>
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{mockPost.commentsCount}</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
                      {isBookmarked ? 'Сохранено' : 'В закладки'}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Share2 className="w-4 h-4" />
                          Поделиться
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Копировать ссылку
                        </DropdownMenuItem>
                        <DropdownMenuItem>Telegram</DropdownMenuItem>
                        <DropdownMenuItem>VK</DropdownMenuItem>
                        <DropdownMenuItem>Twitter</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <section className="mt-8 bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Комментарии ({mockPost.commentsCount})
              </h2>

              {/* Comment Form */}
              <div className="flex gap-3 mb-8">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>Г</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea 
                    placeholder="Написать комментарий..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex justify-end mt-2">
                    <Button disabled={!comment.trim()} className="gap-2">
                      <Send className="w-4 h-4" />
                      Отправить
                    </Button>
                  </div>
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Comments List */}
              <div className="space-y-6">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="space-y-4">
                    {/* Main Comment */}
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                        {comment.author.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Link 
                              to={`/blog/profile/${comment.author.username}`}
                              className="font-semibold text-foreground hover:text-primary transition-colors"
                            >
                              {comment.author.name}
                            </Link>
                            <span className="text-sm text-muted-foreground">{comment.createdAt}</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Flag className="w-4 h-4 mr-2" />
                                Пожаловаться
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-foreground mt-1">{comment.content}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            {comment.likes}
                          </button>
                          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Ответить
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div className="ml-12 space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
                              {reply.author.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Link 
                                  to={`/blog/profile/${reply.author.username}`}
                                  className="font-semibold text-foreground hover:text-primary transition-colors text-sm"
                                >
                                  {reply.author.name}
                                </Link>
                                <span className="text-xs text-muted-foreground">{reply.createdAt}</span>
                              </div>
                              <p className="text-foreground text-sm mt-1">{reply.content}</p>
                              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mt-1">
                                <ThumbsUp className="w-3.5 h-3.5" />
                                {reply.likes}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <Button variant="outline">Загрузить ещё комментарии</Button>
              </div>
            </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar popularPosts={[
                { id: '1', title: 'Промокоды для хостинга и VPS в 2026 году', date: '10 янв 2026', comments: 89 },
                { id: '2', title: 'Лучшие панели управления сервером: ISPmanager vs Plesk', date: '15 янв в 11:30', comments: 45 },
                { id: '3', title: 'Как настроить SSL-сертификат бесплатно', date: '08 янв в 14:20', comments: 32 },
                { id: '4', title: 'Сравнение NVMe и SSD дисков для VPS', date: '05 янв в 09:45', comments: 28 },
                { id: '5', title: 'Выбираем домен: гайд для начинающих', date: '02 янв в 16:00', comments: 21 },
              ]} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
