import { Book } from '../types/book';
import { Reservation } from '../types/reservation';

const STORAGE_KEY = 'kle_library_books_v15';
const RESERVATIONS_KEY = 'kle_library_reservations_v1';

const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    category: 'Literature',
    description: 'A novel that depicts the roaring twenties.',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400',
    stock: 5,
    rating: 4.5,
    publishedYear: 1925
  },
  {
    id: '2',
    title: 'Modern Control Engineering',
    author: 'Katsuhiko Ogata',
    isbn: '9780136156734',
    category: 'Engineering',
    description: 'Comprehensive treatment of the analysis and design of continuous-time control systems.',
    coverImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400',
    stock: 12,
    rating: 4.7,
    publishedYear: 2009
  },
  {
    id: '3',
    title: 'Heli Hogu Kaarana',
    author: 'Vishwakarma',
    isbn: '9780062316097',
    category: 'Literature',
    description: 'A popular Kannada novel exploring life and philosophy.',
    coverImage: '/src/assets/images/heli-hogu-kaarana-original-imadg48tyyxauqvf (2)/regenerated_image_1778579505536.webp',
    stock: 7,
    rating: 4.9,
    publishedYear: 2011
  },
  {
    id: '4',
    title: 'Good to Great',
    author: 'Jim Collins',
    isbn: '9780066620992',
    category: 'Strategy',
    description: 'Why some companies make the leap and others dont.',
    coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400',
    stock: 15,
    rating: 4.6,
    publishedYear: 2001
  },
  {
    id: '5',
    title: 'The Art of the Blog',
    author: 'Sarah Jenkins',
    isbn: '9781234567890',
    category: 'Blog',
    description: 'Mastering digital storytelling in the modern age.',
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400',
    stock: 4,
    rating: 4.2,
    publishedYear: 2022
  },
  {
    id: '6',
    title: 'Structural Engineering Basics',
    author: 'Robert Stevens',
    isbn: '9780071424935',
    category: 'Engineering',
    description: 'Essential guide for understanding modern structures.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400',
    stock: 9,
    rating: 4.4,
    publishedYear: 2015
  },
  {
    id: '7',
    title: 'The Great War: A Global History',
    author: 'Peter Hart',
    isbn: '9780199933518',
    category: 'History',
    description: 'A comprehensive account of World War I.',
    coverImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=400',
    stock: 2,
    rating: 4.8,
    publishedYear: 2013
  },
  {
    id: '8',
    title: 'Strategy Excellence',
    author: 'Mark Thompson',
    isbn: '9780066620993',
    category: 'Strategy',
    description: 'Advanced strategic planning for organizations.',
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400',
    stock: 6,
    rating: 4.3,
    publishedYear: 2018
  },
  {
    id: '9',
    title: 'Blog Marketing Blueprint',
    author: 'Elena Rossi',
    isbn: '9781234567891',
    category: 'Blog',
    description: 'Building an audience through content.',
    coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400',
    stock: 12,
    rating: 4.1,
    publishedYear: 2023
  },
  {
    id: '10',
    title: 'Aeronautical Fundamentals',
    author: 'Capt. James Miller',
    isbn: '9780136156735',
    category: 'Engineering',
    description: 'An introductory guide to aerospace engineering and aerodynamics.',
    coverImage: 'https://images.unsplash.com/photo-1464039397811-476f652a343b?auto=format&fit=crop&q=80&w=400',
    stock: 5,
    rating: 4.6,
    publishedYear: 2021
  },
  {
    id: '11',
    title: 'The Renaissance: A New History',
    author: 'Paul Johnson',
    isbn: '9780812966190',
    category: 'History',
    description: 'A brief and brilliant overview of the cultural explosion in Europe.',
    coverImage: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&q=80&w=400',
    stock: 3,
    rating: 4.7,
    publishedYear: 2000
  },
  {
    id: '12',
    title: 'Blue Ocean Strategy',
    author: 'W. Chan Kim',
    isbn: '9781591396192',
    category: 'Strategy',
    description: 'How to create uncontested market space and make the competition irrelevant.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
    stock: 10,
    rating: 4.8,
    publishedYear: 2005
  },
  {
    id: '13',
    title: 'Mastering Content Writing',
    author: 'Julian Cole',
    isbn: '9781234567892',
    category: 'Blog',
    description: 'The definitive guide to planning and writing blog content that converts.',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400',
    stock: 8,
    rating: 4.4,
    publishedYear: 2022
  },
  {
    id: '15',
    title: 'Mechanical Engineering: The Ultimate Guide',
    author: 'Dr. Sarah Wilson',
    isbn: '9780136156736',
    category: 'Engineering',
    description: 'A deep dive into kinematics, dynamics, and thermodynamics of modern machinery.',
    coverImage: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=400',
    stock: 4,
    rating: 4.8,
    publishedYear: 2023
  },
  {
    id: '16',
    title: 'The Future of Civil Engineering',
    author: 'Michael Bridge',
    isbn: '9780136156737',
    category: 'Engineering',
    description: 'Exploring sustainable infrastructure and the smart cities of tomorrow.',
    coverImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400',
    stock: 6,
    rating: 4.5,
    publishedYear: 2024
  },
  {
    id: '17',
    title: 'Electronic Circuits & Design',
    author: 'Anna Watts',
    isbn: '9780136156738',
    category: 'Engineering',
    description: 'Advanced methodologies for designing integrated circuits and high-performance microchips.',
    coverImage: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=400',
    stock: 11,
    rating: 4.9,
    publishedYear: 2022
  },
  {
    id: '18',
    title: 'Renewable Energy Systems',
    author: 'John Solar',
    isbn: '9780136156739',
    category: 'Engineering',
    description: 'A comprehensive study of solar, wind, and hydroelectric power engineering.',
    coverImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=400',
    stock: 9,
    rating: 4.7,
    publishedYear: 2023
  },
  {
    id: '14',
    title: 'Ulysses',
    author: 'James Joyce',
    isbn: '9780679722762',
    category: 'Literature',
    description: 'A modernist masterpiece that parallels Homers Odyssey.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    stock: 4,
    rating: 4.3,
    publishedYear: 1922
  },
  {
    id: '19',
    title: 'Aerospace Structural Dynamics',
    author: 'Dr. Kevin Chen',
    isbn: '9780136156740',
    category: 'Engineering',
    description: 'Advanced analysis of vibrations and structural integrity in flight vehicles.',
    coverImage: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=400',
    stock: 3,
    rating: 4.9,
    publishedYear: 2024
  },
  {
    id: '20',
    title: 'Data Structures & Algorithms: The Master Blueprint',
    author: 'Robert Sedgewick',
    isbn: '9780136156741',
    category: 'Engineering',
    description: 'An exhaustive guide to fundamental data structures and the algorithms that manipulate them, optimized for performance.',
    coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=400',
    stock: 5,
    rating: 4.9,
    publishedYear: 2023
  },
  {
    id: '21',
    title: 'The Industrial Revolution: A Personal History',
    author: 'A.N. Wilson',
    isbn: '9780099597155',
    category: 'History',
    description: 'A study of the transformation in Great Britain and beyond.',
    coverImage: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&q=80&w=400',
    stock: 4,
    rating: 4.4,
    publishedYear: 2017
  },
  {
    id: '22',
    title: 'Strategy Rules',
    author: 'David Yoffie',
    isbn: '9780062373953',
    category: 'Strategy',
    description: 'Five timeless lessons from Bill Gates, Andy Grove, and Steve Jobs.',
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400',
    stock: 6,
    rating: 4.6,
    publishedYear: 2015
  },
  {
    id: '23',
    title: 'SEO for Blogs 2024',
    author: 'Adam Clarke',
    isbn: '9781234567893',
    category: 'Blog',
    description: 'The latest guide to ranking your content on search engines.',
    coverImage: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=400',
    stock: 12,
    rating: 4.8,
    publishedYear: 2024
  },
  {
    id: '24',
    title: 'To the Lighthouse',
    author: 'Virginia Woolf',
    isbn: '9780156907392',
    category: 'Literature',
    description: 'A landmark of high modernism.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-73c7e9bb550d?auto=format&fit=crop&q=80&w=400',
    stock: 5,
    rating: 4.5,
    publishedYear: 1927
  },
  {
    id: '25',
    title: 'The Crusades: The Authoritative History',
    author: 'Thomas Asbridge',
    isbn: '9780060751418',
    category: 'History',
    description: 'The epic story of the wars for the Holy Lands.',
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=400',
    stock: 3,
    rating: 4.7,
    publishedYear: 2010
  }
];

export const getBooks = (): Book[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKS));
    return INITIAL_BOOKS;
  }
  return JSON.parse(stored);
};

export const saveBooks = (books: Book[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

export const addBook = (book: Book) => {
  const books = getBooks();
  books.push(book);
  saveBooks(books);
};

export const updateBook = (updatedBook: Book) => {
  const books = getBooks();
  const index = books.findIndex(b => b.id === updatedBook.id);
  if (index !== -1) {
    books[index] = updatedBook;
    saveBooks(books);
  }
};

export const deleteBook = (id: string) => {
  const books = getBooks();
  const filtered = books.filter(b => b.id !== id);
  saveBooks(filtered);
};

export const getReservations = (): Reservation[] => {
  const stored = localStorage.getItem(RESERVATIONS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addReservation = (bookId: string) => {
  const reservations = getReservations();
  const now = new Date();
  const expires = new Date();
  expires.setDate(now.getDate() + 2);

  const newReservation: Reservation = {
    id: `res-${Math.random().toString(36).substr(2, 9)}`,
    bookId,
    reservedAt: now.toISOString().split('T')[0],
    expiresAt: expires.toISOString().split('T')[0],
  };

  reservations.push(newReservation);
  localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
  return newReservation;
};

export const removeReservation = (id: string) => {
  const reservations = getReservations();
  const filtered = reservations.filter(r => r.id !== id);
  localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(filtered));
};
