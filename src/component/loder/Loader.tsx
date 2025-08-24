// src/component/Loader/Loader.ts

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full text-amber-700 flex items-center justify-center z-50">
      <div className="loader-border rounded-full border-4 border-t-9 border-amber-700 w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default Loader;
