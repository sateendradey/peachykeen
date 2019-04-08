import React from "react";
import "./styles/LoaderButton.css";

export default ({
  isLoading,
  text,
  loadingText,
  className = "",
  disabled = false,
  ...props
}) =>
  <button
    className={`LoaderButton ${className} form-submit`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <i className="fas fa-spinner spinning" />}
    {!isLoading ? text : loadingText}
  </button>;
