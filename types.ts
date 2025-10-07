export interface User {
  id: number;
  username: string;
  avatar: string;
}

export interface Story {
  id: number;
  user: User;
  mediaUrl: string; // Add mediaUrl for story content
  views?: User[];
  reactions?: { user: User; reaction: string }[];
}

export enum CommentType {
  TEXT = 'TEXT',
  VOICE = 'VOICE',
}

export interface Reaction {
    user: User;
    emoji: string;
}

export interface BaseComment {
  id: number;
  user: User;
  type: CommentType;
  replies: Comment[];
  reactions: Reaction[];
}

export interface TextComment extends BaseComment {
  type: CommentType.TEXT;
  text: string;
}

export interface VoiceComment extends BaseComment {
  type: CommentType.VOICE;
  audioUrl: string;
}

export type Comment = TextComment | VoiceComment;

export interface Post {
  id: number;
  user: User;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption: string;
  likes: number;
  comments: Comment[];
  isSaved: boolean;
}