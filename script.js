const horariosDisponiveis = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
const dataInput = document.getElementById('data');
const horarioSelect = document.getElementById('horario');
const form = document.getElementById('form-agendamento');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const closeModal = document.getElementById('close-modal');

function openModal(content){
        modalMessage.innerHTML = content;
        modal.style.display = 'block';
    }
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
}});

dataInput.addEventListener('change', function() {
    horarioSelect.innerHTML = '';

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Selecione um horário';
    horarioSelect.appendChild(placeholder);

    horariosDisponiveis.forEach(function(horario) {
        const option = document.createElement('option');
        option.value = horario;
        option.textContent = horario;
        horarioSelect.appendChild(option);
    });
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const data = dataInput.value;
    const horario = horarioSelect.value;
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!data || !horario || !nome || !telefone || !email) {
        openModal('<h2 style="color:red;">Erro!</h2><p>Por favor, preencha todos os campos!</p>');
        return;
    }
   const resumo = `<h2>Agendamento Confirmado!</h2>
   <p><strong>Nome:</strong> ${nome}</p>
   <p><strong>Telefone:</strong> ${telefone}</p>
   <p><strong>E-mail:</strong> ${email}</p>
   <p><strong>Data:</strong> ${data}</p>
   <p><strong>Horário:</strong> ${horario}</p>`
    openModal(resumo)

    form.reset();
    horarioSelect.innerHTML = '<option value="">Selecione uma data primeiro</option>';
})