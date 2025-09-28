import { useParams, Link } from "react-router-dom";
import { getTitle, truncate, getTagLabel, getImage } from "../utils/format";

const SingleView = ({ data = [] }) => {
  const { id } = useParams();
  const product = data.find((p) => String(p.id) === String(id));
  if (!product) {
    return (
      <div className="pa4 tc">
        <p className="dark-red">Product not found.</p>
        <Link to="/" className="link blue underline">Back to list</Link>
      </div>
    );
  }

  const displayTitle = getTitle(product);
  const displayId = truncate(String(product.id || ""), 64);
  const imageSrc = getImage(product);
  const { price, description, tags = [] } = product;

  return (
    <div className="pa3 pa4-l center mw8">
      <Link to="/" className="link blue underline">← Back</Link>
      <div className="flex-ns mt3">
        <div className="w-100 w-50-ns pr3-ns">
          {imageSrc ? (
            <img src={imageSrc} alt={displayTitle} className="w-100 br2" />
          ) : (
            <div className="w-100 h5 bg-near-white br2 flex items-center justify-center">
              <span className="silver">No Image</span>
            </div>
          )}
        </div>
        <div className="w-100 w-50-ns pl3-ns">
          <h1 className="f3 mt0 mb2">{displayTitle}</h1>
          <div className="f7 mid-gray mb2">{displayId}</div>
          {price != null && <p className="f4 dark-green b mt0 mb3">${Number(price).toFixed(2)}</p>}
          {description && <p className="lh-copy mt0">{typeof description === "string" ? description : getTitle({ title: description })}</p>}
          {Array.isArray(tags) && tags.length > 0 && (
            <div className="mt3">
              <span className="b mr2">Tags:</span>
              {tags.map((t, i) => {
                const label = getTagLabel(t);
                return label ? (
                  <span key={`${id}-tag-${i}`} className="f7 bg-near-white ba b--black-10 br2 ph2 pv1 mr1">
                    {label}
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleView;
