import { Navbar } from "../components/Navbar"

 

export const Dashboard = () => {

    return <>
        <Navbar />

    <div className="flex bg-yellow-300 text-black" style={{paddingInline: `px` ,height: '92vh'}}>
        <div className="flex-1 flex flex-col justify-center p-20" style={{wordSpacing:'1%'}}>
                <h1 className="text-5xl mb-10 ">BS-CS Library</h1>
            <p  className="max-w-screen-sm mb-20 text-lg">
                All the books related to BS-MS 
                All the books related to BS-MS 
                All the books related to BS-MS 
                All the books related to BS-MS 

            </p>
        </div>
            <div className="flex flex-1 bg-cover bg-no-repeat">

            </div>

    </div>
    </>
}
