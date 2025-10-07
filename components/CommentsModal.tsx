import React, { useState } from 'react';
import { Comment, CommentType, User } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { HeartIcon } from './icons/HeartIcon';
import { ReplyIcon } from './icons/ReplyIcon';
import ReactionPicker from './ReactionPicker';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { SendIcon } from './icons/SendIcon';
import { USERS } from '../constants'; // For current user mock

interface CommentProps {
  comment: Comment;
  onReply: (username: string) => void;
}

const CommentItem: React.FC<CommentProps> = ({ comment, onReply }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  
  const handleLike = () => {
      setIsLiked(!isLiked);
      setShowReactionPicker(false);
  };
  
  return (
    <div className="py-2">
      <div className="flex items-start space-x-reverse space-x-3">
        <img src={comment.user.avatar} alt={comment.user.username} className="w-8 h-8 rounded-full mt-1" />
        <div className="flex-1">
          <div className="bg-border rounded-xl p-3">
            <span className="font-bold text-sm">{comment.user.username}</span>
            {comment.type === CommentType.TEXT ? (
              <p className="text-sm">{comment.text}</p>
            ) : (
              <p className="text-sm italic text-gray-400">[Voice Message]</p>
            )}
          </div>
          <div className="flex items-center space-x-reverse space-x-4 text-xs text-gray-400 mt-1 px-2 relative">
            <span>منذ 5 د</span>
            <button onClick={() => onReply(comment.user.username)} className="hover:underline">رد</button>
            <button onMouseEnter={() => setShowReactionPicker(true)} onMouseLeave={() => setShowReactionPicker(false)} className="hover:underline">تفاعل</button>
            {showReactionPicker && <ReactionPicker onSelect={handleLike} onClose={() => setShowReactionPicker(false)} />}
          </div>
        </div>
        <div className="flex flex-col items-center space-y-1">
            <button onClick={handleLike} className={`p-1 ${isLiked ? 'text-red-500' : ''}`}>
                <HeartIcon />
            </button>
            <span className="text-xs text-gray-400">{comment.reactions.length + (isLiked ? 1 : 0)}</span>
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
          <div className="mr-8 mt-2 pl-4 border-r-2 border-border">
              {comment.replies.map(reply => <CommentItem key={reply.id} comment={reply} onReply={onReply} />)}
          </div>
      )}
    </div>
  );
}

interface CommentsModalProps {
  comments: Comment[];
  onClose: () => void;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ comments, onClose }) => {
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const currentUser = USERS[0]; // Mock current user

    const handleReply = (username: string) => {
        setReplyingTo(username);
        setNewComment(`@${username} `);
    }
    
    const handleSendComment = () => {
        if (newComment.trim()) {
            console.log("Sending comment:", newComment);
            setNewComment('');
            setReplyingTo(null);
        }
    };

  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-end" onClick={onClose}>
      <div 
        className="bg-darker w-full h-[80vh] rounded-t-2xl flex flex-col animate-slide-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 border-b border-border flex justify-between items-center sticky top-0 bg-darker">
          <h2 className="text-lg font-bold">التعليقات</h2>
          <button onClick={onClose}><CloseIcon /></button>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4">
          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} onReply={handleReply} />
          ))}
        </main>

        <footer className="p-4 border-t border-border bg-darker">
          <div className="flex items-center space-x-reverse space-x-2 bg-border rounded-full p-2">
            <img src={currentUser.avatar} alt="Your avatar" className="w-8 h-8 rounded-full" />
            <input 
              type="text" 
              placeholder="إضافة تعليق..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none px-2"
            />
            {newComment ? (
                <button onClick={handleSendComment} className="p-2 bg-primary rounded-full"><SendIcon /></button>
            ) : (
                <button className="p-2 "><MicrophoneIcon /></button>
            )}
          </div>
        </footer>
        <style>{`
          .animate-slide-in-up {
            animation: slideInUp 0.3s ease-out forwards;
          }
          @keyframes slideInUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default CommentsModal;
