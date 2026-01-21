const Cart = require('../models/cart');

const Product = require('../models/product');

// a function to calculate total price of the iten=ms in the cart

async function calcTotal(items)
{
    let total = 0;

    for(const it of items)
    {
        let prod;
        if(typeof it.product === 'object' && it.product.price !== undefined)
        {
            prod = it.product;
        }
        else
        {
         prod = await Product.findById(it.product);
        }


        if(prod)
        {
            total += prod.price * it.quantity;
        }
    }
    return total;

};


// get cart 

exports.getCart = async (req , res , next) => {
    try{
        const cart = await Cart.findOne({user : req.user._id}).populate('items.product');

        if(!cart)
        {
            return res.json({
                sucess : true,
                data : {
                    items : [],
                    totalPrice : 0
                }
            });
        }

        const total = await calcTotal(cart.items);
        res.json({
  success: true,
  data: {
    items: cart.items,
    totalPrice: total
  }
});

        
    }
    catch(err)
    {
        next(err);
    }
}

// add to cart

exports.addToCart = async (req ,res, next) => {
    try{
        const { productId , quantity = 1 } = req.body;

        if(!productId || quantity <=0)
        {
            res.status(400);
            return next(new Error('Invalid Product or Quantity'));

        }

        let cart = await Cart.findOne({user : req.user._id});

        const product = await Product.findById(productId);

        if(!product)
        {
            res.status(404);
            return next(new Error('Product not found'));
        }

        if(!cart)
        {
            //if no cart then create new cart
            cart = await Cart.create({
                user : req.user._id,
                items : [{product : productId , quantity}]
            });
            
        }
        else{
            // if cart exists then update cart
            const existing = cart.items.find(item => item.product.toString() === productId);
            // yha pr humne ye kia hai ke agr cart phle se exist kti hai tho check kro ke co product cart me 
            //phle se hai ya nhi agr hai tho uski quantity update kr do
            // item => item.product.toString() === productId is line me hum ek arrow function use kr rhe hai jo ke cart ke har item pr chalega
            // aur check krta hai ke item.product jo ke ek ObjectId hai usko string me convert krke productId se compare krta hai

            if(existing)
            {
                existing.quantity += quantity;
            }
            else {
                cart.items.push({product : productId , quantity});
                //items ek arraay hai isliye hum push kr rhe hai


            }
        }

        cart.totalPrice = await calcTotal(cart.items);

        await cart.save();

        //populate the product details in the cart items before sending response
        //it will help frontend to show product details in the cart

        await cart.populate('items.product');
        // 201 means resource created successfully
        res.status(201).json({
            success : true,
            data : cart
        });
    }
    catch(err)
    {
        next(err);
    }
};



//update cart item

exports.updateCart = async (req, res , next )=> {
    try{
        const {productId , quantity} = req.body;

        if(!productId || quantity < 0)
        {
            res.status(400);// 400 - bad request// means invalid input from user
            return next(new Error('Invalid Product or Quantity'));
        }

        const cart = await Cart.findOne({user : req.user._id});
        if(!cart)
        {
            res.status(404);// 404 - not found
            return next(new Error('Cart not Found'));
        }
        const prod = cart.items.find(item=> item.product.toString() === productId);
        if(!prod)
        {
            res.status(404);
            return next(new Error('Product not Found in cart'));
        }

        if(quantity <=0)
        {
            // remove item from cart
            cart.items = cart.items.filter(item => item.product.toString() !== productId);
        }
        else 
        {
            prod.quantity = quantity;
        }

        cart.totalPrice = await calcTotal(cart.items);

        await cart.save();

        await cart.populate('items.product');

        res.status(200).json({
            success : true,
            data : cart
        });
    }
    catch(err)
    {
        next(err);
    }
};

// remove from cart 
exports.removeFromCart = async (req,res,next) => {
    try{
        const {productId} = req.params;
        if(!productId)
        {
            res.status(400);// 400 - bad request
            return next(new Error('Invalid ProductId'));

        }
        const cart = await Cart.findOne({user : req.user._id});
        if(!cart)
        {
            res.status(404);
            return next(new Error('Cart not Found'));
        }

        cart.items = cart.items.filter(i => i.product.toString() !== productId);

        cart.totalPrice = await calcTotal(cart.items);

        await cart.save();

        await cart.populate('items.product');

        res.status(200).json({
            success : true,
            data : cart
        });
    }
    catch(err)
    {
        next(err);
    }
};


//clear cart
exports.clearCart = async(req, res , next) => {
    try{
        const cart = await Cart.findByIdAndUpdate(
            {user : req.user._id},
            {
                items : [],
                totalPrice : 0
            },
            {new : true, upsert : true} // upsert - if cart not found then create new cart
        );

        res.status(200).json({
            success : true,
            data : cart
        });
    }
    catch(err)
    {
        next(err);
    }
};

