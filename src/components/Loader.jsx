
const Loader = () => {
  return (
    <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black">
      <img
        src="/assets//loader.gif"
        alt="Loading..."
        className="w-32 h-32 mb-6"
        style={{ objectFit: 'contain' }}
      />
      <span className="theme-font text-white text-2xl tracking-widest">Loading...</span>
    </div>
  );
};

export default Loader;
