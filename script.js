const items_container = document.getElementById("items");
const item_template = document.getElementById("list-item-template")
const add_button = document.getElementById("add-button")

let items = getItems();

function getItems() {
    const value = localStorage.getItem("todo") || "[]";
    return JSON.parse(value);
}

function setItems(items){
    const ItemsJSON = JSON.stringify(items);
    localStorage.setItem("todo", ItemsJSON)
}

function updateItems(item, key, value){
    item[key] = value;
    setItems(items);
    refreshList();
}

function addItem(){
    items.unshift({
        description: "",
        completed: false
    });

    setItems(items);
    refreshList();
}

function refreshList() {
    
    items.sort((a,b)=>{
        if(a.completed){
            return 1;
        }
        if(b.completed){
            return -1;
        }
    })

    items_container.innerHTML = "";
    console.log("ITEMS", items)
    items.forEach((item, key) => {
        const itemElement = item_template.content.cloneNode(true);
        const descriptionInput = itemElement.querySelector(".item-description")
        const completedInput = itemElement.querySelector(".item-completed");

        descriptionInput.value = item.description;
        completedInput.checked = item.completed;

        descriptionInput.addEventListener("change", ()=>{
            updateItems(item, "description", descriptionInput.value);
        })

        completedInput.addEventListener("change", ()=>{
            console.log(completedInput)
            updateItems(item, "completed", completedInput.checked);
        })

        items_container.append(itemElement)
    })
}

add_button.addEventListener("click", () => {
    addItem();
})

refreshList();