import { Flame, MessageCircle, TrendingUp, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PopularPost {
  id: string;
  title: string;
  date: string;
  comments: number;
}

interface BlogSidebarProps {
  popularPosts: PopularPost[];
}

const BlogSidebar = ({ popularPosts }: BlogSidebarProps) => {
  return (
    <div className="space-y-6 sticky top-32">
      {/* Popular Now */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-foreground">Популярно сейчас</h3>
        </div>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h4>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                <span>{post.date}</span>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <MessageCircle className="w-3 h-3" />
                  {post.comments}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Тренды</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Kubernetes', 'NVMe', 'DDoS', 'SSL', 'Docker', 'Бэкапы', 'Миграция'].map((tag) => (
            <span
              key={tag}
              className="text-xs bg-muted hover:bg-primary/10 hover:text-primary px-2.5 py-1.5 rounded-full cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Subscribe */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Подписка</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Получайте лучшие статьи о хостинге и облачных технологиях на почту
        </p>
        <Button className="w-full">Подписаться</Button>
      </div>
    </div>
  );
};

export default BlogSidebar;
