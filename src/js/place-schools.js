$(function () {

    var colors = [
        "#F9FA00", //5
        "#FFBC01", //7
        "#FF9400",  //8
        "#FC0229",  //10
        "#F5052A",  //13
    ]
    function getColor(val) {
        var result = colors[0];
        console.log(val);
        if (isNaN(val)){
            return colors[0];
        }
        if (val > 8000) {
            result = colors[4];
            console.log("Assign: 4");
        }
        if (val < 7000) {
            result = colors[3];
            console.log("Assign: 3")
        }
        if (val < 5000) {
            result = colors[2];
            console.log("Assign: 2");
        }
        if (val < 4000) {
            result = colors[1];
            console.log("Assign: 1");
        }
        if (val < 3000) {
            result = colors[0];
            console.log("Assign: " + 0);
        }

        return result;

    }

    if (ti.map) {
        function buildMarkers(items) {
            for (var i = 0; i < items.length; i++) {
                var data = items[i].split("|");
                if (parseInt(data[6]) === 0) {
                    var LL = { lat: parseFloat(data[2]), lng: parseFloat(data[3]) }
                    var expenditure = parseInt(data[4]);
                    var clr = getColor(expenditure);
                    var marker = new mapIcons.Marker({
                        position: LL,
                        map: ti.map,
                        icon: {
                            path:  mapIcons.shapes.SQUARE,
                            scale: 1,
                            fillColor: "none",
                            fillOpacity: 0,
                            strokeColor: '',
                            strokeWeight: 0
                        },
                        map_icon_label: '<span style="color:'+clr+';" class="map-icon map-icon-insurance-agency"></span>',
                        title: data[1]
                    });
                }
            }
        }





        var map = ti.map;
        $.get("/js/data.txt", function (data) {
            var items = data.split("\n");
            buildMarkers(items);
        })
    }

});