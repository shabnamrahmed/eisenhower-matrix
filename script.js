/**
 * Array containing keys for each box:
 *        _______
 *       | A | B |
 *       |___|___|
 *       | C | D |
 *       |___|___|
 */
const keys = ["A", "B", "C", "D"];

// ////////////////////////////////////////////////////////////
// ///////////////HELPER FUNCTIONS ////////////////////////////
// ////////////////////////////////////////////////////////////

function getUserTitleElement() {
  return document.querySelector("#title").value;
}

function updateSavedAtTime() {
  document.querySelector(
    "#saved-at-time"
  ).innerText = new Date().toLocaleString();
}

// Converts text from each box to a string separated by a "|" symbol"
// and adds a `\n` character so each boxes contents will print on a
// new line when the file is ultimately written
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

// ////////////////////////////////////////////////////////////
// ///////////////ON PAGE LOAD ////////////////////////////////
// ////////////////////////////////////////////////////////////

// LOAD TITLE
//gets last saved title and populates title box
const title = window.localStorage.getItem("title");
document.querySelector("#title").value = title;

// LOAD ALL INPUTS
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

// update the saved at time when the page loads
updateSavedAtTime();

// ////////////////////////////////////////////////////////////
// ///////////////EVENT HANDLERS///////////////////////////////
// ////////////////////////////////////////////////////////////

//when title is being typed, it is stored on key release
document.querySelector("#title").onkeyup = event => {
  window.localStorage.setItem("title", event.target.value);
};

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
  updateSavedAtTime();
};

// When download button is clicked, data is downloaded as a .txt file.
// File is named after current title in the `#title` box.
// File content is obtained using helper function `getTextToSaveToFile()`
document.querySelector("#download-data").onclick = () => {
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
};

// On "Enter" key, focus to the next input
const allInputs = document.querySelectorAll("input");
Array.from(allInputs).forEach((element, index) => {
  const isLastElement = index === allInputs.length - 1;
  element.onkeypress = event => {
    if (event.key === "Enter") {
      if (isLastElement) {
        // last element should go back to the first input that isn't the title
        allInputs[1].focus(); // element `0` is the #title input
      } else {
        // otherwise focus the next input
        allInputs[index + 1].focus();
      }
    }
  };
});
