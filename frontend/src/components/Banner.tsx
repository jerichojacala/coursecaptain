// components/Banner.tsx
type BannerProps = {
  title: string;
};

export default function Banner({ title }: BannerProps) {
  return (
    <div className="relative h-100 w-full">
      {/* Background image */}
      <img
        src="/ocean.jpg" // Place image in public/ or use an external URL
        alt="Banner"
        className="absolute inset-0 object-cover w-full h-full opacity-60"
      />

      {/* Overlay text */}
      <div className="relative z-10 flex items-center justify-center h-full bg-black/30">
        <h1 className="text-white text-6xl font-bold">{title}</h1>
      </div>
    </div>
  );
}