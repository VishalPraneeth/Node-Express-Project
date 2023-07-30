const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactmodel');
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc Create new contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body: ",req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("Invalid");
    }
    const contacts = await Contact.create({name, email, phone, user_id: req.user.id});
    res.status(201).json(contacts);
});


//@desc Get contacts
//@route GET /api/contacts/:id
//@access private
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
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contacts = Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contacts.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("You are not authorized to update this contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updateContact);
});


//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contacts = Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contacts.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("You are not authorized to delete this contact");
    }
    await Contact.deleteOne( {_id: req.params.id} );
    res.status(201).json(contacts);
});

module.exports = {getContact, createContact, getContacts, updateContact, deleteContact}
