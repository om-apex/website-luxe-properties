// Default content for Om Luxe Properties website
// Keys map to site_content table with site='luxe'

interface ContentEntry {
  value: string
  page: string
}

export const DEFAULT_CONTENT: Record<string, ContentEntry> = {
  // === Global ===
  luxe_global_company_name: { value: 'Om Luxe Properties', page: 'global' },
  luxe_global_tagline: { value: 'Luxury Vacation Rentals', page: 'global' },
  luxe_global_contact_phone: { value: '', page: 'global' },
  luxe_global_contact_email: { value: 'hello@omluxeproperties.com', page: 'global' },
  luxe_global_copyright: { value: 'Om Luxe Properties LLC. All rights reserved.', page: 'global' },
  luxe_global_parent_company: { value: 'Om Apex Holdings', page: 'global' },
  luxe_global_parent_url: { value: 'https://omapex.com', page: 'global' },

  // === Footer ===
  luxe_footer_tagline: { value: 'Luxury mountain vacation rentals in Ellijay, Georgia. Experience the magic of the North Georgia mountains.', page: 'global' },
  luxe_footer_links_title: { value: 'Explore', page: 'global' },
  luxe_footer_contact_title: { value: 'Contact', page: 'global' },
  luxe_footer_location: { value: 'Ellijay, Georgia', page: 'global' },

  // === Home Page - Hero ===
  luxe_home_hero_property_name: { value: 'Perch in the Clouds', page: 'home' },
  luxe_home_hero_location: { value: 'Ellijay, Georgia', page: 'home' },
  luxe_home_hero_bedrooms: { value: '3 Bedrooms', page: 'home' },
  luxe_home_hero_bathrooms: { value: '3 Bathrooms', page: 'home' },
  luxe_home_hero_sleeps: { value: 'Sleeps 6', page: 'home' },

  // === Home Page - Stats ===
  luxe_home_stats_views: { value: '360\u00B0', page: 'home' },
  luxe_home_stats_views_label: { value: 'Mountain Views', page: 'home' },
  luxe_home_stats_river: { value: 'River', page: 'home' },
  luxe_home_stats_river_label: { value: 'Scenic Views', page: 'home' },
  luxe_home_stats_sunrise: { value: 'Sunrise', page: 'home' },
  luxe_home_stats_sunrise_label: { value: '& Sunset Views', page: 'home' },
  luxe_home_stats_hottub: { value: 'Hot Tub', page: 'home' },
  luxe_home_stats_hottub_label: { value: 'Private Relaxation', page: 'home' },

  // === Home Page - Booking ===
  luxe_home_booking_title: { value: 'Book Your Mountain Escape', page: 'home' },
  luxe_home_booking_description: { value: 'Experience the magic of Ellijay from our luxurious mountain retreat. Book directly through Airbnb to secure your dates.', page: 'home' },
  luxe_home_booking_url: { value: 'https://www.airbnb.com/rooms/1493555340407877948?guests=1&adults=1&s=67&unique_share_id=f23d455b-061d-47f9-bcb6-29fe8e1e16bb', page: 'home' },

  // === Home Page - Gallery ===
  luxe_home_gallery_title: { value: 'Explore the Property', page: 'home' },
  luxe_home_gallery_subtitle: { value: '84 photos showcasing every corner of your mountain retreat', page: 'home' },

  // === Home Page - Highlights ===
  luxe_home_highlights_title: { value: 'Why Choose Perch in the Clouds?', page: 'home' },
  luxe_home_highlight1_title: { value: '360\u00B0 Mountain Views', page: 'home' },
  luxe_home_highlight1_description: { value: 'Immerse yourself in breathtaking panoramic views of the North Georgia mountains from every angle.', page: 'home' },
  luxe_home_highlight2_title: { value: 'Mesmerizing Sunrises & Sunsets', page: 'home' },
  luxe_home_highlight2_description: { value: 'Wake up to golden sunrises and unwind with spectacular sunset views that paint the sky.', page: 'home' },
  luxe_home_highlight3_title: { value: 'Private Hot Tub', page: 'home' },
  luxe_home_highlight3_description: { value: 'Relax under the stars in your private hot tub while taking in the stunning mountain scenery.', page: 'home' },
  luxe_home_highlight4_title: { value: 'River Views', page: 'home' },
  luxe_home_highlight4_description: { value: 'Enjoy serene river views that add to the tranquil mountain retreat experience.', page: 'home' },

  // === How-To Videos Page ===
  luxe_howto_title: { value: 'How-To Videos', page: 'howto' },
  luxe_howto_description: { value: 'Quick video guides to help you get the most out of your stay at Perch in the Clouds.', page: 'howto' },
  luxe_howto_video1_title: { value: 'TV & Fireplace', page: 'howto' },
  luxe_howto_video1_description: { value: 'Learn how to operate the smart TV and electric fireplace in the living room.', page: 'howto' },
  luxe_howto_video2_title: { value: 'Theater Remote', page: 'howto' },
  luxe_howto_video2_description: { value: 'Quick guide to using the home theater system and remote controls.', page: 'howto' },
  luxe_howto_video3_title: { value: 'Murphy Bed', page: 'howto' },
  luxe_howto_video3_description: { value: 'How to fold down and set up the murphy bed in the office suite.', page: 'howto' },
  luxe_howto_video4_title: { value: 'Google Home', page: 'howto' },
  luxe_howto_video4_description: { value: 'Using the Google Home device for music, weather, and smart home controls.', page: 'howto' },
  luxe_howto_video5_title: { value: 'Basement Shower', page: 'howto' },
  luxe_howto_video5_description: { value: 'Operating the shower controls in the basement bathroom.', page: 'howto' },

  // === Coming Soon Pages ===
  luxe_amenities_title: { value: 'Amenities', page: 'amenities' },
  luxe_amenities_description: { value: 'Everything you need for the perfect mountain getaway', page: 'amenities' },
  luxe_amenities_coming_soon_title: { value: 'Coming Soon', page: 'amenities' },
  luxe_amenities_coming_soon_description: { value: 'This section will showcase all the wonderful amenities available at Perch in the Clouds, including the hot tub, fully equipped kitchen, comfortable bedrooms, and more.', page: 'amenities' },

  luxe_todo_title: { value: 'Things to Do', page: 'todo' },
  luxe_todo_description: { value: 'Activities and adventures in the Ellijay area', page: 'todo' },
  luxe_todo_coming_soon_title: { value: 'Coming Soon', page: 'todo' },
  luxe_todo_coming_soon_description: { value: 'This section will feature exciting activities in the Ellijay area including hiking trails, apple orchards, tubing adventures, local wineries, and much more.', page: 'todo' },

  luxe_attractions_title: { value: 'Attractions', page: 'attractions' },
  luxe_attractions_description: { value: 'Must-visit destinations near Perch in the Clouds', page: 'attractions' },
  luxe_attractions_coming_soon_title: { value: 'Coming Soon', page: 'attractions' },
  luxe_attractions_coming_soon_description: { value: 'This section will showcase nearby attractions including state parks, waterfalls, scenic overlooks, historic downtown Ellijay, and other must-visit destinations.', page: 'attractions' },

  luxe_restaurants_title: { value: 'Restaurants', page: 'restaurants' },
  luxe_restaurants_description: { value: 'Local dining recommendations for your stay', page: 'restaurants' },
  luxe_restaurants_coming_soon_title: { value: 'Coming Soon', page: 'restaurants' },
  luxe_restaurants_coming_soon_description: { value: 'This section will feature our favorite local restaurants, from cozy cafes to fine dining, with recommendations for every occasion during your mountain getaway.', page: 'restaurants' },

  luxe_rules_title: { value: 'House Rules', page: 'rules' },
  luxe_rules_description: { value: 'Guidelines for a smooth and enjoyable stay', page: 'rules' },
  luxe_rules_coming_soon_title: { value: 'Coming Soon', page: 'rules' },
  luxe_rules_coming_soon_description: { value: 'This section will outline check-in/check-out procedures, property guidelines, hot tub rules, quiet hours, and other important information to ensure a smooth and enjoyable stay.', page: 'rules' },
}
