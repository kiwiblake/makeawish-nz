import React from 'react';

const NewsCard = ({ title, summary, imageUrl, linkUrl, date }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mb-3">
          {date}
        </span>
        <h3 className="text-xl font-bold text-blue-800 mb-3">{title}</h3>
        <p className="text-gray-700 mb-6">{summary}</p>
        <Link
          to={linkUrl}
          className="inline-block text-teal-500 font-medium hover:text-teal-600"
        >
          Read Full Story
        </Link>
      </div>
    </div>
  );
};

import { Link } from 'react-router-dom';

export const NewsUpdates = () => {
  const newsItems = [
    {
      title: "Businesses sponsor Wish Week",
      summary: "We are delighted to announce that several local businesses have committed to supporting our upcoming Wish Week 2025.",
      imageUrl: "https://images.unsplash.com/photo-1585289034189-57f7487a25f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      linkUrl: "/news/businesses-sponsor-wish-week",
      date: "March 15, 2025"
    },
    {
      title: "Wish Week 2025",
      summary: "We're excited to tell all of Wish Week, Make-A-Wish's biggest fundraising event happening in March across New Zealand.",
      imageUrl: "https://images.unsplash.com/photo-1616455552144-746a21efd41c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      linkUrl: "/news/wish-week-2025",
      date: "March 5, 2025"
    },
    {
      title: "Lisa McGowan wins Entrepreneur of the year",
      summary: "Our loyal patron wins Best Entrepreneur at this year's Business Ball. We are so grateful for her continued support of Make-A-Wish.",
      imageUrl: "https://images.unsplash.com/photo-1588681664899-f142ff2dc3b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      linkUrl: "/news/lisa-mcgowan-entrepreneur",
      date: "February 28, 2025"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Latest News</h2>
          <p className="text-lg text-gray-700">
            See what's happening at Make-A-Wish New Zealand
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/news"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-medium px-8 py-3 rounded-full transition duration-300"
          >
            See More Latest News
          </Link>
        </div>
      </div>
    </section>
  );
};

