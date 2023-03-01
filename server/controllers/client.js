import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";

export const getProducts =  async (rec, res) => {
    try{
        const products = await Product.find()
        
        // cycle through all the products and find the product
        // stat using the product ID
        // This query is very slow as it fetches data for every product
        // a faster approach is aggregate queries using mongo db aggregate functions
        // similar to joins and unions
        const productWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id
                });
                // return an array of product information combined with it's stats
                return {
                    ...product._doc,
                    stat,
                };
            })
        );
        // set the success status and return to the front end with the result
        res.status(200).json(productWithStats)
    }
    catch(error){
        res.status(404).json({ message: error.message })
    }
}