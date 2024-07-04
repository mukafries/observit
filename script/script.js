// toggle navigation menu
document.getElementById("nav-toggle").addEventListener("click", function () {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("hidden");
});

const EXCEL_EXTENSION = ".xlsx";
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.charset=UTF-8";

// Add count item
function addCountItem() {
  const countContainer = document.getElementById("count-items-container");
  const newCountItem = document.createElement("div");
  newCountItem.className =
    "count-item relative border border-3 border-green-800 bg-white p-4 shadow-md space-y-4 md:max-w-[50%]";

  newCountItem.innerHTML = `
  <!-- remove item -->
            <button
              class="remove-btn absolute top-0.5 right-1 text-white font-mono font-bold bg-red-800 p-1 rounded-lg active:bg-red-500"
              onclick="removeItem(this)"
            >
              X
            </button>

            <!-- Item image field -->
            <div class="observation-image-container flex flex-col">
              <label for="observationImage" class="text-sm font-bold mb-1"
                >Image</label
              >
              <input
                type="file"
                class="observation-image"
                name="observationImage"
                accept="image/*"
                capture="environment"
                class="border rounded p-2"
                alt=""
              />
            </div>

            <!-- Item species name field -->
            <div class="observation-name-container flex flex-col">
              <label for="speciesName" class="text-sm font-bold mb-1"
                >Species Name:</label
              >
              <input
                type="text"
                placeholder="Species name/s (comma-separated)"
                name="speciesName"
                class="species-name border rounded p-2"
              />
            </div>

            <!-- Item Field name  -->
            <div class="observation-name-container flex flex-col">
              <label for="observationName" class="text-sm font-bold mb-1"
                >Field Name:</label
              >
              <input
                type="text"
                placeholder="name/s (comma-separated)"
                name="observationName"
                class="observation-name border rounded p-2"
              />
            </div>

            <!-- Item count field -->
            <div class="observation-count-container">
              <label for="observationCount" class="text-sm font-bold mb-1"
                >Count:</label
              >
              <div>
                <button class="count-minus" onclick="decrementCount(this)">
                  -
                </button>
                <input
                  type="number"
                  min='0'
                  name="observationCount"
                  class="observation-count text-center w-16 border rounded p-2"
                  value="0"
                  id=""
                />
                <button class="count-plus" onclick="incrementCount(this)">
                  +
                </button>
              </div>
  `;

  countContainer.appendChild(newCountItem);
}

function incrementCount(button) {
  const input = button.previousElementSibling;
  input.value = parseInt(input.value) + 1;
}

function decrementCount(button) {
  const input = button.nextElementSibling;
  if (input.value <= 0) return;
  input.value = parseInt(input.value) - 1;
}

function removeItem(button) {
  const countItem = button.parentElement;

  console.log("close");

  countItem.remove();
}

function displayImages(input) {
  const previewContainer = input.parentElement.nextSibling.nextElementSibling;
  console.log(previewContainer);

  Array.from(input.files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.className = "w-15 object-cover rounded";
      console.log(img);
      console.log(previewContainer);
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

function renameTitle() {
  const titleInput = document.getElementById("title-input");
  const countTitle = document.getElementById("count-title");
  const newTitle = titleInput.value;
  if (newTitle.trim()) {
    countTitle.innerText = newTitle;
    titleInput.value = "";
  }
}

// data structuring and exporting

// Export function
function exportCountItems() {
  console.log(window);
  const countItems = document.getElementsByClassName("count-item");

  if (countItems.length <= 1) {
    alert("No data input");
    return;
  }
  const observationData = [];
  console.log("Exporting..........");
  for (i = 0; i < countItems.length; i++) {
    const element = countItems.item(i);
    console.log(element);
    const speciesName = element.getElementsByClassName("species-name")[0].value;
    const fieldName =
      element.getElementsByClassName("observation-name")[0].value;
    const observationCount =
      element.getElementsByClassName("observation-count")[0].value;
    const item = {
      speciesName: speciesName,
      fieldName: fieldName,
      count: observationCount,
    };

    observationData.push(item);
  }
  if (observationData.length <= 0) {
    return "Message: no observation data to export";
  }
  const countTitle = document.getElementById("count-title");

  exportToExcel(observationData, countTitle.innerText);
  console.log("Exported");
}

function exportToExcel(jsonArr, outputFilename) {
  // let workbook = xlsx.utils.book_new();
  // xlsx.utils.book_append_sheet(
  //   workbook,
  //   xlsx.utils.json_to_sheet(jsonArr, "sample")
  // );
  // xlsx.writeFile(workbook, outputFilename + ".xlsx");

  const worksheet = XLSX.utils.json_to_sheet(jsonArr);
  const workbook = {
    Sheets: {
      data: worksheet,
    },
    SheetNames: ["data"],
  };
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], { type: EXCEL_TYPE });
  saveAs(
    data,
    outputFilename + "_export" + new Date().getTime() + EXCEL_EXTENSION
  );
}
