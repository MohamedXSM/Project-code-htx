import React from 'react';
import { POSTS } from '../constants';
import Post from './Post';

const Feed: React.FC = () => {
  return (
    <div>
      {POSTS.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
