import './NotItems.css';
const NotItems = () => {
    return ( 
        <div className='not-items-container'>
            <img src={`${process.env.PUBLIC_URL}/Images/no-item.jpg`} alt="" className='img-not-items'/>
            <h2>No items</h2>
        </div>
     );
}
 
export default NotItems;