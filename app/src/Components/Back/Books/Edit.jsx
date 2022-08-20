import { useState, useEffect, useContext } from 'react';
import BackContext from '../BackContext';
import Photo from './Photo';

function Edit() {
  const {
    image,
    setImage,
    modalData,
    setModalData,
    setEditData,
    cats,
  } = useContext(BackContext);

  const [title, setTitle] = useState('');
  const [cat, setCat] = useState(0);
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [pages, setPages] = useState('');
  const [isbn, setIsbn] = useState('');

  console.log(modalData);

  const handleDeletePhoto = () => {
    setModalData((p) => ({ ...p, photo: null }));
  };

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setTitle(modalData.title);
    setCat(
      cats.filter((c) => modalData.cat === c.title)[0]?.id ?? null
    );
    setAuthor(modalData.author);
    setPublished(modalData.published);
    setPages(modalData.pages);
    setIsbn(modalData.ISBN);
    setImage(modalData.photo);
  }, [modalData, cats, setImage]);

  const handleEdit = () => {
    const data = {
      id: modalData.id,
      title,
      cat,
      author,
      published,
      pages,
      isbn,
      photo: image,
    };
    setEditData(data);
    console.log(data);
    setModalData(null);
  };
  if (null === modalData) {
    return null;
  }

  return (
    <>
      <div className='modal-layer'>
        <div className='modal-cont'>
          <div className='modal'>
            <div className='left-side'>
              <button
                type='button'
                className='close-x'
                onClick={() => setModalData(null)}
              >
                &times;
              </button>
              <button className='remove'
                type='button'
                onClick={handleDeletePhoto}>
                Remove Photo
              </button>
              <Photo />
            </div>
            <div className='right-side form'>
              <form>
                <label>Title:</label>
                <input
                  className='create'
                  type='text'
                  onChange={(e) =>
                    setTitle(e.target.value)}
                  value={title}
                  placeholder='Enter type of the book'
                />
                <select value={cat} onChange={e => setCat(e.target.value)}>
                  <option defaultValue='0'>Choose category</option>
                  {cats
                    ? cats.map((c) => (
                      <option
                        key={c.id}
                        value={c.id}>
                        {c.title}
                      </option>
                    ))
                    : null}
                </select>
                <label>Author:</label>
                <input
                  className='create'
                  type='text'
                  onChange={(e) =>
                    setAuthor(e.target.value)}
                  value={author}
                  placeholder='Enter author of the book...'
                />
                <label>Published:</label>
                <input
                  className='create'
                  type='text'
                  onChange={(e) => {
                    setPublished(e.target.value);
                  }}
                  value={published}
                  placeholder='year of issue ...'
                />
                <label>Number of pages:</label>
                <input
                  className='create'
                  type='text'
                  onChange={(e) => {
                    setPages(e.target.value);
                  }}
                  value={pages}
                  placeholder='enter number of pages'
                />
                <label>ISBN:</label>
                <input
                  className='create'
                  type='text'
                  onChange={(e) => {
                    setIsbn(e.target.value);
                  }}
                  value={isbn}
                  placeholder='enter ISBN of the book'
                />
                <div className='btns-modal'>
                  <button
                    type='button'
                    className='close'
                    onClick={() => setModalData(null)}
                  >
                    <svg>
                      <use href='#Exit' />
                    </svg>
                  </button>
                  <button type='button' className='put' onClick={handleEdit}>
                    <svg className='put'>
                      <use href='#Save' />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default Edit;
