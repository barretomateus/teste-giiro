(function () {
    var map, csrfCookie, loadMarkers, addMarker, finishAddMarker, removeMarker, dragMarker,
    onAddMarker;

    map = L.map('map').setView([51.505, -0.09], 13);

    csrfCookie = $.cookie('csrftoken');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    /**
     * Carrega todos os marcadores no mapa
     */
    loadMarkers =  function () {
        /**
         * Implemente aqui a função de carregar todos os marcadores ao carregar o mapa.
         */
    };

    /**
     * Adiciona marcador no banco e em caso de sucesso ao mapa
     */
    addMarker = function (marker) {
        var data = {}, successAjax, errorAjax;

        data.lat = marker.latlng.lat;
        data.lng = marker.latlng.lng;

        successAjax = function (response) {
            var responseJson;

            responseJson = JSON.parse(response);
            finishAddMarker(responseJson);
        };

        errorAjax = function (e) {
            window.alert('Erro ao adicionar marcador');
            console.log('Internal Error', e);
        };

        $.ajax({
            type: 'POST',
            url: '/add-marker/',
            headers: { 'X-CSRFToken': csrfCookie },
            data: data,
            success: function (response) {
                successAjax(response);
            },

            error: function (error) {
                errorAjax(error);
            }
        });
    };

    /**
     * Adiciona marcador no mapa
     */
    finishAddMarker = function (data) {
        var marker, lat, lng, buttonHTML;

        lat = data.lat;
        lng = data.lng;

        marker = L.marker([lat, lng], { draggable: true, id: data.id }).addTo(map);

        buttonHTML = $('<a class="btn-floating red"><i class="material-icons">delete</i></a>').click(removeMarker.bind(this, marker))[0];

        marker.bindPopup(buttonHTML);
        marker.on('dragend', dragMarker.bind(this));
    };

    /**
     * Remove marcador do mapa
     */
    removeMarker = function (marker) {
        /**
         * Implemente aqui a função de remover o marcador do mapa e do banco.
         */
    };

    /**
     * Move marcador no mapa
     */
    dragMarker = function (marker) {
        /**
         * Implemente aqui a função de mover o marcador no mapa e no banco.
         */
    };

    map.on('click', addMarker.bind(this));

    /**
     * Caso queira implementar a funcionalodade bônus, utilize o $.cookie para persistir
     * tanto a última posição quanto o último zoom.
     */

}(window));
