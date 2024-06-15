
document.getElementById('contact-form').addEventListener('submit', function(event) { //el getEBI busca elementos dentro del documento, y el escuchador es la funcion que esta a la espera de que algo ocurra en la pagina.
    event.preventDefault(); //esta funcion era para evitar ciertos comportamientos en los eventos, en este caso el envio del formulario; para controlar los comportamientos de los eventos.
  let valiDos = true; //aqui cree mi variable que me ayudara a validar lod inputs.

  document.querySelectorAll('.error-message').forEach(function(errorDiv) { //querySA seleccionaba todos los elementos que se le dan especificamente y que cincidan con el elemento css que queremos.
    errorDiv.textContent = '';
  });
  document.querySelectorAll('.form-control').forEach(function(input) {
    input.classList.remove('error');
  });

  const nombre = document.getElementById('nombre'); //aqui cree una variable - y valido que introduzcan bien el nombre
  if (nombre.value.trim() === '') { //trim me ayuda a eliminar espacios demas que pueda introducir el usuario a ciertos inputs.
    valiDos = false;
    nombre.classList.add('error');
    document.getElementById('nombre-error').textContent = 'Por favor, introduzca su nombre';
  }

  const correo = document.getElementById('correo'); //validacion del correo
  if (correo.value.trim() === '') {
    valiDos = false;
    correo.classList.add('error');
    document.getElementById('correo-error').textContent = 'El correo electrónico es obligatorio';
  }

  const edad = document.getElementById('edad'); //validacion de la edad, solo con ciertos datos de entrada, al igual que el resto tiene restrinciones.
  if (edad.value.trim() === '') {
    valiDos = false;
    edad.classList.add('error');
    document.getElementById('edad-error').textContent = 'Este campo es obligatorio, por fvaor introduzca su edad.';
  }

  const genero = document.querySelector('input[name="genero"]:checked'); //validando el radio-button del genero
  if (!genero) {
    valiDos = false;
    document.getElementById('genero-error').textContent = 'Es necesario que seleccione una opcion, por favor';
  }

  const intereses = document.querySelectorAll('input[name="intereses"]:checked'); //validando el check-box de los intereses, en un inicio no iba pedirle al usuario que pusiera un interes como obligacion, pero despues cambie de opinion.
  if (intereses.length === 0) {
    valiDos = false;
    document.getElementById('intereses-error').textContent = 'Selecciona al menos un interés';
  }

  if (valiDos) { // si todas las validaciones salen bien, este if deberia activar el mensaje de "exito"
    alert('Tu formulario se ha enviado exitosamente!');
    document.getElementById('contact-form').reset(); //finalmente, aqui se resetea el formulario de "contacto", por si otro usuario o el mismo usuario quiere ingresar otros datos.
  }
});


document.addEventListener('DOMContentLoaded', () => { //segundo escuchador, aqui ya comienza las funciones de mi crud.
    const form = document.getElementById('item-form'); 
    const itemsList = document.getElementById('items-list');
    let items = []; //creamos variables nuevas, hablo de las 3.

    form.addEventListener('submit', (e) => { //aqui esta otro escuchador que esta espectante a que se active este formulario(crud).
        e.preventDefault(); 
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        
        if (!validateInput(name, description)) { //variablea que se le pediran ingrear al usuario,
            return; 
        }
        
        addItem(name, description); //aqui guarda los datos que el usuario ingresa y nlos muestra en una lista en la pantalla.
        form.reset(); //y aqui lo resetea luego del ingreso y envio de datos.
    });

    function validateInput(name, description) { //funcion que me ayuda a validar el formulario del crud
        const namepatron = /^[a-zA-Z\s]+$/; //aqui defini esas variables con ciertos datos para la validacion.
        const descriptionpatron = /^[a-zA-Z\s]+$/; //estos datos los busque directemente en internet, para que el usuario solo ingresara letras y no algun optro tipo de dato.
        //aqui comenzamos las validaciones y las peteciones al usuario, peticiones sobre que ingrese bien los datos.
        if (!name || !description) { 
            alert('Por favor, completa todos los campos.');
            return false;
        }
        if (!namepatron.test(name)) {
            alert('El campo "Nombre" solo puede contener letras y espacios.');
            return false;
        }
        if (!descriptionpatron.test(description)) {
            alert('El campo "Descripción" solo puede contener letras y espacios.');
            return false;
        }
        return true;
    }

    function addItem(name, description) { //funcion que agrega todos los items que el usaurio quiera ingresar.
        const item = { id: Date.now(), name, description }; //le dimos el id, pero no la quise inluir en la lectura de la pantalla cuando se ingresan datos a la lista.
        items.push(item); //el push hace la agregacion
        renderItems(); //con esta funcion le daba el orden a los items
    }

    function renderItems() {
        itemsList.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.description}`; //aqui es en donde se crea la manera de como se mostraran los items de la lista 
            const editButton = document.createElement('button'); //creamos el boton para editar
            editButton.textContent = 'EDITAR';
            editButton.className = 'edit';
            editButton.onclick = () => editItem(item.id);
            const deleteButton = document.createElement('button'); //creamos el boton eliminar
            deleteButton.textContent = 'ELIMINAR';
            deleteButton.className = 'delete';
            deleteButton.onclick = () => deleteItem(item.id);
            li.appendChild(editButton);
            li.appendChild(deleteButton); 
            itemsList.appendChild(li); 
        });
    }
    //
    function editItem(id) { //la editacion
        const item = items.find(item => item.id === id);
        const newName = prompt('Ingrese el nuevo nombre que desee:', item.name);
        const newDescription = prompt('Ingrese la nueva marca que quiera:', item.description);

        if (!validateInput(newName, newDescription)) {
            return;
        }

        item.name = newName;
        item.description = newDescription;
        renderItems();
    }

    function deleteItem(id) { //la eliminacion
        items = items.filter(item => item.id !== id);
        renderItems();
    }
});

