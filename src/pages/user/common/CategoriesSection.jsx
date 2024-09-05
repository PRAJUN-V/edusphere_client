import React from 'react';

const CategoriesSection = ({ categories }) => {
  return (
    <div className="py-8 px-4 md:px-8 lg:px-12">
      <h2 className="text-2xl font-bold text-center mb-6">Top Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded shadow-md flex justify-center items-center"
          >
            <h3 className="text-lg font-medium">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
