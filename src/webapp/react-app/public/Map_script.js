var map, marker;
var markerArr = [];
var labelArr = [];

function initTmap() {
    // 1. 지도 띄우기
    map = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng(36.35162358, 127.4232700), // 초기 중심 좌표 설정
        zoom: 14, // 지도 줌 레벨
        zoomControl: true,
        scrollwheel: true
    });
    

    // 2. 주소 입력 후 검색 버튼 클릭 이벤트
    $("#btn_select").click(function () {
        var searchKeyword = $('#searchKeyword').val();
        var headers = {};
        headers["appKey"] = "pRNUlsEpce4d3mB0MUabnMDhHbLmdtlPrUYZI3i0";

        // 3. 지오코딩 API 요청
        $.ajax({
            method: "GET",
            headers: headers,
            url: "https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?version=1&format=json&callback=result",
            async: false,
            data: {
                "coordType": "WGS84GEO",
                "fullAddr": searchKeyword
            },
            success: function (response) {
                var resultInfo = response.coordinateInfo;
                console.log(resultInfo);
                // lan, lon은 x, y 좌표.
                if (resultInfo.coordinate.length == 0) {
                    $("#result").text("요청 데이터가 올바르지 않습니다.");
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

                    var lonEntr, latEntr;

                    if (resultCoordinate.lonEntr == undefined && resultCoordinate.newLonEntr == undefined) {
                        lonEntr = 0;
                        latEntr = 0;
                    } else {
                        if (resultCoordinate.lonEntr.length > 0) {
                            lonEntr = resultCoordinate.lonEntr;
                            latEntr = resultCoordinate.latEntr;
                        } else {
                            lonEntr = resultCoordinate.newLonEntr;
                            latEntr = resultCoordinate.newLatEntr;
                        }
                    }

                    var markerPosition = new Tmapv2.LatLng(Number(lat), Number(lon));



                    // 4. 검색된 주소를 지도에 표시
                    map.setCenter(markerPosition);

                    // 5. POI 통합 검색 API 요청
                    $.ajax({
                        method: "GET",
                        headers: headers,
                        url: "https://apis.openapi.sk.com/tmap/pois?version=1&format=json&callback=result",
                        async: false,
                        data: {
                            "searchKeyword": searchKeyword,
                            "resCoordType": "EPSG3857",
                            "reqCoordType": "WGS84GEO",
                            "count": 10
                        },
                        success: function (response) {
                            var resultpoisData = response.searchPoiInfo.pois.poi;

                            // 기존 마커, 팝업 제거
                            if (markerArr.length > 0) {
                                for (var i in markerArr) {
                                    markerArr[i].setMap(null);
                                }
                            }
                            if (labelArr.length > 0) {
                                for (var i in labelArr) {
                                    labelArr[i].setMap(null);
                                }
                            }
                            var innerHtml = ""; // Search Results 결과값 노출 위한 변수
                            var positionBounds = new Tmapv2.LatLngBounds(); // 맵에 결과물 확인 하기 위한 LatLngBounds객체 생성

                            for (var k in resultpoisData) {

                                var noorLat = Number(resultpoisData[k].noorLat);
                                var noorLon = Number(resultpoisData[k].noorLon);
                                var name = resultpoisData[k].name;
                                var poiId = resultpoisData[k].id;

                                var pointCng = new Tmapv2.Point(noorLon, noorLat);
                                var projectionCng = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(pointCng);

                                var lat = projectionCng._lat;
                                var lon = projectionCng._lng;

                                var markerPosition = new Tmapv2.LatLng(lat, lon);

                                marker = new Tmapv2.Marker({
                                    position: markerPosition,
                                    title: name,
                                    label: String(Number(k) + 1), // 텍스트 숫자로 표시
                                    map: map
                                });

                                marker.addListener('click', function () {
                                    poiDetail(poiId); // poiDetail 함수에 poiId 전달하여 세부 정보 표시
                                });
                                
                                innerHtml += "<li><span>" + (Number(k) + 1) + "</span><span>.  " + name + "</span></li>";

                                markerArr.push(marker);
                                positionBounds.extend(markerPosition); // LatLngBounds의 객체 확장
                            }

                            $("#searchResult").html(innerHtml); // searchResult 결과값 노출
                            map.panToBounds(positionBounds); // 확장된 bounds의 중심으로 이동시키기
                            map.zoomOut();

                        },
                        error: function (request, status, error) {
                            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                        }
                    });

                }
            },
            error: function (request, status, error) {
                console.log(request);
                console.log("code:" + request.status + "\n message:" + request.responseText + "\n error:" + error);
                map.setCenter(new Tmapv2.LatLng(37.570028, 126.986072));
                $("#result").html("");
            }
        });

    });

        // 다중 마커 생성
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
