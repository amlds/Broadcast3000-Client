import React from 'react';

interface Props {
  message: string;
  state: number;
}

const PopUp: React.FC<Props> = (Props) => {
  const [state, setState] = React.useState(Props.state);
  const [message, setMessage] = React.useState(Props.message);
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    setState(Props.state);
    setMessage(Props.message);
  }, [Props.state, Props.message]);

  // affiché pendant 4 secondes puis disparait
  setTimeout(() => {
    setShow(false)
    setState(0);
    setMessage('');
  }, 4000);

  if (!show) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup__content">
        <div className="popup__left">
          {
            state === 0 ? (
              <p>❌</p>
            ) : (
              <p>✅</p>
            )
          }
        </div>
        <div className="popup__right">
          <p className="popup__text">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
