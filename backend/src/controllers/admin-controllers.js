import Product from '../modules/Product';
import User from '../modules/User';

const fetchAllProducts = async (req,res)=>{
    try {
        const products = await Product.find();
        if(products && products.length>0){
            return res.status(200).json(
                {products}
            )
        }else{
            res.status(404).json(
                {message : "No products found"}
            )
        }
    } catch (error) {
        console.log('Error in fetching all products : ',error);
        
    }
}

const fetchAllUsers = async (req,res)=>{
    try {
        const users = await User.find();
        if(users && users.length>0){
            return res.status(200).json({
                users
            })
        }else{
            return res.status(404).json({
                message : "No users found"
            })
        }
    } catch (error) {
        console.log('Error in fetchin details of all users : ',error);
        
    }
}

module.exports = {fetchAllProducts,fetchAllUsers};