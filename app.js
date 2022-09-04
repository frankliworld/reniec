const qs = (selector) => document.querySelector(selector);

const form = qs('form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const result = qs('#result');
  const button = qs('button');
  try {
    button.setAttribute('aria-busy', true);
    button.setAttribute('disabled', true);
    button.textContent = 'Consultando datos...';
    const response = await getInfoWithDni(data.document);
    result.innerHTML = `<p>Respuesta de consulta <small>"${data.document}"</small>:</p> <pre>${JSON.stringify(response, null, 2)}</pre>`;
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
