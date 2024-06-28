const addButton=document.getElementById("add-btn");
const tableItems=document.querySelector(".tableItems");

function addItem(){
    let name=document.getElementById("input-btn-name").value;
    let category=document.getElementById("input-btn-category").value;
    let year=document.getElementById("input-btn-year").value;

 if(name==='' || category==='' || year==='' || category===undefined || year<1900 || year >2024 ){
    document.getElementById("demo").innerHTML="please fill all fields with correct input";

 }else{
    document.getElementById("demo").innerHTML='';
    let row=document.createElement("tr");
   
    /*or insertRow() =>not working due to undex*/
    let cellno=document.createElement("td");
    let cellName=document.createElement("td");
    let cellCategory=document.createElement("td");
    let cellYear=document.createElement("td");
    let cellEdit=document.createElement("td");
    let cellDelete=document.createElement("td");

    cellno.textContent=tableItems.rows.length +1;
    cellName.textContent=name;
    cellCategory.textContent=category;
    cellYear.textContent=year;
    cellEdit.innerHTML='<button class="edit-btn">edit</button>';
    cellDelete.innerHTML='<button class="delete-btn">delete</button>';

    row.appendChild(cellno);
    row.appendChild(cellName);
    row.appendChild(cellCategory);
    row.appendChild(cellYear);
    row.appendChild(cellEdit);
    row.appendChild(cellDelete);

    tableItems.appendChild(row);
 
document.getElementById("input-btn-name").value="";
document.getElementById("input-btn-category").value="";
document.getElementById("input-btn-year").value="";
updateCellNo();
 saveData();
}}

tableItems.addEventListener("click",function(e){
    if(e.target.classList.contains("edit-btn")){/*has info about trigger*/
       /* let row=e.target.parentElement.parentElement;*/
       let row=e.target.closest("tr");
        
       let rowno=row.cells[0].textContent;
        let name=row.cells[1].textContent;
        let category=row.cells[2].textcontent;
        let year=row.cells[3].textcontent;

        document.getElementById("input-btn-name").value=name;
        document.getElementById("input-btn-category").value=category;
        document.getElementById("input-btn-year").value=year;

        row.remove();
updateCellNo();
        saveData();
    }else if(e.target.classList.contains("delete-btn")){
      //* let row= e.target.parentElement.parentElement;/*e.target is the DOM that triggered the event which is delete button*/
      let row=e.target.closest("tr"); 
      let rowNo=row.rowIndex;
      row.remove();
     updateCellNo();
       saveData();
    }
});

document.getElementById("search-btn").addEventListener("input",function(){
    let input=this.value.toLowerCase();
    let rows=tableItems.getElementsByTagName("tr");

    Array.from(tableItems.rows).forEach(function(row) {/*convert to array and then use the for loop*/
        let cellName=row.cells[1].textContent.toLowerCase();
        if(cellName.includes(input)){
            row.style.display="";
        }else{
            row.style.display="none";
                }     
});});

function updateCellNo() {
    let rows=document.getElementsByClassName("tableItems")[0].rows;
    for(let i=0;i<rows.length;i++){
    rows[i].cells[0].textContent=i+1;
    }
}

function saveData(){
    localStorage.setItem("data",tableItems.innerHTML);
}

function showTable(){
    tableItems.innerHTML=localStorage.getItem("data");
    updatecellNo();
}
showTable();
