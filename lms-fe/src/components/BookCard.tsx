

export const BookCard = ({book}) => {
    const { accessionNo,author,edition,title,pages,volume,publisher,source,billdate,cost,rack} = book



    return <div className="p-4 shadow-md shadow-slate-300  cursor-pointer pb-4  max-w-screen-lg rounded-lg w-60  ">
                <div className="bg-yellow-200 rounded-xl w-18  p-2 m-2">.

            <h1 className="font-extrabold text-center ">Title: {title}</h1>
            <h1 className="font-extrabold text-center "> Author:   {author}</h1>
                </div>
             <h1 className="font-bold "> Accesion no:   {accessionNo}</h1> 
            {/* <h1 className="font-extrabold "> edition no:   {edition}</h1>
           <h1 className="font-extrabold "> pages: {pages} </h1>   */}

        </div>
}
