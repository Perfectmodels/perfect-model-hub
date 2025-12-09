
import React from 'react';
import SEO from '../components/SEO';

const Gallery: React.FC = () => {
  // Dummy data for the gallery
  const images = [
    { id: 1, src: 'https://via.placeholder.com/400x300', alt: 'Placeholder Image 1' },
    { id: 2, src: 'https://via.placeholder.com/400x300', alt: 'Placeholder Image 2' },
    { id: 3, src: 'https://via.placeholder.com/400x300', alt: 'Placeholder Image 3' },
    { id: 4, src: 'https://via.placeholder.com/400x300', alt: 'Placeholder Image 4' },
    { id: 5, src: 'https://via.placeholder.com/400x300', alt: 'Placeholder Image 5' },
    { id: 6, src: 'https://via.placeholder.com/400x300', alt: 'Placeholder Image 6' },
  ];

  return (
    <>
      <SEO title="Galerie" description="Découvrez notre galerie d'images." />
      <div className="page-container">
        <h1 className="page-title">Galerie</h1>
        <p className="page-subtitle">
          Une collection de nos moments et réalisations les plus mémorables.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map(image => (
            <div key={image.id} className="bg-black border border-pm-gold/20 rounded-lg overflow-hidden group">
              <img src={image.src} alt={image.alt} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
