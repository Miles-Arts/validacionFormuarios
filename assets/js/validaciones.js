//const inputNacimiento = document.querySelector("#birth");

export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    //console.log(input.parentElement)
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid")
    } else {
        input.parentElement.classList.add("input-container--invalid");
    }
}

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacío."
    },
    email: {
        valueMissing: "Este campo no puede estar vacío.",
        typeMismatch: "El correo no en válido."
    },
    password: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "Mínimo 6 caracteres máximo 12. Debe contener 1 letra minúscula. 1 letra mayúscula. 1 número. No puede contener carácteres especiales."
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío.",
        customError: "Debes tener al menos 18 años.",
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

/*inputNacimiento.addEventListener("blur", (evento) => {
validarNacimiento(evento.target);
})*/

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}