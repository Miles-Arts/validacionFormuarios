//const inputNacimiento = document.querySelector("#birth");

export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    //console.log(input.parentElement)
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";

    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío.",
        typeMismatch: "Nombre no válido."
    },
    email: {
        valueMissing: "El campo email no puede estar vacío.",
        typeMismatch: "El correo no en válido."
    },
    password: {
        valueMissing: "El campo password no puede estar vacío.",
        patternMismatch: "Mínimo 6 caracteres máximo 12. Debe contener 1 letra minúscula. 1 letra mayúscula. 1 número. No puede contener carácteres especiales."
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío.",
        customError: "Debes tener al menos 18 años o una autorización especial.",
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

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