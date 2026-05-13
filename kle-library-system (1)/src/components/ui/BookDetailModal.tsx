import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, BookOpen, Clock, Calendar, Hash, Zap, ShieldAlert } from 'lucide-react';
import { Book } from '../../types/book';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { addReservation, getReservations } from '../../lib/db';
import { Reservation } from '../../types/reservation';
import { useLanguage } from '../../contexts/LanguageContext';

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  theme?: 'f1' | 'amazon';
}

export default function BookDetailModal({ book, isOpen, onClose, theme = 'f1' }: BookDetailModalProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (isOpen) {
      setReservations(getReservations());
    }
  }, [isOpen]);

  if (!book) return null;

  const isReserved = reservations.some(r => r.bookId === book.id);

  const handleReserve = () => {
    if (book && !isReserved) {
      addReservation(book.id);
      onClose();
      navigate('/reservations');
    }
  };

  const isF1 = theme === 'f1';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "relative w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row",
              isF1 ? "bg-f1-dark border border-white/10" : "bg-white"
            )}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={cn(
                "absolute top-4 right-4 z-10 p-2 rounded-full transition-colors",
                isF1 ? "text-gray-400 hover:text-white" : "text-gray-500 hover:bg-gray-100"
              )}
            >
              <X size={24} />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-2/5 aspect-[3/4] md:aspect-auto relative bg-gray-200">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              {isF1 && (
                <div className="absolute top-4 left-4">
                   <div className="bg-f1-red text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 transform skew-x-[-15deg]">
                      <span className="block transform skew-x-[15deg]">{t.modal.dataVerified}</span>
                   </div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className={cn(
              "flex-1 p-8 md:p-12 flex flex-col",
              isF1 ? "text-white" : "text-gray-900"
            )}>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                   <span className={cn(
                     "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5",
                     isF1 ? "bg-white/10 text-gray-400" : "bg-gray-100 text-gray-600"
                   )}>
                     {book.category}
                   </span>
                   {isF1 && <Zap size={14} className="text-f1-red animate-pulse" />}
                </div>
                <h2 className={cn(
                  "text-3xl md:text-5xl font-black uppercase leading-tight mb-2 tracking-tighter",
                  isF1 ? "italic" : "font-sans"
                )}>
                  {book.title}
                </h2>
                <p className={cn(
                  "text-lg font-bold tracking-widest uppercase",
                  isF1 ? "text-f1-red italic" : "text-gray-600"
                )}>
                  {book.author}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8 pt-6 border-t border-current/10">
                 <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-50">
                       <Calendar size={12} />
                       {t.modal.published}
                    </div>
                    <p className="font-bold">{book.publishedYear}</p>
                 </div>
                 <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-50">
                       <Hash size={12} />
                       {t.modal.isbn}
                    </div>
                    <p className="font-bold font-mono text-xs">{book.isbn}</p>
                 </div>
                 <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-50">
                       <Star size={12} />
                       {t.modal.rating}
                    </div>
                    <div className="flex items-center gap-1 font-bold">
                       {book.rating} <span className="text-[10px] opacity-50">/ 5.0</span>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-50">
                       <Clock size={12} />
                       {t.modal.availability}
                    </div>
                    <p className={cn("font-bold", book.stock > 0 ? "text-green-500" : "text-red-500")}>
                       {book.stock > 0 ? `${book.stock} ${t.modal.inStock}` : t.modal.outOfStock}
                    </p>
                 </div>
              </div>

              <div className="mb-8">
                 <div className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-2">{t.modal.description}</div>
                 <p className={cn(
                   "text-sm leading-relaxed",
                   isF1 ? "text-gray-400" : "text-gray-600"
                 )}>
                   {book.description || `Examine the technical specifications and narrative architecture of ${book.title}. A cornerstone of the ${book.category} division, this volume remains a high-performance asset in our current catalog.`}
                 </p>
              </div>

              <div className="mt-auto flex gap-4">
                 <button 
                   onClick={handleReserve}
                   disabled={isReserved}
                   className={cn(
                    "flex-1 py-4 font-black italic uppercase tracking-widest text-xs transition-all transform skew-x-[-15deg] flex items-center justify-center gap-2",
                    isReserved 
                      ? "bg-gray-400 text-white cursor-not-allowed opacity-80" 
                      : (isF1 ? "bg-f1-red text-white hover:bg-white hover:text-f1-black" : "bg-blue-600 text-white hover:bg-blue-700")
                  )}>
                    <span className="block transform skew-x-[15deg] flex items-center gap-2 text-center w-full justify-center">
                       {isReserved ? (
                         <>
                           <ShieldAlert size={16} />
                           {t.modal.alreadyReserved}
                         </>
                       ) : t.modal.reserveBook}
                    </span>
                 </button>
                 <button className={cn(
                   "px-8 border py-4 font-black italic uppercase tracking-widest text-xs transition-all transform skew-x-[-15deg]",
                   isF1 ? "border-white/10 text-white hover:bg-white/5" : "border-gray-300 text-gray-700 hover:bg-gray-50"
                 )}>
                    <span className="block transform skew-x-[15deg]">{t.modal.markLater}</span>
                 </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
