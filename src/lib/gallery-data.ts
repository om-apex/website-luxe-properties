export interface GalleryPhoto {
  src: string
  alt: string
  caption: string
  category: GalleryCategory
}

export type GalleryCategory =
  | 'All'
  | 'Exterior'
  | 'Living & Kitchen'
  | 'Deck & Outdoor'
  | 'Bedrooms'
  | 'Amenities'
  | 'Entertainment'

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All',
  'Exterior',
  'Living & Kitchen',
  'Deck & Outdoor',
  'Bedrooms',
  'Amenities',
  'Entertainment',
]

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  // === Exterior (25) ===
  { src: '/images/photos/exterior/exterior-front-daytime.jpg', alt: 'Front view of cabin during daytime', caption: 'Welcome to Perch in the Clouds', category: 'Exterior' },
  { src: '/images/photos/exterior/exterior-front-straight.jpg', alt: 'Straight-on front view of cabin', caption: 'Front entrance', category: 'Exterior' },
  { src: '/images/photos/exterior/entrance-welcome-sign.jpg', alt: 'Welcome sign at entrance', caption: 'Welcome sign', category: 'Exterior' },
  { src: '/images/photos/exterior/exterior-front-evening-glow.jpg', alt: 'Front view with evening glow', caption: 'Evening glow', category: 'Exterior' },
  { src: '/images/photos/exterior/exterior-twilight-dramatic.jpg', alt: 'Dramatic twilight exterior', caption: 'Twilight view', category: 'Exterior' },
  { src: '/images/photos/exterior/aerial-river-bend-overview.jpg', alt: 'Aerial view of river bend', caption: 'River bend overview', category: 'Exterior' },
  { src: '/images/photos/exterior/exterior-rear-deck-hero.jpg', alt: 'Rear deck hero shot', caption: 'Rear deck with mountain views', category: 'Exterior' },
  { src: '/images/photos/exterior/aerial-wide-sunset-mountains.jpg', alt: 'Wide aerial sunset over mountains', caption: 'Sunset over the mountains', category: 'Exterior' },
  { src: '/images/photos/exterior/aerial-wide-mountain-backdrop.jpg', alt: 'Wide aerial mountain backdrop', caption: 'Mountain backdrop', category: 'Exterior' },
  { src: '/images/photos/exterior/mountain-view-sunset-mist.jpg', alt: 'Mountain view with sunset mist', caption: 'Sunset mist over the mountains', category: 'Exterior' },
  { src: '/images/photos/exterior/mountain-panorama-rain-mist.jpg', alt: 'Mountain panorama with rain mist', caption: 'Mountain panorama', category: 'Exterior' },
  { src: '/images/photos/exterior/river-valley-evening-mist.jpg', alt: 'River valley with evening mist', caption: 'River valley evening view', category: 'Exterior' },
  { src: '/images/photos/exterior/aerial-cabin-river-valley.jpg', alt: 'Aerial cabin with river valley', caption: 'Cabin above the river valley', category: 'Exterior' },
  { src: '/images/photos/exterior/exterior-aerial-mountain-backdrop.jpg', alt: 'Aerial view mountain backdrop', caption: 'Aerial mountain backdrop', category: 'Exterior' },
  { src: '/images/photos/exterior/exterior-rear-twilight-warm.jpg', alt: 'Rear view warm twilight', caption: 'Warm twilight glow', category: 'Exterior' },
  { src: '/images/photos/exterior/exterior-rear-twilight-full.jpg', alt: 'Rear view full twilight', caption: 'Full twilight view', category: 'Exterior' },
  { src: '/images/photos/exterior/deck-aerial-twilight-layout.jpg', alt: 'Aerial deck layout at twilight', caption: 'Deck layout at twilight', category: 'Exterior' },
  { src: '/images/photos/exterior/deck-corner-sunset-view.jpg', alt: 'Deck corner sunset view', caption: 'Sunset from the deck', category: 'Exterior' },
  { src: '/images/photos/exterior/exterior-aerial-front-evening-mist.jpg', alt: 'Aerial front with evening mist', caption: 'Front aerial evening', category: 'Exterior' },
  { src: '/images/photos/exterior/exterior-aerial-side-twilight.jpg', alt: 'Aerial side view at twilight', caption: 'Side twilight view', category: 'Exterior' },
  { src: '/images/photos/exterior/exterior-aerial-rear-two-levels.jpg', alt: 'Aerial rear showing two levels', caption: 'Two-level rear view', category: 'Exterior' },
  { src: '/images/photos/exterior/exterior-aerial-rear-wide.jpg', alt: 'Wide aerial rear view', caption: 'Wide rear aerial', category: 'Exterior' },
  { src: '/images/photos/exterior/exterior-aerial-side-firepit.jpg', alt: 'Aerial side with firepit', caption: 'Side view with firepit', category: 'Exterior' },
  { src: '/images/photos/exterior/exterior-aerial-side-mist.jpg', alt: 'Aerial side with mist', caption: 'Misty side view', category: 'Exterior' },
  { src: '/images/photos/exterior/firepit-evening-sunset-sky.jpg', alt: 'Firepit with evening sunset sky', caption: 'Firepit at sunset', category: 'Exterior' },

  // === Living & Kitchen (14) ===
  { src: '/images/photos/living-kitchen/kitchen-living-open-concept.jpg', alt: 'Open concept kitchen and living area', caption: 'Open concept living', category: 'Living & Kitchen' },
  { src: '/images/photos/living-kitchen/kitchen-island-vaulted-ceiling.jpg', alt: 'Kitchen island with vaulted ceiling', caption: 'Vaulted ceiling kitchen', category: 'Living & Kitchen' },
  { src: '/images/photos/living-kitchen/kitchen-island-detail.jpg', alt: 'Kitchen island detail', caption: 'Kitchen island', category: 'Living & Kitchen' },
  { src: '/images/photos/living-kitchen/kitchen-island-seating.jpg', alt: 'Kitchen island seating', caption: 'Island bar seating', category: 'Living & Kitchen' },
  { src: '/images/photos/living-kitchen/kitchen-entry-hooks.jpg', alt: 'Entry hooks area', caption: 'Entry hooks', category: 'Living & Kitchen' },
  { src: '/images/photos/living-kitchen/living-room-open-windows.jpg', alt: 'Living room with open windows', caption: 'Living room natural light', category: 'Living & Kitchen' },
  { src: '/images/photos/living-kitchen/living-room-tv-fireplace.jpg', alt: 'Living room TV and fireplace', caption: 'TV and fireplace', category: 'Living & Kitchen' },
  { src: '/images/photos/living-kitchen/living-room-fireplace-games.jpg', alt: 'Fireplace and games area', caption: 'Fireplace and games', category: 'Living & Kitchen' },
  { src: '/images/photos/living-kitchen/living-room-sectional-art.jpg', alt: 'Sectional sofa with wall art', caption: 'Sectional with art', category: 'Living & Kitchen' },
  { src: '/images/photos/living-kitchen/living-room-deck-view.jpg', alt: 'Living room view to deck', caption: 'Deck view from living room', category: 'Living & Kitchen' },
  { src: '/images/photos/living-kitchen/living-room-sofa-art.jpg', alt: 'Sofa with art', caption: 'Living room seating', category: 'Living & Kitchen' },
  { src: '/images/photos/living-kitchen/living-room-tv-wall.jpg', alt: 'TV wall', caption: 'Entertainment wall', category: 'Living & Kitchen' },
  { src: '/images/photos/living-kitchen/living-room-wide-evening.jpg', alt: 'Wide living room evening view', caption: 'Living room evening', category: 'Living & Kitchen' },
  { src: '/images/photos/living-kitchen/living-room-evening-sunset.jpg', alt: 'Living room with evening sunset', caption: 'Sunset through the windows', category: 'Living & Kitchen' },

  // === Deck & Outdoor (21) ===
  { src: '/images/photos/deck-outdoor/hot-tub-sunset-hero.jpg', alt: 'Hot tub at sunset', caption: 'Hot tub at sunset', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/hot-tub-evening-lights.jpg', alt: 'Hot tub with evening lights', caption: 'Evening hot tub', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/hot-tub-daytime-mountain.jpg', alt: 'Hot tub with daytime mountain view', caption: 'Hot tub mountain view', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/hot-tub-valley-mist.jpg', alt: 'Hot tub with valley mist', caption: 'Misty valley from hot tub', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/deck-lounge-firepit.jpg', alt: 'Deck lounge with firepit', caption: 'Lounge and firepit', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/deck-firepit-evening.jpg', alt: 'Deck firepit in evening', caption: 'Evening firepit', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/firepit-adirondack-daytime.jpg', alt: 'Adirondack chairs by firepit', caption: 'Adirondack chairs', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/deck-patio-heater-sunset.jpg', alt: 'Patio heater at sunset', caption: 'Patio heater at sunset', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/deck-evening-wide.jpg', alt: 'Wide evening deck view', caption: 'Evening deck panorama', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/deck-dining-lounge.jpg', alt: 'Deck dining and lounge area', caption: 'Outdoor dining', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/deck-dining-evening.jpg', alt: 'Deck dining in evening', caption: 'Evening dining on deck', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/deck-grill-mountain.jpg', alt: 'Grill with mountain view', caption: 'Grilling with a view', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/deck-lounge-wide.jpg', alt: 'Wide deck lounge view', caption: 'Deck lounge area', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/deck-corner-seating.jpg', alt: 'Corner seating on deck', caption: 'Corner seating', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/deck-railing-view.jpg', alt: 'View from deck railing', caption: 'Mountain view from railing', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/deck-seating-mountain.jpg', alt: 'Deck seating with mountain view', caption: 'Seating with mountain views', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/deck-porch-swing.jpg', alt: 'Porch swing on deck', caption: 'Porch swing', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/porch-swing-mountain-view.jpg', alt: 'Porch swing with mountain view', caption: 'Swing with mountain view', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/lower-deck-double-swing.jpg', alt: 'Double swing on lower deck', caption: 'Double swing', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/lower-deck-hammock.jpg', alt: 'Hammock on lower deck', caption: 'Hammock', category: 'Deck & Outdoor' },
  { src: '/images/photos/deck-outdoor/lower-deck-connect-four.jpg', alt: 'Connect Four game on lower deck', caption: 'Giant Connect Four', category: 'Deck & Outdoor' },

  // === Bedrooms (9) ===
  { src: '/images/photos/bedrooms/suite-one-king-gold-art.jpg', alt: 'Suite one king bed with gold art', caption: 'Suite One - King bed', category: 'Bedrooms' },
  { src: '/images/photos/bedrooms/suite-one-king-deck-access.jpg', alt: 'Suite one with deck access', caption: 'Suite One - Deck access', category: 'Bedrooms' },
  { src: '/images/photos/bedrooms/suite-one-ensuite-entry.jpg', alt: 'Suite one ensuite entry', caption: 'Suite One - Ensuite', category: 'Bedrooms' },
  { src: '/images/photos/bedrooms/suite-one-wide-view.jpg', alt: 'Suite one wide view', caption: 'Suite One - Full view', category: 'Bedrooms' },
  { src: '/images/photos/bedrooms/suite-two-king-blue-art.jpg', alt: 'Suite two king bed with blue art', caption: 'Suite Two - King bed', category: 'Bedrooms' },
  { src: '/images/photos/bedrooms/suite-two-ensuite-view.jpg', alt: 'Suite two ensuite view', caption: 'Suite Two - Ensuite', category: 'Bedrooms' },
  { src: '/images/photos/bedrooms/office-standing-desk.jpg', alt: 'Office with standing desk', caption: 'Office - Standing desk', category: 'Bedrooms' },
  { src: '/images/photos/bedrooms/office-murphy-bed.jpg', alt: 'Office murphy bed', caption: 'Office - Murphy bed', category: 'Bedrooms' },
  { src: '/images/photos/bedrooms/office-bedroom-wide.jpg', alt: 'Office bedroom wide view', caption: 'Office suite', category: 'Bedrooms' },

  // === Amenities (8) ===
  { src: '/images/photos/amenities/bath-shower-marble-walkin.jpg', alt: 'Marble walk-in shower', caption: 'Walk-in marble shower', category: 'Amenities' },
  { src: '/images/photos/amenities/bath-shower-dual-heads.jpg', alt: 'Dual shower heads', caption: 'Dual shower heads', category: 'Amenities' },
  { src: '/images/photos/amenities/bath-vanity-led-mirror.jpg', alt: 'Vanity with LED mirror', caption: 'LED vanity mirror', category: 'Amenities' },
  { src: '/images/photos/amenities/bath-vanity-toilet.jpg', alt: 'Vanity and toilet area', caption: 'Bathroom vanity', category: 'Amenities' },
  { src: '/images/photos/amenities/bath-two-shower-view.jpg', alt: 'Second bathroom shower', caption: 'Second bathroom shower', category: 'Amenities' },
  { src: '/images/photos/amenities/bath-three-tub-combo.jpg', alt: 'Third bathroom tub combo', caption: 'Tub combo', category: 'Amenities' },
  { src: '/images/photos/amenities/coffee-station-keurig.jpg', alt: 'Coffee station with Keurig', caption: 'Coffee station', category: 'Amenities' },
  { src: '/images/photos/amenities/laundry-room-lg.jpg', alt: 'Laundry room', caption: 'Full laundry room', category: 'Amenities' },

  // === Entertainment (7) ===
  { src: '/images/photos/entertainment/game-room-pool-table.jpg', alt: 'Pool table in game room', caption: 'Pool table', category: 'Entertainment' },
  { src: '/images/photos/entertainment/game-room-wide-arcade.jpg', alt: 'Wide view of game room with arcade', caption: 'Game room', category: 'Entertainment' },
  { src: '/images/photos/entertainment/game-room-pool-treadmill.jpg', alt: 'Pool table and treadmill', caption: 'Pool and fitness', category: 'Entertainment' },
  { src: '/images/photos/entertainment/game-room-treadmill-view.jpg', alt: 'Treadmill with mountain view', caption: 'Treadmill with a view', category: 'Entertainment' },
  { src: '/images/photos/entertainment/arcade-pacman-table.jpg', alt: 'Pac-Man arcade table', caption: 'Pac-Man arcade', category: 'Entertainment' },
  { src: '/images/photos/entertainment/home-theater-recliners.jpg', alt: 'Home theater recliners', caption: 'Theater recliners', category: 'Entertainment' },
  { src: '/images/photos/entertainment/home-theater-wide.jpg', alt: 'Wide view of home theater', caption: 'Home theater', category: 'Entertainment' },
]
