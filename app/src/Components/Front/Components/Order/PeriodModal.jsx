import { useState } from 'react';
import { useEffect, useContext } from 'react';
import FrontContext from '../../FrontContext';

function Create() {
  const {
    periodModal,
    setPeriodModal,
    setPeriod,
    limit,
    setLimit,
    showMessage,
  } = useContext(FrontContext);

  const [date, setDate] = useState();

  useEffect(() => {
    if (null === periodModal) {
      return;
    }
  }, [periodModal]);

  const handlePeriod = () => {
    const orderId = periodModal.id;
    setPeriod({ id: orderId, date });
    setPeriodModal(null);
    setDate(0);
    setLimit({ id: orderId });
  }

  if (limit > 2) {
    showMessage({ type: 'info', text: 'Leidinio pratesimas negalimas. Del grazinimo termino pratesimo skambinkite musu nurodytais kontaktais.  ' });
    return;
  };

  if (null === periodModal) {
    return null;
  }
  console.log('modal', periodModal);

  return (
    <>
      <div className='modal-layer'>
        <div className='modal-cont reg'>
          <div className='modal reg'>
            <button
              type='button'
              className='close-x reg'
              onClick={() => setPeriodModal(null)}
            >
              &times;
            </button>
            <div className='frame-full cartimg'>
              <div className="frame fit flex-nw">
                <img className='img-box pad' src={periodModal.photo} alt="book" />
                <div>
                  <h3 className='pad5'>{periodModal.title}</h3>
                  <b><i>{periodModal.author}</i></b>
                  <p>ISBN: {periodModal.ISBN}</p>
                </div>
              </div>
              <div className='pad5'>
                <h3>Užsakymo data:</h3>
                <p>{periodModal.order_date.slice(0, -5).replace('T', ' ')}</p>
              </div>
              <div className='pad5'>
                <h3>Grąžinimo data:</h3>
                <p>{periodModal.return_date && periodModal.return_date.slice(0, -5).replace('T', ' ')}</p>
              </div>
              <form className='reg'>
                <h3>Pratęsti grąžinimo datą:</h3>
                <input value={date} onChange={e => setDate(e.target.value)} type="datetime-local" />
              </form>
              <div className="btns-modal">
                <button
                  type='button'
                  className='close reg'
                  onClick={() => setPeriodModal(null)}
                >
                  EXIT
                </button>
                <button type='button' className='put reg' onClick={handlePeriod}>
                  CON-FIRM!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
