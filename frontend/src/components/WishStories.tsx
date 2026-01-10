import React from 'react';

const WishStoryCard = ({ name, title, summary, imageUrl, linkUrl }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={`${name}'s Wish`} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 bg-secondary">
        <h3 className="text-xl font-bold text-white mb-2">{name}'s Wish</h3>
        <p className="text-sm text-white font-medium mb-3">{title}</p>
        <p className="text-white mb-6">{summary}</p>
        <Link
          to={linkUrl}
          className="inline-block bg-white text-blue-700 font-medium hover:bg-gray-100 px-4 py-2 rounded-full"
        >
          Read {name}'s Story
        </Link>
      </div>
    </div>
  );
};

import { Link } from 'react-router-dom';

export const WishStories = () => {
  const stories = [
    {
      name: "Amelie",
      title: "I Wish To Have A Grand Piano",
      summary: "Amelie's entire life changed when she was diagnosed with a critical germ cell tumour – an extremely rare form of brain cancer – at age 12.",
      imageUrl: "https://images.unsplash.com/photo-1516962080544-eaca6a513767?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      linkUrl: "/wish-stories/amelie"
    },
    {
      name: "Matthew",
      title: "I Wish To Go Fishing",
      summary: "Matthew wished to spend time outdoors doing his favourite activity with his family after months of difficult hospital treatments.",
      imageUrl: "https://images.unsplash.com/photo-1484820986637-72ee933f8941?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      linkUrl: "/wish-stories/matthew"
    },
    {
      name: "Jessica",
      title: "I Wish To Meet My Favourite Athletes",
      summary: "Jessica's wish to meet her sporting heroes came true after battling through two years of treatments for her rare condition.",
      imageUrl: "https://images.unsplash.com/photo-1554147090-e1221a04a025?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      linkUrl: "/wish-stories/jessica"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Wish Stories</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            See how Make-A-Wish is involved in changing the lives of children across New Zealand
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <WishStoryCard key={index} {...story} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/wish-stories"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-medium px-8 py-3 rounded-full transition duration-300"
          >
            Read More Wish Stories
          </Link>
        </div>
      </div>
    </section>
  );
};

