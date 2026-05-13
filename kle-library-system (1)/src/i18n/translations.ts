export type Language = 'en' | 'kn' | 'hi';

export interface Translations {
  nav: {
    checkReserved: string;
    myBorrowed: string;
    portals: string;
    searchPlaceholder: string;
    catalog: string;
    menu: string;
    studentPortal: string;
    facultyAccess: string;
    librarianPortal: string;
    locationLabel: string;
    locationName: string;
    digitalResources: string;
    eJournals: string;
    logout: string;
    quickSearch: string;
    student: string;
    employee: string;
    admin: string;
  };
  home: {
    topCategories: string;
    recommended: string;
    bestSellers: string;
    available: string;
    reserved: string;
    checkedOut: string;
    resultsFor: string;
    resetFilter: string;
    loadMore: string;
    heroQuote: string;
    browseCategories: string;
    seeAll: string;
    showAllMaterials: string;
    guidelinesTitle: string;
    guidelinesLink: string;
    repositoryTitle: string;
    repositoryLink: string;
    portalLoginTitle: string;
    portalLoginButton: string;
    newDataTitle: string;
    noResults: string;
    noRecommendations: string;
  };
  reservations: {
    title: string;
    titleAccent: string;
    holdDuration: string;
    activeHolds: string;
    emptyQueue: string;
    browseCatalog: string;
    reserved: string;
    expires: string;
    pickupAt: string;
    readyForPickup: string;
    terms: string;
  };
  modal: {
    reserveBook: string;
    alreadyReserved: string;
    viewDetails: string;
    description: string;
    published: string;
    isbn: string;
    rating: string;
    description: string;
    availability: string;
    inStock: string;
    outOfStock: string;
    markLater: string;
    dataVerified: string;
  };
  reservations: {
    title: string;
    titleAccent: string;
    holdDuration: string;
    activeHolds: string;
    emptyQueue: string;
    browseCatalog: string;
    reserved: string;
    expires: string;
    pickupAt: string;
    readyForPickup: string;
    terms: string;
    library: string;
    emptyDescription: string;
    pickupLocation: string;
  };
  footer: {
    backToTop: string;
    getInTouch: string;
    help: string;
    policy: string;
    portals: string;
    studentView: string;
    employeeManagement: string;
    adminDashboard: string;
    support: string;
    itDesk: string;
    libraryPolicy: string;
    accessGuide: string;
    corporate: string;
    privacyPolicy: string;
    termsOfService: string;
    cookiePolicy: string;
    officialPartner: string;
    highSpeedEducation: string;
    careers: string;
    aboutKLE: string;
    sustainability: string;
    pressCenter: string;
    makeMoney: string;
    donateBooks: string;
    becomeMember: string;
    publishWithUs: string;
    hostEvent: string;
    payment: string;
    subscriptions: string;
    giftCards: string;
    lateFees: string;
    yourAccount: string;
    yourBooks: string;
    conditionsOfUse: string;
    ads: string;
  };
  portal: {
    studentDashboard: string;
    central: string;
    managementSystem: string;
    searchPlaceholder: string;
    newEntry: string;
    allMaterials: string;
    showing: string;
    resultsIn: string;
    resetFilter: string;
    inspectDetail: string;
    activeUsers: string;
    booksTracked: string;
    rolePermissions: string;
    systemStatus: string;
    editBook: string;
    newRecord: string;
    saveRecord: string;
    cancel: string;
    bookTitle: label;
    author: label;
    category: label;
    isbn: label;
    stock: label;
    coverUrl: label;
    selectCategory: string;
    deleteConfirm: string;
  };
  common: {
    by: string;
    library: string;
    live: string;
  };
}

type label = string;

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      checkReserved: 'Check Reserved',
      myBorrowed: 'My Borrowed',
      portals: 'Portals',
      searchPlaceholder: 'Search catalog, authors, or ISBN...',
      catalog: 'Catalog',
      menu: 'Menu',
      studentPortal: 'Student Portal',
      facultyAccess: 'Faculty Access',
      librarianPortal: 'Librarian Portal',
      locationLabel: 'Location',
      locationName: 'Central Library',
      digitalResources: 'Digital Resources',
      eJournals: 'E-Journals',
      logout: 'Logout',
      quickSearch: 'QUICK SEARCH...',
      student: 'Student',
      employee: 'Employee',
      admin: 'Admin',
    },
    home: {
      topCategories: 'Top Categories',
      recommended: 'Recommended for You',
      bestSellers: 'Best Sellers in Books',
      available: 'Available',
      reserved: 'Reserved / Unavailable',
      checkedOut: 'Checked out by student',
      resultsFor: 'Search results for',
      resetFilter: 'Reset Filter',
      loadMore: 'Load More',
      heroQuote: '"Today a reader, tomorrow a leader."',
      browseCategories: 'Browse Categories',
      seeAll: 'See All',
      showAllMaterials: 'Show All Materials',
      guidelinesTitle: 'KLE Library Guidelines',
      guidelinesLink: 'View member policies',
      repositoryTitle: 'Digital Repository',
      repositoryLink: 'Browse archives',
      portalLoginTitle: 'Portal Login',
      portalLoginButton: 'Access Dashboard',
      newDataTitle: 'New in Data Structures',
      noResults: 'No entries found in this category.',
      noRecommendations: 'No recommendations available at the moment.',
    },
    reservations: {
      title: 'My',
      titleAccent: 'Reserved',
      holdDuration: 'Hold duration: 48 hours from notification',
      activeHolds: 'Active Holds',
      emptyQueue: 'Your queue is empty',
      browseCatalog: 'Browse Catalog',
      reserved: 'Reserved',
      expires: 'Expires',
      pickupAt: 'Pickup At',
      readyForPickup: 'Ready for immediate pickup',
      terms: '* reservations are subject to library terms and conditions.',
      library: 'Library',
      emptyDescription: 'Browse the catalog and reserve items to have them held for you at the circulation desk.',
      pickupLocation: 'Unit 4-A',
    },
    modal: {
      reserveBook: 'RESERVE BOOK',
      alreadyReserved: 'BOOK ALREADY RESERVED',
      viewDetails: 'View Full Profile',
      description: 'Description',
      published: 'Published',
      isbn: 'ISBN',
      rating: 'Rating',
      availability: 'Availability',
      inStock: 'Units In Stock',
      outOfStock: 'Out of Stock',
      markLater: 'MARK LATER',
      dataVerified: 'DATA VERIFIED',
    },
    footer: {
      backToTop: 'Back to top',
      getInTouch: 'Get to Know Us',
      help: 'Let Us Help You',
      policy: 'Privacy Notice',
      portals: 'Portals',
      studentView: 'Student View',
      employeeManagement: 'Employee Management',
      adminDashboard: 'Admin Dashboard',
      support: 'Support',
      itDesk: 'IT Desk',
      libraryPolicy: 'Library Policy',
      accessGuide: 'Access Guide',
      corporate: 'Corporate',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      cookiePolicy: 'Cookie Policy',
      officialPartner: 'Official Partner',
      highSpeedEducation: 'High Speed Education',
      careers: 'Careers',
      aboutKLE: 'About KLE',
      sustainability: 'Sustainability',
      pressCenter: 'Press Center',
      makeMoney: 'Make Money with Us',
      donateBooks: 'Donate Books',
      becomeMember: 'Become a Member',
      publishWithUs: 'Publish with Us',
      hostEvent: 'Host an Event',
      payment: 'Library Payment',
      subscriptions: 'Subscription Plans',
      giftCards: 'Gift Cards',
      lateFees: 'Late Fees Policy',
      yourAccount: 'Your Account',
      yourBooks: 'Your Books',
      conditionsOfUse: 'Conditions of Use',
      ads: 'Interest-Based Ads',
    },
    portal: {
      studentDashboard: 'Student Dashboard',
      central: 'Central',
      managementSystem: 'Cloud-Based Library Management System',
      searchPlaceholder: 'SEARCH CATALOG/BOOK...',
      newEntry: 'NEW ENTRY',
      allMaterials: 'All Materials',
      showing: 'Showing',
      resultsIn: 'Results in',
      resetFilter: 'Reset Filter [ESC]',
      inspectDetail: 'Inspect Detail',
      activeUsers: 'Active Users',
      booksTracked: 'Books Tracked',
      rolePermissions: 'Role Permissions',
      systemStatus: 'SYSTEM STATUS: OPTIMAL',
      editBook: 'Edit Book Details',
      newRecord: 'New Library Entry',
      saveRecord: 'SAVE LIBRARY RECORD',
      cancel: 'CANCEL',
      bookTitle: 'Book Title',
      author: 'Author',
      category: 'Int. Category',
      isbn: 'Serial ISBN',
      stock: 'Available Units',
      coverUrl: 'Cover URL',
      selectCategory: 'Select Category',
      deleteConfirm: 'Are you sure you want to delete this book?',
    },
    common: {
      by: 'By',
      library: 'Library',
      live: 'LIVE',
    }
  },
  kn: {
    nav: {
      checkReserved: 'ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ',
      myBorrowed: 'ನನ್ನ ಸಾಲಗಳು',
      portals: 'ಪೋರ್ಟಲ್‌ಗಳು',
      searchPlaceholder: 'ಕ್ಯಾಟಲಾಗ್, ಲೇಖಕರು ಅಥವಾ ISBN ಹುಡುಕಿ...',
      catalog: 'ಕ್ಯಾಟಲಾಗ್',
      menu: 'ಮೆನು',
      studentPortal: 'ವಿದ್ಯಾರ್ಥಿ ಪೋರ್ಟಲ್',
      facultyAccess: 'ಸಿಬ್ಬಂದಿ ಪ್ರವೇಶ',
      librarianPortal: 'ಗ್ರಂಥಪಾಲಕರ ಪೋರ್ಟಲ್',
      locationLabel: 'ಸ್ಥಳ',
      locationName: 'ಕೇಂದ್ರ ಗ್ರಂಥಾಲಯ',
      digitalResources: 'ಡಿಜಿಟಲ್ ಸಂಪನ್ಮೂಲಗಳು',
      eJournals: 'ಇ-ಜರ್ನಲ್ಸ್',
      logout: 'ನಿರ್ಗಮನ',
      quickSearch: 'ತ್ವರಿತ ಹುಡುಕಾಟ...',
      student: 'ವಿದ್ಯಾರ್ಥಿ',
      employee: 'ಉದ್ಯೋಗಿ',
      admin: 'ನಿರ್ವಾಹಕ',
    },
    home: {
      topCategories: 'ಮುಖ್ಯಾಂಶಗಳು',
      recommended: 'ನಿಮಗಾಗಿ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ',
      bestSellers: 'ಪುಸ್ತಕಗಳಲ್ಲಿ ಹೆಚ್ಚು ಮಾರಾಟವಾಗುವವು',
      available: 'ಲಭ್ಯವಿದೆ',
      reserved: 'ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ / ಅಲಭ್ಯ',
      checkedOut: 'ವಿದ್ಯಾರ್ಥಿಯಿಂದ ಪಡೆಯಲಾಗಿದೆ',
      resultsFor: 'ಹುಡುಕಾಟದ ಫಲಿತಾಂಶಗಳು',
      resetFilter: 'ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ',
      loadMore: 'ಹೆಚ್ಚಿನದನ್ನು ತೋರಿಸಿ',
      heroQuote: '"ಇಂದಿನ ಓದುಗ, ನಾಳೆಯ ನಾಯಕ."',
      browseCategories: 'ವರ್ಗಗಳನ್ನು ನೋಡಿ',
      seeAll: 'ಎಲ್ಲವನ್ನೂ ನೋಡಿ',
      showAllMaterials: 'ಎಲ್ಲಾ ಸಾಮಗ್ರಿಗಳನ್ನು ತೋರಿಸಿ',
      guidelinesTitle: 'KLE ಗ್ರಂಥಾಲಯದ ಮಾರ್ಗಸೂಚಿಗಳು',
      guidelinesLink: 'ಸದಸ್ಯರ ನಿಯಮಗಳನ್ನು ನೋಡಿ',
      repositoryTitle: 'ಡಿಜಿಟಲ್ ರೆಪೊಸಿಟರಿ',
      repositoryLink: 'ಆರ್ಕೈವ್‌ಗಳನ್ನು ನೋಡಿ',
      portalLoginTitle: 'ಪೋರ್ಟಲ್ ಲಾಗಿನ್',
      portalLoginButton: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರವೇಶಿಸಿ',
      newDataTitle: 'ಡೇಟಾ ಸ್ಟ್ರಕ್ಚರ್ಸ್‌ನಲ್ಲಿ ಹೊಸದು',
      noResults: 'ಈ ವರ್ಗದಲ್ಲಿ ಯಾವುದೇ ಫಲಿತಾಂಶಗಳಿಲ್ಲ.',
      noRecommendations: 'ಪ್ರಸ್ತುತ ಯಾವುದೇ ಶಿಫಾರಸುಗಳಿಲ್ಲ.',
    },
    reservations: {
      title: 'ನನ್ನ',
      titleAccent: 'ಕಾಯ್ದಿರಿಸಿದ ಪುಸ್ತಕಗಳು',
      holdDuration: 'ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳುವ ಅವಧಿ: ಸೂಚನೆಯಿಂದ 48 ಗಂಟೆಗಳು',
      activeHolds: 'ಸಕ್ರಿಯ ಕಾಯ್ದಿರಿಸುವಿಕೆ',
      emptyQueue: 'ನಿಮ್ಮ ಪಟ್ಟಿ ಖಾಲಿ ಇದೆ',
      browseCatalog: 'ಕ್ಯಾಟಲಾಗ್ ನೋಡಿ',
      reserved: 'ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ',
      expires: 'ಮುಕ್ತಾಯ ದಿನಾಂಕ',
      pickupAt: 'ಇಲ್ಲಿ ಪಡೆಯಿರಿ',
      readyForPickup: 'ತಕ್ಷಣದ ಪಿಕಪ್‌ಗೆ ಸಿದ್ಧವಾಗಿದೆ',
      terms: '* ಕಾಯ್ದಿರಿಸುವಿಕೆಗಳು ಗ್ರಂಥಾಲಯದ ನಿಯಮಗಳಿಗೆ ಒಳಪಟ್ಟಿರುತ್ತವೆ.',
      library: 'ಗ್ರಂಥಾಲಯ',
      emptyDescription: 'ಕ್ಯಾಟಲಾಗ್ ಅನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ ಮತ್ತು ಸರ್ಕ್ಯುಲೇಷನ್ ಡೆಸ್ಕ್‌ನಲ್ಲಿ ನಿಮಗಾಗಿ ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳಲು ಐಟಂಗಳನ್ನು ಕಾಯ್ದಿರಿಸಿ.',
      pickupLocation: 'ಘಟಕ 4-A',
    },
    modal: {
      reserveBook: 'ಕಾಯ್ದಿರಿಸಿ',
      alreadyReserved: 'ಈಗಾಗಲೇ ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ',
      viewDetails: 'ಪೂರ್ಣ ಮಾಹಿತಿ',
      description: 'ವಿವರಣೆ',
      published: 'ಪ್ರಕಟಣೆ',
      isbn: 'ISBN',
      rating: 'ಶ್ರೇಯಾಂಕ',
      availability: 'ಲಭ್ಯತೆ',
      inStock: 'ದಾಸ್ತಾನುಗಳಿವೆ',
      outOfStock: 'ಖಾಲಿಯಾಗಿದೆ',
      markLater: 'ನಂತರ ಕಾಯ್ದಿರಿಸಿ',
      dataVerified: 'ಮಾಹಿತಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ',
    },
    footer: {
      backToTop: 'ಮೇಲಕ್ಕೆ ಹೋಗಿ',
      getInTouch: 'ನಮ್ಮ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ',
      help: 'ಸಹಾಯ ಬೇಕೆ?',
      policy: 'ಗೌಪ್ಯತೆ ನೀತಿ',
      portals: 'ಪೋರ್ಟಲ್‌ಗಳು',
      studentView: 'ವಿದ್ಯಾರ್ಥಿ ನೋಟ',
      employeeManagement: 'ನೌಕರರ ನಿರ್ವಹಣೆ',
      adminDashboard: 'ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      support: 'ಬೆಂಬಲ',
      itDesk: 'IT ಡೆಸ್ಕ್',
      libraryPolicy: 'ಗ್ರಂಥಾಲಯ ನೀತಿ',
      accessGuide: 'ಪ್ರವೇಶ ಮಾರ್ಗದರ್ಶಿ',
      corporate: 'ಕಾರ್ಪೊರೇಟ್',
      privacyPolicy: 'ಗೌಪ್ಯತೆ ನೀತಿ',
      termsOfService: 'ಸೇವಾ ನಿಯಮಗಳು',
      cookiePolicy: 'ಕುಕಿ ನೀತಿ',
      officialPartner: 'ಅಧಿಕೃತ ಪಾಲುದಾರ',
      highSpeedEducation: 'ಹೈ ಸ್ಪೀಡ್ ಶಿಕ್ಷಣ',
      careers: 'ವೃತ್ತಿಜೀವನ',
      aboutKLE: 'KLE ಬಗ್ಗೆ',
      sustainability: 'ಸುಸ್ಥಿರತೆ',
      pressCenter: 'ಪತ್ರಿಕಾ ಕೇಂದ್ರ',
      makeMoney: 'ನಮ್ಮೊಂದಿಗೆ ಸಂಪಾದಿಸಿ',
      donateBooks: 'ಪುಸ್ತಕಗಳನ್ನು ದಾನ ಮಾಡಿ',
      becomeMember: 'ಸದಸ್ಯರಾಗಿ',
      publishWithUs: 'ನಮ್ಮೊಂದಿಗೆ ಪ್ರಕಟಿಸಿ',
      hostEvent: 'ಕಾರ್ಯಕ್ರಮ ಆಯೋಜಿಸಿ',
      payment: 'ಗ್ರಂಥಾಲಯ ಪಾವತಿ',
      subscriptions: 'ಚಂದಾದಾರಿಕೆ ಯೋಜನೆಗಳು',
      giftCards: 'ಗಿಫ್ಟ್ ಕಾರ್ಡ್‌ಗಳು',
      lateFees: 'ದಂಡ ನೀತಿ',
      yourAccount: 'ನಿಮ್ಮ ಖಾತೆ',
      yourBooks: 'ನಿಮ್ಮ ಪುಸ್ತಕಗಳು',
      conditionsOfUse: 'ಬಳಕೆಯ ನಿಯಮಗಳು',
      ads: 'ಜಾಹೀರಾತುಗಳು',
    },
    portal: {
      studentDashboard: 'ವಿದ್ಯಾರ್ಥಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      central: 'ಕೇಂದ್ರ',
      managementSystem: 'ಕ್ಲೌಡ್-ಆಧಾರಿತ ಗ್ರಂಥಾಲಯ ನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆ',
      searchPlaceholder: 'ಕ್ಯಾಟಲಾಗ್/ಪುಸ್ತಕ ಹುಡುಕಿ...',
      newEntry: 'ಹೊಸ ನಮೂದು',
      allMaterials: 'ಎಲ್ಲಾ ವಸ್ತುಗಳು',
      showing: 'ತೋರಿಸಲಾಗುತ್ತಿದೆ',
      resultsIn: 'ಫಲಿತಾಂಶಗಳು',
      resetFilter: 'ಫಿಲ್ಟರ್ ತೆಗೆದುಹಾಕಿ [ESC]',
      inspectDetail: 'ವಿವರಗಳನ್ನು ನೋಡಿ',
      activeUsers: 'ಸಕ್ರಿಯ ಬಳಕೆದಾರರು',
      booksTracked: 'ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾದ ಪುಸ್ತಕಗಳು',
      rolePermissions: 'ಪಾತ್ರದ ಅನುಮತಿಗಳು',
      systemStatus: 'ವ್ಯವಸ್ಥೆಯ ಸ್ಥಿತಿ: ಉತ್ತಮ',
      editBook: 'ಪುಸ್ತಕದ ವಿವರಗಳನ್ನು ತಿದ್ದುಪಡಿ ಮಾಡಿ',
      newRecord: 'ಹೊಸ ಗ್ರಂಥಾಲಯ ನಮೂದು',
      saveRecord: 'ದಾಖಲೆಯನ್ನು ಉಳಿಸಿ',
      cancel: 'ರದ್ದುಗೊಳಿಸಿ',
      bookTitle: 'ಪುಸ್ತಕದ ಶೀರ್ಷಿಕೆ',
      author: 'ಲೇಖಕರು',
      category: 'ವರ್ಗ',
      isbn: 'ISBN ಸಂಖ್ಯೆ',
      stock: 'ಲಭ್ಯವಿರುವ ಘಟಕಗಳು',
      coverUrl: 'ಕವರ್ URL',
      selectCategory: 'ವರ್ಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
      deleteConfirm: 'ಈ ಪುಸ್ತಕವನ್ನು ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ?',
    },
    common: {
      by: 'ಲೇಖಕರು',
      library: 'ಗ್ರಂಥಾಲಯ',
      live: 'ತಕ್ಷತ್ತು',
    }
  },
  hi: {
    nav: {
      checkReserved: 'आरक्षित देखें',
      myBorrowed: 'मेरी उधार ली गई',
      portals: 'पोर्टल',
      searchPlaceholder: 'कैटलॉग, लेखक या ISBN खोजें...',
      catalog: 'कैटलॉग',
      menu: 'मेनू',
      studentPortal: 'छात्र पोर्टल',
      facultyAccess: 'संकाय पहुंच',
      librarianPortal: 'लाइब्रेरियन पोर्टल',
      locationLabel: 'स्थान',
      locationName: 'केंद्रीय पुस्तकालय',
      digitalResources: 'डिजिटल संसाधन',
      eJournals: 'ई-जर्नल',
      logout: 'लॉगआउट',
      quickSearch: 'त्वरित खोज...',
      student: 'छात्र',
      employee: 'कर्मचारी',
      admin: 'प्रशासक',
    },
    home: {
      topCategories: 'शीर्ष श्रेणियां',
      recommended: 'आपके लिए अनुशंसित',
      bestSellers: 'पुस्तकों में सर्वाधिक बिकने वाली',
      available: 'उपलब्ध',
      reserved: 'आरक्षित / अनुपलब्ध',
      checkedOut: 'छात्र द्वारा लिया गया',
      resultsFor: 'खोज परिणाम',
      resetFilter: 'फ़िल्टर रीसेट करें',
      loadMore: 'और लोड करें',
      heroQuote: '"आज का पाठक, कल का नेता। "',
      browseCategories: 'श्रेणियां ब्राउज़ करें',
      seeAll: 'सभी देखें',
      showAllMaterials: 'सभी सामग्री दिखाएं',
      guidelinesTitle: 'KLE पुस्तकालय दिशानिर्देश',
      guidelinesLink: 'सदस्य नीतियां देखें',
      repositoryTitle: 'डिजिटल रिपॉजिटरी',
      repositoryLink: 'अभिलेखागार ब्राउज़ करें',
      portalLoginTitle: 'पोर्टल लॉगिन',
      portalLoginButton: 'डैशबोर्ड एक्सेस करें',
      newDataTitle: 'डेटा स्ट्रक्चर में नया',
      noResults: 'इस श्रेणी में कोई प्रविष्टि नहीं मिली।',
      noRecommendations: 'फिलहाल कोई सिफारिश उपलब्ध नहीं है।',
    },
    reservations: {
      title: 'मेरी',
      titleAccent: 'आरक्षित पुस्तकें',
      holdDuration: 'धारण अवधि: अधिसूचना से 48 घंटे',
      activeHolds: 'सक्रिय आरक्षण',
      emptyQueue: 'आपकी सूची खाली है',
      browseCatalog: 'कैटलॉग ब्राउज़ करें',
      reserved: 'आरक्षित',
      expires: 'समाप्ति तिथि',
      pickupAt: 'यहाँ से लें',
      readyForPickup: 'तत्काल पिकअप के लिए तैयार',
      terms: '* आरक्षण पुस्तकालय के नियमों और शर्तों के अधीन हैं।',
      library: 'पुस्तकालय',
      emptyDescription: 'कैटलॉग ब्राउज़ करें और वस्तुओं को आरक्षित करें ताकि उन्हें आपके लिए सर्कुलेशन डेस्क पर रखा जा सके।',
      pickupLocation: 'यूनिट 4-A',
    },
    modal: {
      reserveBook: 'आरक्षित करें',
      alreadyReserved: 'पहले से ही आरक्षित है',
      viewDetails: 'पूर्ण विवरण',
      description: 'विवरण',
      published: 'प्रकाशित',
      isbn: 'ISBN',
      rating: 'रेटिंग',
      availability: 'उपलब्धता',
      inStock: 'इकाइयां स्टॉक में',
      outOfStock: 'स्टॉक में नहीं',
      markLater: 'बाद के लिए चिह्नित करें',
      dataVerified: 'डेटा सत्यापित',
    },
    footer: {
      backToTop: 'ऊपर वापस जाएं',
      getInTouch: 'हमारे बारे में जानें',
      help: 'हम आपकी मदद करें',
      policy: 'गोपनीयता नीति',
      portals: 'पोर्टल',
      studentView: 'छात्र दृश्य',
      employeeManagement: 'कर्मचारी प्रबंधन',
      adminDashboard: 'प्रशासक डैशबोर्ड',
      support: 'सहायता',
      itDesk: 'IT डेस्क',
      libraryPolicy: 'पुस्तकालय नीति',
      accessGuide: 'प्रवेश मार्गदर्शिका',
      corporate: 'कॉर्पोरेट',
      privacyPolicy: 'गोपनीयता नीति',
      termsOfService: 'सेवा की शर्तें',
      cookiePolicy: 'कुकी नीति',
      officialPartner: 'आधिकारिक भागीदार',
      highSpeedEducation: 'हाई स्पीड शिक्षा',
      careers: 'करियर',
      aboutKLE: 'KLE के बारे में',
      sustainability: 'सतत विकास',
      pressCenter: 'प्रेस केंद्र',
      makeMoney: 'हमारे साथ कमाएं',
      donateBooks: 'पुस्तकें दान करें',
      becomeMember: 'सदस्य बनें',
      publishWithUs: 'हमारे साथ प्रकाशित करें',
      hostEvent: 'कार्यक्रम आयोजित करें',
      payment: 'पुस्तकालय भुगतान',
      subscriptions: 'सदस्यता योजनाएं',
      giftCards: 'गिफ्ट कार्ड',
      lateFees: 'विलंब शुल्क नीति',
      yourAccount: 'आपका खाता',
      yourBooks: 'आपकी पुस्तकें',
      conditionsOfUse: 'उपयोग की शर्तें',
      ads: 'विज्ञापन',
    },
    portal: {
      studentDashboard: 'छात्र डैशबोर्ड',
      central: 'केंद्रीय',
      managementSystem: 'क्लाउड-आधारित पुस्तकालय प्रबंधन प्रणाली',
      searchPlaceholder: 'कैटलॉग/पुस्तक खोजें...',
      newEntry: 'नई प्रविष्टि',
      allMaterials: 'सभी सामग्री',
      showing: 'दिखा रहा है',
      resultsIn: 'परिणाम',
      resetFilter: 'फ़िल्टर हटाएँ [ESC]',
      inspectDetail: 'विवरण देखें',
      activeUsers: 'सक्रिय उपयोगकर्ता',
      booksTracked: 'ट्रैक की गई पुस्तकें',
      rolePermissions: 'भूमिका अनुमतियाँ',
      systemStatus: 'प्रणाली स्थिति: इष्टतम',
      editBook: 'पुस्तक विवरण संपादित करें',
      newRecord: 'नई पुस्तकालय प्रविष्टि',
      saveRecord: 'रिकॉर्ड सहेजें',
      cancel: 'रद्द करें',
      bookTitle: 'पुस्तक का शीर्षक',
      author: 'लेखक',
      category: 'श्रेणी',
      isbn: 'ISBN संख्या',
      stock: 'उपलब्ध इकाइयाँ',
      coverUrl: 'कवर URL',
      selectCategory: 'श्रेणी चुनें',
      deleteConfirm: 'क्या आप वाकई इस पुस्तक को हटाना चाहते हैं?',
    },
    common: {
      by: 'द्वारा',
      library: 'पुस्तकालय',
      live: 'लाइव',
    }
  }
};
