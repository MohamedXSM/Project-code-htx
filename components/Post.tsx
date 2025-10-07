import React, { useState, useRef } from 'react';
import { Post as PostType } from '../types';
import { HeartIcon } from './icons/HeartIcon';
import { CommentIcon } from './icons/CommentIcon';
import { ShareIcon } from './icons/ShareIcon';
import { SaveIcon } from './icons/SaveIcon';
import { MoreIcon } from './icons/MoreIcon';
import CommentsModal from './CommentsModal';
import ActionMenu from './ActionMenu';
import ReactionPicker from './ReactionPicker';
import { MuteIcon } from './icons/MuteIcon';
import { UnmuteIcon } from './icons/UnmuteIcon';

const Post: React.FC<{ post: PostType }> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [showComments, setShowComments] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };
  
  const handleDoubleClick = () => {
    if (!isLiked) {
      setIsLiked(true);
    }
  };
  
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if(videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    }
  }

  return (
    <div className="border-b border-border">
      {/* Post Header */}
      <div className="flex justify-between items-center p-3">
        <div className="flex items-center space-x-reverse space-x-3">
          <img src={post.user.avatar} alt={post.user.username} className="w-8 h-8 rounded-full" />
          <span className="font-bold text-sm">{post.user.username}</span>
        </div>
        <button onClick={() => setShowActionMenu(true)}>
            <MoreIcon />
        </button>
      </div>

      {/* Post Media */}
      <div className="relative bg-black" onDoubleClick={handleDoubleClick}>
        {post.mediaType === 'image' ? (
          <img src={post.mediaUrl} alt="Post content" className="w-full h-auto" />
        ) : (
          <>
            <video ref={videoRef} src={post.mediaUrl} className="w-full h-auto" loop autoPlay muted={isMuted} playsInline />
            <button onClick={toggleMute} className="absolute bottom-4 right-4 z-10 p-1 bg-black/50 rounded-full">
              {isMuted ? <MuteIcon /> : <UnmuteIcon />}
            </button>
          </>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex justify-between items-center p-3 relative">
        <div className="flex items-center space-x-reverse space-x-4">
          <button 
            onClick={handleLike} 
            className={`transform transition-transform duration-200 ${isLiked ? 'text-red-500 scale-110' : ''}`}
            onMouseEnter={() => setShowReactionPicker(true)}
            onMouseLeave={() => setShowReactionPicker(false)}
            >
            <HeartIcon />
            {showReactionPicker && <ReactionPicker onSelect={() => { setIsLiked(true); setShowReactionPicker(false);}} onClose={() => setShowReactionPicker(false)} />}
          </button>
          <button onClick={() => setShowComments(true)}>
            <CommentIcon />
          </button>
          <button>
            <ShareIcon />
          </button>
        </div>
        <button onClick={handleSave}>
          <SaveIcon isSaved={isSaved} />
        </button>
      </div>

      {/* Post Info */}
      <div className="px-3 pb-3">
        <p className="font-bold text-sm">{post.likes + (isLiked ? 1 : 0)} إعجاب</p>
        <p className="text-sm mt-1">
          <span className="font-bold">{post.user.username}</span> {post.caption}
        </p>
        {post.comments.length > 0 && (
          <button onClick={() => setShowComments(true)} className="text-gray-400 text-sm mt-2">
            عرض كل الـ {post.comments.length} تعليقات
          </button>
        )}
      </div>
      
      {showComments && (
        <CommentsModal 
            comments={post.comments}
            onClose={() => setShowComments(false)}
        />
      )}
      {showActionMenu && (
        <ActionMenu 
            onClose={() => setShowActionMenu(false)} 
            actions={[
                { label: 'إبلاغ', action: () => console.log('Report'), destructive: true },
                { label: 'إلغاء المتابعة', action: () => console.log('Unfollow'), destructive: true },
                { label: 'إضافة إلى المفضلة', action: () => console.log('Add to favorites') },
                { label: 'مشاركة', action: () => console.log('Share') },
            ]}
        />
      )}
    </div>
  );
};

export default Post;
