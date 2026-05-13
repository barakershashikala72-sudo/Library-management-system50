export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  description: string;
  coverImage: string;
  stock: number;
  rating: number;
  publishedYear: number;
}

export type UserRole = 'student' | 'employee' | 'admin';
