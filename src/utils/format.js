export const getTitle = (p) =>
  typeof p?.title === "string" ? p.title : p?.title?.text || p?.name || p?.id || "";

export const truncate = (s, n = 40) =>
  typeof s === "string" && s.length > n ? s.slice(0, n - 1) + "…" : s;

export const getTagLabel = (t) =>
  typeof t === "string" ? t : t?.title || t?.text || t?.name || t?.value || "";

export const getImage = (p) =>
  p?.image ||
  p?.imageUrl ||
  p?.img ||
  p?.url ||
  p?.src ||
  p?.thumbnail ||
  p?.images?.[0] ||
  p?.urls?.small ||
  p?.urls?.regular ||
  p?.links?.download ||
  "";
