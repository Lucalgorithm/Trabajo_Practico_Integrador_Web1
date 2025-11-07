document.getElementById('formulario-sus').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formulario = document.forms['formulario-sus'];
    const nombreInput = formulario['nombre'];
    const telefonoInput = formulario['telefono'];
    const emailInput = formulario['correo'];
    const edadInput = formulario['edad'];
    const terminosInput = formulario['terminos'];

    const spanNombre = document.getElementById('error-name');
    const spanTelefono = document.getElementById('error-phone');
    const spanCorreo = document.getElementById('error-email');
    const spanEdad = document.getElementById('error-age');
    const spanTerminos = document.getElementById('error-terms');
    const sentDataArea = document.getElementById('sent-data-area');
    
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    sentDataArea.innerHTML = '';
    
    const regexNombre = /^[A-Z-a-z-ÁÉÍÓÚáéíóúÑñ\s]+$/;
    
    const regexTelefono = /^[0-9]{7,15}$/; 
    
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let aux = true;

    function clearBorders() {
        nombreInput.style.borderColor = "";
        telefonoInput.style.borderColor = "";
        emailInput.style.borderColor = "";
        edadInput.style.borderColor = "";
    }
    
    clearBorders();
    
    const nombreValue = nombreInput.value.trim();
    if (nombreValue.length === 0) {
        nombreInput.style.borderColor = "red";
        spanNombre.textContent = 'El nombre es obligatorio.';
        aux = false;
    } else if (nombreValue.length > 50) {
        nombreInput.style.borderColor = "red";
        spanNombre.textContent = 'El nombre no puede exceder los 50 caracteres.';
        aux = false;
    } else if (!regexNombre.test(nombreValue)) {
        nombreInput.style.borderColor = "red";
        spanNombre.textContent = 'El nombre solo puede contener letras y espacios.';
        aux = false;
    }

    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
        emailInput.style.borderColor = "red";
        spanCorreo.textContent = 'El correo electrónico es obligatorio.';
        aux = false;
    } else if (!regexEmail.test(emailValue)) {
        emailInput.style.borderColor = "red";
        spanCorreo.textContent = 'El correo debe tener un formato valido (ejemplo@dominio.com).';
        aux = false;
    }

    const telefonoValue = telefonoInput.value.replace(/[\s\-\(\)]/g, '');
    if (telefonoInput.value.trim() === '') {
        telefonoInput.style.borderColor = "red";
        spanTelefono.textContent = 'El telefono es obligatorio.';
        aux = false;
    } else if (!regexTelefono.test(telefonoValue)) {
        telefonoInput.style.borderColor = "red";
        spanTelefono.textContent = 'Debe ser de 7 a 15 digitos numericos sin guiones.';
        aux = false;
    }

    const edadValue = edadInput.value.trim();
    if (edadValue !== '' && (isNaN(edadValue) || edadValue < 1 || edadValue > 120)) {
        edadInput.style.borderColor = "red";
        spanEdad.textContent = 'Ingresa una edad valida (1-120) o dejalo vacio.';
        aux = false;
    }

    if (!terminosInput.checked) {
        spanTerminos.textContent = 'Debes aceptar los terminos y condiciones.';
        aux = false;
    }
    
    if (aux === true) {
        const datosEnviados = {
            Nombre: nombreInput.value.trim(),
            Email: emailInput.value.trim(),
            Teléfono: telefonoInput.value.trim(),
            Edad: edadInput.value.trim() || 'No especificada',
            Terminos: 'Aceptados'
        };
        
        function elementosExito(data) {
            const divContenido = document.createElement('div');
            const h3Titulo = document.createElement('h3');
            
            h3Titulo.textContent = 'Suscripcion Exitosa: Datos Enviados';
            h3Titulo.style.color = 'lime';
            divContenido.style.marginTop = '20px';
            divContenido.style.borderTop = '1px solid #ff3333';
            divContenido.style.paddingTop = '15px';
            divContenido.style.color = '#ccc';
            
            sentDataArea.appendChild(divContenido);
            divContenido.appendChild(h3Titulo);
            
            for (const key in data) {
                const p = document.createElement('p');
                p.textContent = `${key}: ${data[key]}`;
                divContenido.appendChild(p);
            }
            return divContenido;
        }

        const div = elementosExito(datosEnviados);
        
        formulario.reset();
        
        setTimeout(() => {
            if(div.parentNode) {
                div.remove();
            }
        }, 5000);
        
        return false;
    } else {
        return false;
    }
});