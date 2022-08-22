import { useEffect, useContext } from 'react';
import FrontContext from '../FrontContext';
import Rating from './Rating';

function Create({ row }) {
  const {
    reviewModal,
    setReviewModal,
    rate,
    setRate,
    com,
    setCom,
    setCreateCom,
    setCreateRates,
    showMessage,
    // users,
    // getUser,
  } = useContext(FrontContext);

  useEffect(() => {
    if (null === reviewModal) {
      return;
    }
  }, [reviewModal]);

  // const userId =
  //   users.filter((user) => user.name === getUser())[0]?.id ?? null;

  const handleComment = () => {
    if (com === '') {
      showMessage({ type: 'danger', text: 'Pries siusdami atsiliepima iveskite komentara arba spauskite iseiti' })
      return;
    }
    setCreateCom({ com, bookId: reviewModal.id });
    setCom('');
  };

  const rateIt = () => {
    if (rate === '0') {
      showMessage({ type: 'danger', text: 'Pasirinkite ivertinima nuo 1 iki 10. ' })
      return;
    }
    setCreateRates({ id: reviewModal.id, rate: Number(rate) })
    setRate('0');
  }

  if (null === reviewModal) {
    return null;
  }
  // console.log('modal', reviewModal);
  console.log(rate);

  return (
    <>
      <div className='modal-layer'>
        <div className='modal-cont reg'>
          <div className='modal reg'>
            <button
              type='button'
              className='close-x reg'
              onClick={() => setReviewModal(null)}
            >
              &times;
            </button>
            <div className='frame-full cartimg'>
              <div className='order left'>
                <div>
                  <div>
                  </div>
                </div>
                <div className='pad flex-nw frame wb'>
                  <img src={reviewModal.photo} alt='book' />
                  <div>
                    <h2>{reviewModal.title}</h2>
                    <h3>{reviewModal.author}</h3>
                  </div>
                </div>
                <label>Tavo įvertinimas:</label>
                <Rating row={reviewModal} />
                <div className="flex end">
                  <button type='button' className='put reg' onClick={rateIt}>
                    RATE!
                  </button>
                </div>
                <label>Komentaras:</label>
                <textarea
                  value={com}
                  onChange={(e) => setCom(e.target.value)}
                  placeholder='Write your message here...'
                ></textarea>
                {/* <i style={{ fontSize: '16px' }}>*required fields</i> */}
              </div>
              <div className='flex end'>
                <button
                  type='button'
                  className='close reg'
                  onClick={() => setReviewModal(null)}
                >
                  EXIT
                </button>
                <button className='put' onClick={handleComment}>
                  <svg>
                    <use href='#post' />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default Create;
