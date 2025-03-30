import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  contactList: [],
  filteredContacts: [],
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action) => {
      console.log("Adding Contact:", action.payload);
      for (const obj of state.contactList) {
        if (obj.email === action.payload.email) {
            alert("User already exists!");
            return state; 
        }
    }
    
      const newContact = {
        id: nanoid(),
        name: action.payload.name,
        email: action.payload.email, 
        phone: action.payload.phone,
        photo: action.payload.photo,
      };
      state.contactList.push(newContact);
    },

    deleteContact: (state, action) => {
      state.contactList = state.contactList.filter(
        (contact) => contact.id !== action.payload
      );
    },

    updateContact: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.contactList.findIndex((contact) => contact.id === id);

      if (index !== -1) {
        state.contactList[index] = { id, ...updatedData };
      }
    },
    filterContact: (state, action) => {
      const searchItem=action.payload.toLowerCase();
      const filtered = state.contactList.filter(
        (contact) => contact.name.toLowerCase().includes(searchItem)
      );
      if(filtered.length===0){
        alert('Contact not found')
      }
      state.filteredContacts=filtered;
    },
    refreshContact: (state) => {
      state.filteredContacts = [];
    },
  },
 
});

export const { addContact, deleteContact, updateContact,filterContact,refreshContact } = contactSlice.actions;
export default contactSlice.reducer;
