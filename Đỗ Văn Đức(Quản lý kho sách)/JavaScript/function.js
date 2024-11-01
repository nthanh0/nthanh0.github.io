document.addEventListener('DOMContentLoaded', function() {
    let books = [
        { id: '001', title: 'Doraemon', author: 'Fujiko Fujio', genre: 'Truyện tranh', date: '2023-01-15', price: 25000, quantity: 5 },
        { id: '002', title: 'Sherlock Holmes', author: 'Arthur Conan Doyle', genre: 'Trinh thám', date: '2023-02-20', price: 120000, quantity: 3 },
        { id: '003', title: 'Truyện Kiều', author: 'Nguyễn Du', genre: 'Truyện', date: '2023-03-10', price: 100000, quantity: 7 },
        { id: '004', title: 'Romeo và Juliet', author: 'William Shakespeare', genre: 'Bi kịch', date: '2023-04-05', price: 130000, quantity: 4 },
        { id: '005', title: 'Thầy cúng đại chiến', author: 'Gege', genre: 'Truyện tranh', date: '2023-05-12', price: 140000, quantity: 2 },
        { id: '005', title: 'Thầy cúng đại chiến', author: 'Gege', genre: 'Truyện tranh', date: '2023-05-12', price: 140000, quantity: 2 },
        { id: '005', title: 'Thầy cúng đại chiến', author: 'Gege', genre: 'Truyện tranh', date: '2023-05-12', price: 140000, quantity: 2 },
        { id: '005', title: 'Thầy cúng đại chiến', author: 'Gege', genre: 'Truyện tranh', date: '2023-05-12', price: 140000, quantity: 2 },
        { id: '005', title: 'Thầy cúng đại chiến', author: 'Gege', genre: 'Truyện tranh', date: '2023-05-12', price: 140000, quantity: 2 },
        { id: '005', title: 'Thầy cúng đại chiến', author: 'Gege', genre: 'Truyện tranh', date: '2023-05-12', price: 140000, quantity: 2 },
        { id: '005', title: 'Thầy cúng đại chiến', author: 'Gege', genre: 'Truyện tranh', date: '2023-05-12', price: 140000, quantity: 2 },
        { id: '005', title: 'Thầy cúng đại chiến', author: 'Gege', genre: 'Truyện tranh', date: '2023-05-12', price: 140000, quantity: 2 },
        { id: '005', title: 'Thầy cúng đại chiến', author: 'Gege', genre: 'Truyện tranh', date: '2023-05-12', price: 140000, quantity: 2 },
        { id: '005', title: 'Thầy cúng đại chiến', author: 'Gege', genre: 'Truyện tranh', date: '2023-05-12', price: 140000, quantity: 2 },
        { id: '005', title: 'Thầy cúng đại chiến', author: 'Gege', genre: 'Truyện tranh', date: '2023-05-12', price: 140000, quantity: 2 },
        { id: '005', title: 'Thầy cúng đại chiến', author: 'Gege', genre: 'Truyện tranh', date: '2023-05-12', price: 140000, quantity: 2 },
    ];

    const bookTable = document.querySelector('.bookTable');
    const searchInput = document.querySelector('.search-input');
    const sortButtons = document.querySelectorAll('.sort-bar-content button');
    const addBookForm = document.querySelector('.input-group');
    const addBookButton = document.querySelector('.submit-btn');
    const editModeBtn = document.getElementById('editModeBtn');
    let isEditMode = false;

    let currentSearchTerm = '';
    let currentSortMethod = null;

    function displayBooks(booksToDisplay) {
        while (bookTable.rows.length > 1) {
            bookTable.deleteRow(1);
        }
        
        booksToDisplay.forEach(book => {
            let row = bookTable.insertRow();
            row.innerHTML = `
                <td class="cot-gia-tri2 delete-column" style="display: ${isEditMode ? 'table-cell' : 'none'};">
                    <button class="cols-value edit-btn" data-id="${book.id}">Sửa</button>
                    <button class="cols-value delete-btn" data-id="${book.id}">Xóa</button>
                </td>
                <td class="cols-value book-id">${book.id}</td>
                <td class="cols-value book-name">${book.title}</td>
                <td class="cols-value book-author">${book.author}</td>
                <td class="cols-value book-genre">${book.genre}</td>
                <td class="cols-value book-date">${book.date}</td>
                <td class="cols-value book-price">${book.price}</td>
                <td class="cols-value book-quantity">${book.quantity}</td>
            `;

            // Thêm event listeners cho các nút
            const deleteBtn = row.querySelector('.delete-btn');
            const editBtn = row.querySelector('.edit-btn');

            deleteBtn.addEventListener('click', function() {
                const bookId = this.getAttribute('data-id');
                deleteBook(bookId);
            });

            editBtn.addEventListener('click', function() {
                const bookId = this.getAttribute('data-id');
                editBook(bookId);
            });
        });
    }

    function applySearchAndSort() {
        let filteredBooks = books;

        if (currentSearchTerm) {
            filteredBooks = filteredBooks.filter(book => 
                book.title.toLowerCase().includes(currentSearchTerm) ||
                book.author.toLowerCase().includes(currentSearchTerm) ||
                book.genre.toLowerCase().includes(currentSearchTerm)
            );
        }

        if (currentSortMethod) {
            filteredBooks.sort(currentSortMethod);
        }

        displayBooks(filteredBooks);
    }

    searchInput.addEventListener('input', function() {
        currentSearchTerm = this.value.toLowerCase();
        applySearchAndSort();
    });

    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            switch (this.className) {
                case 'button1':
                    currentSortMethod = (a, b) => b.quantity - a.quantity;
                    break;
                case 'button2':
                    currentSortMethod = (a, b) => a.quantity - b.quantity;
                    break;
                case 'button3':
                    currentSortMethod = (a, b) => a.title.localeCompare(b.title);
                    break;
                case 'button4':
                    currentSortMethod = (a, b) => b.title.localeCompare(a.title);
                    break;
            }
            applySearchAndSort();
        });
    });

    function addBook() {
        const inputs = addBookForm.querySelectorAll('input');
        const newBook = {
            id: inputs[0].value,
            title: inputs[1].value,
            author: inputs[2].value,
            genre: inputs[3].value,
            date: inputs[4].value,
            price: parseFloat(inputs[5].value),
            quantity: parseInt(inputs[6].value)
        };

        if (Object.values(newBook).some(value => value === '' || value === null || value === undefined)) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        // Check if ID already exists
        if (books.some(book => book.id === newBook.id)) {
            alert('Mã sách đã tồn tại! Vui lòng chọn mã khác');
            return;
        }

        books.push(newBook);
        applySearchAndSort();
        inputs.forEach(input => input.value = '');
        alert('Thêm sách thành công!');
        const inputGroup = document.querySelector('.input-group');
        inputGroup.style.display = 'none';
        const toggleInputBtn = document.getElementById('toggleInputBtn');
        toggleInputBtn.innerHTML = '<i class="fas fa-plus"></i> Thêm sách';
    }

    addBookButton.addEventListener('click', function() {
        if (addBookButton.textContent === 'Thêm sách') {
            addBook();
        } else {
            const bookId = addBookForm.querySelector('input').value;
            updateBook(bookId);
        }
    });

    function toggleEditMode() {
        isEditMode = !isEditMode;
        const deleteColumns = document.querySelectorAll('.delete-column');
        deleteColumns.forEach(col => {
            col.style.display = isEditMode ? 'table-cell' : 'none';
        });
        editModeBtn.textContent = isEditMode ? 'Hoàn tất' : 'Chỉnh sửa';
    }

    editModeBtn.addEventListener('click', toggleEditMode);

    function toggleEditMode() {
        isEditMode = !isEditMode;
        const deleteColumns = document.querySelectorAll('.delete-column');
        deleteColumns.forEach(col => {
            col.style.display = isEditMode ? 'table-cell' : 'none';
        });
        editModeBtn.textContent = isEditMode ? 'Hoàn tất' : 'Chỉnh sửa';
    }

    // Delete book function
    window.deleteBook = function(id) {
        if (confirm('Bạn có chắc chắn muốn xóa cuốn sách này?')) {
            books = books.filter(book => book.id !== id);
            displayBooks(books);
        }
    }

    window.editBook = function(id) {
        const book = books.find(book => book.id === id);
        if (book) {
            // Show the input group if it's hidden
            const inputGroup = document.querySelector('.input-group');
            inputGroup.style.display = 'block';
            
            // Update the toggle button text
            const toggleInputBtn = document.getElementById('toggleInputBtn');
            toggleInputBtn.innerHTML = '<i class="fas fa-minus"></i> Ẩn form nhập';
            const inputs = addBookForm.querySelectorAll('input');
            inputs[0].value = book.id;
            inputs[1].value = book.title;
            inputs[2].value = book.author;
            inputs[3].value = book.genre;
            inputs[4].value = book.date;
            inputs[5].value = book.price;
            inputs[6].value = book.quantity;

            addBookButton.textContent = 'Cập nhật sách';
        }
    }

    function updateBook(id) {
        const inputs = addBookForm.querySelectorAll('input');
        const updatedBook = {
            id: inputs[0].value,
            title: inputs[1].value,
            author: inputs[2].value,
            genre: inputs[3].value,
            date: inputs[4].value,
            price: parseFloat(inputs[5].value),
            quantity: parseInt(inputs[6].value)
        };

        if (Object.values(updatedBook).some(value => value === '' || value === null || value === undefined)) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }
        
        const index = books.findIndex(book => book.id === id);
        if (index !== -1) {
            books[index] = updatedBook;
            applySearchAndSort();
            
            inputs.forEach(input => input.value = '');
            addBookButton.textContent = 'Thêm sách';
            alert('Sách đã được cập nhật thành công!');
        } else {
            alert('Không tìm thấy sách để cập nhật!');
        }
        const inputGroup = document.querySelector('.input-group');
        inputGroup.style.display = 'none';
        const toggleInputBtn = document.getElementById('toggleInputBtn');
        toggleInputBtn.innerHTML = '<i class="fas fa-plus"></i> Thêm sách';
    }

    displayBooks(books);
});
document.getElementById('toggleInputBtn').addEventListener('click', function() {
    const inputGroup = document.querySelector('.input-group');
    const buttonText = this.textContent;
    
    if (inputGroup.style.display === 'none') {
        inputGroup.style.display = 'block';
        this.innerHTML = '<i class="fas fa-minus"></i> Ẩn form nhập';
    } else {
        inputGroup.style.display = 'none';
        this.innerHTML = '<i class="fas fa-plus"></i> Thêm sách';
    }
});
