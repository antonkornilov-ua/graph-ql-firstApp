const users = [
    {
        id: '1',
        name: 'Leanne Graham',
        email: 'sincere@april.biz',
    },
    {
        id: '2',
        name: 'Ervin Howell',
        email: 'shanna@melissa.tv',
    },
    {
        id: '3',
        name: 'Clementine Bauch',
        email: 'nathan@yesenia.net',
    },
    {
        id: '4',
        name: 'Patricia Lebsack',
        email: 'julianne@kory.org',
    },
    {
        id: '5',
        name: 'Chelsey Dietrich',
        email: 'lucio@annie.ca',
    },
];

const posts = [
    {
        userId: '1',
        id: '1',
        title: 'Introduction to GraphQL',
        body: 'GraphQL is a powerful query language for APIs that offers a more efficient and flexible way to retrieve data.',
    },
    {
        userId: '2',
        id: '2',
        title: 'Building Responsive Web Design',
        body: 'Learn how to create web pages that adapt and respond to different devices and screen sizes for a seamless user experience.',
    },
    {
        userId: '3',
        id: '3',
        title: 'Deep Dive into Machine Learning',
        body: 'Explore the fascinating field of machine learning, from neural networks to data preprocessing and model evaluation.',
    },
    {
        userId: '4',
        id: '4',
        title: 'The Art of Digital Photography',
        body: 'Master the art of capturing stunning photographs using composition, lighting techniques, and post-processing tools.',
    },
    {
        userId: '5',
        id: '5',
        title: 'The World of Cryptocurrencies',
        body: 'Discover the world of cryptocurrencies, including Bitcoin and Ethereum, and learn about blockchain technology and its implications.',
    },
    {
        userId: '1',
        id: '6',
        title: 'Effective Strategies for Content Marketing',
        body: 'Uncover proven strategies and techniques to create compelling content that engages your target audience and drives conversions.',
    },
    {
        userId: '2',
        id: '7',
        title: 'Mastering JavaScript Frameworks',
        body: 'Dive deep into popular JavaScript frameworks like React, Vue.js, and Angular to build powerful and dynamic web applications.',
    },
];

const likes = [
    {
        userId: '1',
        postId: '2',
    },
    {
        userId: '1',
        postId: '3',
    },
    {
        userId: '2',
        postId: '1',
    },
    {
        userId: '2',
        postId: '3',
    },
    {
        userId: '2',
        postId: '5',
    },
    {
        userId: '3',
        postId: '1',
    },
    {
        userId: '3',
        postId: '5',
    },
];

export { users, posts, likes };
