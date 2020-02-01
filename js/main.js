$(document).ready(function() {
  var source = $("#cd-template").html();
  var cdTemplate = Handlebars.compile(source);

  var genreListaTemplate = Handlebars.compile($("#lista-templates").html());

  function disegnaGeneri (listaGeneriMusicali) {
    var context = { generi: listaGeneriMusicali };

    var listaHtml = genreListaTemplate(context);

    $(".lista-generi").append(listaHtml);

  }

  function disegnaAlbums(albums) {
    $('.cds-container').empty();
    for ( i = 0; i < albums.length; i++) {
      const album = albums[i];
      const albumHtml = cdTemplate(album);
      $('.cds-container').append(albumHtml);
    }
  }

  function elencaGeneri(albums) {
    var listaGeneri = [];


    for ( i = 0; i < albums.length; i++) {
      var genere = albums[i].genre;

      var nonEsiste = listaGeneri.indexOf(genere) < 0;
      if ( nonEsiste ) {
        listaGeneri.push(genere);
      }
    }

    return listaGeneri;
  }


  function filtraAlbum (genere, albums) {
    var albumSelezionati = [];
    for (i = 0; i < albums.length; i++) {
      var albumCorrente = albums[i];
      if ( albumCorrente.genre === genere ) {
        albumSelezionati.push(albumCorrente);
      }
    }




    return albumSelezionati;
  }

  var tuttiGliAlbum = [];
  var tuttiIGeneri = [];

  $('.lista-generi').change(function(event) {
    var genereSelezionato = this.value;
    var albumFiltrati = filtraAlbum(genereSelezionato, tuttiGliAlbum);
    disegnaAlbums(albumFiltrati);


  });

  $.ajax({
    url : "https://flynn.boolean.careers/exercises/api/array/music",
    method : "GET",
    success : function(dati, status) {
      tuttiGliAlbum = dati.response;
      disegnaAlbums(tuttiGliAlbum);
      tuttiIGeneri = elencaGeneri(tuttiGliAlbum);
      disegnaGeneri(tuttiIGeneri);
    }
  })

})
