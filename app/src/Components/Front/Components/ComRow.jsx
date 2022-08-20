function ComRow({ row }) {
  console.log(row);
  return (
    <ul>
      <p className="left"><i className="pad">{row.title}</i> <u>{row.author}</u></p>
      {row.coms && row.coms.slice(0, -5).split('-^-^-,').map((c, i) => <li key={i} className='flex-col'>{c.split('#').map(el => <i>{el}</i>)}</li>)}
    </ul>
  );
}

export default ComRow;
