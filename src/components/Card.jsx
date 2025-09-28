import { Link } from "react-router-dom";
import { getTitle, truncate, getTagLabel, getImage } from "../utils/format";

const Card = (props) => {
  const { id, price, tags = [] } = props;
  const displayTitle = truncate(getTitle(props), 50);
  const displayId = truncate(String(id || ""), 18);
  const imageSrc = getImage(props);

  return (
    <article className="ba b--black-10 br3 ma2 pa2 w-100 w-40-m w-30-l pointer grow">
      <Link to={`/product/${id}`} className="no-underline black">
        <div className="tc">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={displayTitle}
              className="w-100 br2"
              style={{ height: "10rem", objectFit: "cover" }}
              loading="lazy"
            />
          ) : (
            <div className="w-100 br2 flex items-center justify-center"
                 style={{ height: "10rem", background: "#f6f7f8" }}>
              <span className="silver">No Image</span>
            </div>
          )}
          <h2 className="f5 mt3 mb1 nowrap overflow-hidden truncate">{displayTitle}</h2>
          <div className="f7 mid-gray nowrap overflow-hidden truncate">{displayId}</div>
          {price != null && <p className="mt1 mb2 dark-green">${Number(price).toFixed(2)}</p>}
          {Array.isArray(tags) && tags.length > 0 && (
            <div className="mt1">
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
      </Link>
    </article>
  );
};

export default Card;
