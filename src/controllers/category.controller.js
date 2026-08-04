// สมมติว่ามีการเรียกใช้ prisma client (ปรับ path ตามโครงการของคุณได้เลย)
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. ดึงข้อมูลทั้งหมด
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. ดึงข้อมูลตาม ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: Number(id) }
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. เพิ่มข้อมูลใหม่
exports.createCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Please fill in the category name" });
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        description, // ส่งมาหรือไม่ส่งมาก็ได้เพราะเป็น optional
        isActive     // ถ้าไม่ส่งมา Prisma จะลงค่า true ให้ตาม schema
      }
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. แก้ไขข้อมูล
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        isActive
      }
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. ลบข้อมูล
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};