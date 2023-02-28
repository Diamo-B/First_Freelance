import BrowserNavGen from './Navbar';

const CategoryNav = ({category,searchData}) => {
    return (
        <>
            <BrowserNavGen searchData={searchData}/>
            <div className="flexCat">
                <p className='catNameDesktop'>{category}</p>
            </div>
        </>
    );
}
 
export default CategoryNav;