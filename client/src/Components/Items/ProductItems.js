import React,{useContext} from 'react'
import WorkIcon from '@mui/icons-material/Work';
import ProductContext from '../../Context/Product/ProductContext';
import { useNavigate } from 'react-router-dom';

const ProductItems = (props) => {
    const navigate=useNavigate();
    const context = useContext(ProductContext);
    const { deleteProduct } = context;
    const { data, setProduct} = props;
    const { _id,productName, quantity, poNumber, category, price,vendorID} = data;

    const handleEdit=()=>{
        localStorage.setItem('productUpdate',true);
        setProduct({_id:_id,productName:productName, quantity:quantity, poNumber:poNumber, category:category, price:price,vendorID:vendorID})
    }
    const handleDelete=()=>{
        if(localStorage.getItem('token')){
            deleteProduct(_id);
        }
        else{
            navigate('/Login');
        }
        
    }
    return (
        <div>
            <div className="my-3">
                <div className="ui cards">
                    <div className="green card">
                        <div className="content">
                            <div className='right floated mini ui '>
                                <i className="trash icon" onClick={handleDelete}></i>
                            </div>
                            <div className="header mt-2">
                                {productName}
                            </div>
                            <div className="meta">
                                {poNumber}
                            </div>
                            <div className="description" style={{ marginTop: '20px', fontSize: "16px" }}>
                                <p> Quantity:  {quantity} </p>
                                <p><WorkIcon /> {category}</p>
                                <p><i className="circle icon"></i>{price} </p>
                                <p><i className="circle icon"></i>{vendorID} </p>
                            </div>
                        </div>
                        <div className="ui bottom attached button" onClick={handleEdit} >
                            <i className="edit icon" ></i>Edit
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItems