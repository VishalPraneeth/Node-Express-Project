//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContact = (req, res) => {
    res.status(200).json({message: "Get all contacts"});
};

//@desc Create new contacts
//@route POST /api/contacts
//@access Public
const createContact = (req, res) => {
    console.log("The request body: ",req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error
    }
    res.status(201).json({message: "Create contacts"});
};


//@desc Get contacts
//@route GET /api/contacts/:id
//@access Public
const getContacts = (req, res) => {
    res.status(200).json({message: `Get contacts for ${req.params.id} `});
};

//@desc Update contacts
//@route PUT /api/contacts/:id
//@access Public
const updateContact = (req, res) => {
    res.status(200).json({message: `Update contacts for ${req.params.id} `});
};


//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = (req, res) => {
    res.status(201).json({message: `delete contacts for ${req.params.id}`});
};

module.exports = {getContact, createContact, getContacts, updateContact, deleteContact}
