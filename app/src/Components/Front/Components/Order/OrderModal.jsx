import { useEffect, useContext } from 'react';
import FrontContext from '../../FrontContext';

function Create() {
  const {
    orderModal,
    setOrderModal,
    setOrderCreate,
    userId,
  } = useContext(FrontContext);

  useEffect(() => {
    if (null === orderModal) {
      return;
    }
  }, [orderModal]);

  const handleReserve = () => {

    const data = {
      photo: orderModal.photo,
      title: orderModal.title,
      author: orderModal.author,
      ISBN: orderModal.ISBN,
      bookId: orderModal.id,
      userId: userId(),
    };
    setOrderCreate(data);
    console.log('ORDER DATA', data);
    setOrderModal(null);
  };
  if (null === orderModal) {
    return null;
  }
  console.log('modal', orderModal);

  return (
    <>
      <div className='modal-layer'>
        <div className='modal-cont reg'>
          <div className='modal reg'>
            <button
              type='button'
              className='close-x reg'
              onClick={() => setOrderModal(null)}
            >
              &times;
            </button>
            <div className='frame cartimg'>
              <img src={orderModal.photo} alt="book" />
              <p><u>{orderModal.cat}</u></p>
              <p className='heading-sm pad5'>{orderModal.title}</p>
              <h2><i>{orderModal.author}</i></h2>

              <p>ISBN: {orderModal.ISBN}</p>
              <div className="btns-modal">
                <button
                  type='button'
                  className='close reg'
                  onClick={() => setOrderModal(null)}
                >
                  EXIT
                </button>
                <button type='button' className='put reg' onClick={handleReserve}>
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
