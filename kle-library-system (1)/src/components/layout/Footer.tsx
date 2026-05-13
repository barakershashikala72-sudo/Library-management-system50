import React from 'react';
import { useLocation } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const location = useLocation();
  const isPortal = location.pathname.startsWith('/portal');

  if (isPortal) {
    return (
      <footer className="bg-f1-black text-white border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
             <h3 className="font-display font-black text-2xl uppercase italic mb-6">KLE <span className="text-f1-red">Portal</span></h3>
             <div className="flex gap-4">
                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-f1-red hover:border-f1-red transition-colors cursor-pointer">
                  <Twitter size={18} />
                </div>
                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-f1-red hover:border-f1-red transition-colors cursor-pointer">
                  <Instagram size={18} />
                </div>
                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-f1-red hover:border-f1-red transition-colors cursor-pointer">
                  <Facebook size={18} />
                </div>
                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-f1-red hover:border-f1-red transition-colors cursor-pointer">
                  <Youtube size={18} />
                </div>
             </div>
          </div>
          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-sm mb-4">{t.footer.portals}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">{t.footer.studentView}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{t.footer.employeeManagement}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{t.footer.adminDashboard}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-sm mb-4">{t.footer.support}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">{t.footer.itDesk}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{t.footer.libraryPolicy}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{t.footer.accessGuide}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-sm mb-4">{t.footer.corporate}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">{t.footer.privacyPolicy}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{t.footer.termsOfService}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{t.footer.cookiePolicy}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-widest font-bold">
          <p>© 2026 KLE Education Group. All Rights Reserved.</p>
          <div className="flex gap-4">
             <span className="text-f1-red">{t.footer.officialPartner}</span>
             <span>{t.footer.highSpeedEducation}</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-amazon-blue text-white text-sm">
      <div 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="bg-amazon-light py-4 text-center hover:bg-opacity-90 cursor-pointer"
      >
        {t.footer.backToTop}
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 py-12 px-4">
        <div>
          <h4 className="font-bold mb-4">{t.footer.getInTouch}</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:underline cursor-pointer">{t.footer.careers}</li>
            <li className="hover:underline cursor-pointer">{t.footer.aboutKLE}</li>
            <li className="hover:underline cursor-pointer">{t.footer.sustainability}</li>
            <li className="hover:underline cursor-pointer">{t.footer.pressCenter}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">{t.footer.makeMoney}</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:underline cursor-pointer">{t.footer.donateBooks}</li>
            <li className="hover:underline cursor-pointer">{t.footer.becomeMember}</li>
            <li className="hover:underline cursor-pointer">{t.footer.publishWithUs}</li>
            <li className="hover:underline cursor-pointer">{t.footer.hostEvent}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">{t.footer.payment}</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:underline cursor-pointer">{t.footer.subscriptions}</li>
            <li className="hover:underline cursor-pointer">{t.footer.giftCards}</li>
            <li className="hover:underline cursor-pointer">{t.footer.lateFees}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">{t.footer.help}</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:underline cursor-pointer">{t.footer.yourAccount}</li>
            <li className="hover:underline cursor-pointer">{t.footer.yourBooks}</li>
            <li className="hover:underline cursor-pointer">{t.footer.help}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 py-12 flex justify-center items-center gap-8">
        <span className="font-bold text-xl uppercase tracking-widest">KLE Library</span>
      </div>
      <div className="bg-black py-8 text-center text-xs text-gray-400">
        <div className="flex justify-center gap-4 mb-2">
          <span className="hover:underline cursor-pointer">{t.footer.conditionsOfUse}</span>
          <span className="hover:underline cursor-pointer">{t.footer.policy}</span>
          <span className="hover:underline cursor-pointer">{t.footer.ads}</span>
        </div>
        <p>© 2026, KLELibrary.edu, Inc. or its affiliates</p>
      </div>
    </footer>
  );
}
