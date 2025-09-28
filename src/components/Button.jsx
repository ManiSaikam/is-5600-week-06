const Button = ({ text, handleClick, disabled }) => (
  <button
    onClick={handleClick}
    disabled={disabled}
    className={`ba br2 ph3 pv2 mh2 ${disabled ? "o-50 not-allowed" : "pointer"}`}
    style={{ cursor: disabled ? "not-allowed" : "pointer" }}
  >
    {text}
  </button>
);
export default Button;
