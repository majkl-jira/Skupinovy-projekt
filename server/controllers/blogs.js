const Blog = require('../models/blog');
const User = require('../models/users');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 }).populate('author', 'name');
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Chyba při načítání blogů:', error);
    res.status(500).json({ message: 'Chyba serveru' });
  }
};


exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog nenalezen' });
    }
    
    res.status(200).json(blog);
  } catch (error) {
    console.error('Chyba při načítání blogu:', error);
    res.status(500).json({ message: 'Chyba serveru' });
  }
};


exports.createBlog = async (req, res) => {
  try {
    const { title, content, image, tags } = req.body;
    
    const newBlog = new Blog({
      title,
      content,
      image,
      author: req.userId,
      tags: tags || []
    });
    
    await newBlog.save();
    res.status(201).json({ message: 'Blog byl úspěšně vytvořen', blog: newBlog });
  } catch (error) {
    console.error('Chyba při vytváření blogu:', error);
    res.status(500).json({ message: 'Chyba serveru' });
  }
};


exports.updateBlog = async (req, res) => {
  try {
    const { title, content, image, tags } = req.body;
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog nenalezen' });
    }
    
    const user = await User.findById(req.userId);
    if (blog.author.toString() !== req.userId && !user.isAdmin) {
      return res.status(403).json({ message: 'Nemáte oprávnění upravit tento blog' });
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, image, tags },
      { new: true }
    );
    
    res.status(200).json({ message: 'Blog byl úspěšně aktualizován', blog: updatedBlog });
  } catch (error) {
    console.error('Chyba při aktualizaci blogu:', error);
    res.status(500).json({ message: 'Chyba serveru' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog nenalezen' });
    }
    

    const user = await User.findById(req.userId);
    if (blog.author.toString() !== req.userId && !user.isAdmin) {
      return res.status(403).json({ message: 'Nemáte oprávnění smazat tento blog' });
    }
    
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Blog byl úspěšně smazán' });
  } catch (error) {
    console.error('Chyba při mazání blogu:', error);
    res.status(500).json({ message: 'Chyba serveru' });
  }
};