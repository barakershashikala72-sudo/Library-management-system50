import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { addBook, deleteBook, getBooks, updateBook } from '../../lib/db';
import { cn } from '../../lib/utils';
import { Book } from '../../types/book';
import { Edit, Plus, Search, Star, Trash2, X, Zap } from 'lucide-react';
import BookDetailModal from '../../components/ui/BookDetailModal';
import { useLanguage } from '../../contexts/LanguageContext';

interface PortalProps {
  role: 'student' | 'employee' | 'admin';
}

export default function Portal({ role }: PortalProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    author: '',
    isbn: '',
    category: '',
    description: '',
    coverImage: 'https://images.unsplash.com/photo-1543004218-ee141d842247?auto=format&fit=crop&q=80&w=400',
    stock: 0,
    rating: 0,
    publishedYear: new Date().getFullYear(),
  });

  useEffect(() => {
    setBooks(getBooks());
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCategory('All');
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenAdd = () => {
    setEditingBook(null);
    setFormData({
      title: '',
      author: '',
      isbn: '',
      category: '',
      description: '',
      coverImage: 'https://images.unsplash.com/photo-1543004218-ee141d842247?auto=format&fit=crop&q=80&w=400',
      stock: 5,
      rating: 4.0,
      publishedYear: new Date().getFullYear(),
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (book: Book) => {
    setEditingBook(book);
    setFormData(book);
    setIsModalOpen(true);
  };

  const handleOpenDetail = (book: Book) => {
    setSelectedBook(book);
    setIsDetailOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      updateBook({ ...editingBook, ...formData } as Book);
    } else {
      addBook({ ...formData, id: Date.now().toString() } as Book);
    }
    setBooks(getBooks());
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm(t.portal.deleteConfirm)) {
      deleteBook(id);
      setBooks(getBooks());
    }
  };

  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Engineering', 'History', 'Strategy', 'Blog', 'Literature'];

  const resultsRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const handleSearchIconClick = () => {
    searchInputRef.current?.focus();
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isAdminOrEmployee = role === 'admin' || role === 'employee';

  return (
    <div className="bg-f1-black min-h-screen text-white font-display">
      {/* Header Stat Strip */}
      <div className="border-b border-white/5 py-4 px-4 bg-f1-dark overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-12 items-center">
           <div className="flex-shrink-0">
              <span className="text-gray-500 text-[10px] uppercase tracking-widest block mb-1">{t.portal.activeUsers}</span>
              <span className="text-xl font-black italic tracking-tighter">1,248 <span className="text-f1-red text-xs">{t.common.live}</span></span>
           </div>
           <div className="flex-shrink-0">
              <span className="text-gray-500 text-[10px] uppercase tracking-widest block mb-1">{t.portal.booksTracked}</span>
              <span className="text-xl font-black italic tracking-tighter">{books.length} <Zap size={14} className="inline text-f1-red" /></span>
           </div>
           <div className="flex-shrink-0">
              <span className="text-gray-500 text-[10px] uppercase tracking-widest block mb-1">{t.portal.rolePermissions}</span>
              <span className="text-xl font-black italic tracking-tighter text-f1-red uppercase">{role}</span>
           </div>
           <motion.div 
             animate={{ x: [0, 10, 0] }}
             transition={{ duration: 4, repeat: Infinity }}
             className="ml-auto hidden lg:block"
           >
              <div className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-3">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-bold tracking-widest opacity-70 italic">{t.portal.systemStatus}</span>
              </div>
           </motion.div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-end">
           <div className="flex-1 w-full space-y-4">
              <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter uppercase leading-none">
                 {role === 'student' ? t.portal.studentDashboard : `${role} ${t.portal.central}`}
              </h1>
              <p className="text-gray-500 uppercase tracking-[0.2em] text-xs font-bold pl-1">
                 {t.portal.managementSystem}
              </p>
           </div>
           
           <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                 <Search 
                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" 
                   size={18} 
                   onClick={handleSearchIconClick} 
                 />
                 <input 
                   ref={searchInputRef}
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-f1-red transition-all font-mono text-white"
                   placeholder={t.portal.searchPlaceholder}
                 />
              </div>
              {isAdminOrEmployee && (
                <button 
                  onClick={handleOpenAdd}
                  className="bg-f1-red hover:bg-white hover:text-f1-red text-white px-8 py-3 rounded-sm font-black italic uppercase tracking-widest transition-all transform skew-x-[-15deg] group"
                >
                   <span className="flex items-center gap-2 transform skew-x-[15deg]">
                      <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                      {t.portal.newEntry}
                   </span>
                </button>
              )}
           </div>
        </div>

        {/* Content Tabs Simulation */}
        <div className="border-b-4 border-white/5 flex gap-4 md:gap-8 mb-8 overflow-x-auto scrollbar-hide py-2">
           {categories.map(cat => (
             <button 
               key={cat}
               onClick={() => handleCategoryClick(cat)}
               className={cn(
                 "py-4 px-2 -mb-[4px] font-black italic uppercase tracking-tighter transition-colors whitespace-nowrap border-b-4",
                 selectedCategory === cat ? "border-f1-red text-white" : "border-transparent text-gray-600 hover:text-white"
               )}
             >
               {cat === 'All' ? t.portal.allMaterials : cat}
             </button>
           ))}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4 px-2">
           <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              {t.portal.showing} <span className="text-f1-red">{filteredBooks.length}</span> {t.portal.resultsIn} <span className="text-f1-red">{selectedCategory === 'All' ? t.portal.allMaterials : selectedCategory}</span>
           </div>
           {selectedCategory !== 'All' && (
             <button 
               onClick={() => setSelectedCategory('All')}
               className="text-[10px] font-black italic text-f1-red hover:text-white transition-colors uppercase tracking-widest"
             >
                {t.portal.resetFilter}
             </button>
           )}
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={resultsRef}>
           <AnimatePresence mode='popLayout'>
            {filteredBooks.map((book, idx) => (
               <motion.div 
                 layout
                 key={book.id}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.8 }}
                 className="group relative bg-f1-dark border border-white/5 hover:border-f1-red/50 transition-all duration-500 overflow-hidden"
               >
                  {/* Card Background Branding */}
                  <div className="absolute -right-8 -top-8 text-white/[0.02] text-9xl font-black italic select-none pointer-events-none group-hover:text-f1-red/5 transition-colors">
                     {idx + 1}
                  </div>

                  <div className="p-1">
                     <div className="relative aspect-[16/9] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-f1-dark via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4 flex flex-col gap-1">
                           <span className="bg-f1-red text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 transform skew-x-[-15deg]">
                              <span className="block transform skew-x-[15deg]">{book.category}</span>
                           </span>
                        </div>
                        {isAdminOrEmployee && (
                           <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                              <button 
                                onClick={() => handleOpenEdit(book)}
                                className="w-10 h-10 bg-blue-600/90 backdrop-blur-sm text-white flex items-center justify-center rounded-sm hover:bg-blue-500 transition-colors"
                              >
                                 <Edit size={18} />
                              </button>
                              <button 
                                onClick={() => handleDelete(book.id)}
                                className="w-10 h-10 bg-f1-red/90 backdrop-blur-sm text-white flex items-center justify-center rounded-sm hover:bg-red-500 transition-colors"
                              >
                                 <Trash2 size={18} />
                              </button>
                           </div>
                        )}
                     </div>
                  </div>

                  <div className="p-6 pt-0 relative">
                     <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none group-hover:text-f1-red transition-colors">{book.title}</h3>
                        <div className="flex items-center gap-1 text-f1-red">
                           <Star size={14} fill="currentColor" />
                           <span className="font-black italic text-sm">{book.rating}</span>
                        </div>
                     </div>
                     <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">{book.author}</p>
                     
                     <div className="flex border-t border-white/5 pt-4 gap-6 items-center">
                         <div className="flex-1">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold mb-1">{t.modal.availability}</span>
                            <div className="h-1 bg-white/10 overflow-hidden">
                               <div className="h-full bg-f1-red" style={{ width: `${(book.stock / 10) * 100}%` }}></div>
                            </div>
                         </div>
                         <div className="text-right">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold mb-1">{t.portal.stock.toUpperCase()}</span>
                            <span className="font-black italic text-lg leading-none">{book.stock}U</span>
                         </div>
                     </div>

                     <button 
                        onClick={() => handleOpenDetail(book)}
                        className="w-full mt-6 border border-white/10 py-3 font-black italic uppercase tracking-widest text-xs hover:bg-white hover:text-f1-black transition-all transform skew-x-[-15deg] group-hover:border-f1-red"
                     >
                        <span className="block transform skew-x-[15deg]">{t.portal.inspectDetail}</span>
                     </button>
                  </div>
               </motion.div>
            ))}
           </AnimatePresence>
        </div>
      </main>

      <BookDetailModal 
        book={selectedBook}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        theme="f1"
      />

      {/* Modal - F1 Style */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-f1-black/90 backdrop-blur-md"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-2xl bg-f1-dark border-r-8 border-f1-red p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>

              <div className="mb-8">
                 <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none mb-2">
                    {editingBook ? t.portal.editBook : t.portal.newRecord}
                 </h2>
                 <div className="h-1 w-24 bg-f1-red"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                       <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{t.portal.bookTitle}</label>
                       <input 
                         required
                         value={formData.title}
                         onChange={(e) => setFormData({...formData, title: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 p-3 rounded-none focus:outline-none focus:border-f1-red font-mono text-sm"
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{t.portal.author}</label>
                       <input 
                         required
                         value={formData.author}
                         onChange={(e) => setFormData({...formData, author: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 p-3 rounded-none focus:outline-none focus:border-f1-red font-mono text-sm"
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{t.portal.category}</label>
                       <select 
                         required
                         value={formData.category}
                         onChange={(e) => setFormData({...formData, category: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 p-3 rounded-none focus:outline-none focus:border-f1-red font-mono text-sm text-white appearance-none"
                       >
                         <option value="" disabled className="bg-f1-dark text-gray-500">{t.portal.selectCategory}</option>
                         {categories.filter(c => c !== 'All').map(cat => (
                            <option key={cat} value={cat} className="bg-f1-dark text-white">{cat}</option>
                         ))}
                       </select>
                    </div>
                     <div className="space-y-1">
                       <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{t.portal.isbn}</label>
                       <input 
                         required
                         value={formData.isbn}
                         onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 p-3 rounded-none focus:outline-none focus:border-f1-red font-mono text-sm"
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{t.portal.stock}</label>
                       <input 
                         required
                         type="number"
                         value={formData.stock}
                         onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                         className="w-full bg-white/5 border border-white/10 p-3 rounded-none focus:outline-none focus:border-f1-red font-mono text-sm"
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{t.portal.coverUrl}</label>
                       <input 
                         required
                         value={formData.coverImage}
                         onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 p-3 rounded-none focus:outline-none focus:border-f1-red font-mono text-sm"
                       />
                    </div>
                 </div>

                 <div className="mt-8 flex gap-4">
                    <button 
                      type="submit"
                      className="flex-1 bg-f1-red text-white py-4 font-black italic uppercase tracking-[0.2em] hover:bg-white hover:text-f1-red transition-all transform skew-x-[-15deg]"
                    >
                       <span className="block transform skew-x-[15deg]">{t.portal.saveRecord}</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-8 border border-white/10 hover:bg-white/5 transition-colors font-black italic uppercase tracking-widest text-xs transform skew-x-[-15deg]"
                    >
                       <span className="block transform skew-x-[15deg]">{t.portal.cancel}</span>
                    </button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
