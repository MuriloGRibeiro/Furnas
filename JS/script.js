let slideIndex = 1;
let slides = [];
let dots = [];
let slideInterval;

// Função para avançar/voltar slides
function plusSlides(n) {
  // Chamada da função showSlides com o novo índice
  showSlides(slideIndex += n);
}

// Função para ir para um slide específico (usada ao clicar nas bolinhas)
function currentSlide(n) {
  // Define o índice do slide e chama a função para exibi-lo
  showSlides(slideIndex = n);
}

// Função principal para exibir o slide
function showSlides(n) {
  // Verifica se os elementos foram carregados
  if (!slides || slides.length === 0) return;

  // Lógica para loop do carrossel (volta para o primeiro se passar do último)
  if (n > slides.length) { slideIndex = 1 }
  // Lógica para loop do carrossel (vai para o último se for antes do primeiro)
  if (n < 1) { slideIndex = slides.length }

  // Calcula o deslocamento horizontal para o slide container (em porcentagem)
  // Ex: Slide 1: 0% | Slide 2: -100% | Slide 3: -200%
  const offset = -(slideIndex - 1) * 100;
  document.querySelector('.carousel-slide').style.transform = `translateX(${offset}%)`;

  // Atualiza os indicadores (bolinhas)
  dots.forEach(dot => dot.classList.remove('active')); // Remove a classe 'active' de todas
  dots[slideIndex - 1].classList.add('active'); // Adiciona 'active' apenas ao slide atual

  // Reinicia o auto-play a cada troca de slide (manual ou automática)
  startAutoSlide();
}

// Função para auto-play (troca de slides automática)
function startAutoSlide() {
  clearInterval(slideInterval); // Limpa o intervalo anterior para evitar trocas duplicadas
  slideInterval = setInterval(function() {
    plusSlides(1); // Avança para o próximo slide
  }, 4000); // **Troca a cada 4 segundos** (Você pode mudar para 3000ms se preferir 3 segundos)
}

// Inicializa o carrossel quando a página carrega
document.addEventListener("DOMContentLoaded", function() {
  // Pega todos os elementos de imagem e bolinhas (dots)
  slides = document.querySelectorAll('.carousel-slide img');
  dots = document.querySelectorAll('.dot');
  
  // Inicia o carrossel se houver slides
  if (slides.length > 0) {
      showSlides(slideIndex); // Exibe o primeiro slide e inicializa
      // O startAutoSlide é chamado dentro do showSlides()
  }
});