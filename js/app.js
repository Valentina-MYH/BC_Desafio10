const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('input');

const tipoDocDNI = document.getElementById('tipo-doc-dni');
const tipoDocCUIL = document.getElementById('tipo-doc-cuil');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,10}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[A-Za-z]\D*$/,
    numDoc: /^\d{7,12}$/, // 7 a 12 numeros.
}
const expresionDireccion = /^[a-zA-Z0-9À-ÿ\s]*$/; //Letras minus y mayusculas,numeros, letras con tildes y espacios

const campos = {
    nombre: false,
    apellido: false,
    tipoDoc : false,
    direccion: false 
}

const validarFormulario = (e) => {
    //e.target.name => tag name ej:nombre, apellido;
    switch(e.target.name){
        case 'nombre':
            validarCampo(expresiones.nombre, e.target, 'nombre');
            
        break;
        case 'apellido':
            validarCampo(expresiones.apellido, e.target, 'apellido');
        break;

        
            
        break;
        case 'tipo-doc':
            formulario.addEventListener('submit', (e)=> {
                if (!tipoDocDNI.checked && !tipoDocCUIL.checked) {
                    document.querySelector(`#grupo-tipo-doc .input-error`).classList.add('activo');
                    campos['tipo-doc'] = false;
                } else {
                    campos['tipo-doc'] = true; 
                    document.querySelector(`#grupo-tipo-doc .input-error`).classList.remove('activo');
                }
            })
        break;
        
        case 'num-doc':
            validarCampo(expresiones.numDoc , e.target, 'num-doc');
        break;
        case 'direccion':
            validarCampo(expresionDireccion, e.target, 'direccion');
        break;


    }

}
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo-${campo}`).classList.remove('grupo-incorrecto');
        document.getElementById(`grupo-${campo}`).classList.add('grupo-correcto');
        document.querySelector(`#grupo-${campo} .input-error`).classList.remove('input-error-activo');
        
        campos[campo] = true;
    } else {
        document.getElementById(`#grupo-${campo}`).classList.add('grupo-incorrecto');
        document.getElementById(`#grupo-${campo}`).classList.remove('grupo-correcto');
        document.querySelector(`#grupo-${campo} .input-error`).classList.add('input-error-activo');
    
        campos[campo] = false;
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);

})

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (campos.nombre && campos.apellido && campos['num-doc'] ) {
        formulario.reset();
        document.getElementById('mensaje-exito').classList.add('mensaje-exito-activo');
    }else{

        document.getElementById('mensaje').classList.add('mensaje-activo');
    }
});
    
   

   