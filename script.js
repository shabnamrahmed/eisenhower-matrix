function getUserTitleElement() {
  return document.querySelector("#title").value;
}

//when title is being typed, it is stored on key release
document.querySelector("#title").onkeyup = event => {
  window.localStorage.setItem("title", event.target.value);
};

//gets last saved title and populates title box
const title = window.localStorage.getItem("title");
document.querySelector("#title").value = title;

//Creates array of keys to be used as labels for each box
const keys = ["A", "B", "C", "D"];

//When save button is clicked each input in each box is saved
document.querySelector("#save-all").onclick = () => {
  keys.forEach(key => {
    let savedMatrixAValues = [];
    document
      .querySelectorAll(`#${key} input`)
      .forEach(item => savedMatrixAValues.push(item.value));
    const matrixAString = JSON.stringify(savedMatrixAValues); //need to stringyfy in order to save in local storage
    window.localStorage.setItem(key, matrixAString);
  });
};

//Converts text from each box to string separated by | and prints each on a new line
function getTextToSaveToFile() {
  return keys
    .map(key => {
      let savedMatrixAValues = [];
      document
        .querySelectorAll(`#${key} input`)
        .forEach(item => savedMatrixAValues.push(item.value));
      const stringOfInputs = savedMatrixAValues
        .filter(item => item.length > 0)
        .join("|");
      return stringOfInputs;
    })
    .join("\n");
}

//gets item from storage, parses it in order to convert string object to array.
//populates inputs with previous saved info
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

//When download button is clicked, data is downloaded named after title 
//from user input and text from getTextToSaveToFile function
document.querySelector("#download-data").onclick = downloadData;
function downloadData() {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(getTextToSaveToFile())
  );
  element.setAttribute("download", getUserTitleElement());

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
