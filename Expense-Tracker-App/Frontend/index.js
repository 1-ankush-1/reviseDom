async function onloadData() {
    try {
        //get data
        const expenses = await axios.get("http://localhost:3000/expense");
        console.log(expenses.data.data);

        //check if data is empty
        if (expenses.data.data.length <= 0) {
            return;
        }
        //setting data in localstorage
        localStorage.setItem("expenses", JSON.stringify(expenses.data.data));

        //adding data in table
        for (let e of expenses.data.data) {
            createRow(e)
        }
    } catch (err) {
        console.log(err);
    }
}


//onload - fetch from server
window.addEventListener("DOMContentLoaded", () => {
    onloadData();
})


function addExpense(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const expense = {};

    //put all data in data object
    for (let [name, value] of formData) {
        expense[name] = value;
    }

    axios.post("http://localhost:3000/expense/add", expense).then((res) => {
        //when get response from backend add it in localstorage
        if (Object.keys(res?.data.data).length > 0) {
            //add the new expense in array
            let expenses = JSON.parse(localStorage.getItem("expenses")) ?? [];
            expenses.push(res?.data.data);

            //add the object in localstorage
            localStorage.setItem("expenses", JSON.stringify(expenses));

            //call method
            createRow(res?.data.data);

            //reset the input field data
            form.reset();
        }
    }).catch(err => console.log(err));
}


function createRow(data) {
    //row 
    const row = document.createElement("tr");
    row.className = "bg-light"

    //td
    const cato = document.createElement("td");
    cato.textContent = data.catogary;
    cato.setAttribute("style", "--bs-table-bg-type: white !important;");
    const desc = document.createElement("td");
    desc.textContent = data.desc;
    desc.setAttribute("style", "--bs-table-bg-type: white !important;");
    const amt = document.createElement("td");
    amt.textContent = data.amt;
    amt.setAttribute("style", "--bs-table-bg-type: white !important;");
    //buttons container
    let operations = document.createElement('td');
    operations.setAttribute("style", "--bs-table-bg-type: white !important;");
    let btndel = document.createElement('button');
    btndel.className = "btn btn-danger delete";
    btndel.textContent = "Delete";
    let editbtn = document.createElement("button");
    editbtn.className = "btn btn-primary me-2 edit"
    editbtn.textContent = "Edit";
    //add button in one container
    operations.appendChild(editbtn);
    operations.appendChild(btndel);

    //adding btn and td in row
    row.appendChild(cato);
    row.appendChild(desc);
    row.appendChild(amt);
    row.append(operations);
    const tbody = document.getElementById("tablebody");
    row.id = data.id;
    //add row in body
    tbody.appendChild(row);
}


function deleteNEditExpense(e) {
    e.preventDefault();

    //check if any class contains delete
    if (e.target.classList.contains("delete")) {
        let row = e.target.parentElement.parentElement;
        removeChild(row)
    }

    //check if any class contains edit
    if (e.target.classList.contains("edit")) {
        //get row and all celll data
        let row = e.target.parentElement.parentElement;
        let catogary = row.cells[0].innerText;
        let desc = row.cells[1].innerText;
        let amt = row.cells[2].innerText;
        removeChild(row)
        //putting values in input fields
        document.getElementById('catogary').value = catogary;
        document.getElementById('amt').value = amt;
        document.getElementById('desc').value = desc;
    }
}

function removeChild(row) {
    //delete item from server and localstorage
    axios.delete(`http://localhost:3000/expense/delete/${row.id}`).then((res) => {
        //when item get deleted
        if (res.status === 200) {
            tbody.removeChild(row);

            //get expense from localstorage
            let expenses = JSON.parse(localStorage.getItem("expenses"));

            //filter data in localstorage
            const result = expenses.filter((e) => {
                return e.id !== parseInt(row.id)
            })

            //set the data again
            localStorage.setItem("expenses", JSON.stringify(result));
        }
    }).catch(err => console.log(err));
}

//variables
const tbody = document.getElementById("tablebody");
const form = document.getElementById("MainForm");

//event listeners
tbody.addEventListener("click", deleteNEditExpense);
form.addEventListener("submit", addExpense);