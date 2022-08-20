import { useContext, useState } from 'react';
import BackContext from '../BackContext';
import Photo from './Photo';


function Create() {
  const { fileInput, image, setImage, setCreateData, cats } = useContext(BackContext);

  const [title, setTitle] = useState('');
  const [cat, setCat] = useState(0);
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [pages, setPages] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleCreate = () => {
    const data = {
      title,
      cat: Number(cat),
      author,
      published: parseInt(published),
      pages: parseInt(pages),
      isbn,
      photo: image,
    };
    setCreateData(data);
    setTitle('');
    setCat(0);
    setAuthor('');
    setPublished('');
    setPages('');
    setIsbn('');
    setImage(null);
    fileInput.current.value = null;
  };

  return (
    <>
      <div
        className='form-container'
        style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: '50px' }}
      >
        <div className='form create'>
          <h3>Create new book</h3>
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
            <Photo />
            <div className='btns add'>
              <button type='button' className='put' onClick={handleCreate}>
                <svg>
                  <use href='#Add' />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
