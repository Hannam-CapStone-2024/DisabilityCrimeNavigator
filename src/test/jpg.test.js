// 이미지 파일 경로 설정
var imagePath = "강도1.free-icon-thief-10925.jpg"; // 실제 이미지 파일의 경로를 입력하세요

// 이미지 엘리먼트 생성
var imgElement = document.createElement("강도1.free-icon-thief-10925");
imgElement.id = "myImage";
imgElement.src = imagePath;
imgElement.alt = "강도 이미지";

// 이미지를 표시할 엘리먼트에 추가
document.body.appendChild(imgElement);

// Tmapv2 마커 추가
var marker = new Tmapv2.Marker({
    position: lonlat, // 마커의 위치 좌표입니다. lonlat 변수에 저장되어 있다고 가정합니다.
    map: map, // 마커가 추가될 Tmapv2 지도 객체입니다. map 변수에 저장되어 있다고 가정합니다.
    icon: "http://강도1.free-icon-thief-10925" // 사용할 이미지의 URL입니다. 원하는 이미지의 URL로 변경해주세요.
});
