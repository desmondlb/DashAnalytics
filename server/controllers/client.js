import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js"
import Transaction from "../models/Transaction.js"

export const getProducts =  async (req, res) => {
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

export const getCustomers =  async (req, res) => {
    try{
        
        const customers = await User.find({role:"user"}).select("-password");
        // we make sure we don't send passwords to the frontend thus the minus sign
        res.status(200).json(customers);
    }
    catch(error){
        res.status(404).json({ message: error.message })
    }
}

export const getTransactions =  async (req, res) => {
    try{
        
        // grab these values from the front end
        // the values have set defaults
        // sort should look like this: {"field": "userId", "sort":"desc"}
        const {page=1, pageSize=20, sort=null, search=""} = req.query;

        // formatted sort should look like {userId:-1}
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort = "asc" ? 1: -1
            };

            return sortFormatted
        }

        const sortFormatted = Boolean(sort) ? generateSort(): {}


        const transactions = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(search, "i")}},
                { userId: { $regex: new RegExp(search, "i")}}, // this userId works but not for _id as mongoDB has the particular ObjectId format
            ],
            // we are searching for cost with the value that the user inputted
            // $or allows us to search multiple fields
        })
            .sort(sortFormatted)
            .skip(page * pageSize)// allows to skip to the proper page
            .limit(pageSize);// limits the number of results
        
        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i"}
            // counting with the search option already found
            // this gives the total count
        })

        res.status(200).json({
            transactions,
            total
        });
    }
    catch(error){
        res.status(404).json({ message: error.message })
    }
}