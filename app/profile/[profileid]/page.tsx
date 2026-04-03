export default async function Profile({params}) {
    const { profileid } = await params;

    

    return (
        <div>Profile says hello {profileid}
        
        </div>

        

        
    )
}