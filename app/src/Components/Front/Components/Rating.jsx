import { useContext } from "react";
import FrontContext from "../FrontContext";

function Rating({ row }) {
  const { rate, setRate } = useContext(FrontContext);

  const rateNow = (e) => {
    setRate(e.target.value);
  }

  return (
    <div className='com'>
      <form className='flex-nw'>
        <div className='rateIt'>
          {/* <img src={require('../../../img/rate-us.png')} alt='rate us' /> */}
          <select value={rate} onChange={rateNow}>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={10 - i}>
                {10 - i} *
              </option>
            ))}
          </select>
        </div>
        <h1>
          <b>
            <svg>
              <use href='#rating' />
            </svg>
          </b>
          {rate ? Number(rate).toFixed(2) : '0.00'}
        </h1>
      </form>
    </div>
  )
}

export default Rating;