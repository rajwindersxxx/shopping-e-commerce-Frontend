import { useState } from "react";

type ImageWithSpinnerProps = {
  src: string;
  alt: string;
  className?: string;
};

const Image = ({ src, alt, className }: ImageWithSpinnerProps) => {
  const [loading, setLoading] = useState(true);
  return (
    <div
      className={`relative  overflow-hidden rounded-lg ${className}`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100" role="status">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-100 border-t-orange-500"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover brightness-75 transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};
export default Image;
