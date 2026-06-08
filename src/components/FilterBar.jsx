const fieldClass =
  "w-full rounded bg-slate-100 px-2 py-2 text-sm text-stone-900 dark:bg-slate-700 dark:text-white";

const FilterBar = ({
  sort,
  onSortChange,
  orderingOptions = [
    { v: "-rating", l: "Top Rated" },
    { v: "-released", l: "Newest" },
    { v: "-added", l: "Most Popular" },
    { v: "-metacritic", l: "Metacritic" },
    { v: "name", l: "Name A-Z" },
    { v: "-name", l: "Name Z-A" },
  ],
  dates,
  onDatesChange,
  extra,
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-lg bg-white p-3 shadow dark:bg-slate-800 sm:grid-cols-2 sm:p-4 lg:grid-cols-4">
      <div className="min-w-0">
        <label className="mb-1 block text-[10px] uppercase text-stone-500 dark:text-slate-400">
          Sort
        </label>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className={fieldClass}
        >
          {orderingOptions.map((o) => (
            <option key={o.v} value={o.v}>
              {o.l}
            </option>
          ))}
        </select>
      </div>
      <div className="min-w-0">
        <label className="mb-1 block text-[10px] uppercase text-stone-500 dark:text-slate-400">
          From
        </label>
        <input
          type="date"
          value={dates?.from || ""}
          onChange={(e) => onDatesChange({ ...dates, from: e.target.value })}
          className={fieldClass}
        />
      </div>
      <div className="min-w-0">
        <label className="mb-1 block text-[10px] uppercase text-stone-500 dark:text-slate-400">
          To
        </label>
        <input
          type="date"
          value={dates?.to || ""}
          onChange={(e) => onDatesChange({ ...dates, to: e.target.value })}
          className={fieldClass}
        />
      </div>
      {extra ? <div className="min-w-0">{extra}</div> : null}
    </div>
  );
};

export default FilterBar;
