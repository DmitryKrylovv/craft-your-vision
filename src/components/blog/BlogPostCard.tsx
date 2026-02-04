import { useState } from 'react';
import { Eye, MessageCircle, Bookmark, Clock, Play, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { BlogPost } from '@/pages/BlogPage';
import { cn } from '@/lib/utils';

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogPostCard = ({ post, featured = false }: BlogPostCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasGallery = post.mediaType === 'gallery' && post.galleryImages && post.galleryImages.length > 1;
  const hasVideo = post.mediaType === 'video';
  const hasMedia = post.coverImage || hasGallery || hasVideo;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (post.galleryImages) {
      setCurrentImageIndex((prev) => (prev + 1) % post.galleryImages!.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (post.galleryImages) {
      setCurrentImageIndex((prev) => (prev - 1 + post.galleryImages!.length) % post.galleryImages!.length);
    }
  };

  const getCurrentImage = () => {
    if (hasGallery && post.galleryImages) {
      return post.galleryImages[currentImageIndex];
    }
    return post.coverImage;
  };

  return (
    <article className={cn(
      "bg-card border border-border rounded-2xl overflow-hidden transition-all hover:border-primary/30 hover:shadow-lg group",
      featured && "ring-1 ring-primary/10"
    )}>
      {/* Author & Meta */}
      <div className="p-4 pb-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-lg">
            {post.author.avatar}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
              {post.author.name}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{post.publishedAt}</span>
            <span className="text-muted-foreground">·</span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Eye className="w-3.5 h-3.5" />
              {post.views.toLocaleString('ru-RU')}
            </div>
          </div>
        </div>
        <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
          {post.category}
        </span>
      </div>

      {/* Title */}
      <div className="px-4 pt-3">
        <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer">
          {post.title}
        </h2>
      </div>

      {/* Excerpt for non-featured */}
      {!featured && post.excerpt && (
        <div className="px-4 pt-2">
          <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
        </div>
      )}

      {/* Actions */}
      <div className="px-4 pt-2 pb-3 flex items-center gap-4">
        <button 
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          <MessageCircle className="w-4 h-4" />
          Обсудить
          {post.commentsCount > 0 && (
            <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">
              {post.commentsCount}
            </span>
          )}
        </button>
        <button 
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          <Bookmark className="w-4 h-4" />
          В закладки
        </button>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground ml-auto">
          <Clock className="w-4 h-4" />
          {post.readTime} мин
        </div>
      </div>

      {/* Media Content */}
      {hasMedia && (featured || hasGallery || hasVideo) && (
        <div className="relative aspect-[2/1] overflow-hidden">
          <img
            src={getCurrentImage()}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Gradient overlay for featured */}
          {featured && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          )}

          {/* Video play button */}
          {hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Play className="w-3 h-3" fill="currentColor" />
                {post.readTime} мин
              </div>
            </div>
          )}

          {/* Gallery navigation */}
          {hasGallery && post.galleryImages && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                {currentImageIndex + 1} / {post.galleryImages.length}
              </div>
              {/* Gallery dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {post.galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      idx === currentImageIndex ? "bg-white w-4" : "bg-white/50"
                    )}
                  />
                ))}
              </div>
            </>
          )}

          {/* Featured excerpt overlay */}
          {featured && !hasVideo && (
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white/90 text-sm line-clamp-2">{post.excerpt}</p>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default BlogPostCard;
