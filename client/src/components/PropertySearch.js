
function PropertySearch({ sortedProperties, propertyComponents, searchFilters, sortCriteria, handleInputChange, handleSortChange }) {
    
    return (
        <div>
      <div className="filter-container">
        <input
          type="text"
          name="price"
          placeholder="Filter by price"
          value={searchFilters.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="neighborhood"
          placeholder="Filter by neighborhood"
          value={searchFilters.neighborhood}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="borough"
          placeholder="Filter by borough"
          value={searchFilters.borough}
          onChange={handleInputChange}
        />
        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="price">Price</option>
          <option value="borough">Borough</option>
        </select>
      </div>
      <ul className="property-list">{propertyComponents}</ul>
    </div>
    )
}

export default PropertySearch;