var map;

// 페이지가 로딩된 후 호출하는 함수입니다.
function initTmap() {
  // 지도 생성
  map = new Tmapv2.Map("map_div", {
    center: new Tmapv2.LatLng(36.35162358, 127.4232700), // 초기 중심 좌표 설정
    zoom: 14, // 초기 줌 레벨 설정
    zoomControl: true,
    scrollwheel: true
  });

  // 검색 버튼 클릭 이벤트
  $("#btn_select").click(function () {
    var searchKeyword = $('#searchKeyword').val();
    searchPOI(searchKeyword);
  });

  // 검색 결과 리스트 닫기 이벤트 처리
  $('#searchResult').on('hidden.bs.collapse', function () {
    // 리스트 닫힌 후 검색 버튼 활성화
    enableSearchButton();
  });

  // 여기에 범죄 관련 코드 넣으면 지도에 표시됨둥
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

fetch("/api/data")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        console.log(data); // 데이터 출력
    })
    .catch((error) => {
        console.error("Error fetching data:", error); // 에러 처리
    });

fetch("/api/data")
    .then((response) => response.json())
    .then((data) => {
        console.log(data); // 데이터 출력
    })
    .catch((error) => {
        console.error("Error fetching data:", error); // 에러 처리
    });

    for (var i = 0; i < positions.length; i++) {
        var lonlat = positions[i].lonlat;
        var title = positions[i].title;
        var radius = positions[i].radius;
        var crimeLevel = parseInt(title.match(/\d+/)[0]); // 제목에서 범죄 수준 추출
    
        // 범죄 수준에 따라 투명도 계산
        var opacity = 0.1 + (crimeLevel / 10); // 필요에 따라 이 계산을 조정합니다.

        // 마커 객체 생성
        

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
      getAddressFromCoordinates(position);
    }
  }
// 검색 버튼 비활성화 함수
function disableSearchButton() {
  $("#btn_select").prop('disabled', true);
}

// 검색 버튼 활성화 함수
function enableSearchButton() {
  $("#btn_select").prop('disabled', false);
}
// 클릭된 마커의 좌표를 이용하여 주소 정보 가져오기
function getAddressFromCoordinates(position) {
    var tData = new Tmapv2.extension.TData();

    var optionObj = {
        coordType: "WGS84GEO",       // 응답좌표 타입 옵션 설정
        addressType: "A04"           // 주소타입 옵션 설정
    };

    var params = {
        onComplete: function() {
            // 주소 정보를 가져온 후 실행되는 함수
            var result = '현재 마커의 위치 주소 : ' + this._responseData.addressInfo.fullAddress;
            alert(result);
            startXY(position)
        },
        onProgress: function() {
            // 데이터 로드 중 실행하는 함수
        },
        onError: function() {
            // 데이터 로드 중 에러가 발생했을 때 실행하는 함수
            alert("주소 정보를 가져오는 중 에러가 발생했습니다.");
        }
    };

    // 클릭된 마커의 좌표를 이용하여 주소 정보 가져오기
    tData.getAddressFromGeoJson(position.lat(), position.lng(), optionObj, params);
}
