import React from "react";

const SortDropdown = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="flex justify-end mb-4">
      <label htmlFor="sort" className="mr-2">Sort by Price:</label>
      <select
        id="sort"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
      >
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  );
};

export default SortDropdown;
