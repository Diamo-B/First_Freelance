import {useSession} from 'next-auth/react';

const addCategory = () => {
    const {data:session} = useSession({required: true});

    if(!session)
    {
        return( // this is rendered to fix the split second before redirection where the admin page is shown while the session is missing
            <></>
        )
    }
    return ( 
        <h1>Add Category</h1>
    );
}
 
export default addCategory;