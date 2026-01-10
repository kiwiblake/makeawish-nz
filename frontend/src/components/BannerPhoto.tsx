import React from "react";

interface BannerPhotoProps {
  imageUrl: string;
  altText: string;
}

const BannerPhoto: React.FC<BannerPhotoProps> = ({
  imageUrl,
  altText,
}) => {
  if (!imageUrl) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default BannerPhoto;
