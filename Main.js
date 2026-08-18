// =========================================
// JOB APPLICATION TRACKER
// MAIN JAVASCRIPT
// =========================================


// =========================================
// GET HTML ELEMENTS
// =========================================

const openFormBtn = document.getElementById("openFormBtn");
const emptyAddBtn = document.getElementById("emptyAddBtn");

const formSection = document.getElementById("formSection");
const closeFormBtn = document.getElementById("closeFormBtn");
const cancelBtn = document.getElementById("cancelBtn");

const applicationForm = document.getElementById("applicationForm");

const applicationsList = document.getElementById("applicationsList");
const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");

const filterButtons = document.querySelectorAll(".filter-btn");


// Dashboard
const totalCount = document.getElementById("totalCount");
const appliedCount = document.getElementById("appliedCount");
const interviewCount = document.getElementById("interviewCount");
const selectedCount = document.getElementById("selectedCount");

const applicationSubtitle =
    document.getElementById("applicationSubtitle");


// =========================================
// EDIT MODAL ELEMENTS
// =========================================

const editModal = document.getElementById("editModal");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const closeEditBtn =
    document.getElementById("closeEditBtn");

const editForm =
    document.getElementById("editForm");

const editId =
    document.getElementById("editId");

const editCompany =
    document.getElementById("editCompany");

const editRole =
    document.getElementById("editRole");

const editLocation =
    document.getElementById("editLocation");

const editJobType =
    document.getElementById("editJobType");

const editDate =
    document.getElementById("editDate");

const editStatus =
    document.getElementById("editStatus");

const editLink =
    document.getElementById("editLink");

const editNotes =
    document.getElementById("editNotes");


// =========================================
// APPLICATION DATA
// =========================================

let applications =
    JSON.parse(localStorage.getItem("jobApplications")) || [];

let currentFilter = "All";


// =========================================
// SHOW ADD FORM
// =========================================

function showForm() {

    formSection.classList.add("show");

    formSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// =========================================
// HIDE ADD FORM
// =========================================

function hideForm() {

    formSection.classList.remove("show");

    applicationForm.reset();
}


// =========================================
// OPEN FORM EVENTS
// =========================================

openFormBtn.addEventListener("click", showForm);

emptyAddBtn.addEventListener("click", showForm);


// =========================================
// CLOSE FORM EVENTS
// =========================================

closeFormBtn.addEventListener("click", hideForm);

cancelBtn.addEventListener("click", hideForm);


// =========================================
// ADD APPLICATION
// =========================================

applicationForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const company =
        document.getElementById("companyName").value.trim();

    const role =
        document.getElementById("jobRole").value.trim();

    const location =
        document.getElementById("location").value.trim();

    const jobType =
        document.getElementById("jobType").value;

    const date =
        document.getElementById("applicationDate").value;

    const status =
        document.getElementById("status").value;

    const link =
        document.getElementById("jobLink").value.trim();

    const notes =
        document.getElementById("notes").value.trim();


    const newApplication = {

        id: Date.now(),

        company: company,

        role: role,

        location: location || "Not specified",

        jobType: jobType,

        date: date,

        status: status,

        link: link,

        notes: notes

    };


    applications.unshift(newApplication);


    saveApplications();

    renderApplications();

    updateDashboard();


    applicationForm.reset();

    hideForm();

});


// =========================================
// SAVE TO LOCAL STORAGE
// =========================================

function saveApplications() {

    localStorage.setItem(
        "jobApplications",
        JSON.stringify(applications)
    );
}


// =========================================
// RENDER APPLICATIONS
// =========================================

function renderApplications() {

    const searchTerm =
        searchInput.value.trim().toLowerCase();


    let filteredApplications =
        applications.filter(function (application) {

            const matchesSearch =

                application.company
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                application.role
                    .toLowerCase()
                    .includes(searchTerm);


            const matchesFilter =

                currentFilter === "All"

                ||

                application.status === currentFilter;


            return matchesSearch && matchesFilter;

        });


    applicationsList.innerHTML = "";


    // Empty state
    if (filteredApplications.length === 0) {

        applicationsList.style.display = "none";

        emptyState.classList.remove("hidden");

        if (applications.length === 0) {

            emptyState.querySelector("h3").textContent =
                "No applications yet";

            emptyState.querySelector("p").textContent =
                "Start tracking your job applications by adding your first application.";

        } else {

            emptyState.querySelector("h3").textContent =
                "No applications found";

            emptyState.querySelector("p").textContent =
                "Try changing your search or filter.";

        }

        updateSubtitle(0);

        return;
    }


    applicationsList.style.display = "flex";

    emptyState.classList.add("hidden");


    filteredApplications.forEach(function (application) {

        const card =
            createApplicationCard(application);

        applicationsList.appendChild(card);

    });


    updateSubtitle(filteredApplications.length);

}


// =========================================
// CREATE APPLICATION CARD
// =========================================

function createApplicationCard(application) {

    const card =
        document.createElement("div");

    card.className = "application-card";


    // Status class
    const statusClass =
        application.status
            .toLowerCase()
            .replace(" ", "-");


    // Job link
    let jobLinkHTML = "";

    if (application.link) {

        jobLinkHTML = `
            <span>
                🔗
                <a
                    href="${escapeHTML(application.link)}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Job Link
                </a>
            </span>
        `;

    }


    card.innerHTML = `

        <div class="application-main">

            <div class="application-company">
                ${escapeHTML(application.company)}
            </div>

            <div class="application-role">
                ${escapeHTML(application.role)}
            </div>

            <div class="application-details">

                <span>
                    📍
                    ${escapeHTML(application.location)}
                </span>

                <span>
                    💼
                    ${escapeHTML(application.jobType)}
                </span>

                <span>
                    📅
                    ${formatDate(application.date)}
                </span>

                ${jobLinkHTML}

            </div>

            ${
                application.notes
                    ? `
                    <div class="application-notes">
                        📝 ${escapeHTML(application.notes)}
                    </div>
                    `
                    : ""
            }

        </div>


        <div class="application-actions">

            <span
                class="status-badge status-${statusClass}"
            >
                ${escapeHTML(application.status)}
            </span>

            <button
                class="edit-btn"
                onclick="openEditModal(${application.id})"
            >
                Edit
            </button>

            <button
                class="delete-btn"
                onclick="deleteApplication(${application.id})"
            >
                Delete
            </button>

        </div>

    `;


    return card;
}


// =========================================
// FORMAT DATE
// =========================================

function formatDate(dateString) {

    if (!dateString) {
        return "No date";
    }


    const date =
        new Date(dateString + "T00:00:00");


    return date.toLocaleDateString("en-IN", {

        day: "2-digit",

        month: "short",

        year: "numeric"

    });

}


// =========================================
// DELETE APPLICATION
// =========================================

function deleteApplication(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this application?"
        );


    if (!confirmDelete) {
        return;
    }


    applications =
        applications.filter(function (application) {

            return application.id !== id;

        });


    saveApplications();

    renderApplications();

    updateDashboard();

}


// =========================================
// OPEN EDIT MODAL
// =========================================

function openEditModal(id) {

    const application =
        applications.find(function (item) {

            return item.id === id;

        });


    if (!application) {
        return;
    }


    editId.value = application.id;

    editCompany.value = application.company;

    editRole.value = application.role;

    editLocation.value = application.location;

    editJobType.value = application.jobType;

    editDate.value = application.date;

    editStatus.value = application.status;

    editLink.value = application.link;

    editNotes.value = application.notes;


    editModal.classList.add("show");

    document.body.style.overflow = "hidden";

}


// =========================================
// CLOSE EDIT MODAL
// =========================================

function closeEditModal() {

    editModal.classList.remove("show");

    document.body.style.overflow = "";

}


// =========================================
// EDIT MODAL EVENTS
// =========================================

closeModalBtn.addEventListener(
    "click",
    closeEditModal
);

closeEditBtn.addEventListener(
    "click",
    closeEditModal
);


// =========================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// =========================================

editModal.addEventListener(
    "click",
    function (event) {

        if (event.target === editModal) {

            closeEditModal();

        }

    }
);


// =========================================
// UPDATE APPLICATION
// =========================================

editForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const id =
            Number(editId.value);


        const application =
            applications.find(function (item) {

                return item.id === id;

            });


        if (!application) {
            return;
        }


        application.company =
            editCompany.value.trim();

        application.role =
            editRole.value.trim();

        application.location =
            editLocation.value.trim()
            || "Not specified";

        application.jobType =
            editJobType.value;

        application.date =
            editDate.value;

        application.status =
            editStatus.value;

        application.link =
            editLink.value.trim();

        application.notes =
            editNotes.value.trim();


        saveApplications();

        renderApplications();

        updateDashboard();

        closeEditModal();

    }
);


// =========================================
// SEARCH
// =========================================

searchInput.addEventListener(
    "input",
    function () {

        renderApplications();

    }
);


// =========================================
// FILTER
// =========================================

filterButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            currentFilter =
                button.dataset.filter;


            renderApplications();

        }
    );

});


// =========================================
// UPDATE DASHBOARD
// =========================================

function updateDashboard() {

    const total =
        applications.length;


    const applied =
        applications.filter(function (application) {

            return application.status === "Applied";

        }).length;


    const interview =
        applications.filter(function (application) {

            return application.status === "Interview";

        }).length;


    const selected =
        applications.filter(function (application) {

            return application.status === "Selected";

        }).length;


    totalCount.textContent = total;

    appliedCount.textContent = applied;

    interviewCount.textContent = interview;

    selectedCount.textContent = selected;

}


// =========================================
// UPDATE APPLICATION SUBTITLE
// =========================================

function updateSubtitle(count) {

    applicationSubtitle.textContent =
        `${count} application${count === 1 ? "" : "s"} found`;

}


// =========================================
// ESCAPE HTML
// Prevent unsafe HTML from user input
// =========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;

}


// =========================================
// INITIAL LOAD
// =========================================

renderApplications();

updateDashboard();


// =========================================
// SET TODAY'S DATE
// =========================================

const applicationDate =
    document.getElementById("applicationDate");


if (applicationDate) {

    const today =
        new Date().toISOString().split("T")[0];

    applicationDate.value = today;

}