const qs = (selector) => document.querySelector(selector);

const templateDNI = `
  <label>
    <span>Ingresar DNI a consultar:</span>
    <input type="number" name="document" placeholder="@Ejemplo: 70081234" required/>
  </label>
  <button type="submit">Consultar</button>
`;

const templateNames = `
  <label>
    <span>Apellido Paterno:</span>
    <input type="text" name="paterno" placeholder="@Ejemplo: Wells" required/>
  </label>
  <label>
    <span>Apellido Materno:</span>
    <input type="text" name="materno" placeholder="@Ejemplo: Smith" required/>
  </label>
  <label>
    <span>Nombre(s):</span>
    <input type="text" name="nombres" placeholder="@Ejemplo: James" required/>
  </label>
  <button type="submit">Consultar</button>
`;

const infoTemplate = `
  <article>
    <hgroup>
        <h2>Sugerencias</h2>
        <h3>Si no encuentra reultados, puede probar con los siguientes datos:</h3>
    </hgroup>
    <div class="headings">
      <ul>
        <li>Si sus <b>"nombres o apellidos"</b> tienen acentos o caracteres especiales, por favor ingrese la letra sin acento o caracter especial.</li>
        <li>Si su <b>"apellido paterno"</b> es compuesto, por favor ingrese el primer apellido.</li>
        <li>Si su <b>"apellido materno"</b> es compuesto, por favor ingrese el primer apellido.</li>
        <li>Si su <b>"nombre"</b> es compuesto, por favor ingrese el primer nombre.</li>
      </ul>
    </div>
 </article>
`

const form = qs('form');
const result = qs('#result');
let isNames = false;
const observer = qs('#names');
observer.addEventListener('change', (event) => {
  isNames = event.target.checked;
  result.innerHTML = '';
  form.innerHTML = isNames ? templateNames : templateDNI;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const button = qs('button');
  try {
    button.setAttribute('aria-busy', true);
    button.setAttribute('disabled', true);
    button.textContent = 'Consultando datos...';
    if(isNames) {
      const {paterno, materno, nombres} = data;
      const {response, success, message} = await getInfoWithNames(paterno, materno, nombres);
      result.innerHTML = `<p>Respuesta de consulta para: <br> "${paterno} ${materno} ${nombres}"</p> <pre>${JSON.stringify(response || message, null, 2)}</pre> ${!success ? infoTemplate : ''}`;
    } else {
      const response = await getInfoWithDni(data.document);
      result.innerHTML = `<p>Respuesta de consulta <small>"${data.document}"</small>:</p> <pre>${JSON.stringify(response, null, 2)}</pre>`;
    }
  } catch (err) {
    console.error(err);
    result.innerHTML = `<p>Ha ocurrido un error, vuelva a intentarlo en unos minutos</p>`;
  } finally {
    button.removeAttribute('aria-busy');
    button.removeAttribute('disabled');
    button.textContent = 'Consultar';
    form.reset();
  }
});
