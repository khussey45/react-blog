// ProjectCard.js
import React from 'react';

function ProjectCard({ title, description, imageUrl }) {
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <img src={imageUrl} alt={title} className="mb-4 rounded" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default ProjectCard;
