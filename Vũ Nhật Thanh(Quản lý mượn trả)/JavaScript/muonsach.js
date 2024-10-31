document.addEventListener("DOMContentLoaded", () => {
    // Searchbar
    const searchBar = document.getElementById("searchBar");
    const tableRows = document.querySelectorAll("#bookTable tr");

    searchBar.addEventListener("input", () => {
        const searchValue = searchBar.value.toLowerCase();

        tableRows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            row.style.display = rowText.includes(searchValue) ? "" : "none";
        });
    });

    // Add event listeners for delete and return buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    const returnButtons = document.querySelectorAll('.return-button');

    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const row = event.target.closest('tr'); // Get the closest row
            const confirmDelete = confirm("Bạn có chắc chắn muốn xóa không?");
            if (confirmDelete) {
                row.remove(); // Remove the row from the table
            }
        });
    });

    returnButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const row = event.target.closest('tr'); // Get the closest row
            const confirmReturn = confirm("Bạn có chắc chắn đã trả sách không?");
            if (confirmReturn) {
                row.remove(); // Remove the row from the table
            }
        });
    });
});

// table toggles

document.querySelectorAll('.toggleable-button').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});
