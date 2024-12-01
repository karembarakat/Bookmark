var siteUrl = document.getElementById('siteUrl');
var siteName = document.getElementById('sitename');
var submit = document.getElementById('btn');

var nameRegex = /^.{3,}$/; // At least 3 characters
var urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/.*)?$/; // Valid URL

var bookMarkers = [];

if (localStorage.getItem('bigBoxs') !== null) {
    bookMarkers = JSON.parse(localStorage.getItem('bigBoxs'));
    showBook(bookMarkers);
}



// Real-time validation for site name
siteName.addEventListener('input', function () {
    if (nameRegex.test(siteName.value)) {
        siteName.classList.remove('is-invalid');
        siteName.classList.add('is-valid');
    } else {
        siteName.classList.remove('is-valid');
        siteName.classList.add('is-invalid');
    }
});

function createBook() {
    // Validate site name
    if (!nameRegex.test(siteName.value)) {
        siteName.classList.add('is-invalid');
        showModal('Site name must be at least 3 characters long.');
        return;
    }

    if (!urlRegex.test(siteUrl.value)) {
        siteUrl.classList.add('is-invalid');
        showModal('Please enter a valid site URL.');
        return;
    }
    var bigBox = {
        name: siteName.value,
        url: siteUrl.value.startsWith('http') ? siteUrl.value : 'http://' + siteUrl.value, // Ensure protocol
    };
    bookMarkers.push(bigBox);
    localStorage.setItem('bigBoxs', JSON.stringify(bookMarkers));
    cleanForm();
    showBook(bookMarkers);
}


    siteUrl.addEventListener('input', function () {
        if (urlRegex.test(siteUrl.value)) {
            siteUrl.classList.remove('is-invalid');
            siteUrl.classList.add('is-valid');
        } else {
            siteUrl.classList.remove('is-valid');
            siteUrl.classList.add('is-invalid');
        }
    });



function showBook(bookMarkers) {
    var body = document.getElementById('tableContent');
    bigbox = '';
    for (var i = 0; i < bookMarkers.length; i++) {

        bigbox += `<tr>
                        <td>${i+1}</td>
                        <td>${bookMarkers[i].name}</td>
                        <td>
                            <button class="btn btn-visit" data-index="${i}">
                                <i class="fa-solid fa-eye pe-2"></i>Visit
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-delete pe-2" data-index="${i}">
                                <i class="fa-solid fa-trash-can"></i>
                                Delete
                            </button>
                        </td>
                    </tr>`
    }
    body.innerHTML = bigbox;
    updateBookmark();
    visitDataBookMakers();
}


function updateBookmark() {

    var deleteBtn = document.querySelectorAll('.btn-delete');


    for (var i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", function () {
            var index = this.getAttribute('data-index');
            deleteDataBookMarkers(index);
        });
    }
}


function deleteDataBookMarkers(index) {


    bookMarkers.splice(index, 1);
    localStorage.setItem('bigBoxs', JSON.stringify(bookMarkers));
    showBook(bookMarkers);
}

function visitDataBookMakers() {
    var visitBtn = document.querySelectorAll('.btn-visit');
    for (var i = 0; i < visitBtn.length; i++) {
        visitBtn[i].addEventListener("click", function () {
            var index = this.getAttribute('data-index');
            visitSite(index);
        });
    }
}

function visitSite(index) {
    var url = bookMarkers[index].url;
    
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }
    window.open(url, '_blank');
}






function cleanForm() {
    siteName.value = '';
    siteName.classList.remove('is-valid', 'is-invalid');
    siteUrl.value = '';
    siteUrl.classList.remove('is-valid', 'is-invalid');
}
function showModal(message) {
    // Set the modal message
    document.getElementById('modalMessage').innerText = message;

    // Show the Bootstrap modal
    var modal = new bootstrap.Modal(document.getElementById('validationModal'));
    modal.show();
}
