const uri = 'api/users';
getUsers();

//
// UI
//

function onFormSubmit() {
    if (validate()) {
        let formData = readFormData();

        if (document.getElementById("user-id").value == 0)
            addUser(formData);
        else
            updateUser(formData);

        onFormReset();
    }
}

function onFormReset() {
    document.getElementById("user-id").value = 0;
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("email").value = "";

    document.getElementById("firstname-validation-error").classList.add('hide');
    document.getElementById("email-validation-error").classList.add('hide');
    document.getElementById("age-validation-error").classList.add('hide');
}

function onEdit(td) {
    let selectedRow = td.parentElement.parentElement;
    document.getElementById("user-id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("first-name").value = selectedRow.cells[1].childNodes[0].innerHTML;
    document.getElementById("last-name").value = selectedRow.cells[2].innerHTML;
    document.getElementById("age").value = selectedRow.cells[3].innerHTML;
    document.getElementById("email").value = selectedRow.cells[4].innerHTML;
}

function readFormData() {
    let formData = {};
    formData["ID"] = document.getElementById("user-id").value;
    formData["FirstName"] = document.getElementById("first-name").value;
    formData["LastName"] = document.getElementById("last-name").value;
    formData["Age"] = document.getElementById("age").value;
    formData["Email"] = document.getElementById("email").value;
    return formData;
}

function insertRecord(data) {
    let table = document.getElementById("users-table-body");
    let newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.ID;
    cell2 = newRow.insertCell(1);

    let editUserLink = document.createElement("a");
    editUserLink.setAttribute("href", "#");
    editUserLink.setAttribute("onclick", "onEdit(this)");
    editUserLink.innerHTML = data.FirstName;
    cell2.appendChild(editUserLink);

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.LastName;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.Age;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.Email;
    cell6 = newRow.insertCell(5);

    let deleteUserLink = document.createElement("a");
    deleteUserLink.setAttribute("href", "#");
    deleteUserLink.setAttribute("onclick", `deleteUser(${data.ID})`);
    deleteUserLink.innerHTML = "Удалить";
    cell6.appendChild(deleteUserLink);
}

function updateRecord(data) {
    let tableUsersElem = document.getElementById("users-table-body");

    for (let i = 0; i < tableUsersElem.children.length; i++) {
        if (tableUsersElem.children[i].children[0].innerText == data.ID) {
            let userRowElem = tableUsersElem.children[i];
            userRowElem.children[1].children[0].innerText = data.FirstName;
            userRowElem.children[2].innerText = data.LastName;
            userRowElem.children[3].innerText = data.Age;
            userRowElem.children[4].innerText = data.Email;
            break;
        }
    }
}

function deleteRecord(id) {
    let tableUsersElem = document.getElementById("users-table-body");

    for (let i = 0; i < tableUsersElem.children.length; i++) {
        if (tableUsersElem.children[i].children[0].innerText == id) {
            tableUsersElem.children[i].remove();
            break;
        }
    }
}

//
// Fields validation
//

let firstNameInput = document.getElementById('first-name');
firstNameInput.addEventListener('keydown', function (e) {
    if (e.key.match(/[0-9]/)) return e.preventDefault();
});

let lastNameInput = document.getElementById('last-name');
lastNameInput.addEventListener('keydown', function (e) {
    if (e.key.match(/[0-9]/)) return e.preventDefault();
});

const isValidEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Accepted value.
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }

                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            }
            else if (this.hasOwnProperty("oldValue")) {
                // Rejected value: restore the previous one.
                this.classList.add("input-error");
                //this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
            else {
                // Rejected value: nothing to restore.
                this.value = "";
            }
        });
    });
}

setInputFilter(document.getElementById("age"), function (value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
}, "Only digits and '.' are allowed");

function validate() {
    isValid = true;

    let firstNameValue = document.getElementById("first-name").value;
    let firstNameClassList = document.getElementById("firstname-validation-error").classList;

    if (firstNameValue == "") {
        isValid = false;
        firstNameClassList.remove("hide");
    } else {
        if (!firstNameClassList.contains("hide"))
            firstNameClassList.add("hide");
    }

    let emailValue = document.getElementById("email").value;
    let emailClassList = document.getElementById("email-validation-error").classList;

    if (emailValue == "" || !isValidEmail(emailValue)) {
        isValid = false;
        emailClassList.remove("hide");
    } else {
        if (!emailClassList.contains("hide"))
            emailClassList.add("hide");
    }

    let ageValue = document.getElementById("age").value;
    let ageClassList = document.getElementById("age-validation-error").classList;

    if (ageValue == "" || ageValue < 0 || ageValue > 150) {
        isValid = false;
        ageClassList.remove("hide");
    } else {
        if (!ageClassList.contains("hide"))
            ageClassList.add("hide");
    }

    return isValid;
}

//
// CRUD
//

function addUser(formData) {
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw `HTTP:${response.status}`;
            }
        })
        .then((user) => {
            insertRecord(user);
        })
        .catch(error => console.error('Unable to add user.', error));
}

function getUsers() {
    fetch(uri)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                document.getElementById('loading-row').children[0].innerText = 'Error! Unable to get users.';
                throw `HTTP:${response.status}`;
            }
        })
        .then(users => {
            document.getElementById('loading-row').remove();

            users.forEach(user => {
                insertRecord(user);
            });
        })
        .catch(error => {
            console.error('Error! Unable to get users.', error)
        });
}

function updateUser(formData) {
    fetch(`${uri}/${formData.ID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw `HTTP:${response.status}`;
            }
        })
        .then((user) => {
            console.log(`User with id=${formData.ID} updated.`);
            updateRecord(user);
        })
        .catch(error => console.error('Unable to update user.', error));
}

function deleteUser(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                return;
            } else {
                throw `HTTP:${response.status}`;
            }
        })
        .then(() => {
            console.log(`User with id=${id} deleted.`);
            deleteRecord(id);
        })
        .catch(error => {
            console.error('Unable to delete user.', error);
        });
}