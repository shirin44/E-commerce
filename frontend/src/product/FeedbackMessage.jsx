import React from "react";

const FeedbackMessage = ({ message }) => {
  return message ? <div className="mb-4 text-green-600 font-bold">{message}</div> : null;
};

export default FeedbackMessage;
