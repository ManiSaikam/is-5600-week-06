import { useState } from "react";
const Search = ({ handleSearch, placeholder = "Search…" }) => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    const v = e.target.value;
    setValue(v);
    handleSearch?.(v);
  };
  return (
    <input
      className="input-reset ba b--black-20 pa2 br2 w-80 w-60-m w-40-l"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-label="Filter by tag"
    />
  );
};
export default Search;
