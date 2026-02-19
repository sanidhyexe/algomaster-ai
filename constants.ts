

import { Topic, Difficulty, UserStats, CommunityPost } from './types';

export const TOPICS: Topic[] = [
  {
    id: 'arrays',
    title: 'Arrays & Hashing',
    description: 'Master the fundamentals of array manipulation and hash maps.',
    videoLectureUrl: 'https://picsum.photos/400/225?grayscale',
    progress: 100,
    problems: [
      {
        id: 'two-sum',
        title: 'Two Sum',
        difficulty: Difficulty.Easy,
        acceptanceRate: 48,
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        starterCode: 'function twoSum(nums, target) {\n  // Your code here\n}',
      },
      {
        id: 'group-anagrams',
        title: 'Group Anagrams',
        difficulty: Difficulty.Medium,
        acceptanceRate: 65,
        description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
        starterCode: 'function groupAnagrams(strs) {\n  // Your code here\n}',
      }
    ]
  },
  {
    id: 'pointers',
    title: 'Two Pointers',
    description: 'Learn efficient traversal techniques for linear data structures.',
    videoLectureUrl: 'https://picsum.photos/400/225?blur=2',
    progress: 30,
    problems: [
      {
        id: 'valid-palindrome',
        title: 'Valid Palindrome',
        difficulty: Difficulty.Easy,
        acceptanceRate: 72,
        description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
        starterCode: 'function isPalindrome(s) {\n  // Your code here\n}',
      },
      {
        id: '3sum',
        title: '3Sum',
        difficulty: Difficulty.Medium,
        acceptanceRate: 32,
        description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
        starterCode: 'function threeSum(nums) {\n  // Your code here\n}',
      }
    ]
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    description: 'Master pointer manipulation and node-based structures.',
    videoLectureUrl: 'https://picsum.photos/400/225?grayscale&blur=2',
    progress: 45,
    problems: [
      {
        id: 'reverse-linked-list',
        title: 'Reverse Linked List',
        difficulty: Difficulty.Easy,
        acceptanceRate: 75,
        description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
        starterCode: '/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nfunction reverseList(head) {\n  // Your code here\n}',
      },
      {
        id: 'merge-two-lists',
        title: 'Merge Two Sorted Lists',
        difficulty: Difficulty.Easy,
        acceptanceRate: 63,
        description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list.',
        starterCode: 'function mergeTwoLists(list1, list2) {\n  // Your code here\n}',
      }
    ]
  },
  {
    id: 'trees',
    title: 'Trees & BST',
    description: 'Understand hierarchical data structures and traversal algorithms.',
    videoLectureUrl: 'https://picsum.photos/400/225?blur=4',
    progress: 20,
    problems: [
      {
        id: 'invert-tree',
        title: 'Invert Binary Tree',
        difficulty: Difficulty.Easy,
        acceptanceRate: 77,
        description: 'Given the root of a binary tree, invert the tree, and return its root.',
        starterCode: 'function invertTree(root) {\n  // Your code here\n}',
      },
       {
        id: 'level-order',
        title: 'Binary Tree Level Order Traversal',
        difficulty: Difficulty.Medium,
        acceptanceRate: 66,
        description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values.',
        starterCode: 'function levelOrder(root) {\n  // Your code here\n}',
      }
    ]
  },
  {
    id: 'heaps',
    title: 'Heaps & Priority Queues',
    description: 'Efficiently handle min/max elements and scheduling problems.',
    videoLectureUrl: 'https://picsum.photos/400/225?blur=1',
    progress: 15,
    problems: [
      {
        id: 'kth-largest',
        title: 'Kth Largest Element in an Array',
        difficulty: Difficulty.Medium,
        acceptanceRate: 67,
        description: 'Given an integer array nums and an integer k, return the kth largest element in the array.',
        starterCode: 'function findKthLargest(nums, k) {\n  // Your code here\n}',
      }
    ]
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    description: 'Solve complex problems by breaking them down into simpler subproblems.',
    videoLectureUrl: 'https://picsum.photos/seed/dynamic/400/225',
    progress: 10,
    problems: [
      {
        id: 'climbing-stairs',
        title: 'Climbing Stairs',
        difficulty: Difficulty.Easy,
        acceptanceRate: 55,
        description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
        starterCode: 'function climbStairs(n) {\n  // Your code here\n}',
      }
    ]
  },
  {
    id: 'graphs',
    title: 'Graphs',
    description: 'Explore graph theory, BFS, DFS, and topological sort.',
    videoLectureUrl: 'https://picsum.photos/400/225?grayscale',
    progress: 5,
    problems: [
      {
        id: 'num-islands',
        title: 'Number of Islands',
        difficulty: Difficulty.Medium,
        acceptanceRate: 58,
        description: 'Given an m x n 2D binary grid grid which represents a map of "1"s (land) and "0"s (water), return the number of islands.',
        starterCode: 'function numIslands(grid) {\n  // Your code here\n}',
      },
      {
        id: 'clone-graph',
        title: 'Clone Graph',
        difficulty: Difficulty.Medium,
        acceptanceRate: 55,
        description: 'Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.',
        starterCode: 'function cloneGraph(node) {\n  // Your code here\n}',
      }
    ]
  }
];

export const FAANG_QUESTIONS = [
  { company: 'Google', question: 'Median of Two Sorted Arrays', difficulty: 'Hard', freq: 'High' },
  { company: 'Meta', question: 'Merge Intervals', difficulty: 'Medium', freq: 'Very High' },
  { company: 'Amazon', question: 'LRU Cache', difficulty: 'Medium', freq: 'High' },
  { company: 'Netflix', question: 'Group Anagrams', difficulty: 'Medium', freq: 'Medium' },
  { company: 'Apple', question: 'Two Sum', difficulty: 'Easy', freq: 'High' },
];

export const USER_DASHBOARD_DATA: Record<'last7Days' | 'last30Days' | 'allTime', UserStats> = {
  last7Days: {
    rank: 14205,
    problemsSolved: 12,
    streak: 12,
    skillDistribution: [
      { subject: 'Arrays', A: 110, fullMark: 150 },
      { subject: 'DP', A: 30, fullMark: 150 },
      { subject: 'Graphs', A: 20, fullMark: 150 },
      { subject: 'Trees', A: 70, fullMark: 150 },
      { subject: 'Strings', A: 90, fullMark: 150 },
      { subject: 'Math', A: 40, fullMark: 150 },
    ],
    activityData: [
      { day: 'Mon', solved: 2 },
      { day: 'Tue', solved: 4 },
      { day: 'Wed', solved: 1 },
      { day: 'Thu', solved: 5 },
      { day: 'Fri', solved: 3 },
      { day: 'Sat', solved: 8 },
      { day: 'Sun', solved: 6 },
    ],
    history: [
      { id: '1', action: 'Solved', title: 'Merge Intervals', date: '2 hours ago', type: 'problem', meta: 'Medium' },
      { id: '2', action: 'Watched', title: 'Graph Theory Basics', date: '5 hours ago', type: 'video', meta: '45m' },
      { id: '3', action: 'Solved', title: 'Two Sum', date: '1 day ago', type: 'problem', meta: 'Easy' },
      { id: '4', action: 'Solved', title: 'Valid Palindrome', date: '1 day ago', type: 'problem', meta: 'Easy' },
      { id: '5', action: 'Watched', title: 'Arrays & Hashing Masterclass', date: '2 days ago', type: 'video', meta: '1h 20m' },
      { id: '6', action: 'Solved', title: 'LRU Cache', date: '3 days ago', type: 'problem', meta: 'Medium' },
    ],
    topicTimeDistribution: [
        { topic: 'Arrays', time: 4.5 },
        { topic: 'DP', time: 2.5 },
        { topic: 'Trees', time: 3.2 },
        { topic: 'Graphs', time: 1.8 },
        { topic: 'Strings', time: 2.1 },
    ]
  },
  last30Days: {
    rank: 14205,
    problemsSolved: 45,
    streak: 12,
    skillDistribution: [
      { subject: 'Arrays', A: 120, fullMark: 150 },
      { subject: 'DP', A: 50, fullMark: 150 },
      { subject: 'Graphs', A: 30, fullMark: 150 },
      { subject: 'Trees', A: 90, fullMark: 150 },
      { subject: 'Strings', A: 110, fullMark: 150 },
      { subject: 'Math', A: 60, fullMark: 150 },
    ],
    activityData: [
      { day: 'Week 1', solved: 12 },
      { day: 'Week 2', solved: 8 },
      { day: 'Week 3', solved: 15 },
      { day: 'Week 4', solved: 10 },
    ],
    history: [
      { id: '1', action: 'Solved', title: 'Merge Intervals', date: '2 hours ago', type: 'problem', meta: 'Medium' },
      { id: '2', action: 'Watched', title: 'Graph Theory Basics', date: '5 hours ago', type: 'video', meta: '45m' },
      { id: '3', action: 'Solved', title: 'Two Sum', date: '1 day ago', type: 'problem', meta: 'Easy' },
      { id: '4', action: 'Solved', title: 'Valid Palindrome', date: '1 day ago', type: 'problem', meta: 'Easy' },
      { id: '5', action: 'Watched', title: 'Arrays & Hashing Masterclass', date: '2 days ago', type: 'video', meta: '1h 20m' },
      { id: '6', action: 'Solved', title: 'LRU Cache', date: '3 days ago', type: 'problem', meta: 'Medium' },
    ],
    topicTimeDistribution: [
        { topic: 'Arrays', time: 15.5 },
        { topic: 'DP', time: 8.5 },
        { topic: 'Trees', time: 12.0 },
        { topic: 'Graphs', time: 6.5 },
        { topic: 'Strings', time: 9.0 },
        { topic: 'Heaps', time: 4.5 },
    ]
  },
  allTime: {
    rank: 14205,
    problemsSolved: 156,
    streak: 12,
    skillDistribution: [
      { subject: 'Arrays', A: 140, fullMark: 150 },
      { subject: 'DP', A: 80, fullMark: 150 },
      { subject: 'Graphs', A: 60, fullMark: 150 },
      { subject: 'Trees', A: 110, fullMark: 150 },
      { subject: 'Strings', A: 130, fullMark: 150 },
      { subject: 'Math', A: 90, fullMark: 150 },
    ],
    activityData: [
      { day: 'Jan', solved: 10 },
      { day: 'Feb', solved: 25 },
      { day: 'Mar', solved: 18 },
      { day: 'Apr', solved: 40 },
      { day: 'May', solved: 32 },
      { day: 'Jun', solved: 31 },
    ],
    history: [
       { id: '1', action: 'Solved', title: 'Merge Intervals', date: '2 hours ago', type: 'problem', meta: 'Medium' },
       { id: '2', action: 'Watched', title: 'Graph Theory Basics', date: '5 hours ago', type: 'video', meta: '45m' },
       { id: '3', action: 'Solved', title: 'Two Sum', date: '1 day ago', type: 'problem', meta: 'Easy' },
       { id: '4', action: 'Solved', title: 'Valid Palindrome', date: '1 day ago', type: 'problem', meta: 'Easy' },
       { id: '5', action: 'Watched', title: 'Arrays & Hashing Masterclass', date: '2 days ago', type: 'video', meta: '1h 20m' },
       { id: '6', action: 'Solved', title: 'LRU Cache', date: '3 days ago', type: 'problem', meta: 'Medium' },
       { id: '7', action: 'Solved', title: 'Design Twitter', date: '1 week ago', type: 'problem', meta: 'Hard' },
       { id: '8', action: 'Solved', title: 'N-Queens', date: '2 weeks ago', type: 'problem', meta: 'Hard' }
    ],
    topicTimeDistribution: [
        { topic: 'Arrays', time: 45.2 },
        { topic: 'DP', time: 28.5 },
        { topic: 'Trees', time: 35.0 },
        { topic: 'Graphs', time: 22.0 },
        { topic: 'Strings', time: 30.5 },
        { topic: 'Linked Lists', time: 18.0 },
        { topic: 'Heaps', time: 12.5 },
    ]
  }
};

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: '1',
    author: 'Sarah Jenkins',
    avatar: 'https://picsum.photos/id/1011/50/50',
    title: 'How I finally understood Recursion after 3 weeks',
    content: 'It clicked when I started visualizing the stack trace manually on paper. Here is the diagram I drew that finally made it make sense for tree traversals.',
    likes: 342,
    comments: 45,
    tags: ['Learning', 'Tips'],
    timeAgo: '2h ago',
    projectImage: 'https://picsum.photos/id/20/800/400'
  },
  {
    id: '2',
    author: 'David Chen',
    avatar: 'https://picsum.photos/id/1012/50/50',
    title: 'Google L4 Interview Experience (Offer Accepted!)',
    content: 'The system design round was intense. They asked me to design a rate limiter. I focused on the token bucket algorithm and distributed cache strategy.',
    likes: 890,
    comments: 120,
    tags: ['Interview', 'Success'],
    timeAgo: '5h ago'
  },
  {
    id: '3',
    author: 'Emily Zhang',
    avatar: 'https://picsum.photos/id/1027/50/50',
    title: 'System Design: WhatsApp Architecture Deep Dive',
    content: 'Just finished reading the engineering blog about how they handle billions of messages. The use of Erlang and Mnesia DB for high concurrency is fascinating. Here is a high-level architectural diagram I sketched out based on their whitepaper.',
    likes: 156,
    comments: 23,
    tags: ['System Design', 'Scalability'],
    timeAgo: '8h ago',
    projectImage: 'https://picsum.photos/id/60/800/400'
  },
  {
    id: '4',
    author: 'Michael Brown',
    avatar: 'https://picsum.photos/id/1005/50/50',
    title: 'Dealing with LeetCode burnout?',
    content: 'I\'ve been grinding for 3 months straight and hitting a wall. My contest rating is plateauing and I feel exhausted. How do you guys manage stress? Thinking of taking a week off.',
    likes: 412,
    comments: 89,
    tags: ['Discussion', 'Mental Health'],
    timeAgo: '1d ago'
  },
  {
    id: '5',
    author: 'Priya Patel',
    avatar: 'https://picsum.photos/id/1025/50/50',
    title: 'Python itertools is a game changer for contests',
    content: 'Stop writing nested loops! functions like itertools.product and itertools.combinations saved me so much time in today\'s contest problem C. Here is a quick cheat sheet.',
    likes: 220,
    comments: 15,
    tags: ['Python', 'Tips'],
    timeAgo: '1d ago',
    projectImage: 'https://picsum.photos/id/3/800/400'
  },
  {
    id: '6',
    author: 'Alex Johnson',
    avatar: 'https://picsum.photos/id/1009/50/50',
    title: 'Negotiating Amazon SDE II offer',
    content: 'Got an offer for L5! Base is 160k, need advice on negotiating the signing bonus. I have a competing offer from a startup. Any tips from current Amazonians?',
    likes: 95,
    comments: 42,
    tags: ['Career', 'Offer'],
    timeAgo: '2d ago'
  }
];
