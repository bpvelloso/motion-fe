var listaImagens = {};
var listaVideos = {};


var listaImagensCompleto = {};
var listaVideosCompleto = {};

function carregaImagens() {
    

    var directory = '/motion-images/';

    // get auto-generated page 
    $.ajax({url: directory}).then(function(html) {
        // create temporary DOM element
        var iflinks = $(html);

        
        iflinks.find('a[href$=jpg]').each(function() {
            let index = this.href.split('/').slice(-1)[0].split('-')[0];
                
            listaImagens[index] = this.href;
            
            //console.log("Add imagem "+index, this.href);
        })

        iflinks.find('a[href$=mp4]').each(function() {
            let index = this.href.split('/').slice(-1)[0].split('-')[0];
                
            listaVideos[index] = this.href;
            
            //console.log("Add video "+index, this.href);
        })

        initTela();
        document.dispatchEvent(new Event('mostraImagens'));

    });

    

}


document.addEventListener('mostraImagens', 
    function () {

        let carousel = document.querySelector('#imagens');
        let navCarousel = document.querySelector('.carousel-indicators');
        let ativo = "active";
        let html = "";
        let navHtml = "";
        let navIndex = 0;
        for(let k of Object.keys(listaVideos) ){
            //console.log("Mostrando imagem: "+k);
            html += `<div class="carousel-item ${ativo}">
                            <img class="d-block w-100" src="${listaImagens[k]}"
                                 onclick="mostraVideo(${k})" />
                        </div>`;
            navHtml +=`<li data-target="#carouselExampleIndicators" data-slide-to="${navIndex++}" class="${ativo}"></li>`
            ativo="";
            
        }
        carousel.innerHTML+=html;
        navCarousel.innerHTML+=navHtml;
    }
);


function filtraPorData(data) {
    console.log("Filtrando: ",data);
}

function initTela() {
    let tam = Object.keys(listaVideos).length;
    $('#inputImagem').attr('max',tam-1);
    $('#textMaxImagens').text(tam);
}

function mostraVideo(vId) {
    $('#videoSource').attr('src',listaVideos[vId]);
    $('#videoModal').modal('show');
}

function vaiParaImagem(num) {
    console.log("Vai para imagem ",num);
    $('#carouselExampleIndicators .active').removeClass("active");
        
    $('#imagens').children().eq(Number(num)).addClass("active");
    $('.carousel-indicators').children().eq(Number(num)).addClass("active");
    
}