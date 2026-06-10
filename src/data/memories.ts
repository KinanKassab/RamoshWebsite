export interface Memory {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
  rotation: number;
}

export const memories: Memory[] = [
  {
    id: 1,
    image: '/images/FXI-1.webp',
    title: 'That First Capture',
    description: 'First photo for us, forever in my heart. You were the most beautiful sight, and I was the luckiest to have you in my frame.',
    date: '1 May 2026',
    rotation: -1.5,
  },
  {
    id: 2,
    image: '/images/FXI-2.webp',
    title: 'FIX Break Time',
    description: "When the team finished speaking I chose to spend some time with you. Our escape was a beautiful day filled with the sweetest laughter and soulful memories.",
    date: '1 May 2026',
    rotation: 1.2,
  },
  {
    id: 3,
    image: '/images/Qudsaya.jpg',
    title: 'Qudsaya, Syria',
    description: 'The road of my love. The way the light danced on your face, the sound of your laughter echoing through the streets.',
    date: '1 May 2026',
    rotation: -0.8,
  },
  {
    id: 4,
    image: '/images/Royal-1.webp',
    title: 'Happy Land',
    description: 'A day of pure joy. The way your eyes lit up with excitement, the carefree happiness that filled the air.',
    date: '2 May 2026',
    rotation: 1.8,
  },
  {
    id: 5,
    image: '/images/Royal-2.webp',
    title: 'The Day with Yasmine',
    description: 'Before the storm. The way you smiled and laughed — the carefree joy that surrounded us in the rotating wheel.',
    date: '2 May 2026',
    rotation: -1.2,
  },
  {
    id: 6,
    image: '/images/Royal-3.webp',
    title: 'Enjoy the Shower!',
    description: 'After our day at the water game. The carefree joy on your face, the happiness that filled the air — pure bliss.',
    date: '2 May 2026',
    rotation: 0.9,
  },
  {
    id: 7,
    image: '/images/Car-1.webp',
    title: 'The Last One',
    description: "A bittersweet reminder of all the love and memories we shared. The warmth in your eyes — I'm reminded every time I see it of how much I love you.",
    date: '31 May 2026',
    rotation: -1.6,
  },
];
