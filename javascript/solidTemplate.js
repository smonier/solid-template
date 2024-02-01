document.addEventListener("DOMContentLoaded", () => {
    // Select all buttons by their common class name
    const buttons = document.querySelectorAll('.toggle-btn');

    // Function to toggle the display of the target div
    const toggleDiv = (event) => {
        const button = event.currentTarget;
        const icon = button.querySelector('.button-icon'); // Select the icon inside the button
        const targetId = button.getAttribute('data-target-id');
        const targetDiv = document.getElementById(targetId);

        if (targetDiv.style.display === "none" || targetDiv.style.display === "") {
            targetDiv.style.display = "block";
            icon.classList.remove('fa-eye'); // Example 'show' icon class
            icon.classList.add('fa-eye-slash'); // Example 'hide' icon class
        } else {
            targetDiv.style.display = "none";
            icon.classList.remove('fa-eye-slash'); // Toggle back to original
            icon.classList.add('fa-eye');
        }
    };

    const openDiv = (currentId) => {
        const parts = currentId.split("-"); // Split the string by the dash character

// Remove the first part ("answer") and rejoin the remaining parts to form the UUID
        const uuid = parts.slice(1).join("-");
        const btnid = "btn-" + uuid;
        const button = document.getElementById(btnid);

        const icon2 = button.querySelector('.button-icon'); // Select the icon inside the button
        const targetId = button.getAttribute('data-target-id');
        const targetDiv = document.getElementById(targetId);

        if (targetDiv.style.display === "none" || targetDiv.style.display === "") {
            targetDiv.style.display = "block";
            icon2.classList.remove('fa-eye'); // Example 'show' icon class
            icon2.classList.add('fa-eye-slash'); // Example 'hide' icon class
        }
    };

    const closeDiv = (currentId) => {
        const parts = currentId.split("-"); // Split the string by the dash character

// Remove the first part ("answer") and rejoin the remaining parts to form the UUID
        const uuid = parts.slice(1).join("-");
        const btnid = "btn-" + uuid;
        const button = document.getElementById(btnid);

        const icon3 = button.querySelector('.button-icon'); // Select the icon inside the button
        const targetId = button.getAttribute('data-target-id');
        const targetDiv = document.getElementById(targetId);

        if (targetDiv.style.display === "block" || targetDiv.style.display === "") {
            targetDiv.style.display = "none";
            icon3.classList.remove('fa-eye-slash'); // Toggle back to original
            icon3.classList.add('fa-eye');
        }
    };

    // Add click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', toggleDiv);
    });

    const searchInput = document.getElementById('searchInput');
    const faqItems = document.querySelectorAll('.faq-item');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        faqItems.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            const match = itemText.includes(searchTerm);

            clearHighlights(item.firstElementChild.firstChild.id); // Clear existing highlights
            clearHighlights(item.lastElementChild.id);
            item.firstElementChild.firstChild.style.display = match ? openDiv(item.firstElementChild.firstChild.id) : closeDiv(item.firstElementChild.firstChild.id);
            item.lastElementChild.style.display = match ? openDiv(item.lastElementChild.id) : closeDiv(item.lastElementChild.id); // Show the item if it matches, otherwise hide it
            if (searchTerm) {
                highlightSearchTerm(item.firstElementChild.firstChild.id, searchTerm);
                highlightSearchTerm(item.lastElementChild.id, searchTerm);
            } else {
                closeDiv(item.lastElementChild.id);
            }
        });
    });
});


function highlightSearchTerm(containerId, searchTerm) {
    const container = document.getElementById(containerId);
    const regex = new RegExp(`(${searchTerm})`, 'gi');

    function highlightText(node) {
        if (node.nodeType === 3) { // Node.TEXT_NODE
            const match = node.nodeValue.match(regex);
            if (match) {
                const highlightedHTML = node.nodeValue.replace(regex, '<span class="highlight">$1</span>');
                const wrapper = document.createElement('div');
                wrapper.innerHTML = highlightedHTML;

                while (wrapper.firstChild) {
                    node.parentNode.insertBefore(wrapper.firstChild, node);
                }
                node.parentNode.removeChild(node);
            }
        } else if (node.nodeType === 1 && node.childNodes && !/^(script|style)$/i.test(node.tagName)) { // Node.ELEMENT_NODE
            node.childNodes.forEach(highlightText);
        }
    }

    highlightText(container);
}

function clearHighlights(containerId) {
    const container = document.getElementById(containerId);
    (container.querySelectorAll('.highlight') && container.querySelectorAll('.highlight').forEach(span => {
            const parent = span.parentNode;
            parent.replaceChild(document.createTextNode(span.textContent), span);
            parent.normalize(); // Merges adjacent text nodes
        })
    )
}



