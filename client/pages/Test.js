import dbConnect from "../lib/dbConnect"
import Page from "../model/Page"

const Test = ({ pages }) => (
        <>
            "test"
            {pages.map((page) => (
                    <div>
                        <div>{page._id}</div>
                        <div>{page.name}</div>
                        <div>{page.createdAt}</div>
                    </div>
                ) 
             
             )}
    
        </>
    )



export async function getServerSideProps() {
    await dbConnect();

    const result = await Page.find({});
    const pages = result.map((doc) => {
        const page = doc.toObject();
        page._id = page._id.toString();
        page.createdAt = page.createdAt.toString();
        return page
    })

    return { props: {pages: pages}}
}

export default Test;