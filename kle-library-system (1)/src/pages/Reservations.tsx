import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Trash2, BookOpen, ChevronRight, Bookmark, Star, Info } from 'lucide-react';
import { getBooks, getReservations, removeReservation as deleteReservation } from '../lib/db';
import { Book } from '../types/book';
import { Reservation } from '../types/reservation';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import BookDetailModal from '../components/ui/BookDetailModal';
import { useLanguage } from '../contexts/LanguageContext';

export default function Reservations() {
  const { t } = useLanguage();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const allBooks = getBooks();
    setBooks(allBooks);
    setReservations(getReservations());
  }, []);

  const handleRemove = (id: string) => {
    deleteReservation(id);
    setReservations(getReservations());
  };

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium uppercase tracking-widest">
          <Link to="/" className="hover:text-blue-600 transition-colors">{t.reservations.library}</Link>
          <ChevronRight size={12} />
          <Link to="/portal/user" className="hover:text-blue-600 transition-colors">{t.nav.portals}</Link>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-bold">{t.nav.checkReserved}</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#0f1111] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 p-4 rounded-2xl shadow-xl transform rotate-3">
                  <Bookmark size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
                    {t.reservations.title} <span className="text-blue-400">{t.reservations.titleAccent}</span>
                  </h1>
                  <p className="text-gray-400 mt-2 font-mono text-xs uppercase tracking-widest">
                    {t.reservations.holdDuration}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-center px-6 py-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <span className="block text-2xl font-black">{reservations.length}</span>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">{t.reservations.activeHolds}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {reservations.length === 0 ? (
              <div className="text-center py-20 px-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                  <BookOpen size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 italic">{t.reservations.emptyQueue}</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                  {t.reservations.emptyDescription}
                </p>
                <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-blue-700 transition-all shadow-lg active:scale-95">
                  {t.reservations.browseCatalog}
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {reservations.map(res => {
                  const book = books.find(b => b.id === res.bookId);
                  if (!book) return null;
                  
                  return (
                    <motion.div 
                      key={res.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group bg-white border border-gray-100 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl hover:border-blue-100 transition-all overflow-hidden"
                    >
                      {/* Book Cover */}
                      <div className="w-full md:w-40 aspect-[2/3] bg-gray-50 rounded-lg overflow-hidden shadow-md flex-shrink-0 relative group-hover:shadow-2xl transition-all duration-500">
                        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <button 
                             onClick={() => handleViewDetails(book)}
                             className="bg-white text-gray-900 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
                           >
                             <Info size={20} />
                           </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                                {book.category}
                              </span>
                              <span className="text-[10px] text-gray-400 font-mono tracking-tighter uppercase">ISBN: {book.isbn}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                               <Star size={14} fill="currentColor" />
                               {book.rating}
                            </div>
                          </div>
                          <h2 className="text-2xl font-black italic tracking-tighter uppercase text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                            {book.title}
                          </h2>
                          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1 italic">{t.common.by} {book.author} • {book.publishedYear}</p>
                          
                          <p className="mt-4 text-sm text-gray-600 line-clamp-2 italic font-medium leading-relaxed">
                            {book.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-50 p-2 rounded-lg text-gray-400">
                              <Calendar size={18} />
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase font-black tracking-tighter">{t.reservations.reserved}</p>
                              <p className="text-xs font-bold">{res.reservedAt}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="bg-orange-50 p-2 rounded-lg text-orange-500">
                              <Clock size={18} />
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase font-black tracking-tighter">{t.reservations.expires}</p>
                              <p className="text-xs font-bold text-orange-600">{res.expiresAt}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-50 p-2 rounded-lg text-gray-400">
                              <MapPin size={18} />
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase font-black tracking-tighter">{t.reservations.pickupAt}</p>
                              <p className="text-xs font-bold italic uppercase tracking-tighter">{t.reservations.pickupLocation}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex md:flex-col justify-end items-center gap-4 md:gap-2 md:w-24 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100">
                        <button 
                          onClick={() => handleViewDetails(book)}
                          className="flex-1 md:flex-none md:w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-90"
                          title="View Full Profile"
                        >
                          <Info size={22} />
                        </button>
                        <button 
                          onClick={() => handleRemove(res.id)}
                          className="flex-1 md:flex-none md:w-12 h-12 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all shadow-sm active:scale-90"
                          title="Cancel Reservation"
                        >
                          <Trash2 size={22} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="bg-gray-50 p-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               {t.reservations.readyForPickup}
            </div>
            <p className="text-xs text-gray-400 italic">
               {t.reservations.terms}
            </p>
          </div>
        </motion.div>
      </div>

      <BookDetailModal 
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        theme="amazon"
      />
    </div>
  );
}
