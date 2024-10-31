document.addEventListener("DOMContentLoaded", () => {
    const overdueButton = document.getElementById("overdue-toggle");
    const tableBody = document.getElementById("tableBody");
    let normalRows = [];
    let overdueRows = [];

    // Function to convert DD/MM/YYYY to Date object
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return new Date(year, month - 1, day);
    };

    // Function to calculate overdue fee
    const calculateFee = (dueDate) => {
        const today = new Date();
        const due = parseDate(dueDate);
        const diffTime = Math.abs(today - due);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const fee = Math.min(diffDays * 5000, 100000);
        return fee;
    };

    // Function to check if a row is overdue
    const isOverdue = (row) => {
        const dueDateCell = row.cells[4].textContent;
        const dueDate = parseDate(dueDateCell);
        return dueDate < new Date();
    };

    // Function to format number with commas
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Modify table header based on overdue status
    const updateTableHeader = (showingOverdue) => {
        const headerRow = document.querySelector("thead tr");
        
        // Remove fee column if exists
        const feeHeader = headerRow.querySelector('th[data-type="fee"]');
        if (feeHeader) {
            feeHeader.remove();
        }

        // Add fee column for overdue list
        if (showingOverdue) {
            const feeHeader = document.createElement('th');
            feeHeader.setAttribute('data-type', 'fee');
            feeHeader.textContent = 'Phí trễ hạn';
            headerRow.insertBefore(feeHeader, headerRow.lastElementChild);
        }
    };

    // Separate rows into overdue and normal arrays
    const separateRows = () => {
        const rows = Array.from(tableBody.getElementsByTagName('tr'));
        normalRows = [];
        overdueRows = [];
        
        rows.forEach(row => {
            if (isOverdue(row)) {
                const overdueRow = row.cloneNode(true);
                const fee = calculateFee(row.cells[4].textContent);
                const feeCell = document.createElement('td');
                feeCell.textContent = formatNumber(fee);
                overdueRow.insertBefore(feeCell, overdueRow.lastElementChild);
                overdueRows.push(overdueRow);
                row.remove();
            } else {
                normalRows.push(row.cloneNode(true));
                row.remove();
            }
        });

        // Display normal rows by default
        normalRows.forEach(row => {
            tableBody.appendChild(row);
        });
    };

    // Initial separation
    separateRows();

    // Add event listeners to new rows
    const addRowEventListeners = (row) => {
        const deleteButton = row.querySelector('.delete-button');
        const returnButton = row.querySelector('.return-button');

        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                const confirmDelete = confirm("Bạn có chắc chắn muốn xóa không?");
                if (confirmDelete) {
                    row.remove();
                    normalRows = normalRows.filter(r => r !== row);
                    overdueRows = overdueRows.filter(r => r !== row);
                }
            });
        }

        if (returnButton) {
            returnButton.addEventListener('click', () => {
                const confirmReturn = confirm("Bạn có chắc chắn đã trả sách không?");
                if (confirmReturn) {
                    row.remove();
                    normalRows = normalRows.filter(r => r !== row);
                    overdueRows = overdueRows.filter(r => r !== row);
                }
            });
        }
    };

    // Add event listeners to all initial rows
    [...normalRows, ...overdueRows].forEach(row => {
        addRowEventListeners(row);
    });

    // Toggle between normal and overdue lists
    let showingOverdue = false;
    overdueButton.addEventListener('click', () => {
        showingOverdue = !showingOverdue;
        overdueButton.classList.toggle('active');
        
        // Update table header
        updateTableHeader(showingOverdue);

        // Clear the table
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }

        // Show appropriate rows
        if (showingOverdue) {
            overdueRows.forEach(row => {
                const newRow = row.cloneNode(true);
                addRowEventListeners(newRow);
                tableBody.appendChild(newRow);
            });
        } else {
            normalRows.forEach(row => {
                const newRow = row.cloneNode(true);
                addRowEventListeners(newRow);
                tableBody.appendChild(newRow);
            });
        }
    });

    // Modify your existing add function
    const addButton = document.getElementById("add-button");
    addButton.onclick = function() {
        const borrowerID = document.getElementById("borrowerID-input").value.trim();
        const bookID = document.getElementById("bookID-input").value.trim();

        if (borrowerID == "") {
            alert("ID người mượn trống");
            return;
        } else if (isNaN(borrowerID)) {
            alert("ID người mượn không hợp lệ");
            return;
        } else if (bookID == "") {
            alert("Mã sách trống");
            return;
        } else if (isNaN(bookID)) {
            alert("Mã sách không hợp lệ");
            return;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Test Name</td>
            <td>Test Book</td>
            <td>9783034917948</td>
            <td>${new Date().toLocaleDateString('en-GB')}</td>
            <td>${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('en-GB')}</td>
            <td class="edit-cell">
                <button class="delete-button">Xóa</button>
                <button class="return-button">Trả</button>
            </td>
        `;

        addRowEventListeners(row);
        normalRows.push(row);

        if (!showingOverdue) {
            tableBody.appendChild(row.cloneNode(true));
        }
    };
    const editButton = document.getElementById("edit-button");
    const saveButton = document.getElementById("save-button");
    let isEditing = false;

    // Function to make cells editable
    function makeEditable(cell) {
        if (!cell.classList.contains('edit-cell')) {  // Don't make the buttons column editable
            cell.contentEditable = true;
            cell.classList.add('editable');
        }
    }

    // Function to make cells non-editable
    function makeNonEditable(cell) {
        cell.contentEditable = false;
        cell.classList.remove('editable');
    }

    // Toggle edit mode
    editButton.addEventListener('click', () => {
        isEditing = !isEditing;
        editButton.classList.toggle('active');
        
        // Show/hide save button
        saveButton.style.display = isEditing ? 'inline-block' : 'none';
        
        // Get all cells
        const cells = tableBody.getElementsByTagName('td');
        
        // Toggle editability for each cell
        Array.from(cells).forEach(cell => {
            if (isEditing) {
                makeEditable(cell);
            } else {
                makeNonEditable(cell);
            }
        });
    });

    // Save changes
    saveButton.addEventListener('click', () => {
        const confirmSave = confirm("Bạn có chắc chắn muốn lưu thay đổi không?");
        if (confirmSave) {
            // Turn off edit mode
            isEditing = false;
            editButton.classList.remove('active');
            saveButton.style.display = 'none';
            
            // Make all cells non-editable
            const cells = tableBody.getElementsByTagName('td');
            Array.from(cells).forEach(cell => {
                makeNonEditable(cell);
            });
            
            // Here you would typically save the changes to your backend
            alert("Đã lưu thay đổi!");
        }
    });

    // Add validation for date format when editing
    function addDateValidation(cell) {
        cell.addEventListener('blur', () => {
            if (cell.cellIndex === 3 || cell.cellIndex === 4) { // Date columns
                const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
                if (!dateRegex.test(cell.textContent.trim())) {
                    alert("Định dạng ngày không hợp lệ. Vui lòng sử dụng định dạng DD/MM/YYYY");
                    cell.textContent = cell.getAttribute('data-original');
                }
            }
        });
    }

    // Store original values when entering edit mode
    function storeOriginalValues() {
        const cells = tableBody.getElementsByTagName('td');
        Array.from(cells).forEach(cell => {
            cell.setAttribute('data-original', cell.textContent.trim());
            if (cell.cellIndex === 3 || cell.cellIndex === 4) {
                addDateValidation(cell);
            }
        });
    }

    // Modify the edit button click handler to store original values
    editButton.addEventListener('click', () => {
        if (!isEditing) {
            storeOriginalValues();
        }
    });

});