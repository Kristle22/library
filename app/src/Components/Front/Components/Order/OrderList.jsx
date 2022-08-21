function OrderList({ row }) {

  const handleModal = () => {
    // setOrderModal(clothArr);
  };

  return (
    <div className='flex-card cart'>
      <div className='flex-nw frame fit'>
        <img className="img-box" src={row.photo} alt="book" />
        <div className="flex-col">
          <p><u>{row.cat}</u></p>
          <p className='heading-sm pad5'>{row.title}</p>
          <h2><i>{row.author}</i></h2>

          <p>ISBN: {row.ISBN}</p>
        </div>
      </div>
      <div className='btns-modal'>
        <button type='button' className='order pending' onClick={handleModal}>
          PRATĘSTI
          <svg>
            <use href='#Pending' />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default OrderList;
