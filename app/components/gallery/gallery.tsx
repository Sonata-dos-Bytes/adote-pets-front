import React, { useState } from 'react';
import type { IFile } from '~/types/IFile';

interface GalleryProps {
  images: IFile[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<IFile>(images[0]);
  return (
    <div className="flex flex-col items-center py-4">
      <div className="w-full h-[250px] md:h-[504px] overflow-hidden rounded-2xl shadow-lg mb-4">
        <img src={selectedImage.path} alt={selectedImage.description} className="w-full h-full object-cover" />
      </div>

      <div className="flex justify-center space-x-2 md:space-x-5 flex-wrap">
        {images.map((image: IFile, index: number) => (
          <div
            key={index}
            className={`
              w-[76px] h-[60px] md:w-[207px] md:h-[126px] 
              cursor-pointer
              rounded-lg md:rounded-2xl 
              overflow-hidden
              transition-all duration-300 ease-in-out
              ${selectedImage.path === image.path ? 'border-2 md:border-4 border-[#D77445] transform scale-105 md:scale-110' : 'border-2 border-transparent'}
            `}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.path}
              alt={image.description}
              className={`
                w-full h-full object-cover
                transition-opacity duration-300
                ${selectedImage.path === image.path ? 'opacity-100' : 'opacity-40'}
              `}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;