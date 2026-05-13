import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Book } from '../types/book';
import { getBooks, getReservations } from '../lib/db';
import { Reservation } from '../types/reservation';
import { cn } from '../lib/utils';
import BookDetailModal from '../components/ui/BookDetailModal';
import { useLanguage } from '../contexts/LanguageContext';

const CAROUSEL_IMAGES = [
  'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200&h=400',
  'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200&h=400',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1200&h=400',
];

export default function Home() {
  const { t } = useLanguage();
  const [books, setBooks] = useState<Book[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [visibleBooksCount, setVisibleBooksCount] = useState(6);
  
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('q')?.toLowerCase();

  useEffect(() => {
    setVisibleBooksCount(6);
  }, [selectedCategory, query]);

  useEffect(() => {
    const loadData = () => {
      setBooks(getBooks());
      setReservations(getReservations());
    };
    loadData();
    const interval = setInterval(loadData, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenDetail = (book: Book) => {
    setSelectedBook(book);
    setIsDetailOpen(true);
  };

  const nextCarousel = () => setCarouselIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  const prevCarousel = () => setCarouselIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);

  const categories = ['All', 'Engineering', 'History', 'Strategy', 'Blog', 'Literature'];
  
  // Filter out reserved books for regular browsing
  // But show them as "Reserved" for search results to show they exist but are taken
  const reservedBookIds = new Set(reservations.map(r => r.bookId));
  
  let displayedBooks = [];
  
  if (query) {
    // Search Mode: Show all matches, but distinguish reserved ones
    displayedBooks = books.filter(b => 
      b.title.toLowerCase().includes(query) || 
      b.author.toLowerCase().includes(query) || 
      b.isbn.toLowerCase().includes(query)
    );
  } else {
    // Browse Mode: Hide reserved books entirely
    displayedBooks = books.filter(b => !reservedBookIds.has(b.id));
  }

  const filteredBooks = displayedBooks.filter(b => selectedCategory === 'All' || b.category === selectedCategory);
  const visibleBooks = filteredBooks.slice(0, visibleBooksCount);
  const availableBooks = books.filter(b => !reservedBookIds.has(b.id));

  const resultsRef = React.useRef<HTMLDivElement>(null);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-12 font-sans overflow-x-hidden">
      {/* Carousel Section */}
      <section className="relative h-[250px] md:h-[400px] overflow-hidden group">
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
        >
          {CAROUSEL_IMAGES.map((img, i) => (
            <div key={i} className="min-w-full h-full relative">
              <img src={img} alt="hero" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-transparent/50 to-black/20 flex items-center justify-center">
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={`quote-${carouselIndex}`}
                  className="text-white text-2xl md:text-5xl font-black text-center px-4 drop-shadow-2xl italic tracking-tighter -translate-y-8 md:-translate-y-16"
                >
                  {t.home.heroQuote}
                </motion.h1>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={prevCarousel}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-4 bg-white/20 hover:bg-white/40 text-white rounded-r-md hidden group-hover:block transition-all"
        >
          <ChevronLeft size={48} />
        </button>
        <button 
          onClick={nextCarousel}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-4 bg-white/20 hover:bg-white/40 text-white rounded-l-md hidden group-hover:block transition-all"
        >
          <ChevronRight size={48} />
        </button>
      </section>

      {/* Grid Section */}
      <main className="max-w-[1500px] mx-auto px-4 -mt-32 md:-mt-48 relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Ad Cards / Category Cards */}
        <div className="bg-white p-5 flex flex-col shadow-sm">
          <h2 className="text-xl font-bold mb-3 uppercase tracking-tight">{t.home.browseCategories}</h2>
          <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-4">
             <div onClick={() => handleSelectCategory('Engineering')} className="space-y-1 cursor-pointer group">
                <div className="aspect-square bg-gray-100 overflow-hidden border-2 border-transparent group-hover:border-blue-600">
                   <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200" alt="structural engineering" className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] font-bold group-hover:text-blue-600 uppercase tracking-tighter">Engineering</p>
             </div>
             <div onClick={() => handleSelectCategory('History')} className="space-y-1 cursor-pointer group">
                <div className="aspect-square bg-gray-100 overflow-hidden border-2 border-transparent group-hover:border-blue-600">
                   <img src="https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&q=80&w=200" alt="Sapiens book" className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] font-bold group-hover:text-blue-600 uppercase tracking-tighter">History</p>
             </div>
             <div onClick={() => handleSelectCategory('Strategy')} className="space-y-1 cursor-pointer group">
                <div className="aspect-square bg-gray-100 overflow-hidden border-2 border-transparent group-hover:border-blue-600">
                   <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200" alt="Blue Ocean Strategy" className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] font-bold group-hover:text-blue-600 uppercase tracking-tighter">Strategy</p>
             </div>
             <div onClick={() => handleSelectCategory('Blog')} className="space-y-1 cursor-pointer group">
                <div className="aspect-square bg-gray-100 overflow-hidden border-2 border-transparent group-hover:border-blue-600">
                   <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=200" alt="book" className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] font-bold group-hover:text-blue-600 uppercase tracking-tighter">Blog</p>
             </div>
             <div onClick={() => handleSelectCategory('Literature')} className="space-y-1 cursor-pointer group">
                <div className="aspect-square bg-gray-100 overflow-hidden border-2 border-transparent group-hover:border-blue-600">
                   <img src="https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=200" alt="The Great Gatsby" className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] font-bold group-hover:text-blue-600 uppercase tracking-tighter">Literature</p>
             </div>
             <div onClick={() => handleSelectCategory('All')} className="space-y-1 cursor-pointer group">
                <div className="aspect-square bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-200 group-hover:border-blue-600 group-hover:bg-gray-100 transition-all">
                   <span className="text-[10px] font-black text-gray-400 group-hover:text-blue-600">{t.home.seeAll.toUpperCase()}</span>
                </div>
                <p className="text-[10px] font-bold group-hover:text-blue-600 uppercase tracking-tighter">{t.home.seeAll}</p>
             </div>
          </div>
          <span onClick={() => handleSelectCategory('All')} className="mt-4 text-blue-600 text-sm hover:text-orange-700 cursor-pointer hover:underline">{t.home.showAllMaterials}</span>
        </div>

        <div className="bg-white p-5 shadow-sm flex flex-col">
          <h2 className="text-xl font-bold mb-3 italic tracking-tighter">{t.home.guidelinesTitle}</h2>
          <div className="flex-1 overflow-hidden">
             <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600" alt="guidelines" className="w-full h-[250px] object-cover" />
          </div>
          <span className="mt-4 text-blue-600 text-sm hover:text-blue-800 cursor-pointer hover:underline">{t.home.guidelinesLink}</span>
        </div>

        <div className="bg-white p-5 shadow-sm flex flex-col">
          <h2 className="text-xl font-bold mb-3 italic tracking-tighter">{t.home.repositoryTitle}</h2>
          <div className="flex-1 overflow-hidden">
             <img src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&q=80&w=400" alt="digital resources" className="w-full h-[250px] object-cover" />
          </div>
          <span className="mt-4 text-blue-600 text-sm hover:text-blue-800 cursor-pointer hover:underline">{t.home.repositoryLink}</span>
        </div>

        <div className="bg-white p-5 shadow-sm space-y-4">
           <div className="space-y-2">
             <h2 className="text-xl font-bold tracking-tight uppercase">{t.home.portalLoginTitle}</h2>
             <button className="w-full bg-blue-600 text-white py-2 text-sm rounded-sm shadow-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-all">{t.home.portalLoginButton}</button>
           </div>
           <div className="border-t pt-4">
              <h3 className="font-bold">{t.home.newDataTitle}</h3>
              <div className="mt-2 h-[120px] bg-gray-100 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=400" alt="data structures" className="w-full h-full object-cover" />
              </div>
           </div>
        </div>
      </main>

      {/* Book Rails */}
      <section className="max-w-[1500px] mx-auto px-4 mt-8" ref={resultsRef}>
        <div className="bg-white p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
             <div>
                <h2 className="text-2xl font-bold">
                  {query ? `${t.home.resultsFor} "${query}"` : (selectedCategory === 'All' ? t.home.bestSellers : `${t.home.topCategories} In ${selectedCategory}`)}
                </h2>
                {!query && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {categories.map(cat => (
                        <button 
                          key={cat} 
                          onClick={() => setSelectedCategory(cat)}
                          className={cn(
                            "text-xs px-3 py-1 rounded-full border transition-all",
                            selectedCategory === cat ? "bg-blue-600 text-white border-blue-600" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400"
                          )}
                        >
                          {cat}
                        </button>
                    ))}
                  </div>
                )}
             </div>
             <span onClick={() => setSelectedCategory('All')} className="text-blue-600 text-sm hover:text-orange-700 cursor-pointer hover:underline whitespace-nowrap">{t.home.resetFilter}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {visibleBooks.map(book => (
              <motion.div 
                key={book.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="group cursor-pointer"
                onClick={() => handleOpenDetail(book)}
              >
                <div className="aspect-[2/3] bg-gray-100 mb-2 overflow-hidden relative">
                   <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-2 left-2 bg-f1-red text-white text-[10px] font-bold px-2 py-0.5 transform skew-x-[-15deg]">
                     <span className="block transform skew-x-[15deg]">BEST SELLER</span>
                   </div>
                </div>
                <h3 className="text-sm font-medium line-clamp-2 leading-tight group-hover:text-orange-700 transition-colors uppercase tracking-tight">{book.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{book.author}</p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={cn(i < Math.floor(book.rating) ? "fill-blue-500 text-blue-500" : "text-gray-300")} 
                    />
                  ))}
                  <span className="text-xs text-blue-600 ml-1">{book.rating}</span>
                </div>
                <div className="mt-1">
                   {reservedBookIds.has(book.id) ? (
                     <>
                       <span className="text-sm font-bold text-red-600 uppercase tracking-tight">{t.home.reserved}</span>
                       <span className="text-[10px] ml-1 text-gray-400 uppercase tracking-widest block italic">{t.home.checkedOut}</span>
                     </>
                   ) : (
                     <>
                       <span className="text-sm font-bold text-green-600 uppercase tracking-tight">{t.home.available}</span>
                       <span className="text-[10px] ml-1 text-gray-400 uppercase tracking-widest block">In Catalog</span>
                     </>
                   )}
                </div>
              </motion.div>
            ))}
            {filteredBooks.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500 italic">
                {t.home.noResults}
              </div>
            )}
          </div>
          
          {filteredBooks.length > visibleBooksCount && (
            <div className="mt-12 flex justify-center">
              <button 
                onClick={() => setVisibleBooksCount(prev => prev + 6)}
                className="px-8 py-3 bg-white border border-gray-300 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-gray-50 transition-colors shadow-sm active:scale-95"
              >
                {t.home.loadMore}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Another Rail */}
       <section className="max-w-[1500px] mx-auto px-4 mt-8">
        <div className="bg-white p-6 shadow-sm overflow-hidden">
          <h2 className="text-2xl font-bold mb-4">{t.home.recommended}</h2>
          <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide focus:outline-none">
             {availableBooks.map(book => (
                <div 
                  key={book.id + '-rec'} 
                  className="flex-shrink-0 w-[150px] cursor-pointer group/rec"
                  onClick={() => handleOpenDetail(book)}
                >
                   <div className="w-full aspect-[2/3] bg-gray-100 overflow-hidden mb-2 relative">
                       <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover group-hover/rec:scale-110 transition-transform duration-500" />
                       <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/rec:opacity-100 transition-opacity" />
                   </div>
                   <p className="text-xs text-blue-600 hover:text-orange-700 font-bold uppercase tracking-tighter line-clamp-1">{book.title}</p>
                   <p className="text-[10px] text-gray-400 font-medium">{book.author}</p>
                </div>
             ))}
             {availableBooks.length === 0 && (
               <div className="text-gray-400 italic text-sm py-4">{t.home.noRecommendations}</div>
             )}
          </div>
        </div>
      </section>

      <BookDetailModal 
        book={selectedBook}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        theme="amazon"
      />
    </div>
  );
}
