let currentStep = 1;
let currentSlide = 0;
let summaryWhats = ""; // Declarando summaryWhats como variável global

function nextStep(step) {
    document.getElementById(`step${step}`).classList.remove('active');
    document.getElementById(`step${step + 1}`).classList.add('active');
    currentStep++;
}

function prevStep(step) {
    document.getElementById(`step${step}`).classList.remove('active');
    document.getElementById(`step${step - 1}`).classList.add('active');
    currentStep--;
}

function submitForm() {
    const form = document.getElementById('bachelorPartyForm');
    const summaryContainer = document.getElementById('summaryContainer');
    const summary = document.getElementById('summary');
    const formData = new FormData(form);
    
    summaryWhats = "* Confirmação para o Último Truco do Samuel: *\n\n"; // Atualizando a variável global

    let summaryHTML = '<h3> Confirmação para o Último Truco do Samuel: </h3>';
    let idealTeam = [];
    
    for (let [key, value] of formData.entries()) {
        if (key === 'idealTeam') {
            idealTeam.push(value);
        } else {
            let label = '';
            switch(key) {
                case 'playerName':
                    label = 'Seu Nome de Jogador';
                    break;
                case 'trucoLevel':
                    label = 'Nível de Truco';
                    break;
                case 'churrascoContribution':
                    label = 'Contribuição para o Churrasco';
                    break;
                case 'idealPartner':
                    label = 'Parceiro Ideal';
                    break;
                case 'avoidPartner':
                    label = 'Parceiro a Evitar';
                    break;
            }
            summaryHTML += `<p><strong style="color:#ffa500;">${label}:</strong> ${value}</p>`;
            summaryWhats += `*${label}:* ${value}\n`;
        }
    }
    
    if (idealTeam.length > 0) {
        summaryHTML += `<p><strong>Time Ideal:</strong> ${idealTeam.join(', ')}</p>`;
        summaryWhats += `*Time Ideal:* ${idealTeam.join(', ')}`;
    }
    
    summary.innerHTML = summaryHTML;
    form.style.display = 'none';
    summaryContainer.style.display = 'block';
}

function shareWhatsApp() {
    const encodedSummary = encodeURIComponent(summaryWhats);
    const whatsappUrl = `https://wa.me/?text=${encodedSummary}`;
    window.open(whatsappUrl, '_blank');
}

document.querySelectorAll('input[name="idealTeam"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const checkedBoxes = document.querySelectorAll('input[name="idealTeam"]:checked');
        if (checkedBoxes.length > 3) {
            this.checked = false;
            alert('Opa, parceiro! Você só pode escolher 3 jogadores para o seu time ideal. Tá pensando que é o técnico da seleção?');
        }
    });
});

// Modal e Carrossel
const modal = document.getElementById("playerModal");
const btn = document.getElementById("modalButton");
const span = document.getElementsByClassName("close")[0];
const slides = document.getElementsByClassName("carousel-item");

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function changeSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}