

export const BookCard = ({book}) => {
    const { accessionNo,author,edition,title,pages,volume,publisher,source,billdate,cost,rack} = book



    return <div className="p-4 shadow-md shadow-slate-300  cursor-pointer pb-4  max-w-screen-lg rounded-lg w-60  ">
            <h1>Title: {title}</h1>
            <h1> Author:   {author}</h1>
            <h1> Accesion no:   {accessionNo}</h1>

        </div>
}