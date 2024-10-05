const items_container = document.getElementById("items");
const item_template = document.getElementById("list-item-template");
const add_button = document.getElementById("add-button");

let items = getItems();

function getItems() {
    const value = localStorage.getItem("todo") || "[]";
    return JSON.parse(value);
}

function setItems(items) {
    const itemsJSON = JSON.stringify(items);
    localStorage.setItem("todo", itemsJSON);
}

function updateItems(item, key, value) {
    item[key] = value;
    setItems(items);
    refreshList();
}

function deleteItem(index) {
    items.splice(index, 1);
    setItems(items); // Update local storage after deletion
    refreshList();
}

function addItem() {
    items.push({
        description: "",
        completed: false,
    });

    setItems(items); // Save new item to local storage
    refreshList();
}

function refreshList() {
    // Sort items with completed ones at the end
    items.sort((a, b) => a.completed - b.completed);

    // Clear the container
    items_container.innerHTML = "";

    items.forEach((item, index) => {
        const itemElement = item_template.content.cloneNode(true);
        const descriptionInput = itemElement.querySelector(".item-description");
        const completedInput = itemElement.querySelector(".item-completed");
        const deleteBtn = itemElement.querySelector('.delete-btn');

        // Populate the fields with the current item values
        descriptionInput.value = item.description;
        completedInput.checked = item.completed;

        // Update description when input changes
        descriptionInput.addEventListener("change", () => {
            updateItems(item, "description", descriptionInput.value);
        });

        // Update completed status when checkbox changes
        completedInput.addEventListener("change", (event) => {
            if (descriptionInput.value.trim() === "") {
                // If description is empty, prevent marking as completed
                event.preventDefault();
                completedInput.checked = false;
            } else {
                updateItems(item, "completed", completedInput.checked);
            }
        });

        // Delete item when delete button is clicked
        deleteBtn.addEventListener("click", () => {
            deleteItem(index); // Pass index instead of the item
        });

        // Append the new item element to the container
        items_container.append(itemElement);
    });
}

// Add item when add button is clicked
add_button.addEventListener("click", () => {
    addItem();
});

// Initial call to refresh the list
refreshList();
