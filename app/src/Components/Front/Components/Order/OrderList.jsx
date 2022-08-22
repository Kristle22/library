import { useContext } from "react";
import FrontContext from "../../FrontContext";
import PeriodModal from './PeriodModal';

function OrderList({ row }) {

  const { setPeriodModal } = useContext(FrontContext);

  return (
    <div className='flex-card cart nw'>
      <div className='flex-nw frame half'>
        <img className="img-box" src={row.photo} alt="book" />
        <div className="flex-col">
          <p><u>{row.cat}</u></p>
          <p className='heading-sm pad5'>{row.title}</p>
          <h2><i>{row.author}</i></h2>
          <p>ISBN: {row.ISBN}</p>
        </div>
      </div>
      {
        row.status === 0 ? <h2 className="reserved">Rezervuota</h2> :
          <div className="flex-nw com-3">
            <div>
              <h3>Užsakymo data:</h3><p>{row.order_date.slice(0, -5).replace('T', ' ')}</p>
            </div>
            <div>
              <h3>Grąžinimo data:</h3>
              <p className='line-w'>{row.returnDate && row.return_date.slice(0, -5).replace('T', ' ')}</p>
            </div>
            <div className='btns-modal'>
              <button type='button' className='order pending' onClick={() => setPeriodModal(row)}>
                PRATĘSTI
                <svg>
                  <use href='#Pending' />
                </svg>
              </button>
            </div>
          </div>
      }
      <PeriodModal />
    </div>
  );
}

export default OrderList;