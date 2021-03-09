let map;
let markers = [];

function initialize() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(31.7771, -40.24965),
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var request = new XMLHttpRequest();
    request.open('GET', '/locations', true);
    request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            let data = JSON.parse(request.responseText);
            for (let i = 0; i < data.length; i++) {
                markers.push(
                    new google.maps.Marker({
                        position: {
                            lat: parseFloat(data[i]['latitude']),
                            lng: parseFloat(data[i]['longitude']),
                        },
                        title: data[i]['label'],
                        visible: true,
                        map: map,
                        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    })
                );
            }
        } else {
            console.error('ERROR: ' + request.error + ', ' + request.status);
        }
    };
    request.onerror = () => {
        console.error('ERROR: ' + request.error + ', ' + request.status);
    };
    request.send();
}
