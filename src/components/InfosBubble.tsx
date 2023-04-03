import React from 'react';

type InfoBubbleProps = {
  text: string;
}

const InfoBubble: React.FC<InfoBubbleProps> = ({ text }) => {
  return (
    <div className="info-bubble">
      <div className="info-bubble-icon">
        <i className="fas fa-info-circle">?</i>
      </div>
      <div className="info-bubble-text">{text}</div>
    </div>
  );
}

export default InfoBubble;
