let selected = null;

document.addEventListener('DOMContentLoaded', () => {
    const paket = localStorage.getItem('selected-paket')

    const itineraries = {
        islamic: {
            title: '☪️ 이슬라믹 투어 3박 4일 - 이티너러리 ☪️',
            content: `
                <div class="day">
                    <h3>DAY 1 | 서울 도착</h3>
                    <ul>
                        <li>🕌 파즈르 예배 후 인천공항 집합 → 오전 9시, 제1터미널 3번 출구</li>
                        <li>전세버스로 호텔 이동</li>
                        <li>호텔 체크인 → 도쿄도인 서울 호텔</li>
                        <li>주흐르·아스르 예배 → 이태원 중앙 마스지드</li>
                        <li>저녁 식사 → 이드 레스토랑 (할랄 인증 ✓)</li>
                        <li>마그립·이샤 예배 → 이태원 중앙 마스지드</li>
                    </ul>
                </div>
                <div class="day">
                    <h3>DAY 2 | 이슬라믹 서울</h3>
                    <ul>
                        <li>파즈르 예배 → 호텔 내 기도실</li>
                        <li>이태원 중앙 마스지드 투어 및 줌아 예배</li>
                        <li>점심 식사 → 얌샘김밥 (할랄 인증 ✓)</li>
                        <li>알팔라 마스지드 방문 및 아스르 예배</li>
                        <li>저녁 식사 → 할랄 가이즈 이태원점 (할랄 인증 ✓)</li>
                        <li>마그립·이샤 예배 → 이태원 중앙 마스지드</li>
                        <li>이태원 거리 자유 관광</li>
                    </ul>
                </div>
                <div class="day">
                    <h3>DAY 3 | 역사 & 문화 투어</h3>
                    <ul>
                        <li>파즈르 예배 → 호텔 내 기도실</li>
                        <li>경복궁 / 북촌 한옥마을 관광</li>
                        <li>주흐르 예배 → 이슬람 센터 마스지드</li>
                        <li>점심 식사 → 이슬람 센터 구내 할랄 식당 (할랄 인증 ✓)</li>
                        <li>동대문 쇼핑 자유 시간</li>
                        <li>아스르·마그립 예배 → 동대문 인근 마스지드</li>
                        <li>저녁 식사 → 터키 레스토랑 에페스 (할랄 인증 ✓)</li>
                        <li>이샤 예배 → 동대문 인근 마스지드</li>
                    </ul>
                </div>
                <div class="day">
                    <h3>DAY 4 | 출발</h3>
                    <ul>
                        <li>파즈르 예배 → 호텔 내 기도실</li>
                        <li>호텔 체크아웃</li>
                        <li>전세버스로 인천공항 샌딩</li>
                    </ul>
                </div>
                <div class="day-tip">
                    <h3>👗 복장 & 날씨 팁</h3>
                    <ul>
                        <li>봄 (3–5월): 일교차 큼, 얇은 겉옷 필수</li>
                        <li>여름 (6–8월): 통기성 좋은 긴 옷 준비, 실내 냉방 강하니 가디건 지참</li>
                        <li>가을 (9–11월): 쾌적하나 저녁엔 쌀쌀, 레이어링 추천</li>
                        <li>겨울 (12–2월): 추운 영하권, 두꺼운 패딩 필수</li>
                    </ul>
                </div>
                <p class="itinerary-note"><i>ℹ️ 마스지드 투어는 문의를 통해 원하는 곳으로 조정 가능합니다. <br>

예배 시간은 당일 기도 시간표에 따라 일정이 조율될 수 있습니다. <br>

이동 수단은 일정 및 인원에 따라 변경될 수 있습니다. ℹ️</i></p>
                <p class="itinerary-note">문의: 나래투어 ☎ 010-1234-5678</p>
            `
        },
        history: {
            title: '📜 히스토리 헌터 2박 3일 - 이티너러리 🏛️',
            content: `
                <div class="day">
                    <h3>DAY 1 | 서울 도착 & 궁궐 탐방</h3>
                    <ul>
                        <li>인천공항 집합 → 오전 9시, 제1터미널 3번 출구</li>
                        <li>전세버스로 호텔 이동 및 체크인</li>
                        <li>경복궁 관람</li>
                        <li>점심 식사 → 광화문 인근 한식당</li>
                        <li>국립중앙박물관 관람</li>
                        <li>저녁 식사 → 이태원 인근 레스토랑</li>
                    </ul>
                </div>
                <div class="day">
                    <h3>DAY 2 | 전통 마을 & 문화 지역</h3>
                    <ul>
                        <li>북촌 한옥마을 도보 투어</li>
                        <li>점심 식사 → 인사동 전통 한식당</li>
                        <li>인사동 문화 거리 탐방</li>
                        <li>창덕궁 & 후원 관람</li>
                        <li>저녁 식사 → 종로 인근 레스토랑</li>
                    </ul>
                </div>
                <div class="day">
                    <h3>DAY 3 | 출발</h3>
                    <ul>
                        <li>호텔 체크아웃</li>
                        <li>수원 화성 간략 탐방 (시간 여유 시)</li>
                        <li>인천공항 샌딩</li>
                    </ul>
                </div>
                <div class="day-tip">
                    <h3>👗 복장 & 날씨 팁</h3>
                    <ul>
                        <li>봄·가을: 도보 이동 많으니 편한 신발 필수</li>
                        <li>여름: 선크림·모자·물 필수</li>
                        <li>겨울: 두꺼운 패딩 + 장갑 권장</li>
                    </ul>
                </div>
                <p class="itinerary-note"><i>ℹ️ 관람 일정은 현지 상황에 따라 조율될 수 있습니다. ℹ️</i></p>
                <p class="itinerary-note">문의: 나래투어 ☎ 010-1234-5678</p>
            `
        },
        kculture: {
            title: '🤩 K컬쳐 투어 3박 4일 - 이티너러리 🎉',
            content: `
                <div class="day">
                    <h3>DAY 1 | 서울 도착 & 홍대</h3>
                    <ul>
                        <li>인천공항 집합 → 오전 9시, 제1터미널 3번 출구</li>
                        <li>전세버스로 호텔 이동 및 체크인</li>
                        <li>홍대 거리 자유 탐방</li>
                        <li>저녁 식사 → 홍대 인근 트렌디 레스토랑</li>
                        <li>홍대 카페 거리 & 야경 감상</li>
                    </ul>
                </div>
                <div class="day">
                    <h3>DAY 2 | 드라마 촬영지 투어</h3>
                    <ul>
                        <li>남산타워 (《별에서 온 그대》 촬영지)</li>
                        <li>점심 식사 → 이태원 감성 카페 & 브런치</li>
                        <li>이태원 & 경리단길 탐방</li>
                        <li>《이태원 클라쓰》 촬영지 방문</li>
                        <li>저녁 식사 → 인스타 핫플 레스토랑</li>
                        <li>한강 야경 감상</li>
                    </ul>
                </div>
                <div class="day">
                    <h3>DAY 3 | 성수동 & 명동</h3>
                    <ul>
                        <li>성수동 감성 카페 투어</li>
                        <li>《이상한 변호사 우영우》 촬영지 방문</li>
                        <li>점심 식사 → 성수동 브런치 카페</li>
                        <li>명동 쇼핑 & 길거리 음식 체험</li>
                        <li>저녁 식사 → 명동 인기 맛집</li>
                    </ul>
                </div>
                <div class="day">
                    <h3>DAY 4 | 출발</h3>
                    <ul>
                        <li>호텔 체크아웃</li>
                        <li>동대문 DDP 간략 탐방 (시간 여유 시)</li>
                        <li>인천공항 샌딩</li>
                    </ul>
                </div>
                <div class="day-tip">
                    <h3>👗 복장 & 날씨 팁</h3>
                    <ul>
                        <li>공통: 인스타 사진 많이 찍으니 코디 미리 준비 추천</li>
                        <li>여름: 선크림 필수</li>
                        <li>겨울: 한강 야경은 체감온도 낮음. 방한 필수</li>
                    </ul>
                </div>
                <p class="itinerary-note"><i>ℹ️ 촬영지 투어는 현지 상황에 따라 변경될 수 있습니다. ℹ️</i></p>
                <p class="itinerary-note">문의: 나래투어 ☎ 010-1234-5678</p>
            `
        },
        nature: {
            title: '🌲 네이쳐 투어 - 이티너러리 ⛰️',
            content: `
                <div class="day">
                    <h3>COURSE A | 공원 & 자연 명소</h3>
                    <ul>
                        <li>북한산 국립공원 트레킹</li>
                        <li>점심 식사 → 산 인근 한식당</li>
                        <li>올림픽공원 & 호수 산책</li>
                        <li>저녁 식사 → 공원 인근 레스토랑</li>
                    </ul>
                </div>
                <div class="day">
                    <h3>COURSE B | 해변 투어</h3>
                    <ul>
                        <li>강릉 경포대 해변 (전세버스, 약 2.5시간)</li>
                        <li>점심 식사 → 강릉 해산물 식당</li>
                        <li>정동진 일몰 감상</li>
                        <li>귀환</li>
                    </ul>
                </div>
                <div class="day">
                    <h3>COURSE C | 등산 & 국립공원</h3>
                    <ul>
                        <li>설악산 국립공원 트레킹</li>
                        <li>점심 식사 → 속초 인근 식당</li>
                        <li>속초 해변 간략 탐방</li>
                        <li>귀환</li>
                    </ul>
                </div>
                <div class="day-tip">
                    <h3>👗 복장 & 날씨 팁</h3>
                    <ul>
                        <li>공통: 트레킹화 또는 운동화 필수</li>
                        <li>여름: 선크림 필수</li>
                        <li>겨울: 설악산 코스는 방한 완전 무장 필요</li>
                    </ul>
                </div>
                <p class="itinerary-note"><i>ℹ️ 등산 코스는 인원 및 시즌에 따라 조율 가능합니다. ℹ️</i></p>
                <p class="itinerary-note">문의: 나래투어 ☎ 010-1234-5678</p>
            `
        },
        premium: {
            title: '⚜️ 프리미엄 투어 맞춤형 - 이티너러리 ⚜️',
            content: `
                <div class="day">
                    <h3>DAY 1 | 도착 & 프리미엄 웰컴</h3>
                    <ul>
                        <li>인천공항 VIP 픽업 (전용 차량)</li>
                        <li>3성++ 호텔 체크인 및 웰컴 키트 제공</li>
                        <li>고객 요청 코스 첫 일정 진행</li>
                        <li>저녁 식사 → 고급 레스토랑 (고객 선택)</li>
                    </ul>
                </div>
                <div class="day">
                    <h3>DAY 2–D | 맞춤 일정</h3>
                    <ul>
                        <li>역사 / K컬쳐 / 자연 / 쇼핑 등 고객이 원하는 코스로 구성</li>
                        <li>매 끼니 → 호텔 레스토랑 또는 고급 맛집</li>
                        <li>전용 차량 & 전담 가이드 상시 동행</li>
                    </ul>
                </div>
                <div class="day">
                    <h3>마지막 DAY | 출발</h3>
                    <ul>
                        <li>호텔 체크아웃</li>
                        <li>인천공항 VIP 샌딩</li>
                    </ul>
                </div>
                <p class="itinerary-note"><i>ℹ️ 프리미엄 투어는 사전 상담을 통해 100% 맞춤 구성됩니다. <br>

일정·예산·인원에 맞게 자유롭게 조율 가능합니다. ℹ️</i></p>
                <p class="itinerary-note">문의: 나래투어 ☎ 010-1234-5678</p>
            `
        }
    };

    selected = itineraries[paket];

    if (selected) {
        document.getElementById('itinerary-title').textContent = selected.title;
        document.getElementById('itinerary-body').innerHTML = selected.content;
    } else {
        document.getElementById('itinerary-title').textContent = '패키지를 선택해 주세요';
        document.getElementById('itinerary-body').innerHTML = '<p>order.html로 돌아가서 패키지를 선택해 주세요.</p>';
    }

    
});

// 공유 버튼
function shareItinerary() {
    if (navigator.share) {
        navigator.share({
            title: '나래투어 이티너러리',
            text: selected ? selected.title : '나래투어',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('링크가 복사되었습니다!');
    }
}