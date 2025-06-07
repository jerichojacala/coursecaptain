export default function Banner() {
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
        <h1 className="text-white text-4xl font-bold">Show All Courses</h1>
      </div>
    </div>
  );
}