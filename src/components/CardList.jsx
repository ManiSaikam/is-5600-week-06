import React, { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";
import { getTagLabel } from "../utils/format";

const CardList = ({ data }) => {
  const limit = 10;
  const allProducts = useMemo(() => Array.isArray(data) ? data : [], [data]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(allProducts);
  const [offset, setOffset] = useState(0);
  const [pageItems, setPageItems] = useState(() => allProducts.slice(0, limit));

  const filterTags = (value) => {
    const q = (value || "").trim().toLowerCase();
    setQuery(value);
    if (!q) {
      setFiltered(allProducts);
      setOffset(0);
      return;
    }
    const next = allProducts.filter((p) => {
      const tags = Array.isArray(p.tags) ? p.tags : [];
      return tags.some((t) => getTagLabel(t).toLowerCase().includes(q));
    });
    setFiltered(next);
    setOffset(0);
  };

  useEffect(() => {
    setFiltered(allProducts);
  }, [allProducts]);

  useEffect(() => {
    setPageItems(filtered.slice(offset, offset + limit));
  }, [filtered, offset]);

  const atStart = offset === 0;
  const atEnd = offset + limit >= filtered.length;

  const handlePage = (dir) => {
    if (dir === "prev" && !atStart) setOffset((v) => Math.max(v - limit, 0));
    if (dir === "next" && !atEnd) setOffset((v) => v + limit);
  };

  const total = filtered.length;
  const from = total === 0 ? 0 : offset + 1;
  const to = Math.min(offset + limit, total);

  return (
    <div className="cf pa2">
      <div className="mt3 mb3 flex items-center justify-center">
        <Search placeholder="Filter by tag" handleSearch={filterTags} />
      </div>
      <div className="tc mid-gray mb2">
        <span className="f6">
          {total === 0 ? "No products found." : `Showing ${from}-${to} of ${total}${query?.trim() ? ` for “${query.trim()}”` : ""}`}
        </span>
      </div>
      <div className="mt2 mb2 flex flex-wrap justify-center">
        {pageItems.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4 gap3">
        <Button text="Previous" handleClick={() => handlePage("prev")} disabled={atStart} />
        <Button text="Next" handleClick={() => handlePage("next")} disabled={atEnd} />
      </div>
    </div>
  );
};

export default CardList;
