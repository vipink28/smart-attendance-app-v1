const ViewSession = ({ sessionDetails }) => {
  const { qr, session } = sessionDetails;
  return (
    <div>
      <img src={qr.dataUrl} />
    </div>
  );
};

export default ViewSession;
