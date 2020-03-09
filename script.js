//when save button is clicked name is saved
document.querySelector("#save-title").onclick = () => {
  let title = document.querySelector("#title").value;
  window.localStorage.setItem("title", title);
};

//getting last saved name and populating title box
const title = window.localStorage.getItem("title");
document.querySelector("#title").value = title;

const keys = ["A", "B", "C", "D"];

document.querySelector("#save-all").onclick = () => {
  keys.forEach(key => {
    let savedMatrixAValues = [];
    document
      .querySelectorAll(`#${key} input`)
      .forEach(item => savedMatrixAValues.push(item.value));
    const matrixAString = JSON.stringify(savedMatrixAValues);
    window.localStorage.setItem(key, matrixAString);
  });
};

//

keys.forEach(key => {
  try {
    let currentInputsValues = [];
    JSON.parse(window.localStorage.getItem(key)).forEach(item =>
      currentInputsValues.push(item)
    );

    const currentBoxHTMLInputs = document.querySelectorAll(`#${key} input`);

    currentBoxHTMLInputs.forEach(
      (item, i) => (item.value = currentInputsValues[i])
    );
  } catch (error) {
    console.log(error);
  }
});
