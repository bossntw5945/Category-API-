const prisma = require('../prisma');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า' });
    }
};

exports.getAllProductId = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({ where: {id} });

    if (!product) {
      return res.status(404).json({ message: "Not Products Found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal Server 500" });
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

exports.updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, price, stock } = req.body;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: Number(price),
        stock: Number(stock)
      }
    });
    res.json(updated);
  } catch (error) {
    res.status(404).json({ message: "Products Not Found" });
  }
};