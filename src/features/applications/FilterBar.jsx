import styles from '@styles/features/applications/FilterBar.module.css';

export default function FilterBar({
  filter,
  onFilterChange,
  search,
  onSearchChange,
  onClearFilters,
  sortBy,
  onSortChange,
}) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <label htmlFor="status">Status</label>
        <select id="status" value={filter} onChange={(e) => onFilterChange(e.target.value)}>
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Company or position"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="sort">Sort By</label>
        <select id="sort" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="dateApplied-desc">Date Applied (Newest)</option>
          <option value="dateApplied-asc">Date Applied (Oldest)</option>
          <option value="company-asc">Company (A-Z)</option>
          <option value="company-desc">Company (Z-A)</option>
          <option value="position-asc">Position (A-Z)</option>
          <option value="position-desc">Position (Z-A)</option>
          <option value="status-asc">Status (A-Z)</option>
          <option value="status-desc">Status (Z-A)</option>
        </select>
      </div>

      <div className={styles.filterActions}>
        <button type="button" onClick={onClearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}
