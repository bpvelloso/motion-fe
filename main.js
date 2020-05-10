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
                
            listaImagensCompleto[index] = this.href;
            
            //console.log("Add imagem "+index, this.href);
        })

        iflinks.find('a[href$=mp4]').each(function() {
            let index = this.href.split('/').slice(-1)[0].split('-')[0];
                
            listaVideosCompleto[index] = this.href;
            
            //console.log("Add video "+index, this.href);
        })


        filtraPorData(yyyymmdd());
        
        

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

        carousel.innerHTML = '';
        navCarousel.innerHTML = '';
        
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

/**
 * Filtra as listas de imagens de vídeos por data
 * o parâmetro data deve ser no formato yyyy-mm-dd
 * 
 * @param {String} dataf 
 */
function filtraPorData(dataf) {
    console.log("Filtrando: ",dataf);
    $('#data').val(dataf);
    let data = dataf.split('-')[0]+dataf.split('-')[1]+dataf.split('-')[2];

    listaImagens = {};
    for(let iImg of Object.keys(listaImagensCompleto)){
        let file = listaImagensCompleto[iImg].split('/').slice(-1)[0].split('-')[1];
        console.log("testando: "+file+" :: "+data, listaImagensCompleto[iImg]);
        
        if(file.startsWith(data)){
            listaImagens[iImg] = listaImagensCompleto[iImg];
        }
    }

    listaVideos = {};
    for(let iVid of Object.keys(listaVideosCompleto)){
        let file = listaVideosCompleto[iVid].split('/').slice(-1)[0].split('-')[1];
        if(file.startsWith(data)){
            listaVideos[iVid] = listaVideosCompleto[iVid];
        }
    }

    initTela();
}

function yyyymmdd() {
    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    var yyyymmdd = y +'-'+ m +'-'+ d;
    return yyyymmdd;
}

function initTela() {
    let tam = Object.keys(listaVideos).length;
    $('#inputImagem').attr('max',tam-1);
    $('#textMaxImagens').text(tam);

    document.dispatchEvent(new Event('mostraImagens'));
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