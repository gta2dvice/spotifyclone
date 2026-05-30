export const benefits = [
  {
    id: 'ad-free',
    title: 'Ad-free listening',
    description: 'Enjoy uninterrupted music without ads between tracks.',
    icon: 'ad',
  },
  {
    id: 'offline',
    title: 'Download music offline',
    description: 'Save playlists and albums to listen anywhere, anytime.',
    icon: 'download',
  },
  {
    id: 'skips',
    title: 'Unlimited skips',
    description: 'Skip as many songs as you want, whenever you want.',
    icon: 'skip',
  },
  {
    id: 'quality',
    title: 'High quality audio',
    description: 'Stream in up to 320kbps for crystal-clear sound.',
    icon: 'quality',
  },
  {
    id: 'devices',
    title: 'Listen on all devices',
    description: 'Phone, tablet, desktop, TV, and speakers — all synced.',
    icon: 'devices',
  },
  {
    id: 'exclusive',
    title: 'Exclusive content',
    description: 'Early releases, live sessions, and Premium-only playlists.',
    icon: 'exclusive',
  },
]

export const plans = [
  {
    id: 'individual',
    name: 'Individual',
    price: '₹119',
    period: '/month',
    features: ['Ad-free music', 'Offline listening', 'Unlimited skips'],
    popular: false,
  },
  {
    id: 'duo',
    name: 'Duo',
    price: '₹149',
    period: '/month',
    features: ['2 Premium accounts', 'Shared playlist', 'Ad-free for both'],
    popular: false,
  },
  {
    id: 'family',
    name: 'Family',
    price: '₹179',
    period: '/month',
    features: ['Up to 6 accounts', 'Family controls', 'Separate profiles'],
    popular: true,
  },
  {
    id: 'student',
    name: 'Student',
    price: '₹59',
    period: '/month',
    features: ['Verified students only', 'Full Premium access', 'Cancel anytime'],
    popular: false,
  },
]

export const comparisonRows = [
  { feature: 'Ads', free: 'Yes', premium: true },
  { feature: 'Offline Downloads', free: 'No', premium: true },
  { feature: 'Unlimited Skips', free: 'Limited', premium: true },
  { feature: 'Audio Quality', free: 'Standard', premium: 'High (320kbps)' },
  { feature: 'Playlist Control', free: 'Basic', premium: true },
]

export const testimonials = [
  {
    id: 1,
    quote: 'Premium changed the way I listen to music.',
    author: 'Priya S.',
    role: 'Music lover',
    rating: 5,
  },
  {
    id: 2,
    quote: 'Offline downloads are a game-changer for my commute.',
    author: 'Rahul M.',
    role: 'Daily commuter',
    rating: 5,
  },
  {
    id: 3,
    quote: 'The Family plan keeps everyone happy — worth every rupee.',
    author: 'Ananya K.',
    role: 'Family plan user',
    rating: 5,
  },
]

export const faqs = [
  {
    id: 'cancel',
    question: 'Can I cancel anytime?',
    answer:
      'Yes. You can cancel your Premium subscription at any time from your account settings. You will keep Premium benefits until the end of your billing period.',
  },
  {
    id: 'offline',
    question: 'How does offline listening work?',
    answer:
      'Download songs, albums, or playlists on your device while connected to the internet. Once downloaded, listen without using mobile data or Wi‑Fi.',
  },
  {
    id: 'trial',
    question: 'Is there a free trial?',
    answer:
      'Eligible new users may get a limited-time free trial of Premium. After the trial, your plan renews automatically unless you cancel before it ends.',
  },
]
