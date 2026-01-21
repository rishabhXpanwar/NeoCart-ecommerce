const Product = require ('../models/product');

//create product

exports.createProduct = async (req, res , next) => {
 try {
    const p = await Product.create ({
        ...req.body,
        createdBy : req.user._id,
    });

    res.status(201).json({
        success : true,
        data : p
    });
 }
 catch(err)
 {
    next(err);
 }
    
};


//get product
exports.getProduct = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const filters = {};

    if (req.query.search) {
      filters.name = { $regex: req.query.search, $options: "i" };
      // regex ka matlab hai regeular expression (pattern Matching) //search pattern by matching text pattern //optione me i ka matlb hai case sensitive 
      // // man lo search me shoe name hai tho 
      // // i use krne se Shoe, sHoe, shOe, SHOe sab match ho jaynge
    }

    if (req.query.category) {
      filters.category = req.query.category;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filters.price = {};

      if (req.query.minPrice) {
        filters.price.$gte = Number(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        filters.price.$lte = Number(req.query.maxPrice);
      }
    }

    // ✅ RIGHT WAY
    // ab hum Promise.all ka use krenge 
    // // ye kya krte hai ke tasks kp parallel me run krdeta hai 
    // // oe ek array return krta hai 
    //  // total : jo products humare filter se match kr rhe hai
    //  // product : vo products jo us page pr dikhane hai
    const [total, products] = await Promise.all([
      Product.countDocuments(filters),// total no. of matching docs
      Product.find(filters)
        .skip(skip)// skip kitne krne hai jaise ki 3 page pr hai tho 3-1 * 12 = 24 skip krne hai
        .limit(limit)// ek page pr kitne aane chaiye max
        .sort({ createdAt: -1 }),
    ]);
// agr hum 2 no promise alag alag perform krte tho 2x time lagta
    res.status(200).json({
      success: true,
      data: {
        products,
        page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (err) {
    next(err);
  }
};




//get product by id

exports.getProductById = async (req,res,next) => {
    try{
        const p = await Product.findById(req.params.id);

        if(!p)
        {
             res.status(404);
             return next(new Error('Product not Found'));
        }

        res.status(201).json({
            success: true,
            data : p
        });
    }
    catch(err)
    {
        next(err);
    }
};



// update product

exports.updateProduct = async (req,res,next)=> {
    try{
        const p = await Product.findById(req.parama.id);

        if(!p)
        {
            res.status(404);
            return next(new Error('Produt Not Found'));
        }

        Object.assign(p,req.body);// merge the updates in req.body with product document 
         await p.save();
        res.status(201).json({
            success : true,
            data : p
        });
    }

    catch(err)
    {
        next(err);
    }
};


// delete product

exports.deleteProduct = async (req,res,next) => {
    try{
        const p = await Product.findById(req.params.id);
        if(!p)
        {
            res.status(404);
            return next(new Error('Product Not Found'));
        }
        await p.remove();//delete from DB

        res.status(201).json({
            success : true,
            message  :'Product Removed'
        });

    }
    catch(err)
    {
        next(err);
    }
};
