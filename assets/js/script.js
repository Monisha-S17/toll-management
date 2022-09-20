// vechile type lis
const vehicleTypeList = ["Car/Jeep/Van", "LCV", "Truck/Bus", "Heavy vechile"];
const store = {
  vehicles: [],
  tollList: [],
};

let leftNavebar = document.getElementById("navSearchBar");
let vehicleList = document.getElementsByClassName("vehicle-list")[0];
const searchBox = document.getElementById("search-box");
const addNewVeichleEntry = document.getElementById("vehicle-add-template");
const addNewTollEntry = document.getElementById("toll-add-template");//add new toll details popup
const pageTitle = document.getElementById("page-title");
const backTologButton = document.getElementById("back-to-home");

const tollDetailButton = document.getElementById("toll-detail-button");
displayvehicleEntry();


//display the vechile entries
function displayvehicleEntry() {
  let vechileEntry = store.vehicles;
  let tollNamelist = store.tollList
  leftNavebar.innerHTML = "";
  let list = `
  
    <h5 id="page-title">Toll entries/Vehicle entries</h5>
   
    <div class="filter-icon">
        <button onclick="filterValue()">
          <i class="fas fa-filter"></i>
        </button>
        <div id='dropdown'>
        <ul><li onclick="displayvehicleEntry()">All</li>`
  // if(tollNamelist.tollName !== '' || undefined){
  tollNamelist.forEach((e) => {
    list += `<li onclick='filterList("${e.tollName}")'>${e.tollName}</li>`
  }
  );
  // }

  // <li>${tollNamelist}</li>
  list += `</ul>
        </div>
    </div>
    
    <div class="search-bar"> 
      <i class="fas fa-search"></i>
      <div id="search-box">
      <input type="text" placeholder="Search Vehicle" name="search" id="inputVehicle" onkeyup="filterVehicle()" >
      </div>
    </div> `;
  leftNavebar.innerHTML += list;
  vehicleList.innerHTML = "";
  backTologButton.style.display = "none";
  tollDetailButton.style.display = "block";
  vehicleDisplayFormat(vechileEntry)

}
function filterList(value) {
  dropdown.style.display = 'none';
  let storedVehicleDetails = store.vehicles;
  // let result = '';
  let result = storedVehicleDetails.filter((e) => {
    return e.tollName.toUpperCase() === value.toUpperCase();
  });
  vehicleDisplayFormat(result);
}
function vehicleDisplayFormat(vechileEntry) {
  console.log(vechileEntry.length);
  vehicleList.innerHTML = "";
  let tr = `<thead>
        <th>Vehicle Type</th>
        <th>Vehicle Number</th>
        <th>Date/Time</th>
        <th>Toll Name</th>
        <th>Tariff</th>
    </thead>`;
  for (i = 0; i < vechileEntry.length; i++) {
    tr += `<tr><td> ${vehicleTypeList[vechileEntry[i].type]}</td>
                    <td>${vechileEntry[i].vehicleNumber}</td>
                    <td>${vechileEntry[i].date}</td>
                    <td>${vechileEntry[i].tollName}</td>
                    <td>${vechileEntry[i].tariff}</td>

            </tr>`;
    // vehicleList.innerHTML += tr;
  }

  return vehicleList.innerHTML += tr;
}

function filterVehicle() {
  let inputVehicle = document.getElementById("inputVehicle").value;
  let storedVehicle = store.vehicles;
  let result;
  if (inputVehicle !== '') {
    result = storedVehicle.filter((e) => {
      return e.vehicleNumber.toUpperCase() === inputVehicle.toUpperCase();
    });
  } else {
    result = storedVehicle;
  }
  vehicleDisplayFormat(result);
}

//filter the toll list
function filterToll() {
  let inputTollName = document.getElementById("inputTollName").value;
  let storedTollName = store.tollList;
  let result;
  if (inputTollName !== '') {
    result = storedTollName.filter((e) => {
      return e.tollName.toUpperCase() === inputTollName.toUpperCase();
    });
  } else {
    result = storedTollName;
  }
  tollDisplayFormat(result)
  // console.log(storedTollName);

}


// add toll details
function addToll() {
  document.getElementById("tollModel").reset();
  addNewTollEntry.style.display = "block";
  addNewVeichleEntry.style.display = "none";
  addVeichleEntry();
}
//filter list dropdown
function filterValue() {
  let id = (id) => document.getElementById(id);
  let classes = (classes) => document.getElementsByClassName(classes);
  let inputVehicle = id("inputVehicle").value;
  let list = store.vehicles;
  let dropdown = id('dropdown')
  dropdown.style.display = 'block';
  for (let i = 0; i < list.length; i++) {
    // console.log(i)
  }
}

function addVeichleEntry() {
  let list = `<div>
                <select class="vehicle" onchange='findDuplicate()'> 
                  <option value=''>Select the option</option>`;
  vehicleTypeList.forEach((e, i) => {
    list += `<option value=${i}>${e}</oprion>`;
  });
  list += `</select> 

                <input type="number" id="vehicle-single-cost" class="vehicle-single-cost" placeholder="Single Journy"/>
                <input type="number" id="vehicle-return-cost" class="vehicle-return-cost" placeholder="Return Journy"/>
                


              </div>`;
  let vechileOptionList = document.getElementsByClassName("vehicle-charge-list")[0];
  let result = "";
  for (let i = 0; i < 4; i++) {
    // console.log(i);
    result += list;
  }
  vechileOptionList.innerHTML = result;
}
// function checkVehicleType(){
//   let id = (id) => document.getElementById(id);
//   let classes = (classes) => document.getElementsByClassName(classes);
//  let vehicletype =[];
//  for(let i= 0; i<4; i++){
//   let vehicle = classes("vehicle")[i].value; 
//   vehicletype.push(vehicle);

//  }

// }


function addTollDetails() {

  let id = (id) => document.getElementById(id);
  let classes = (classes) => document.getElementsByClassName(classes);
  let tollNameValue = id("toll-name");
  let tollName = id("toll-name").value;
  let valid = true;
  let validation = true;
  const vehicles = [];

    if(tollName === ''){
      tollNameValue.style.border = '1px solid #ff0000';
      validation = false;
  }else{
    tollNameValue.style.border = '';
    validation = true;
  }

    for (let i = 0; i < vehicleTypeList.length; i++) {
      let vehicle = classes("vehicle")[i];
      let sigleTimeCost = '';
      let returnTimeCost = ''

      if(vehicle.value===''){

        vehicle.style.border = '1px solid #ff0000';
        valid = false

      }else{
        vehicle.style.border = '';   
        valid = false;
      }
      
        sigleTimeCost = document.getElementsByClassName("vehicle-single-cost")[i];
        returnTimeCost = document.getElementsByClassName("vehicle-return-cost")[i];
      if(sigleTimeCost.value === ''){
        sigleTimeCost.style.border = '1px solid #ff0000';
        valid = false
      }else{
        sigleTimeCost.style.border = '';
        valid = true;
      }

      if(returnTimeCost.value === ''){
        returnTimeCost.style.border = '1px solid #ff0000';
        valid = false;

      }else{
        returnTimeCost.style.border = '';  
        valid = true;
      

      vehicles.push({
        vehicles: vehicle.value,
        singleCost: sigleTimeCost.value,
        returnCost: returnTimeCost.value,
      });
      }
      // console.log(vehicles);
    }
    if(valid && validation){
    var addTollinform = {
      tollName,
      vehicles,
    };
    // console.log(addTollinform);
    addNewTollEntry.style.display = "none";
    store.tollList.push(addTollinform);

    console.log(store.tollList);
    tollDetails(addTollinform);
    }
  

}


// add vehicle popup open
function addNewVehicle() {
  document.getElementById('vehicleModal').reset();
  // errormsg.style.display ="none;
  addNewVeichleEntry.style.display = "block";
  addNewTollEntry.style.display = "none";

  let tollNamelist = document.getElementById("toll-namelist");
  tollNamelist.innerHTML='';
  let tollLists = ``;
console.log(store);
  // console.log(tollList);
  // console.log(store.tollList);
  store.tollList.forEach((e, i) => {
    console.log(e)
    
    tollLists += `<option value='${e.tollName}'>${e.tollName}</option>`;
    // console.log(tollList);
  });
  tollNamelist.innerHTML += tollLists;
}

function subtractOneHours() {
  const currentDate = new Date();
  return currentDate.setHours(currentDate.getHours() - 1);
}

//check the Vehicle Exist or not before an hour

function isVehicleCrossedBeforeHour() {
  const vNumber = document.getElementById("vehicle-number").value;
  const isExist = store.vehicles.find(
    (e) => e.vehicleNumber === vNumber && e.date > subtractOneHours()
  );
  if (isExist) {
    costInput("returnCost");
  } else {
    costInput("singleCost");
  }
}

//Amount auto calculation
function costInput(method = "singleCost") {
  let tariff = document.getElementById("tariff");
  let tollName = document.getElementById("toll-namelist");
  let vehicleType = document.getElementById("vehicle-type");
 

  if (tollName.value === "") {
    
    return false;
  }

  if (vehicleType.value === "") {
   
    return false;
  }

  store.tollList.forEach((e) => {
    if (tollName.value === e.tollName) {
      e.vehicles.forEach((n) => {
        if (vehicleType.value === n.vehicles) {
          tariff.value = n[method];
        }
      });
    }
  });
}

// add vehicle popup close
function vehicleAddTemplateClose() {
  addNewVeichleEntry.style.display = "none";
  addNewTollEntry.style.display = "none";
}


//add vehicle
function addVehicle() {
  if (!vehicleValidation()) {
    return false;
  }
  let id = (id) => document.getElementById(id);
  let classes = (classes) => document.getElementsByClassName(classes);

  const type = id("vehicle-type").value;
  const vehicleNumber = id("vehicle-number").value;
  const tariff = id("tariff").value;
  const tollName = id("toll-name").value;
  const vehileDetails = {
    type,
    vehicleNumber,
    tariff,
    tollName,
    date: new Date(),
  };

  store.vehicles.push(vehileDetails);
  addNewVeichleEntry.style.display = "none";
  displayvehicleEntry();

}

// vehicle validation
function vehicleValidation() {
  let id = (id) => document.getElementById(id);

  let classes = (classes) => document.getElementsByClassName(classes);

  const vehicleType = id("vehicle-type").value;
  const vehicleNumber = id("vehicle-number").value;
  const tariff = id("tariff").value;
  const tollName = id("toll-namelist").value;
  let error = classes("error");
  let errorStatus = true;
  if (tollName === '') {
    error[0].style.display = 'block';
    errorStatus = false;
  } else {
    error[0].style.display = 'none';
    errorStatus = true;
  }
  if (vehicleType === '') {
    error[1].style.display = 'block';
    errorStatus = false;
  } else {
    error[1].style.display = 'none';
    errorStatus = true;
  }if(vehicleNumber === ''){
    error[2].style.display = 'block';
    errorStatus = false;
  }else{
    error[2].style.display = 'none';
    errorStatus = true;
  }
  return errorStatus;
}


//display vehicle Entry


//display toll Entry
function tollDetails() {
  const toll = store.tollList;
  // console.log(toll);
  leftNavebar.innerHTML = "";
  leftNavebar.innerHTML = `
    <h5 id="page-title">Tollgate List</h5>
    <div class="search-bar"> 
      <i class="fas fa-search"></i>
      <div id="search-box">
      <input type="text" placeholder="Search a toll" name="search" id="inputTollName" onkeyup="filterToll()" >
      </div>
    </div> `;
  backTologButton.style.display = "block";
  tollDetailButton.style.display = "none";
  tollDisplayFormat(toll);
}

//Toll display format
function tollDisplayFormat(toll) {
  vehicleList.innerHTML = '';
  let tr = `<thead>
        <th>Toll Name</th>
        <th>Car/jeep/van</th>
        <th>Lcv</th>
        <th>Truck/bus</th>
        <th>heavy vechile</th>
    </thead><tr>`;
  for (let i = 0; i < toll.length; i++) {
    tr += "<tr><td>" + toll[i].tollName + "</td>";

    for (let j = 0; j < 4; j++) {
      const vehicles = toll[i].vehicles[j].vehicles;
      let singleCost = "", returnCost = "";

      // singleCost = toll[i].vehicles[j]?.singleCost;
      // returnCost = toll[i].vehicles[j]?.returnCost;
      // tr += `<td> ${singleCost}/${returnCost}</td>`;
      
      if (vehicles !== '') {
        singleCost = toll[i].vehicles[vehicles].singleCost;
        returnCost = toll[i].vehicles[vehicles].returnCost;
      }

      if (vehicles == 0) {
        tr += `<td> ${singleCost}/${returnCost}</td>`;
      } else if (vehicles == 1) {
        tr += `<td> ${singleCost}/${returnCost}</td>`;
      } else if (vehicles == 2) {
        tr += `<td> ${singleCost}/${returnCost}</td>`;
      } else if (vehicles == 3) {
        tr += `<td> ${singleCost}/${returnCost}</td>`;
      } else {
        tr += `<td></td>`;
      }
    }
    tr += "</tr>";

    // vehicleList.innerHTML += tr;
  }
  vehicleList.innerHTML += tr;

}

//add toll details
function vehicleDetail() {
  displayvehicleEntry(store.vehicles);
}

function findDuplicate(){
  let vehicleList;
  let vehicle = [];
  let vehicleType;
  let result
  for(let i=0; i<4; i++ ){
    vehicleType = document.getElementsByClassName('vehicle')[i].value;
    
  if(i <1){
      vehicle.push(vehicleType);

    }else if(i === 1 && vehicle[0] !== vehicleType){
      vehicle.push(vehicleType);

    }else if(i === 2 && vehicle[0] !== vehicleType && vehicle[1] !== vehicleType ){
      vehicle.push(vehicleType);

    }else if(i === 3 && vehicle[0] !== vehicleType && vehicle[1] !== vehicleType && vehicle[2] !== vehicleType){
      vehicle.push(vehicleType);

    }
    else{
      document.getElementsByClassName('vehicle')[i].selectedIndex = 0;
    }
    
   

  }
  
 

}
