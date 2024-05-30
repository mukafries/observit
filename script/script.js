// toggle navigation menu
document.getElementById("nav-toggle").addEventListener("click", function () {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("hidden");
});

// Add count item
function addCountItem() {
  const countContainer = document.getElementById("count-item-container");
  const newItem = document.createElement("div");
  newItem.className =
    "count-item relative border border-3 border-green-800 bg-white p-4 shadow-md space-y-4 md:max-w-[50%]";

  newItem.innerHTML = `
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

  countContainer.appendChild(newItem);
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
