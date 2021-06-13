document.addEventListener('DOMContentLoaded', function(){
    const sApiLink = "https://jsonplaceholder.typicode.com/users";
    const sTableHeader = "<table class=\"table\"><thead><tr>"+
        "<th id='headerId' data-sort='id' scope=\"col\">id</th>"+
        "<th id='headerName' data-sort='name' scope=\"col\">Full Name</th>"+
        "<th id='headerEmail' data-sort='email' scope=\"col\">Email</th>"+
        "<th id='headerAddress' data-sort='address' data-nestedsort='city' scope=\"col\">City, street, suite</th>"+
        "<th id='headerCompany' data-sort='company' data-nestedsort='name' scope=\"col\">Company Name</th>"+
        "<th id='headerZipcode' data-sort='address' data-nestedsort='zipcode' scope=\"col\">Zipcode</th>"+
        "<th scope=\"col\">Action Buttons</th></tr></thead><tbody>";
    const sTableFooter = "</tbody></table>";
    let currentStatus = [];
    let $wrapper = document.querySelectorAll('.wrapper')[0];
    let $saveButtons = document.querySelectorAll('.save-changes');
    let $cancelButtons = document.querySelectorAll('.cancel-edit');
    let $editButtons = document.querySelectorAll('.edit-user');
    let $removeButtons = document.querySelectorAll('.remove-user');

    //modals
    const $exampleInputName = document.getElementById('exampleInputName');
    const $exampleInputEmail = document.getElementById('exampleInputEmail');
    const $exampleInputCity = document.getElementById('exampleInputCity');
    const $exampleInputStreet = document.getElementById('exampleInputStreet');
    const $exampleInputSuite = document.getElementById('exampleInputSuite');
    const $exampleInputCompanyname = document.getElementById('exampleInputCompanyname');
    const $exampleInputZipcode = document.getElementById('exampleInputZipcode');
    const modalEl = document.getElementById('exampleModal')
    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    const elDataModal = new bootstrap.Modal(document.getElementById('showDataModal'));



    var $headerId = document.getElementById('headerId');
    var $headerName = document.getElementById('headerName');
    var $headerEmail = document.getElementById('headerEmail');
    var $headerAddress = document.getElementById('headerAddress');
    var $headerCompany = document.getElementById('headerCompany');
    var $headerZipcode = document.getElementById('headerZipcode');

    var $userrows = document.querySelectorAll('.user-row');;

    var isSortByIdABC = true;

    function sortTable(column) {
        console.log('Sort Me!', column.dataset.sort)
        if(isSortByIdABC === true)
        {
            currentStatus.sort((a,b) => (a[column.dataset.sort] > b[column.dataset.sort]) ? 1 : ((b[column.dataset.sort] > a[column.dataset.sort]) ? -1 : 0))
        }else{
            currentStatus.sort((a,b) => (a[column.dataset.sort] < b[column.dataset.sort]) ? 1 : ((b[column.dataset.sort] < a[column.dataset.sort]) ? -1 : 0))
        }

        renderTable(currentStatus);
        isSortByIdABC = !isSortByIdABC;
    }

    function sortTableNest(column, nestedEl) {
        console.log('Sort Me!', column.dataset.sort)
        if(isSortByIdABC === true)
        {
            currentStatus.sort((a,b) => (a[column.dataset.sort][column.dataset.nestedsort] > b[column.dataset.sort][column.dataset.nestedsort]) ? 1 : ((b[column.dataset.sort][column.dataset.nestedsort] > a[column.dataset.sort][column.dataset.nestedsort]) ? -1 : 0))
        }else{
            currentStatus.sort((a,b) => (a[column.dataset.sort][column.dataset.nestedsort] < b[column.dataset.sort][column.dataset.nestedsort]) ? 1 : ((b[column.dataset.sort][column.dataset.nestedsort] < a[column.dataset.sort][column.dataset.nestedsort]) ? -1 : 0))
        }

        renderTable(currentStatus);
        isSortByIdABC = !isSortByIdABC;
    }

    function getDataFromApi(sApiLink) {
        return fetch(sApiLink)
                .then(response =>
                        response.json());
    }

    function reAddingListenersToButtons(){
        $saveButtons = document.querySelectorAll('.save-changes');
        $cancelButtons = document.querySelectorAll('.cancel-edit');
        $editButtons = document.querySelectorAll('.edit-user');
        $removeButtons = document.querySelectorAll('.remove-user');

        $userrows = document.querySelectorAll('.user-row');

        $headerId = document.getElementById('headerId');
        $headerName = document.getElementById('headerName');
        $headerEmail = document.getElementById('headerEmail');
        $headerAddress = document.getElementById('headerAddress');
        $headerCompany = document.getElementById('headerCompany');
        $headerZipcode = document.getElementById('headerZipcode');



        for (var i = 0; i < $removeButtons.length; i++) {
            let iUserId = $removeButtons[i].dataset.userid;
            $removeButtons[i].addEventListener("click", function (e) {
                e.stopPropagation();
                removeUser(iUserId);
            });
        }

        for (var i = 0; i < $editButtons.length; i++) {
            let iUserId = $editButtons[i].dataset.userid;
            $editButtons[i].addEventListener("click", function (e) {
                e.stopPropagation();
                editUser(iUserId);
            });
        }

        for (var i = 0; i < $cancelButtons.length; i++) {
            let iUserId = $cancelButtons[i].dataset.userid;
            $cancelButtons[i].addEventListener("click", function (e) {
                e.stopPropagation();
                cancelChangesUser(iUserId);
            });
        }

        for (var i = 0; i < $saveButtons.length; i++) {
            let iUserId = $saveButtons[i].dataset.userid;
            $saveButtons[i].addEventListener("click", function (e) {
                e.stopPropagation();
                saveUser(iUserId);
            });
        }

        for (var i = 0; i < $userrows.length; i++) {
            let iUserId = $userrows[i].dataset.userid;
            $userrows[i].addEventListener("click", function () {
                showDataModal(iUserId);
            });
        }

        $headerId.addEventListener('click', function(){
            sortTable( this );
        });

        $headerName.addEventListener('click', function(){
            sortTable( this );
        });

        $headerEmail.addEventListener('click', function(){
            sortTable( this );
        });

        $headerAddress.addEventListener('click', function(){
            sortTableNest( this );
        });

        $headerCompany.addEventListener('click', function(){
            sortTableNest( this );
        });

        $headerZipcode.addEventListener('click', function(){
            sortTableNest( this );
        });

    }

    function removeUser(iUserId){
        currentStatus.splice(iUserId, 1);
        renderTable(currentStatus);
    }

    function editUser(iUserId){
        currentStatus[iUserId].isEditable = true;
        renderTable(currentStatus);
    }

    function saveUser(iUserId){
        currentStatus[iUserId].name =  document.getElementById(`username-${iUserId}`).value;
        currentStatus[iUserId].email =  document.getElementById(`useremail-${iUserId}`).value;
        currentStatus[iUserId].address.city =  document.getElementById(`usercity-${iUserId}`).value;
        currentStatus[iUserId].address.street =  document.getElementById(`userstreet-${iUserId}`).value;
        currentStatus[iUserId].address.suite =  document.getElementById(`usersuite-${iUserId}`).value;
        currentStatus[iUserId].company.name =  document.getElementById(`usercompanyname-${iUserId}`).value;
        currentStatus[iUserId].address.zipcode =  document.getElementById(`userzipcode-${iUserId}`).value;
        currentStatus[iUserId].isEditable = false;
        renderTable(currentStatus);
    }

    function saveNewUser(){
        let isUniqId = false;
        let nextId = currentStatus.length;
        let objToPush = {};

        while (!isUniqId){
            nextId++;
            isUniqId = true;
            Object.keys(currentStatus).forEach(key => {
                if(Number(currentStatus[key].id) === Number(nextId)){
                    isUniqId = false;
                }
            });
        }

        objToPush = {   id: nextId,
            name: $exampleInputName.value,
            email: $exampleInputEmail.value,
            address: {
                city: $exampleInputCity.value,
                street: $exampleInputStreet.value,
                suite: $exampleInputSuite.value,
                zipcode: $exampleInputZipcode.value,
            },
            company: {
                name: $exampleInputCompanyname.value,
            },
            isEditable: false,
        };

        currentStatus.push(objToPush);
        renderTable(currentStatus);
        myModal.hide();
    }

    function cancelChangesUser(iUserId){
        console.log(iUserId);
        console.log(currentStatus[iUserId].isEditable)
        currentStatus[iUserId].isEditable = false;
        renderTable(currentStatus);
    }

    function showDataModal(iUserId){
        console.log('row - ', iUserId);
        console.log(currentStatus[iUserId]);
        elDataModal.show();
        document.getElementById('showDataModalLabel').innerHTML = currentStatus[iUserId].name + '('+currentStatus[iUserId].username+')<br>' + currentStatus[iUserId].website;
        document.getElementById('showDataModalEmail').innerHTML = currentStatus[iUserId].email + '<br>' + currentStatus[iUserId].phone;
        document.getElementById('showDataModalCity').innerHTML = currentStatus[iUserId].address.city +
            ' (' +currentStatus[iUserId].address.geo.lat+
            ', '+ currentStatus[iUserId].address.geo.lng + ')'+
            '<br>' + currentStatus[iUserId].address.street + ' ' + currentStatus[iUserId].address.suite + ' <br>Zip: ' + currentStatus[iUserId].address.zipcode;
        document.getElementById('showDataModalCompany').innerHTML = '<li class="list-group-item">' + currentStatus[iUserId].company.name + '</li>'+
            '<li class="list-group-item">' + currentStatus[iUserId].company.catchPhrase + '</li>'+
            '<li class="list-group-item">' + currentStatus[iUserId].company.bs + '</li>';
    }

    function renderTable(oUsersData){
        let sConstructLine = sTableHeader;

        oUsersData.forEach((oUser, idx) => {
            if(oUser.isEditable === true){
                sConstructLine +=   `<tr>`+
                    `<th scope="row">${oUser.id}</th>`+
                        `<td><input id="username-${idx}" class="form-control" type="text" value="${oUser.name}"></td>`+
                        `<td><input id="useremail-${idx}" class="form-control" type="text" value="${oUser.email}"></td>`+
                        `<td>
                        <input id="usercity-${idx}" class="form-control" type="text" value="${oUser.address.city}">
                        <input id="userstreet-${idx}" class="form-control" type="text" value="${oUser.address.street}">
                        <input id="usersuite-${idx}" class="form-control" type="text" value="${oUser.address.suite}">
                        </td>`+
                        `<td><input id="usercompanyname-${idx}" class="form-control" type="text" value="${oUser.company.name}"></td>`+
                        `<td><input id="userzipcode-${idx}" class="form-control" type="text" value="${oUser.address.zipcode}"></td>`+
                        `<td>
                             <button data-userid="${idx}" type="button" class="btn btn-success save-changes">Save</button>
                             <button data-userid="${idx}" type="button" class="btn btn-dark cancel-edit">Cancel</button>
                             <button data-userid="${idx}" type="button" class="btn btn-primary edit-user visually-hidden">Edit</button>
                             <button data-userid="${idx}" type="button" class="btn btn-danger remove-user visually-hidden">Remove</button>
                        </td>`+
                    `</tr>`;
            }else{
                sConstructLine +=   `<tr data-userid="${idx}" class="user-row">`+
                    `<th scope="row">${oUser.id}</th>`+
                    `<td>${oUser.name}</td>`+
                    `<td>${oUser.email}</td>`+
                    `<td>${oUser.address.city} ${oUser.address.street} ${oUser.address.suite}</td>`+
                    `<td>${oUser.company.name}</td>`+
                    `<td>${oUser.address.zipcode}</td>`+
                    `<td>
                         <button data-userid="${idx}" type="button" class="btn btn-success save-changes visually-hidden">Save</button>
                         <button data-userid="${idx}" type="button" class="btn btn-dark cancel-edit visually-hidden">Cancel</button>
                         <button data-userid="${idx}" type="button" class="btn btn-primary edit-user">Edit</button>
                         <button data-userid="${idx}" type="button" class="btn btn-danger remove-user">Remove</button>
                     </td>`+
                    `</tr>`;
            }
        });

        sConstructLine += sTableFooter;
        $wrapper.innerHTML = sConstructLine;
        reAddingListenersToButtons();
        currentStatus = oUsersData;
        console.log(currentStatus);
    }


    modalEl.addEventListener('hidden.bs.modal', function (event) {
        $exampleInputName.value = '';
        $exampleInputEmail.value = '';
        $exampleInputCity.value = '';
        $exampleInputStreet.value = '';
        $exampleInputSuite.value = '';
        $exampleInputCompanyname.value = '';
        $exampleInputZipcode.value = '';
    })

    document.getElementById('saveNewUser').addEventListener('click', function (e) {
        saveNewUser();
    })

    document.getElementById('close-modal').addEventListener('click', function () {
        myModal.hide();
    })
    document.getElementById('showDataModal-close-modal').addEventListener('click', function () {
        elDataModal.hide();
    })




    //first start
    getDataFromApi(sApiLink).then( usersData => {
        Object.keys(usersData).forEach(key => {
            usersData[key].isEditable = false;
        });
        renderTable(usersData);

    });




});



