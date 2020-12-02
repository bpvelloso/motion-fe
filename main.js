//var listaImagens = {};
var listaVideos = {};


var listaImagensCompleto = {};
var listaVideosCompleto = {};

var directory = '/motion-images/';

function carregaImagens() {

    // get auto-generated page 
    $.ajax({url: directory}).then(function(html) {
        // create temporary DOM element
        var iflinks = $(html);

        iflinks.find('a[href$=mp4]').each(function() {
            let index = this.href.split('/').slice(-1)[0];
                
            listaVideosCompleto[index] = this.href;
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
            html += `<div class="carousel-item ${ativo}">
                            <img class="d-block w-100" src="${listaVideos[k].slice(0,-3)+'jpg'}"
                                 onclick="mostraVideo('${listaVideos[k]}')" />
                        </div>`;
            navHtml +=`<li data-target="#carouselExampleIndicators" data-slide-to="${navIndex++}" class="${ativo}"></li>`
            ativo="";
            
        }
        carousel.innerHTML+=html;
        navCarousel.innerHTML+=navHtml;
        escondeCarregando();
    }
);

/**
 * Filtra as listas de imagens de vídeos por data
 * o parâmetro data deve ser no formato yyyy-mm-dd
 * 
 * @param {String} dataf 
 */
function filtraPorData(dataf) {
    $('#data').val(dataf);
    let data = dataf.split('-')[0]+dataf.split('-')[1]+dataf.split('-')[2];

    listaVideos = {};
    for(let iVid of Object.keys(listaVideosCompleto)){
        let file = listaVideosCompleto[iVid].split('/').slice(-1)[0];
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
    $('#videoSource').attr('src',vId);
    $('#videoModal').modal('show');
}

function vaiParaImagem(num) {
    $('#carouselExampleIndicators .active').removeClass("active");
        
    $('#imagens').children().eq(Number(num)).addClass("active");
    $('.carousel-indicators').children().eq(Number(num)).addClass("active");
    
}

function mostraCarregando(){
    $("#carregando").show();
}

function escondeCarregando(){
    $("#carregando").hide();
}


$( document ).ready(_=> {
    $('#carouselExampleIndicators').on('slide.bs.carousel', event=> {
        $('#inputImagem').val(event.to);
    });

    $("#prev-day").on("click",_=>{
        let dataAnterior = new Date($('#data').val());
        let dataAtual =new Date(dataAnterior.getTime() );
        let dataStr = `${dataAtual.getFullYear()}-${(dataAtual.getMonth()+1>=10?dataAtual.getMonth()+1:"0"+(dataAtual.getMonth()+1))}-${(dataAtual.getDate()>=10?dataAtual.getDate():"0"+dataAtual.getDate())}`;
        $('#data').val(dataStr);    
        filtraPorData(dataStr);
    });

    $("#next-day").on("click",_=>{
        let dataAnterior = new Date($('#data').val());
        let dataAtual =new Date(dataAnterior.getTime() + 86400000 + 86400000);
        let dataStr = `${dataAtual.getFullYear()}-${(dataAtual.getMonth()+1>=10?dataAtual.getMonth()+1:"0"+(dataAtual.getMonth()+1))}-${(dataAtual.getDate()>=10?dataAtual.getDate():"0"+dataAtual.getDate())}`;
        $('#data').val(dataStr);    
        filtraPorData(dataStr);
    });

    $("#share").on('click', event => {
        download($("#videoSource").attr("src"),$("#videoSource").attr("src").split('/').slice(-1)[0]);
      });

    mostraCarregando();
});

function download(dataurl, filename) {
    var a = document.createElement("a");
    a.href = dataurl;
    a.setAttribute("download", filename);
    
    $(a).on('click',download=>{
        console.log("Download: ",download);
    });

    a.click();
  }
  