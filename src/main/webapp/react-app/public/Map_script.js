var map, marker;
var markerArr = [];
var labelArr = [];

async function initTmap() {
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

    fetch("/GetCrimeZone")	// 호출
        .then((response) => console.log("response:", response))	// 성공
        .catch((error) => console.log("error:", error));	// 실패


    var positions = [
        {
            title: '범죄 가능성 등급:' + getCrimLevel(7),
            lonlat: new Tmapv2.LatLng(37.56520450, 126.98602028), // 수정된 좌표
            radius: 40
        },
        {
            title: '범죄 가능성 등급:' + getCrimLevel(7),
            lonlat: new Tmapv2.LatLng(36.35352811, 127.3953219),
            radius: 500
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
