const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllContacts = async (req, res) => {
    try {
        const result = await mongodb.getDB().collection('contacts').find();
        const contacts = await result.toArray();
        res.json(contacts);
    } catch (err) {
        console.error('Error getting contacts:', err);
        res.status(500).json({ error: err.message });
    }
};

const getSingleContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const contact = await mongodb.getDB().collection('contacts').findOne({ _id: contactId });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (err) {
        console.error('Error getting single contact:', err);
        res.status(500).json({ error: err.message });
    }
};

const createContact = async (req, res) => {
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const result = await mongodb.getDB().collection('contacts').insertOne(contact);
        res.status(201).json(result.insertedId);
    } catch (err) {
        console.error('Error creating contact:', err);
        res.status(500).json({ error: err.message });
    }
};

const updateContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const result = await mongodb.getDB().collection('contacts').replaceOne(
            { _id: contactId },
            contact
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(204).send();
    } catch (err) {
        console.error('Error updating contact:', err);
        res.status(500).json({ error: err.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const result = await mongodb.getDB().collection('contacts').deleteOne({ _id: contactId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting contact:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllContacts,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
};
