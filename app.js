//============================// SELECTORES DOM // =======================//

const userName = document.querySelector("#name");
const rut = document.querySelector("#rut");
const patente = document.querySelector("#patente");
const marca = document.querySelector("#marca");
const color = document.querySelector("#color");
const btn = document.querySelector("#btn_submit");
const modelo = document.querySelector("#modelo");

const form = document.querySelector("#form");

const btnHeaderForm = document.querySelector("#anchor_header-form");
const btnHeaderListForm = document.querySelector("#anchor_header-list_form");

const sectionForm = document.querySelector("#form_page");
const sectionListForm = document.querySelector("#list_form_page");

const containerList = document.querySelector("#container_list_content");

//============================// OBJETOS QUE GUARDARA INFO DEL USUARIO // =======================//

const dataCarUser = {
    name: "",
    rut: "",
    patente: "",
    marca: "",
    modelo: "",
    color: ""
};

const carsList = [];

//============================// FUNCIONES & HELPERS // =======================//

const helperUpdateInfoCarUser = ({ target }) => {
    dataCarUser[target.name] = target.value.trim();
    const existe = document.querySelector("#alert-" + target.name);
    if (existe) {
        existe.remove();
    }
    console.log(dataCarUser);
};

const validador = (element, msg, id) => {
    if (
        element.name == "rut" &&
        element.value.length < 8 &&
        element.value.length > 0
    ) {
        const existe = document.querySelector("#alert-" + id);
        if (existe) {
            return;
        }
        const p = document.createElement("p");
        p.setAttribute("id", "alert-" + id);
        p.classList.add("alert-danger");
        p.textContent = "El rut no es correcto";
        const parentElement = element.parentElement;
        parentElement.appendChild(p);
        return false;
    }
    if (element.name == "patente" && element.value.length < 6) {
        const existe = document.querySelector("#alert-" + id);
        if (existe) {
            return;
        }
        const p = document.createElement("p");
        p.setAttribute("id", "alert-" + id);
        p.classList.add("alert-danger");
        p.textContent = "La patente debe tener 6 digitos";
        const parentElement = element.parentElement;
        parentElement.appendChild(p);
        return false;
    }
    if (dataCarUser[id].trim() == "") {
        const existe = document.querySelector("#alert-" + id);
        if (existe) {
            return;
        }
        const p = document.createElement("p");
        p.setAttribute("id", "alert-" + id);
        p.classList.add("alert-danger");
        p.textContent = msg;
        const parentElement = element.parentElement;
        parentElement.appendChild(p);
        return false;
    }
    return true;
};

const insertInLocalStorage = () => {
    const storeCars = localStorage.getItem("storeCars");
    const storeCarsParse = JSON.parse(storeCars);
    storeCarsParse.push(dataCarUser);
    const storeCarsString = JSON.stringify(storeCarsParse);
    localStorage.setItem("storeCars", storeCarsString);
    const div = document.createElement("div");
    div.classList.add("wrapper-alert");
    div.innerHTML = `<p class="alert-succes">Informacion guardada correctamente</p>`;
    form.appendChild(div);
    cleanSelect();
    setTimeout(() => {
        div.remove();
    }, 3000);
    form.reset();
};

const saveInfo = e => {
    e.preventDefault();

    let err = 0;

    if (!validador(userName, "*Debe ingresar el nombre", "name")) {
        err += 1;
    }
    if (!validador(rut, "*Debe ingresar el rut", "rut")) {
        err += 1;
    }
    if (!validador(patente, "*Debe ingresar la patente", "patente")) {
        err += 1;
    }
    if (!validador(marca, "*Debe ingresar la marca", "marca")) {
        err += 1;
    }
    if (!validador(color, "*Debe ingresar el color", "color")) {
        err += 1;
    }
    if (!validador(modelo, "*Debe ingresar el modelo", "modelo")) {
        err += 1;
    }

    if (err == 0) {
        insertInLocalStorage();
    }
};

const deleteCharsetInvalid = e => {
    let { target } = e;
    let out = "";
    let filtro = "1234567890";

    for (let i = 0; i < target.value.length; i++) {
        if (filtro.indexOf(target.value.charAt(i)) != -1) {
            out += target.value.charAt(i);
        }
    }

    target.value = out.slice(0, 8);
};

const cleanSelect = () => {
    while (modelo.getElementsByTagName("option")[1]) {
        modelo.removeChild(modelo.getElementsByTagName("option")[1]);
    }
    while (color.getElementsByTagName("option")[1]) {
        color.removeChild(color.getElementsByTagName("option")[1]);
    }
};

const addInfoSelect = ({ target }) => {
    cleanSelect();
    const carsModels = [];
    const carsColors = [];
    if (target.value == "chery") {
        const models = ["Tiggo 2", "Face"];
        const colors = ["Blanco", "Negro"];

        carsModels.push(...models);
        carsColors.push(...colors);
    }
    if (target.value == "hyundai") {
        const models = ["I10", "Tucson"];
        const colors = ["Rojo", "Negro", "Azul"];

        carsModels.push(...models);
        carsColors.push(...colors);
    }
    if (target.value == "subaru") {
        const models = ["Outback", "Forester"];
        const colors = ["Blanco", "Negro", "Plomo"];

        carsModels.push(...models);
        carsColors.push(...colors);
    }
    if (target.value == "jeep") {
        const models = ["Wrangler", "Grand Cherokee"];
        const colors = ["Azul", "Negro", "verde", "Negro"];

        carsModels.push(...models);
        carsColors.push(...colors);
    }
    if (target.value == "bmw") {
        const models = ["4M convertible", "Z4 Roadster"];
        const colors = ["Blanco", "Negro", "Azul"];

        carsModels.push(...models);
        carsColors.push(...colors);
    }

    carsModels.forEach(model => {
        const option = document.createElement("option");
        option.setAttribute("value", model);
        option.textContent = model;
        modelo.appendChild(option);
    });
    carsColors.forEach(colorCar => {
        const option = document.createElement("option");
        option.setAttribute("value", colorCar);
        option.textContent = colorCar;
        color.appendChild(option);
    });
};

const showCarList = () => {
    const carsListString = localStorage.getItem("storeCars");
    const carsListParse = JSON.parse(carsListString);
    while (containerList.firstChild) {
        containerList.removeChild(containerList.firstChild);
    }

    carsListParse.forEach((cardList, i) => {
        const div = document.createElement("div");
        const divWrapper = document.createElement("div");
        const nombreH3 = document.createElement("h3");
        const rutH3 = document.createElement("h3");
        const patenteH3 = document.createElement("h3");
        const marcaH3 = document.createElement("h3");
        const modeloH3 = document.createElement("h3");
        const colorH3 = document.createElement("h3");
        const icon = document.createElement("img");
        const hr = document.createElement("hr");

        div.classList.add("container_list_row");
        nombreH3.classList.add("text_list");
        nombreH3.classList.add("field_name");
        rutH3.classList.add("text_list");
        patenteH3.classList.add("text_list");
        marcaH3.classList.add("text_list");
        modeloH3.classList.add("text_list");
        colorH3.classList.add("text_list");
        icon.classList.add("icon_delete");
        icon.setAttribute("src", "./icon_delete.svg");
        icon.onclick = e => {
            deleteRecord(i);

            e.target.parentElement.parentElement.remove();
        };
        hr.classList.add("reset");

        nombreH3.textContent = cardList.name;
        rutH3.textContent = cardList.rut;
        patenteH3.textContent = cardList.patente.toUpperCase();
        marcaH3.textContent = cardList.marca;
        modeloH3.textContent = cardList.modelo;
        colorH3.textContent = cardList.color;

        div.appendChild(nombreH3);
        div.appendChild(rutH3);
        div.appendChild(patenteH3);
        div.appendChild(marcaH3);
        div.appendChild(modeloH3);
        div.appendChild(colorH3);
        div.appendChild(icon);

        divWrapper.appendChild(div);
        divWrapper.appendChild(hr);
        containerList.appendChild(divWrapper);
    });

    msgFooter();
};

const msgFooter = () => {
    const existe = document.querySelector("#recordsMsg");

    const carsListString = localStorage.getItem("storeCars");
    const carsListParse = JSON.parse(carsListString);

    const records = carsListParse.length > 10 ? 10 : carsListParse.length;

    const msg =
        carsListParse.length == 0
            ? "No hay registros, comienza creando alguno."
            : `Mostrando registros del 1 al ${records} de un total de ${carsListParse.length} registros.`;

    if (existe) {
        existe.textContent = msg;
        return;
    }

    const msgFooter = document.createElement("div");
    msgFooter.classList.add("msg_footer");
    const p = document.createElement("p");
    p.setAttribute("id", "recordsMsg");
    p.textContent = msg;

    msgFooter.appendChild(p);
    containerList.appendChild(msgFooter);
};

const deleteRecord = id => {
    const carsListString = localStorage.getItem("storeCars");
    const carsListParse = JSON.parse(carsListString);

    const newCarList = carsListParse.filter((_, i) => i != id);
    console.log(carsListParse[id]);

    localStorage.setItem("storeCars", JSON.stringify(newCarList));
    msgFooter();
    showCarList();
};

const clearList = () => {
    while (containerList.firstChild) {
        containerList.removeChild(containerList.firstChild);
    }
};

//============================// EVENTOS // =======================//

userName.addEventListener("input", helperUpdateInfoCarUser);
rut.addEventListener("input", helperUpdateInfoCarUser);
patente.addEventListener("input", helperUpdateInfoCarUser);
marca.addEventListener("input", helperUpdateInfoCarUser);
modelo.addEventListener("input", helperUpdateInfoCarUser);
marca.addEventListener("change", addInfoSelect);
color.addEventListener("input", helperUpdateInfoCarUser);
btn.addEventListener("click", saveInfo);
rut.addEventListener("keypress", deleteCharsetInvalid);
btnHeaderForm.addEventListener("click", () => {
    sectionListForm.classList.add("display-none");
    sectionForm.classList.remove("display-none");
});
btnHeaderListForm.addEventListener("click", () => {
    sectionForm.classList.add("display-none");
    sectionListForm.classList.remove("display-none");
    clearList();
    showCarList();
});

(() => {
    const storeCars = localStorage.getItem("storeCars") || "[]";
    localStorage.setItem("storeCars", storeCars);
})();
