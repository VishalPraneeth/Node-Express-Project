const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactmodel');
//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
});

//@desc Create new contacts
//@route POST /api/contacts
//@access Public
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body: ",req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error
    }
    const contacts = await Contact.create({name, email, phone});
    res.status(201).json(contacts);
});


//@desc Get contacts
//@route GET /api/contacts/:id
//@access Public
const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Get contacts for ${req.params.id} `});
});

//@desc Update contacts
//@route PUT /api/contacts/:id
//@access Public
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update contacts for ${req.params.id} `});
});


//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = asyncHandler(async (req, res) => {
    res.status(201).json({message: `delete contacts for ${req.params.id}`});
});

module.exports = {getContact, createContact, getContacts, updateContact, deleteContact}
