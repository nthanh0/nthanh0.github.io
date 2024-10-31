let readers = [
  {
    id: 1,
    code: "21412",
    name: "Phan Cao Huy",
    gender: "Nam",
    contact: "0345678912",
    registrationDate: "2024-10-20",
    expirationDate: "2025-11-20",
  },
  {
    id: 2,
    code: "13211",
    name: "Hoàng Phú Dũng",
    gender: "Nam",
    contact: "Dung234566@lms.edu.utc.vn",
    registrationDate: "2023-07-15",
    expirationDate: "2024-09-25",
  },
  {
    id: 3,
    code: "24131",
    name: "Đỗ Văn Đức",
    gender: "Nam",
    contact: "+84987654321",
    registrationDate: "2024-12-12",
    expirationDate: "2025-01-13",
  },
  {
    id: 4,
    code: "24131",
    name: "Lê văn Luyện",
    gender: "Nam",
    contact: "0906123456",
    registrationDate: "2024-09-12",
    expirationDate: "2025-01-13",
  },
  {
    id: 5,
    code: "20231",
    name: "Nguyễn thị la",
    gender: "Nữ",
    contact: "0374211322",
    registrationDate: "2024-01-25",
    expirationDate: "2025-02-26",
  },
  {
    id: 6,
    code: "21367",
    name: "Nguyễn Văn Bằng",
    gender: "Nam",
    contact: "0962932132",
    registrationDate: "2024-12-12",
    expirationDate: "2025-02-14",
  },
];
//
function renderReaders() {
  const tableBody = document.getElementById("readerTableBody");
  tableBody.innerHTML = "";
  readers.forEach((reader, index) => {
    row = `
              <tr>
                  <td>${index + 1}</td>
                  <td>${reader.code}</td>
                  <td>${reader.name}</td>
                  <td>${reader.gender}</td>
                  <td>${reader.contact}</td>
                  <td>${formatDate(reader.registrationDate)}</td>
                  <td>${formatDate(reader.expirationDate)}</td>
                  <td>
                      <button class="btn btn-sm btn-primary" onclick="editReader(${
                        reader.id
                      })">Sửa</button>
                      <button class="btn btn-sm btn-danger" onclick="deleteReader(${
                        reader.id
                      })">Xóa</button>
                  </td>
              </tr>
          `;
    tableBody.innerHTML += row;
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
}

function showAddReaderModal() {
  document.getElementById("readerModalLabel").textContent = "Thêm độc giả mới";
  document.getElementById("readerForm").reset();
  document.getElementById("readerId").value = "";
  new bootstrap.Modal(document.getElementById("readerModal")).show();
}

function editReader(id) {
  const reader = readers.find((r) => r.id === id);
  if (reader) {
    document.getElementById("readerModalLabel").textContent =
      "Sửa thông tin độc giả";
    document.getElementById("readerId").value = reader.id;
    document.getElementById("readerCode").value = reader.code;
    document.getElementById("readerName").value = reader.name;
    document.getElementById("readerGender").value = reader.gender;
    document.getElementById("readerContact").value = reader.contact;
    document.getElementById("registrationDate").value = reader.registrationDate;
    document.getElementById("expirationDate").value = reader.expirationDate;
    new bootstrap.Modal(document.getElementById("readerModal")).show();
  }
}
function validForm() {
  const readerCode = document.getElementById("readerCode").value.trim();
  const readerName = document.getElementById("readerName").value.trim();
  const readerGender = document.getElementById("readerGender").value;
  const registrationDate = document.getElementById("registrationDate").value;
  const expirationDate = document.getElementById("expirationDate").value;
  const contact = document.getElementById("readerContact").value.trim();

  if (readerName === "") {
    alert("Bạn chưa điền tên");
    return false;
  }

  if (!Number.isInteger(Number(readerCode)) || readerCode === "") {
    alert("Mã thẻ phải là số nguyên");
    return false;
  }

  if (!readerGender) {
    alert("Bạn chưa chọn giới tính");
    return false;
  }

  const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
  const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
  if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
    alert(
      "Thông tin liên hệ phải là email hợp lệ hoặc số điện thoại (bắt đầu bằng 0 hoặc +84, 10 số)"
    );
    return false;
  }

  if (!registrationDate || !expirationDate) {
    alert("Bạn chưa chọn ngày đăng ký và ngày hết hạn của thẻ");
    return false;
  }

  if (new Date(expirationDate) <= new Date(registrationDate)) {
    alert("Ngày hết hạn phải sau ngày đăng ký");
    return false;
  }

  return true;
}
function saveReader() {
  if (!validForm()) {
    return;
  } else {
    const id = document.getElementById("readerId").value;
    const reader = {
      code: document.getElementById("readerCode").value,
      name: document.getElementById("readerName").value,
      gender: document.getElementById("readerGender").value,
      contact: document.getElementById("readerContact").value,
      registrationDate: document.getElementById("registrationDate").value,
      expirationDate: document.getElementById("expirationDate").value,
    };
    if (id) {
      // Cập nhật độc giả hiện có
      const index = readers.findIndex((r) => r.id == id);
      if (index !== -1) {
        readers[index] = { ...readers[index], ...reader };
      }
    } else {
      // Thêm độc giả mới
      const newId = Math.max(...readers.map((r) => r.id), 0) + 1;
      readers.push({ id: newId, ...reader });
    }
  }
  renderReaders();
  bootstrap.Modal.getInstance(document.getElementById("readerModal")).hide();
}

function deleteReader(id) {
  if (confirm("Bạn có chắc chắn muốn xóa độc giả này không?")) {
    readers = readers.filter((r) => r.id !== id);
    renderReaders();
  }
}

function sortReaders(criteria) {
  switch (criteria) {
    case "name":
      readers.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "registrationDate":
      readers.sort(
        (a, b) => new Date(a.registrationDate) - new Date(b.registrationDate)
      );
      break;
    case "duration":
      readers.sort((a, b) => {
        const durationA =
          new Date(a.expirationDate) - new Date(a.registrationDate);
        const durationB =
          new Date(b.expirationDate) - new Date(b.registrationDate);
        return durationB - durationA;
      });
      break;
  }
  renderReaders();
}

function searchReaders() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const filteredReaders = readers.filter(
    (reader) =>
      reader.name.toLowerCase().includes(searchTerm) ||
      reader.code.toLowerCase().includes(searchTerm) ||
      reader.contact.toLowerCase().includes(searchTerm)
  );
  renderFilteredReaders(filteredReaders);
}

function renderFilteredReaders(filteredReaders) {
  const tableBody = document.getElementById("readerTableBody");
  tableBody.innerHTML = "";
  filteredReaders.forEach((reader, index) => {
    const row = `
              <tr>
                  <td>${index + 1}</td>
                  <td>${reader.code}</td>
                  <td>${reader.name}</td>
                  <td>${reader.gender}</td>
                  <td>${reader.contact}</td>
                  <td>${formatDate(reader.registrationDate)}</td>
                  <td>${formatDate(reader.expirationDate)}</td>
                  <td>
                      <button class="btn btn-sm btn-primary" onclick="editReader(${
                        reader.id
                      })">Sửa</button>
                      <button class="btn btn-sm btn-danger" onclick="deleteReader(${
                        reader.id
                      })">Xóa</button>
                  </td>
              </tr>
          `;
    tableBody.innerHTML += row;
  });
}
// function validForm() {
//   const readerCode = document.getElementById("readerCode").value;
//   const readerName = document.getElementById("readerName").value;
//   const readerGender = document.getElementById("readerGender").checked;
//   const registrationDate = document.getElementById("registrationDate").checked;
//   const expirationDate = document.getElementById("expirationDate").checked;

//   if (readerName == "") {
//     alert("ban chưa điền tên");
//     return false;
//   }
//   // if (readerCode == "") {
//   //   alert("bạn chưa điền mã thẻ ");
//   //   return false;
//   // }
//   // if (!readerGender) {
//   //   alert("ban chưa chọn giới tính ");
//   //   return false;
//   // }
//   if (!Number.isInteger(Number(readerCode)) || readerCode === "") {
//     alert("dữ liệu phải là số nguyên");
//     return false;
//   }
//   const contact = document.getElementById("readerContact");
//   const email = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
//   if (!email.test(contact)) {
//     alert("email chưa đúng định dạng ");
//     return false;
//   }
//   if (!registrationDate || !expirationDate) {
//     alert("bạn chưa chọn ngày đăng kí và ngày hết hạn của thẻ");
//   }
//   return true;
//   // return true;
// }
// Khởi tạo ứng dụng
renderReaders();
