var map;
var marker_s, marker_e, marker_p1, marker_p2;
var totalMarkerArr = [];
var drawInfoArr = [];
var resultdrawArr = [];

function initTmap() {
    // 1. 지도 띄우기
    map = new Tmapv2.Map("map_div", {
        center : new Tmapv2.LatLng(36.35162358, 127.4232700),

        zoom : 15,
        zoomControl : true,
        scrollwheel : true
    });

    // 2. 시작, 도착 심볼찍기
    // 시작
    marker_s = new Tmapv2.Marker({
        position : new Tmapv2.LatLng(37.564991,126.983937),
        icon : "/upload/tmap/marker/pin_r_m_s.png",
        iconSize : new Tmapv2.Size(24, 38),
        map : map
    });

    // 도착
    marker_e = new Tmapv2.Marker({
        position : new Tmapv2.LatLng(37.566158,126.988940),
        icon : "/upload/tmap/marker/pin_r_m_e.png",
        iconSize : new Tmapv2.Size(24, 38),
        map : map
    });

    // 3. 출발지와 목적지 주소를 사용하여 경로 탐색
    $("#btn_select").click(function(){
        var startAddress = $('#startAddress').val();
        var endAddress = $('#endAddress').val();
        geocodeAddress(startAddress, function(startCoord) {
            geocodeAddress(endAddress, function(endCoord) {
                searchRoute(startCoord, endCoord);
            });
        });
    });

    
var positions = [
    {
        title: '범죄 가능성 등급:' + getCrimLevel(7),
        lonlat: new Tmapv2.LatLng(37.56520450, 126.98602028), // 수정된 좌표
        radius: 40
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(37.56520450, 126.98702028), // 수정된 좌표
        radius: 100
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(37.56520450, 126.98802028), // 수정된 좌표
        radius: 200
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.36633287, 127.4232098),
        radius: 200
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(9),
        lonlat: new Tmapv2.LatLng(36.3629067, 127.4236926),
        radius: 200
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(9),
        lonlat: new Tmapv2.LatLng(36.36432546, 127.4251265),
        radius: 150
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(7),
        lonlat: new Tmapv2.LatLng(36.36432546, 127.4251265),
        radius: 100
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(7),
        lonlat: new Tmapv2.LatLng(36.36393117, 127.4270297),
        radius: 65
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.36402623, 127.4281668),
        radius: 65
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.36083132, 127.4269794),
        radius: 35
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(9),
        lonlat: new Tmapv2.LatLng(36.35780207, 127.4298596),
        radius: 200
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(9),
        lonlat: new Tmapv2.LatLng(36.3602357, 127.4297281),
        radius: 150
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.37001526, 127.4292136),
        radius: 60
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(9),
        lonlat: new Tmapv2.LatLng(36.36723312, 127.4359954),
        radius: 200
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(7),
        lonlat: new Tmapv2.LatLng(36.36028142, 127.4320458),
        radius: 30
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(7),
        lonlat: new Tmapv2.LatLng(36.35793733, 127.4247965),
        radius: 30
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.35472383, 127.4275532),
        radius: 200
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.35484936, 127.4327344),
        radius: 200
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.35320126, 127.4324468),
        radius: 300
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(9),
        lonlat: new Tmapv2.LatLng(36.35219993, 127.4251999),
        radius: 160
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(9),
        lonlat: new Tmapv2.LatLng(36.34921293, 127.4263533),
        radius: 160
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.35448277, 127.4275969),
        radius: 200
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.35246508, 127.4279196),
        radius: 60
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(9),
        lonlat: new Tmapv2.LatLng(36.35379426, 127.4366501),
        radius: 250
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(7),
        lonlat: new Tmapv2.LatLng(36.35044237, 127.4340469),
        radius: 200
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(7),
        lonlat: new Tmapv2.LatLng(36.35497007, 127.4354758),
        radius: 210
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.3472931, 127.4327149),
        radius: 110
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.34834094, 127.4345142),
        radius: 35
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.34917049, 127.4368583),
        radius: 35
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(9),
        lonlat: new Tmapv2.LatLng(36.35021429, 127.4397383),
        radius: 150
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(9),
        lonlat: new Tmapv2.LatLng(36.35238353, 127.4379903),
        radius: 90
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(9),
        lonlat: new Tmapv2.LatLng(36.35382791, 127.4373076),
        radius: 250
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(9),
        lonlat: new Tmapv2.LatLng(36.35126851, 127.4410031),
        radius: 150
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(9),
        lonlat: new Tmapv2.LatLng(36.35152318, 127.4476443),
        radius: 500
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.34957478, 127.4517327),
        radius: 350
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.35787668, 127.4487836),
        radius: 400
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(9),
        lonlat: new Tmapv2.LatLng(36.34220687, 127.4483596),
        radius: 400
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.34540459, 127.4487455),
        radius: 100
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.3454413, 127.4461613),
        radius: 150
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(7),
        lonlat: new Tmapv2.LatLng(36.3366034, 127.4430367),
        radius: 100
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(7),
        lonlat: new Tmapv2.LatLng(36.33819327, 127.444438),
        radius: 100
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(7),
        lonlat: new Tmapv2.LatLng(36.33981814, 127.4461181),
        radius: 150
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.34194558, 127.4483469),
        radius: 350
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.33834688, 127.4491505),
        radius: 200
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.336189, 127.447835),
        radius: 150
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.33381717, 127.445889),
        radius: 100
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(9),
        lonlat: new Tmapv2.LatLng(36.33229662, 127.4415923),
        radius: 250
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(7),
        lonlat: new Tmapv2.LatLng(36.33862179, 127.4345104),
        radius: 200
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(7),
        lonlat: new Tmapv2.LatLng(36.34067254, 127.4355911),
        radius: 30
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(9),
        lonlat: new Tmapv2.LatLng(36.33271995, 127.4267702),
        radius: 1000
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.33254825, 127.4166896),
        radius: 200
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.33760157, 127.4173402),
        radius: 200
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.33934315, 127.4140859),
        radius: 150
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.33877576, 127.4087474),
        radius: 150
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.34144618, 127.4105214),
        radius: 250
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(7),
        lonlat: new Tmapv2.LatLng(36.34007237, 127.403764),
        radius: 50
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(7),
        lonlat: new Tmapv2.LatLng(36.35352811, 127.3953219),
        radius: 500
    },
    {
        title: '범죄 가능성 등급:' + getCrimLevel(8),
        lonlat: new Tmapv2.LatLng(36.3665151, 127.4110207),
        radius: 140
    }
];


for (var i = 0; i < positions.length; i++) {
    var lonlat = positions[i].lonlat;
    var title = positions[i].title;
    var radius = positions[i].radius;
    var crimeLevel = parseInt(title.match(/\d+/)[0]); // 제목에서 범죄 수준 추출

    // 범죄 수준에 따라 투명도 계산
    var opacity = 0.1 + (crimeLevel / 10); // 필요에 따라 이 계산을 조정합니다.

    // 마커 객체 생성
    var marker = new Tmapv2.Marker({
        position: lonlat,
        map: map,
        icon: {
            url: 'public/main/icon1.png',
            scaledSize: new Tmapv2.Size(40, 40) // 아이콘의 크기를 조정합니다.
        },
        label: title
    });

    // 반경을 원으로 표시
    var circle = new Tmapv2.Circle({
        center: lonlat,
        radius: radius,
        fillColor: 'rgba(255, 0, 0, ' + opacity + ')', // 투명도 동적으로 설정
        strokeColor: 'red',
        strokeWeight: 2,
        map: map
    });

    // 반경 내에 라벨 표시
    var circleLabel = new Tmapv2.Label({
        position: lonlat,
        map: map,
        text: '반경 ' + radius + 'm',
        zIndex: 1,
        offset: new Tmapv2.Point(0, -radius / 2),
        textAlign: 'center',
        fontSize: '12px',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        color: 'red'
    });
}

// 범죄 등급에 해당하는 정수 값을 반환하는 함수
function getCrimLevel(level) {
    switch (level) {
        case 7:
            return 7;
        case 8:
            return 8;
        case 9:
            return 9;
        default:
            return level;
    }
}
}

function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

function drawLine(arrPoint) {
    var polyline_;
    polyline_ = new Tmapv2.Polyline({
        path : arrPoint,
        strokeColor : "#0000FF", // 파란색으로 변경
        strokeWeight : 6,
        map : map
    });
    resultdrawArr.push(polyline_);
}

function geocodeAddress(address, callback) {
    var headers = {};
    headers["appKey"] = "pRNUlsEpce4d3mB0MUabnMDhHbLmdtlPrUYZI3i0";

    $.ajax({
        method: "GET",
        headers: headers,
        url: "https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?version=1&format=json&callback=result",
        async: false,
        data: {
            "coordType": "WGS84GEO",
            "fullAddr": address
        },
        success: function(response) {
            var resultInfo = response.coordinateInfo;
            if (resultInfo.coordinate.length == 0) {
                console.log("주소 변환 실패");
            } else {
                var lon, lat;
                var resultCoordinate = resultInfo.coordinate[0];
                if (resultCoordinate.lon.length > 0) {
                    lon = resultCoordinate.lon;
                    lat = resultCoordinate.lat;
                } else {
                    lon = resultCoordinate.newLon;
                    lat = resultCoordinate.newLat;
                }
                var coord = { lat: lat, lon: lon };
                callback(coord);
            }
        },
        error: function(request, status, error) {
            console.log("code:" + request.status + "\n message:" + request.responseText + "\n error:" + error);
        }
    });
}

function searchRoute(startCoord, endCoord) {
    var headers = {};
    headers["appKey"] = "pRNUlsEpce4d3mB0MUabnMDhHbLmdtlPrUYZI3i0";

    $.ajax({
        method: "POST",
        headers: headers,
        url: "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
        async: false,
        data: {
            "startX": startCoord.lon,
            "startY": startCoord.lat,
            "endX": endCoord.lon,
            "endY": endCoord.lat,
            "reqCoordType": "WGS84GEO",
            "resCoordType": "EPSG3857",
            "startName": "출발지",
            "endName": "도착지"
        },
        success: function(response) {
            var resultData = response.features;
            var tDistance = "총 거리 : " + ((resultData[0].properties.totalDistance) / 1000).toFixed(1) + "km,";
            var tTime = " 총 시간 : " + ((resultData[0].properties.totalTime) / 60).toFixed(0) + "분";
            $("#result").text(tDistance + tTime);
            
            if (resultdrawArr.length > 0) {
                for (var i in resultdrawArr) {
                    resultdrawArr[i].setMap(null);
                }
                resultdrawArr = [];
            }
            
            drawInfoArr = [];
            for (var i in resultData) {
                var geometry = resultData[i].geometry;
                var properties = resultData[i].properties;
                var polyline_;
                if (geometry.type == "LineString") {
                    for (var j in geometry.coordinates) {
                        var latlng = new Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
                        var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                        var convertChange = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
                        drawInfoArr.push(convertChange);
                    }
                } else {
                    var markerImg = "";
                    var pType = "";
                    var size;

                    if (properties.pointType == "S") { //출발지 마커
                        markerImg = "/upload/tmap/marker/pin_r_m_s.png";
                        pType = "S";
                        size = new Tmapv2.Size(24, 38);
                    } else if (properties.pointType == "E") { //도착지 마커
                        markerImg = "/upload/tmap/marker/pin_r_m_e.png";
                        pType = "E";
                        size = new Tmapv2.Size(24, 38);
                    } else { //각 포인트 마커
                        markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                        pType = "P";
                        size = new Tmapv2.Size(8, 8);
                    }

                    // 경로들의 결과값들을 포인트 객체로 변환 
                    var latlon = new Tmapv2.Point(
                            geometry.coordinates[0],
                            geometry.coordinates[1]);

                    // 포인트 객체를 받아 좌표값으로 다시 변환
                    var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                            latlon);

                    var routeInfoObj = {
                        markerImage : markerImg,
                        lng : convertPoint._lng,
                        lat : convertPoint._lat,
                        pointType : pType
                    };

                    // Marker 추가
                    marker_p = new Tmapv2.Marker(
                            {
                                position : new Tmapv2.LatLng(
                                        routeInfoObj.lat,
                                        routeInfoObj.lng),
                                icon : routeInfoObj.markerImage,
                                iconSize : size,
                                map : map
                            });
                }
            }//for문 [E]
            drawLine(drawInfoArr);
        },
        error : function(request, status, error) {
            console.log("code:" + request.status + "\n"
                    + "message:" + request.responseText + "\n"
                    + "error:" + error);
        }
    });
}

function navigation ()
{
    // 2. 시작, 도착 심볼찍기
    // 시작
    marker_s = new Tmapv2.Marker({
        position : new Tmapv2.LatLng(37.564991,126.983937),
        icon : "/upload/tmap/marker/pin_r_m_s.png",
        iconSize : new Tmapv2.Size(24, 38),
        map : map
    });

    // 도착
    marker_e = new Tmapv2.Marker({
        position : new Tmapv2.LatLng(37.566158,126.988940),
        icon : "/upload/tmap/marker/pin_r_m_e.png",
        iconSize : new Tmapv2.Size(24, 38),
        map : map
    });

    // 3. 출발지와 목적지 주소를 사용하여 경로 탐색
    $("#btn_select").click(function(){
        var startAddress = $('#startAddress').val();
        var endAddress = $('#endAddress').val();
        geocodeAddress(startAddress, function(startCoord) {
            geocodeAddress(endAddress, function(endCoord) {
                searchRoute(startCoord, endCoord);
            });
        });
    });
}