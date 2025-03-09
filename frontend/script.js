const GRAPHQL_URL = "http://localhost:5000/graphql";

document.addEventListener("DOMContentLoaded", () => {
    fetchJobs();
    document.getElementById("application-form").addEventListener("submit", submitApplication);
});

// fetch-jobs-from-graphql
async function fetchJobs() {
    const query = `
        query {
            jobs {
                id
                title
                company
                location
            }
        }
    `;

    try {
        const response = await fetch(GRAPHQL_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
        });

        const result = await response.json();
        const jobs = result.data.jobs;

        const jobCards = document.getElementById("job-cards");
        const jobSelect = document.getElementById("job-select");

        jobCards.innerHTML = "";
        jobSelect.innerHTML = "<option value=''>Select a job</option>";

        jobs.forEach(job => {
            let card = document.createElement("div");
            card.classList.add("job-card");
            card.innerHTML = `
                <p class="job-title">${job.title}</p>
                <p class="job-company">${job.company}</p>
                <p class="job-location">${job.location}</p>
            `;
            jobCards.appendChild(card);

            let option = document.createElement("option");
            option.value = job.id;
            option.textContent = job.title;
            jobSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
    }
}

// submit-job-application
async function submitApplication(event) {
    event.preventDefault();

    const job_id = document.getElementById("job-select").value;
    const applicant_name = document.getElementById("name").value;
    const applicant_email = document.getElementById("email").value;
    const cover_letter = document.getElementById("cover-letter").value;
    const successMessage = document.getElementById("success-message");

    if (!job_id) {
        alert("Please select a job.");
        return;
    }

    const mutation = `
        mutation {
            applyForJob(job_id: "${job_id}", applicant_name: "${applicant_name}", applicant_email: "${applicant_email}", cover_letter: "${cover_letter}") {
                id
                applicant_name
                applicant_email
            }
        }
    `;

    try {
        const response = await fetch(GRAPHQL_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: mutation })
        });

        if (!response.ok) throw new Error("Failed to submit application");

        successMessage.classList.remove("hidden");

        // clear-input-fields-after-successful-submission
        document.getElementById("application-form").reset();

        setTimeout(() => {
            successMessage.classList.add("hidden");
        }, 3000);
    } catch (error) {
        alert("Error submitting application.");
        console.error("Submission error:", error);
    }
}
