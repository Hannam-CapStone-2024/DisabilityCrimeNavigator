var map;
var marker_s, marker_e, marker_p1, marker_p2;
var totalMarkerArr = [];
var drawInfoArr = [];
var resultdrawArr = [];

function initTmap() {
    var mylat;
    var mylng;
    navigator.geolocation.getCurrentPosition(
        (position) => {
            mylat = position.coords.latitude;
            mylng = position.coords.longitude;
        },
        (error) => {
            console.error("Error getting current position:", error);
            // 현재 위치를 가져오지 못한 경우에 대한 처리를 추가할 수 있습니다.
        }
    );
    // 1. 지도 띄우기
    map = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng(mylat, mylng),
        width: "100%",
        height: "400px",
        zoom: 17,
        zoomControl: true,
        scrollwheel: true
    });

    $("#btn_select").click(function () {
        var searchKeyword = $('#searchKeyword').val();
        searchPOI(searchKeyword);
    });

    // 검색 결과 리스트 닫기 이벤트 처리
    $('#searchResult').on('hidden.bs.collapse', function () {
        // 리스트 닫힌 후 검색 버튼 활성화
        enableSearchButton();
    });


}

function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

function drawLine(arrPoint) {
    var polyline_;

    polyline_ = new Tmapv2.Polyline({
        path: arrPoint,
        strokeColor: "#DD0000",
        strokeWeight: 6,
        map: map
    });
    resultdrawArr.push(polyline_);
}

// POI 검색 함수
function searchPOI(keyword) {
    var headers = {};
    headers["appKey"] = "pRNUlsEpce4d3mB0MUabnMDhHbLmdtlPrUYZI3i0"; // AppKey 설정

    var center = map.getCenter();
    var optionObj = {
        reqCoordType: "WGS84GEO",
        resCoordType: "WGS84GEO",
        centerLon: center.lng(),
        centerLat: center.lat()
    };

    var params = {
        onComplete: onComplete,
        onProgress: onProgress,
        onError: onError
    };

    var tData = new Tmapv2.extension.TData();
    tData.getPOIDataFromSearchJson(encodeURIComponent(keyword), optionObj, params);

    disableSearchButton(); // 검색 중 버튼 비활성화
    $('#searchResult').show(); // 검색 결과가 있을 때 리스트 보이기
}

// POI 검색 완료 시 호출되는 함수
function onComplete() {
    var resultpoisData = this._responseData.searchPoiInfo.pois.poi;
    var resultList = $('#searchResult');
    resultList.empty();

    if (resultpoisData != '') {
        $(resultpoisData).each(function () {
            var name = this.name;
            var lon = this.frontLon;
            var lat = this.frontLat;
            var lonlatoption = {
                title: name,
                lonlat: new Tmapv2.LatLng(lat, lon)
            };
            var listItem = $('<li class="result-item"></li>');
            listItem.text(name);
            listItem.data('lonlatoption', lonlatoption);
            resultList.append(listItem);

            // 리스트 아이템 클릭 이벤트
            listItem.click(function () {
                var lonlat = $(this).data('lonlatoption').lonlat;
                map.setCenter(lonlat); // 클릭된 위치로 지도의 중심 이동
                addMarker(lonlatoption); // 해당 위치에 마커 추가
                $('#searchResult').hide(); // 리스트 숨김
                // $('#startAddress').val(name); // 출발지 주소 입력
                // 버튼 활성화는 여기서 하지 않음
            });
        });
        enableSearchButton(); // 검색 결과가 있을 때 활성화
    } else {
        alert('검색결과가 없습니다.');
        enableSearchButton(); // 검색 결과가 없을 때도 활성화
    }
}

// POI 검색 진행 중 호출되는 함수
function onProgress() {
    // 검색 진행 중 처리
}

// POI 검색 오류 발생 시 호출되는 함수
function onError() {
    alert("검색 중 오류가 발생했습니다.");
    enableSearchButton();
}

// 검색 버튼 비활성화 함수
function disableSearchButton() {
    $("#btn_select").prop('disabled', true);
}

// 검색 버튼 활성화 함수
function enableSearchButton() {
    $("#btn_select").prop('disabled', false);
}
var marker
// 마커 추가 함수
function addMarker(lonlatoption) {
    var marker = new Tmapv2.Marker({
        position: lonlatoption.lonlat,
        map: map,
        title: lonlatoption.title
    });

    // 마커 클릭 이벤트 리스너 등록
    marker.addListener('click', markerClickHandler);

    // 마커 클릭 시 주소 정보 가져오기 및 표시
    function markerClickHandler(event) {
        var position = marker.getPosition(); // 클릭된 마커의 좌표
        getAddressFromCoordinates(position, lonlatoption);
    }
}


// 클릭된 마커의 좌표를 이용하여 주소 정보 가져오기
function getAddressFromCoordinates(position, lonlatoption) {
    var tData = new Tmapv2.extension.TData();

    var optionObj = {
        coordType: "WGS84GEO",       // 응답좌표 타입 옵션 설정
        addressType: "A04"           // 주소타입 옵션 설정
    };

    var params = {
        onComplete: function () {
            // 주소 정보를 가져온 후 실행되는 함수
            var result = '주소 : ' + this._responseData.addressInfo.fullAddress;
            // alert(result); // 주석 처리하여 알림 대신 모달 창에 표시
            showModal(result, lonlatoption, position); // 모달 창 열기 함수 호출
        },
        onProgress: function () {
            // 데이터 로드 중 실행하는 함수
        },
        onError: function () {
            // 데이터 로드 중 에러가 발생했을 때 실행하는 함수
            alert("주소 정보를 가져오는 중 에러가 발생했습니다.");
        }
    };

    // 클릭된 마커의 좌표를 이용하여 주소 정보 가져오기
    tData.getAddressFromGeoJson(position.lat(), position.lng(), optionObj, params);
}
var startLng;
var startLat;
var endLng;
var endLat;
var startName;
var endName;
function showModal(address, lonlatoption, position) {
    // 모달 내용에 주소 정보 추가
    $('#modal-content').html(`
            <button class="close" onclick="closeModal()">X</button>
            <h2>${lonlatoption.title}주소 정보</h2>
            <p>${address}</p>
            <p>'${position.lat()}', '${position.lng()}'</p>
            <button onclick="setStartAddress('${lonlatoption.title}', '${position.lng()}', '${position.lat()}')">출발지</button>
            <button onclick="setEndAddress('${lonlatoption.title}', '${position.lng()}','${position.lat()}')">도착지</button>
        `);
    $('#modal').show(); // 모달 창 보이기
}

// 출발지 설정 함수
function setStartAddress(title, positionX, positionY) {
    startName = title;
    startLng = positionX;
    startLat = positionY; // 출발지 정보 전역 변수에 저장
    $('#startAddress').val(title); // 출발 주소 입력란에 값 설정
        closeModal(); // 모달 창 닫기
}

// 도착지 설정 함수
function setEndAddress(title, positionX, positionY) {
    endName = title;
    endLng = positionX; // 도착지 정보 전역 변수에 저장
    endLat = positionY;
    $('#endAddress').val(title); // 도착지 주소 입력란에 값 설정

    closeModal(); // 모달 창 닫기
}
function closeModal() {
    $('#modal').hide(); // 모달 창 숨기기
}

function requestPedestrianRoute()
{
    var routeOption = document.getElementById("routeOption").value;

    var headers = {};
    headers["appKey"] = "pRNUlsEpce4d3mB0MUabnMDhHbLmdtlPrUYZI3i0";

    $.ajax({
        method: "POST",
        headers: headers,
        url: "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
        async: false,
        data: {
            "startX": startLng,
            "startY": startLat,
            "endX": endLng,
            "endY": endLat,
            "searchOption": routeOption,
            "reqCoordType": "WGS84GEO",
            "resCoordType": "EPSG3857",
            "startName": "출발지",
            "endName": "도착지"
        },
        success: function (response) {
            var resultData = response.features;

            // 결과 출력
            var tDistance ="총 거리는 " + ((resultData[0].properties.totalDistance) / 1000).toFixed(1) + "km, <br>";
            var tTime = "총 시간은 " + ((resultData[0].properties.totalTime) / 60).toFixed(0) + "분 입니다.";

            $("#result").html(tDistance + tTime);
            var descriptionContainer = $("#description").html(descriptionContainer);;
            descriptionContainer.empty();

            // 각 경로 안내를 표시
            for (var i = 0; i < resultData.length - 1; i++) {
                // 짝수 번호의 요소에서 시간 정보를 가져옵니다.
                var sTime = resultData[i + 1].properties.time;
                var formattedTime = formatTime(sTime);
                var tDescription = resultData[i].properties.description;
                descriptionContainer.append("<br>" + tDescription + formattedTime);
                i++; // 인덱스를 2씩 증가시켜서 홀수 번호의 요소를 건너뜁니다.
            }
            // 기존에 그려진 라인 및 마커 초기화
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

                if (geometry.type == "LineString") {
                    for (var j in geometry.coordinates) {
                        // 경로들의 결과값(구간)들을 포인트 객체로 변환
                        var latlng = new Tmapv2.Point(
                            geometry.coordinates[j][0],
                            geometry.coordinates[j][1]);
                        // 포인트 객체를 받아 좌표값으로 변환
                        var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                            latlng);
                        // 포인트 객체의 정보로 좌표값 변환 객체로 저장
                        var convertChange = new Tmapv2.LatLng(
                            convertPoint._lat,
                            convertPoint._lng);
                        // 배열에 담기
                        drawInfoArr.push(convertChange);
                    }
                } else {
                    var markerImg = "";
                    var pType = "";
                    var size;

                    if (properties.pointType == "S") { // 출발지 마커
                        markerImg = "/upload/tmap/marker/pin_r_m_s.png";
                        pType = "S";
                        size = new Tmapv2.Size(24, 38);
                    } else if (properties.pointType == "E") { // 도착지 마커
                        markerImg = "/upload/tmap/marker/pin_r_m_e.png";
                        pType = "E";
                        size = new Tmapv2.Size(24, 38);
                    } else { // 각 포인트 마커
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
                        markerImage: markerImg,
                        lng: convertPoint._lng,
                        lat: convertPoint._lat,
                        pointType: pType
                    };

                    // Marker 추가
                    marker_p = new Tmapv2.Marker(
                        {
                            position: new Tmapv2.LatLng(
                                routeInfoObj.lat,
                                routeInfoObj.lng),
                            icon: routeInfoObj.markerImage,
                            iconSize: size,
                            map: map
                        });
                }
            }
            drawLine(drawInfoArr); // 경로 그리기
        },
        error : function(request, status, error) {
            console.log("code:" + request.status + "\n"
                    + "message:" + request.responseText + "\n"
                    + "error:" + error);
        }
    });
}
function formatTime(seconds) {
    if (isNaN(seconds)) {
        return "";
    }

    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.round(seconds % 60); // 소수점 아래 자릿수를 반올림하여 정수로 변환
    return "("+ minutes + "분 " + remainingSeconds + "초" + " 걸릴 예정입니다.)<br>";
}