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
    const contacts = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contacts);
});

//@desc Update contacts
//@route PUT /api/contacts/:id
//@access Public
const updateContact = asyncHandler(async (req, res) => {
    const contacts = Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updateContact);
});


//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = asyncHandler(async (req, res) => {
    const contacts = Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(201).json(contacts);
});

module.exports = {getContact, createContact, getContacts, updateContact, deleteContact}
