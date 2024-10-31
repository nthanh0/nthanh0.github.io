document.addEventListener("DOMContentLoaded", () => {
    const overdueButton = document.getElementById("overdue-toggle");
    const historyButton = document.getElementById("history-toggle");
    const tableBody = document.getElementById("tableBody");
    const editButton = document.getElementById("edit-button");
    const saveButton = document.getElementById("save-button");
    
    let normalRows = [];
    let overdueRows = [];
    let historyRows = [];
    let showingHistory = false;
    let showingOverdue = false;
    let isEditing = false;

    // Utility Functions
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return new Date(year, month - 1, day);
    };

    const calculateFee = (dueDate) => {
        const today = new Date();
        const due = parseDate(dueDate);
        const diffTime = Math.abs(today - due);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.min(diffDays * 5000, 100000);
    };

    const isOverdue = (row) => {
        const dueDate = parseDate(row.cells[4].textContent);
        return dueDate < new Date();
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Table Management Functions
    const updateTableHeader = (showingOverdue, showingHistory) => {
        const headerRow = document.querySelector("thead tr");
        headerRow.querySelectorAll('th[data-type]').forEach(th => th.remove());

        if (showingOverdue || showingHistory) {
            const feeHeader = document.createElement('th');
            feeHeader.setAttribute('data-type', 'fee');
            feeHeader.textContent = 'Phí trễ hạn';
            headerRow.insertBefore(feeHeader, headerRow.lastElementChild);
        }

        if (showingHistory) {
            const dateHeader = document.createElement('th');
            dateHeader.setAttribute('data-type', 'return-date');
            dateHeader.textContent = 'Ngày trả';
            headerRow.insertBefore(dateHeader, headerRow.lastElementChild);
        }
    };

    const separateRows = () => {
        const rows = Array.from(tableBody.getElementsByTagName('tr'));
        normalRows = [];
        overdueRows = [];
        
        rows.forEach(row => {
            const cleanRow = row.cloneNode(true);
            
            if (isOverdue(row)) {
                if (!cleanRow.querySelector('[data-type="fee"]')) {
                    const fee = calculateFee(row.cells[4].textContent);
                    const feeCell = document.createElement('td');
                    feeCell.setAttribute('data-type', 'fee');
                    feeCell.textContent = formatNumber(fee);
                    cleanRow.insertBefore(feeCell, cleanRow.lastElementChild);
                }
                overdueRows.push(cleanRow);
            } else {
                normalRows.push(cleanRow);
            }
            row.remove();
        });

        displayRows(normalRows);
    };

    const displayRows = (rows) => {
        tableBody.innerHTML = '';
        rows.forEach(row => {
            const displayRow = row.cloneNode(true);
            addRowEventListeners(displayRow);
            tableBody.appendChild(displayRow);
        });
    };

    // Event Listeners Functions
    const addRowEventListeners = (row) => {
        const deleteButton = row.querySelector('.delete-button');
        const returnButton = row.querySelector('.return-button');

        if (deleteButton) {
            deleteButton.addEventListener('click', () => handleDelete(row));
        }

        if (returnButton) {
            returnButton.addEventListener('click', () => handleReturn(row));
        }
    };

    const handleDelete = (row) => {
        if (confirm("Bạn có chắc chắn muốn xóa không?")) {
            row.remove();
            [normalRows, overdueRows, historyRows].forEach(array => {
                const index = array.findIndex(r => r.isEqualNode(row));
                if (index > -1) array.splice(index, 1);
            });
        }
    };

    const handleReturn = (row) => {
        if (confirm("Bạn có chắc chắn đã trả sách không?")) {
            const historyRow = row.cloneNode(true);
            
            // Clean up existing special cells
            historyRow.querySelectorAll('[data-type]').forEach(cell => cell.remove());
            
            // Add fee
            const fee = isOverdue(row) ? calculateFee(row.cells[4].textContent) : 0;
            const feeCell = document.createElement('td');
            feeCell.setAttribute('data-type', 'fee');
            feeCell.textContent = formatNumber(fee);
            
            // Add return date
            const returnDate = document.createElement('td');
            returnDate.setAttribute('data-type', 'return-date');
            returnDate.textContent = new Date().toLocaleDateString('en-GB');
            
            historyRow.insertBefore(feeCell, historyRow.lastElementChild);
            historyRow.insertBefore(returnDate, historyRow.lastElementChild);
            
            const returnBtn = historyRow.querySelector('.return-button');
            if (returnBtn) returnBtn.remove();
            
            historyRows.push(historyRow);
            normalRows = normalRows.filter(r => !r.isEqualNode(row));
            overdueRows = overdueRows.filter(r => !r.isEqualNode(row));
            
            row.remove();
        }
    };

    // Button Event Listeners
    overdueButton.addEventListener('click', () => {
        showingOverdue = !showingOverdue;
        overdueButton.classList.toggle('active');
        historyButton.classList.remove('active');
        showingHistory = false;
        
        updateTableHeader(showingOverdue, false);
        displayRows(showingOverdue ? overdueRows : normalRows);
    });

    historyButton.addEventListener('click', () => {
        showingHistory = !showingHistory;
        historyButton.classList.toggle('active');
        overdueButton.classList.remove('active');
        showingOverdue = false;

        updateTableHeader(false, showingHistory);
        displayRows(showingHistory ? historyRows : normalRows);
    });

    // Add New Item Functionality
    document.getElementById("add-button").onclick = function() {
        const borrowerID = document.getElementById("borrowerID-input").value.trim();
        const bookID = document.getElementById("bookID-input").value.trim();

        if (!borrowerID || isNaN(borrowerID)) {
            alert("ID người mượn không hợp lệ");
            return;
        }
        if (!bookID || isNaN(bookID)) {
            alert("Mã sách không hợp lệ");
            return;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Test Name</td>
            <td>Test Book</td>
            <td>${bookID}</td>
            <td>${new Date().toLocaleDateString('en-GB')}</td>
            <td>${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('en-GB')}</td>
            <td class="edit-cell">
                <button class="delete-button">Xóa</button>
                <button class="return-button">Trả</button>
            </td>
        `;

        normalRows.push(row.cloneNode(true));
        if (!showingOverdue && !showingHistory) {
            const displayRow = row.cloneNode(true);
            addRowEventListeners(displayRow);
            tableBody.appendChild(displayRow);
        }
    };

    // Edit Functionality
    editButton.addEventListener('click', () => {
        isEditing = !isEditing;
        editButton.classList.toggle('active');
        saveButton.style.display = isEditing ? 'inline-block' : 'none';
        
        tableBody.querySelectorAll('td').forEach(cell => {
            if (!cell.classList.contains('edit-cell')) {
                cell.contentEditable = isEditing;
                cell.classList.toggle('editable', isEditing);
                if (isEditing) {
                    cell.setAttribute('data-original', cell.textContent.trim());
                }
            }
        });
    });

    saveButton.addEventListener('click', () => {
        if (confirm("Bạn có chắc chắn muốn lưu thay đổi không?")) {
            isEditing = false;
            editButton.classList.remove('active');
            saveButton.style.display = 'none';
            
            tableBody.querySelectorAll('td').forEach(cell => {
                cell.contentEditable = false;
                cell.classList.remove('editable');
            });
            
            alert("Đã lưu thay đổi!");
        }
    });

    // Initialize
    separateRows();

    // Search Functionality
    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        // Determine which rows to search based on current view
        let rowsToSearch = normalRows;
        if (showingOverdue) {
            rowsToSearch = overdueRows;
        } else if (showingHistory) {
            rowsToSearch = historyRows;
        }

        // Filter rows based on search term
        const filteredRows = rowsToSearch.filter(row => {
            // Search across all text content in the row
            const rowText = Array.from(row.cells)
                .slice(0, -1) // Exclude the last cell (edit cell)
                .map(cell => cell.textContent.toLowerCase())
                .join(' ');
            
            return rowText.includes(searchTerm);
        });

        // Display filtered rows
        displayRows(filteredRows);
    });
    
});