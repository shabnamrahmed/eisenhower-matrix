//when save button is clicked name is saved
document.querySelector("#save-title").onclick = () => {
    let title = document.querySelector("#title").value;
    window.localStorage.setItem('title', title);
};

//getting last saved name and populating title box 
const title = window.localStorage.getItem('title');
document.querySelector("#title").value = title;

