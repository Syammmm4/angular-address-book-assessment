// 1. In-Memory Collection Data Store Array
let contacts = [];

// 2. Target Core DOM Selectors
const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const searchBar = document.getElementById('searchBar');

// 3. Functional Requirement: Add Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop standard browser page reloads

    // Capture dynamic inputs
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const street = document.getElementById('street').value.trim();
    const state = document.getElementById('state').value.trim();
    const postcode = document.getElementById('postcode').value.trim();
    const description = document.getElementById('description').value.trim();

    // Map unique constraint item using execution timestamp
    const id = Date.now();

    // Create the cleanly structured Object requested by specification metrics
    const newContact = {
        id,
        name,
        phone,
        email,
        address: {
            street,
            state,
            postcode
        },
        description
    };

    // Store directly into runtime application memory collection array
    contacts.push(newContact);

    // Clear form inputs automatically
    contactForm.reset();

    // Sync state layout immediately to visually update UI context views
    displayContacts(contacts);
});

// 4. Functional Requirement: View Contacts Array Mapping
function displayContacts(contactsToRender) {
    contactList.innerHTML = ''; // Wipe container clean from historical DOM nodes

    // Render placeholder messaging if state array maps empty data sets
    if (contactsToRender.length === 0) {
        contactList.innerHTML = '<p class="no-contacts">No contacts found.</p>';
        return;
    }

    // Iterate dynamically over matching targets array elements map records structure
    contactsToRender.forEach(contact => {
        const card = document.createElement('div');
        card.className = 'contact-card';

        card.innerHTML = `
            <h3>${escapeHTML(contact.name)}</h3>
            <p><strong>📞 Phone:</strong> ${escapeHTML(contact.phone)}</p>
            <p><strong>✉️ Email:</strong> ${escapeHTML(contact.email)}</p>
            <p><strong>📍 Address:</strong> ${escapeHTML(contact.address.street)}, ${escapeHTML(contact.address.state)}, ${escapeHTML(contact.address.postcode)}</p>
            ${contact.description ? `<p><strong>📝 Notes:</strong> ${escapeHTML(contact.description)}</p>` : ''}
            <button class="btn-delete" onclick="deleteContact(${contact.id})">Delete</button>
        `;

        contactList.appendChild(card);
    });
}

// 5. Functional Requirement: Search Contacts Input Listener filtering parameters matching
searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    // Narrow query tracking based directly against collection name parameters
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm)
    );
    
    displayContacts(filteredContacts);
});

// 6. Functional Requirement: Delete Contact Target via specific unique ID parameters
function deleteContact(id) {
    // Re-filter master data block down, leaving out matching targeted elements records
    contacts = contacts.filter(contact => contact.id !== id);
    
    // Preserve any text inputs existing actively inside filter query fields during deletes
    const searchTerm = searchBar.value.toLowerCase();
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm)
    );
    
    displayContacts(filteredContacts);
}

// Security Helper: Protects system metrics injection strings natively via explicit conversion
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Fire runtime tracking once immediately on bootup configurations cycle updates
displayContacts(contacts);