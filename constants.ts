import { User, Story, Post, CommentType } from './types';

export const USERS: User[] = [
  { id: 1, username: 'أمير_الليل', avatar: 'https://picsum.photos/seed/user1/100/100' },
  { id: 2, username: 'نجمة_الصحراء', avatar: 'https://picsum.photos/seed/user2/100/100' },
  { id: 3, username: 'رحال_رقمي', avatar: 'https://picsum.photos/seed/user3/100/100' },
  { id: 4, username: 'فنان_البكسل', avatar: 'https://picsum.photos/seed/user4/100/100' },
  { id: 5, username: 'صوت_المدينة', avatar: 'https://picsum.photos/seed/user5/100/100' },
  { id: 6, username: 'مستقبل_مشرق', avatar: 'https://picsum.photos/seed/user6/100/100' },
];

export const INITIAL_STORIES: Story[] = USERS.map(user => ({ 
    id: user.id, 
    user,
    mediaUrl: user.avatar.replace('100/100', '600/800')
}));

export const POSTS: Post[] = [
  {
    id: 1,
    user: USERS[1],
    mediaUrl: 'https://picsum.photos/seed/post1/600/750',
    mediaType: 'image',
    caption: 'ضائعة في غابة النيون. المدينة تتنفس وأنا أستمع.',
    likes: 1337,
    comments: [
      { id: 1, user: USERS[2], type: CommentType.TEXT, text: 'لقطة مذهلة! ✨', replies: [], reactions: [{user: USERS[0], emoji: '❤️'}] },
      { id: 2, user: USERS[3], type: CommentType.TEXT, text: 'أحب هذه الأجواء.', replies: [
          { id: 6, user: USERS[1], type: CommentType.TEXT, text: '@رحال_رقمي شكراً جزيلاً!', replies: [], reactions: [] }
      ], reactions: [] },
      { id: 4, user: USERS[0], type: CommentType.TEXT, text: 'عمل رائع!', replies: [], reactions: [] },
      { id: 5, user: USERS[4], type: CommentType.TEXT, text: 'يجب أن نذهب إلى هناك يومًا ما.', replies: [], reactions: [] },
    ],
    isSaved: false,
  },
  {
    id: 2,
    user: USERS[3],
    mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    mediaType: 'video',
    caption: 'ريل سريع لأضواء المدينة. هل تشعر بالطاقة؟',
    likes: 2048,
    comments: [],
    isSaved: true,
  },
  {
    id: 3,
    user: USERS[4],
    mediaUrl: 'https://picsum.photos/seed/post3/600/800',
    mediaType: 'image',
    caption: 'أستكشف حقائق مجردة. كل زاوية لها قصة.',
    likes: 987,
    comments: [
      { id: 3, user: USERS[0], type: CommentType.TEXT, text: 'هذا سريالي! كيف قمت بتعديل الصورة؟', replies: [], reactions: [] },
    ],
    isSaved: false,
  },
];