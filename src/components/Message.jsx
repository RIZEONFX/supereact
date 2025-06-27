const Message = ({ field, action }) => {
  const { id, senderName, pfp, text, time, isReceiver} = field;
  
  return (
    <div className="message-wrapper" style={{flexDirection: isReceiver ? 'row' : 'row-reverse'}}>
      <img className="pfp-message" loading="lazy" src={ pfp } alt="pfp" />
      <div className="message" onDoubleClick={() => action(id, isReceiver)}>
        <h5 className="sender">{ senderName }</h5>
        <p className="text">
          { text }
        </p>
        <p style={{fontSize: "0.7rem"}}>{ time }</p>
      </div>
    </div>
  )
}

export default Message;