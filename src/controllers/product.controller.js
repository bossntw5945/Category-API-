const prisma = require('../prisma');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า' });
    }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ message: "Please field name and price" })
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        stock: Number(stock) || 0

      }
    })

  } catch {
    res.status(500).json({ messge: "Add Oroducts Unsuccess"});

  }
};