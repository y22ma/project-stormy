
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="w-16 h-16 border-4 border-t-4 border-slate-600 border-t-cyan-400 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
