import { useContext, useState } from 'react';
import BackContext from '../BackContext';

function Create() {
  const { setCreateCat } = useContext(BackContext);

  const [title, setTitle] = useState('');

  const handleCreate = () => {
    const data = { title };
    setCreateCat(data);
    setTitle('');
  };
  return (
    <>
      <div className='form-container admin books' style={{ marginTop: '10px' }}>
        <div className='form color'>
          <h3>Insert Book's Category</h3>
          <form>
            <label>Title</label>
            <input
              className='color'
              type='text'
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              placeholder='place here...'
            />
            <button type='button' className='put' onClick={handleCreate}>
              <svg className='put'>
                <use href='#Add' />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
