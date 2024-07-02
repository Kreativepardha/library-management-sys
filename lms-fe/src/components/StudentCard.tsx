

export const StudentCard = ({student}) => {
    const {name,email} = student



        return <div className="bg-yellow-200 w-80 p-6 rounded-md ">
            <p><strong>ID:</strong> {student._id}</p>
            <h1>{name}</h1>
            <h1>{email}</h1>
    </div>
}