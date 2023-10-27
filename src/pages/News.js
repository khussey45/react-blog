import React from 'react';

function News() {
  // Mock data for news articles
  const articles = [
    {
      id: 1,
      title: 'Article 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      date: '2023-10-23'
    },
    {
      id: 2,
      title: 'Article 2',
      content: 'Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
      date: '2023-10-20'
    },
    // ... add more articles as desired
  ];

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">News</h2>
      {articles.map(article => (
        <div key={article.id} className="bg-white rounded-lg shadow-md p-4 my-4">
          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
          <p className="mb-4">{article.content}</p>
          <span className="text-gray-500">{article.date}</span>
        </div>
      ))}
    </div>
  );
}

export default News;
