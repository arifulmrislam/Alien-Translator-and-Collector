const { Alien } = require('../models');

// get aliens
const getAliens = async (req, res) => {
    try {
        const aliens = await Alien.findAll();
        res.json(aliens);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching aliens', error });
    }
};

// add a new alien
const addAlien = async (req, res) => {
    try {
        const { name, language, message } = req.body;
        const newAlien = await Alien.create({ name, language, message });
        res.status(201).json(newAlien);
    } catch (error) {
        res.status(500).json({ message: 'Error adding alien', error });
    }
};

// update an existing alien
const updateAlien = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, language, message } = req.body;
        const alien = await Alien.findByPk(id);
        if (!alien) return res.status(404).json({ message: 'Alien not found' });

        alien.name = name || alien.name;
        alien.language = language || alien.language;
        alien.message = message || alien.message;
        await alien.save();

        res.json(alien);
    } catch (error) {
        res.status(500).json({ message: 'Error updating alien', error });
    }
};

// Delete an alien
const deleteAlien = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('ID received:', id); // Debug the received ID

    const alien = await Alien.findByPk(id);
    if (!alien) return res.status(404).json({ message: 'Alien not found' });

    await alien.destroy();
    res.status(200).json({ message: 'Alien deleted successfully' });
  } catch (error) {
    console.error('Error deleting alien:', error);
    res.status(500).json({ message: 'Error deleting alien', error });
  }
};



module.exports = { getAliens, addAlien, updateAlien, deleteAlien };


