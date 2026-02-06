$(document).ready(function () {
    // get product data from JSON file
    $.getJSON('./json/produits.json', function (data) {
        var produits = data.produits;
        console.log(produits);
        
        var produitsContainer = $('#produit-container');

        console.log(produitsContainer);
        var produitHTML = '';
        
        produits.forEach(function (produit,key) {
            produitHTML += `
                <div class="carousel-item">
                    <div class="card bg-base-300 max-w-72 shadow-sm">
                        <figure>
                            <img
                            src="${produit.img}"
                            alt="${produit.nom}" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">${produit.nom}</h2>
                            <p>${produit.utilisation}</p>
                            <div class="card-actions justify-end">
                                <button class="bg-[#e38000] transition-colors cursor-pointer hover:bg-[#ffffff] hover:text-[#e38000] border-none text-white p-2 rounded-2xl"
                                onclick="my_modal_${key}.showModal()">
                                    Detail
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Open the modal using ID.showModal() method -->
                <dialog id="my_modal_${key}" class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box">
                        <form method="dialog">
                            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 class="font-bold text-lg">${produit.nom}</h3>
                        <img class="w-1/2 mx-auto my-4"
                            src="${produit.img}"
                            alt="${produit.nom}" />
                        <p class="py-4"><strong>Origine:</strong> ${produit.origine}</p>
                        ${produit.couleur ? `<p class="py-2"><strong>Couleur:</strong> ${produit.couleur}</p>` : ''}
                        ${produit.gout ? `<p class="py-2"><strong>Goût:</strong> ${produit.gout}</p>` : ''}
                        <p class="py-2"><strong>Utilisation:</strong> ${produit.utilisation}</p>
                    </div>
                </dialog>
            `;
            produitsContainer.html(produitHTML);
        });
    });

    // get fabrication data from JSON file

    $.getJSON("./json/fabrications.json", function(data) {
        let timelinesData = data.timelines;
        let type = "colorant_extraction_ethanol"; // timeline par défaut
        renderTimeline(timelinesData[type]);

    // Changer la timeline via la select
    $("#timeline-select").on("change", function() {
        type = $(this).val(); // récupère la valeur sélectionnée
        renderTimeline(timelinesData[type]);
        });
    });
});

function renderTimeline(steps) {
  let html = "";

  $.each(steps, function(index, step) {
    html += `
      <li class="step step-primary">
        <a href="#step${step.etape}" class="btn btn-ghost timeline-box">
          ${step.titre}
        </a>
      </li>
    `;
  });
  $("#timeline").html(html);

//   mettre a jour carousel 

  renderCarousel(steps);
}

function renderCarousel(steps) {
  let html = "";

  $.each(steps, function(index,step) {
    html += `
      <div class="carousel-item scroll-mt-96" id="step${step.etape}">
        <div class="card bg-base-300 max-w-72 shadow-sm">
          <figure>
            <img src="${step.image}" alt="${step.titre}" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${step.titre}</h2>
            <p>${step.description}</p>
          </div>
        </div>
      </div>
    `;
  });

  $("#timeline-carousel").html(html);
}

