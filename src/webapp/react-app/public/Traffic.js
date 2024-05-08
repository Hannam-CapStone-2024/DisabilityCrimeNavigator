// traffic.js
//일정 영역(사각형, 반경), 전방, 특정지점에 대하여 소통정보와 사고정보를 조회할 수 있습니다. 전송된 데이터를 지도와 매핑하여 교통정보 서비스를 구축할 수 있습니다.
var polyLineArr = [];

var map;
//교통정보를 그릴 레이어
var routeLayer;
//지도 이동시 지도 레벨 정보 담을 변수
//초기값
var zoom=15;
//초기값
var centerLon = "127.42086410522";
var centerLat = "36.35472069071";

function initTmap(){
    // map 생성
    // Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
    map = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng(37.56520450, 126.98702028),
        width : "100%",
        height : "400px",
        zoom : 17,
        zoomControl : true,
        scrollwheel : true
    });

    //지도 이동시 이동이 끝나면 발생하는 이벤트를 추가합니다.
    map.addListener("mouseup", function onMoveEnd(evt){
        var mapLatLng = evt.latLng;

        zoom = map.getZoom();

        $("#zoom").text(zoom);
        $("#center_zoom").text(zoom);

        //지도의 센터좌표를 넣어줍니다 
        centerLon = mapLatLng._lng;
        centerLat = mapLatLng._lat;

        $("#lon").val(centerLon);
        $("#lat").val(centerLat);
        $("#center_lon").text(centerLon);
        $("#center_lat").text(centerLat);
        $("#center_lon2").text(centerLon);
        $("#center_lat2").text(centerLat);

    });


    //요청 버튼 클릭시 교통정보 API가 요청됩니다.
    $("#btn_select").click(function(){
        if(routeLayer){
            routeLayer.removeAllFeatures();//레이어의 모든 도형을 지웁니다.
        }
        var headers = {}; 
            headers["appKey"]="발급AppKey";

        $.ajax({
            type:"GET",
            headers : headers,
            url:"https://apis.openapi.sk.com/tmap/traffic?version=1&format=json",
            async:false,
            data: {
                        "reqCoordType": "WGS84GEO",//요청 좌표계 유형을 지정합니다.
                        "resCoordType": "EPSG3857",//받고자 하는 응답 좌표계 유형을 지정합니다.
                        "zoomLevel" : zoom,//교통 정보를 표현할 맵의 레벨을 지정합니다.
                        "trafficType" : "AUTO", //지도레벨에 맞는 최적 범위의 교통정보를 요청합니다.
                        "centerLon" : centerLon, // 반경 검색에서 사용되는 중심 좌표의 경도 좌표입니다.
                        "centerLat" : centerLat  // 반경 검색에서 사용되는 중심 좌표의 위도 좌표입니다
            },

            //데이터 로드가 성공적으로 완료되었을 때 발생하는 함수입니다.
            success:function(response){
                var resultData = response.features;
                console.log(resultData);
                if(polyLineArr.length > 0){
                    for(var k in polyLineArr){
                        polyLineArr[k].setMap(null);
                    }
                    polyLineArr = [];
                }

                for(var i in resultData) {
                    var geometry = resultData[i].geometry;
                    var properties = resultData[i].properties;
                    var polyline_;

                    drawInfoArr = [];

                    if(geometry.type == "LineString") {

                        for(var j in geometry.coordinates){
                            // 경로들의 결과값(구간)들을 포인트 객체로 변환 
                            var latlng = new Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
                            // 포인트 객체를 받아 좌표값으로 변환
                            var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                            // 포인트객체의 정보로 좌표값 변환 객체로 저장
                            var convertChange = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);

                            drawInfoArr.push(convertChange);
                        }

                        //strokeColor는 교통 정보상황에 다라서 변화
                        //congestion :  0-정보없음, 1-원활, 2-서행, 3-지체, 4-정체  (black, green, yellow, orange, red)
                        var lineColor = "";

                        var sectionCongestion = properties.congestion;

                        if(sectionCongestion == 0){
                            lineColor = "#06050D";
                        }else if(sectionCongestion == 1){
                            lineColor = "#61AB25";
                        }else if(sectionCongestion == 2){
                            lineColor = "#FFFF00";
                        }else if(sectionCongestion == 3){
                            lineColor = "#E87506";
                        }else if(sectionCongestion == 4){
                            lineColor = "#D61125";
                        }

                        polyline_ = new Tmapv2.Polyline({
                            path : drawInfoArr,
                            strokeColor : lineColor,
                            strokeWeight: 6,
                            map : map
                        });
                        polyLineArr.push(polyline_);
                    }
                }
            },
            //요청 실패시 콘솔창에서 에러 내용을 확인할 수 있습니다.
            error:function(request,status,error){
                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });

    });
}

