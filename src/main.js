import FetchWrapper from "./utils/fetchwrapper.js";
import { capitalize, calculateCalories } from "./utils/helpers.js";
import { renderChart } from "./utils/charthelper.js";
import snackbar from "snackbar";
import FoodData from "./utils/food-data.js";
import { GraphComponent } from "./component/graph-component.js";

window.customElements.define("graph-component", GraphComponent);
const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/<yourProjectName>/databases/(default)/documents/chaddev"
);

const foodData = new FoodData();

const form = document.querySelector("#create-form");
const foodName = document.querySelector("#create-name");
const carbs = document.querySelector("#create-carbs");
const protein = document.querySelector("#create-protein");
const fat = document.querySelector("#create-fat");
const foodList = document.querySelector("#food-list");
const totalCalories = document.querySelector("#total-calories");

const displayEntry = (foodName, carbs, protein, fat) => {
  foodData.addFood(carbs, protein, fat);
  foodList.insertAdjacentHTML(
    "beforeend",
    `<li class="card">
        <div>
          <h3 class="name">${capitalize(foodName)}</h3>
          <div class="calories">${calculateCalories(
            carbs,
            protein,
            fat
          )} calories</div>
          <ul class="macros">
            <li class="carbs"><div>Carbs</div><div class="value">${carbs}g</div></li>
            <li class="protein"><div>Protein</div><div class="value">${protein}g</div></li>
            <li class="fat"><div>Fat</div><div class="value">${fat}g</div></li>
          </ul>
        </div>
      </li>`
  );
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  API.post("/", {
    fields: {
      name: { stringValue: foodName.value },
      carbs: { integerValue: carbs.value },
      protein: { integerValue: protein.value },
      fat: { integerValue: fat.value },
    },
  }).then((data) => {
    console.log(data);
    if (data.error) {
      snackbar.show("Some data is missing.");
      return;
    }

    displayEntry(foodName.value, carbs.value, protein.value, fat.value);
    render();
    snackbar.show("Your food has been logged.");

    foodName.value = "";
    carbs.value = "";
    protein.value = "";
    fat.value = "";
  });
});

const init = () => {
  API.get("/?pageSize=50").then((data) => {
    data.documents?.forEach((doc) => {
      const fields = doc.fields;
      displayEntry(
        fields.name.stringValue,
        fields.carbs.integerValue,
        fields.protein.integerValue,
        fields.fat.integerValue
      );
    });
    render();
  });
};

const updateTotalCalories = () => {
  totalCalories.textContent = foodData.getTotalCalories();
};
let barChartInstance = null;
let pieChartInstance = null;
const render = () => {
  if (foodData.getTotalCalories > 0) {
    barChartInstance = renderChart(barChartInstance, foodData, "bar");
    pieChartInstance = renderChart(pieChartInstance, foodData, "pie");
  }
  updateTotalCalories();
};

init();
