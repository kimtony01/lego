import os
import json
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

def get_openai_client():
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return None
    try:
        from openai import OpenAI
        return OpenAI(api_key=api_key)
    except Exception:
        return None

LEADERBOARD = []

SW_ITEMS = [
    (75192, "밀레니엄 팔콘 UCS", "1,149,900원", "millennium-falcon-75192"),
    (75331, "레이저 크레스트 UCS", "799,900원", "the-razor-crest-75331"),
    (75313, "AT-AT UCS", "1,149,900원", "at-at-75313"),
    (75355, "X-윙 스타파이터 UCS", "319,900원", "x-wing-starfighter-75355"),
    (75304, "다스 베이더 헬멧", "114,900원", "darth-vader-helmet-75304"),
    (75349, "캡틴 렉스 헬멧", "99,900원", "captain-rex-helmet-75349"),
    (75350, "클론 사령관 코디 헬멧", "99,900원", "clone-commander-cody-helmet-75350"),
    (75328, "만달로리안 헬멧", "99,900원", "the-mandalorian-helmet-75328"),
    (75343, "다크 트루퍼 헬멧", "99,900원", "dark-trooper-helmet-75343"),
    (75327, "루크 스카이워커 헬멧", "99,900원", "luke-skywalker-red-five-helmet-75327"),
    (75352, "황제의 알현실 디오라마", "149,900원", "emperor-s-throne-room-diorama-75352"),
    (75353, "엔도 스피더 추격전 디오라마", "114,900원", "endor-speeder-chase-diorama-75353"),
    (75329, "데스스타 트렌치 런 디오라마", "99,900원", "death-star-trench-run-diorama-75329"),
    (75330, "대고바 제다이 훈련 디오라마", "129,900원", "dagobah-jedi-training-diorama-75330"),
    (75312, "보바 펫의 우주선", "74,900원", "boba-fett-s-starship-75312"),
    (75325, "만달로리안의 N-1 스타파이터", "89,900원", "the-mandalorian-s-n-1-starfighter-75325"),
    (75347, "TIE 폭격기", "94,900원", "tie-bomber-75347"),
    (75300, "임페리얼 TIE 파이터", "67,900원", "imperial-tie-fighter-75300"),
    (75301, "루크 스카이워커의 X-윙 파이터", "74,900원", "luke-skywalker-s-x-wing-fighter-75301"),
    (75333, "오비완 케노비의 제다이 스타파이터", "44,900원", "obi-wan-kenobi-s-jedi-starfighter-75333"),
    (75336, "인퀴지터 수송선 사이드", "139,900원", "inquisitor-transport-scythe-75336"),
    (75337, "AT-TE 워커", "199,900원", "at-te-walker-75337"),
    (75345, "501단 클론 트루퍼 배틀팩", "29,900원", "501st-clone-troopers-battle-pack-75345"),
    (75359, "아소카의 332단 클론 배틀팩", "29,900원", "332nd-ahsoka-s-clone-trooper-battle-pack-75359"),
    (75360, "요다의 제다이 스타파이터", "49,900원", "yoda-s-jedi-starfighter-75360"),
    (75362, "아소카 타노의 T-6 셔틀", "109,900원", "ahsoka-tano-s-t-6-jedi-shuttle-75362"),
    (75364, "신 하티 스타파이터 VS E-윙", "149,900원", "new-republic-e-wing-vs-shin-hati-s-starfighter-75364"),
    (75365, "야빈 4 반군 기지", "239,900원", "yavin-4-rebel-base-75365"),
    (75371, "츄바카 빌더블 피규어", "279,900원", "chewbacca-75371"),
    (75308, "R2-D2", "319,900원", "r2-d2-75308")
]

ICONS_ITEMS = [
    (10294, "타이타닉", "899,900원", "titanic-10294"),
    (10307, "에펠탑", "829,900원", "eiffel-tower-10307"),
    (10316, "반지의 제왕 리븐델", "649,900원", "the-lord-of-the-rings-rivendell-10316"),
    (10305, "사자 기사의 성", "519,900원", "lion-knights-castle-10305"),
    (10295, "포르쉐 911", "229,900원", "porsche-911-10295"),
    (10317, "랜드로버 클래식 디펜더 90", "319,900원", "land-rover-classic-defender-90-10317"),
    (10304, "쉐보레 카마로 Z28", "229,900원", "chevrolet-camaro-z28-10304"),
    (10321, "콜벳 1961", "209,900원", "corvette-10321"),
    (10300, "백 투 더 퓨처 드로리안", "269,900원", "back-to-the-future-time-machine-10300"),
    (10274, "고스트버스터즈 ECTO-1", "319,900원", "ghostbusters-ecto-1-10274"),
    (10298, "베스파 125", "149,900원", "vespa-125-10298"),
    (10279, "폭스바겐 T2 캠퍼밴", "239,900원", "volkswagen-t2-camper-van-10279"),
    (10323, "팩맨 아케이드 오락기", "359,900원", "pac-man-arcade-10323"),
    (10306, "아타리 2600", "319,900원", "atari-2600-10306"),
    (10318, "콩코드 여객기", "269,900원", "concorde-10318"),
    (10283, "NASA 디스커버리 우주왕복선", "279,900원", "nasa-space-shuttle-discovery-10283"),
    (10341, "NASA 아르테미스 발사시스템", "349,900원", "nasa-artemis-space-launch-system-10341"),
    (10297, "부티크 호텔", "319,900원", "boutique-hotel-10297"),
    (10312, "재즈 클럽", "319,900원", "jazz-club-10312"),
    (10326, "자연사 박물관", "399,900원", "natural-history-museum-10326"),
    (10278, "경찰서 모듈러", "279,900원", "police-station-10278"),
    (10270, "서점 모듈러", "249,900원", "bookshop-10270"),
    (21333, "빈센트 반 고흐 별이 빛나는 밤", "229,900원", "vincent-van-gogh-the-starry-night-21333"),
    (21335, "전동식 등대", "399,900원", "motorised-lighthouse-21335"),
    (21338, "A-프레임 오두막", "239,900원", "a-frame-cabin-21338"),
    (21327, "타자기", "329,900원", "typewriter-21327"),
    (21325, "중세 대장간", "239,900원", "medieval-blacksmith-21325"),
    (21341, "호커스 포커스 샌더슨 자매 오두막", "319,900원", "disney-hocus-pocus-the-sanderson-sisters-cottage-21341"),
    (21342, "곤충 컬렉션", "114,900원", "the-insect-collection-21342"),
    (21343, "바이킹 마을", "189,900원", "viking-village-21343")
]

TECH_ITEMS = [
    (42143, "페라리 Daytona SP3", "599,900원", "ferrari-daytona-sp3-42143"),
    (42115, "람보르기니 시안 FKP 37", "579,900원", "lamborghini-sian-fkp-37-42115"),
    (42154, "2022 포드 GT", "159,900원", "2022-ford-gt-42154"),
    (42159, "야마하 MT-10 SP", "299,900원", "yamaha-mt-10-sp-42159"),
    (42130, "BMW M 1000 RR", "319,900원", "bmw-m-1000-rr-42130"),
    (42151, "부가티 볼리드", "74,900원", "bugatti-bolide-42151"),
    (42138, "포드 머스탱 셸비 GT500", "74,900원", "ford-mustang-shelby-gt500-42138"),
    (42156, "푸조 9X8 르망 하이브리드", "269,900원", "peugeot-9x8-24h-le-mans-hybrid-hypercar-42156"),
    (42125, "페라리 488 GTE", "269,900원", "ferrari-488-gte-af-corse-51-42125"),
    (42141, "맥라렌 F1 레이스카", "269,900원", "mclaren-formula-1-race-car-42141"),
    (42171, "메르세데스-AMG F1 W14", "289,900원", "mercedes-amg-f1-w14-e-performance-42171"),
    (42165, "메르세데스-AMG F1 풀백", "39,900원", "mercedes-amg-f1-w14-pull-back-42165"),
    (42122, "지프 랭글러", "74,900원", "jeep-wrangler-42122"),
    (42110, "랜드로버 디펜더", "279,900원", "land-rover-defender-42110"),
    (42145, "에어버스 H175 구조 헬리콥터", "279,900원", "airbus-h175-rescue-helicopter-42145"),
    (42146, "립헬 크롤러 크레인 LR 13000", "899,900원", "liebherr-crawler-crane-lr-13000-42146"),
    (42131, "앱 제어 캣 D11 불도저", "649,900원", "app-controlled-cat-d11-bulldozer-42131"),
    (42157, "존디어 948L-II 스키더", "249,900원", "john-deere-948l-ii-skidder-42157"),
    (42136, "존디어 9620R 4WD 트랙터", "44,900원", "john-deere-9620r-4wd-tractor-42136"),
    (42158, "NASA 화성 탐사선 퍼서비어런스", "139,900원", "nasa-mars-rover-perseverance-42158"),
    (42180, "화성 유인 탐사 로버", "209,900원", "mars-crew-exploration-rover-42180"),
    (42178, "지표면 우주 로더 LT78", "44,900원", "surface-space-loader-lt78-42178"),
    (42179, "지구와 달의 궤도", "109,900원", "planet-earth-and-moon-in-orbit-42179"),
    (42167, "맥 LR 전동 쓰레기차", "49,900원", "mack-lr-electric-garbage-truck-42167"),
    (42168, "존디어 9700 자주식 하베스터", "59,900원", "john-deere-9700-forage-harvester-42168"),
    (42169, "NEOM 맥라렌 포뮬러 E", "74,900원", "neom-mclaren-formula-e-race-car-42169"),
    (42160, "아우디 RS Q e-tron", "239,900원", "audi-rs-q-e-tron-42160"),
    (42153, "NASCAR 시보레 카마로 ZL1", "74,900원", "nascar-next-gen-chevrolet-camaro-zl1-42153"),
    (42155, "더 배트맨 - 배트사이클", "74,900원", "the-batman-batcycle-42155"),
    (42127, "더 배트맨 - 배트모빌", "149,900원", "the-batman-batmobile-42127")
]

BOT_ITEMS = [
    (10313, "야생화 꽃다발", "89,900원", "wildflower-bouquet-10313"),
    (10280, "꽃다발", "89,900원", "flower-bouquet-10280"),
    (10328, "장미 꽃다발", "89,900원", "bouquet-of-roses-10328"),
    (10281, "분재나무", "69,900원", "bonsai-tree-10281"),
    (10309, "다육식물", "69,900원", "succulents-10309"),
    (10311, "난초", "69,900원", "orchid-10311"),
    (10329, "미니 식물 컬렉션", "69,900원", "tiny-plants-10329"),
    (10315, "고요한 정원", "149,900원", "tranquil-garden-10315"),
    (10289, "극락조화", "149,900원", "bird-of-paradise-10289"),
    (10368, "국화", "44,900원", "chrysanthemum-10368"),
    (10369, "매화", "44,900원", "plum-blossom-10369"),
    (40460, "장미 2송이", "19,900원", "roses-40460"),
    (40461, "튤립 3송이", "14,900원", "tulips-40461"),
    (40524, "해바라기", "19,900원", "sunflowers-40524"),
    (40647, "연꽃", "19,900원", "lotus-flowers-40647"),
    (40725, "벚꽃", "19,900원", "cherry-blossoms-40725"),
    (40646, "수선화", "19,900원", "daffodils-40646"),
    (40747, "수선화 부케", "19,900원", "daffodils-40747"),
    (40573, "크리스마스 트리", "59,900원", "christmas-tree-40573"),
    (40426, "크리스마스 화환 2-in-1", "54,900원", "christmas-wreath-2-in-1-40426"),
    (40499, "산타의 썰매", "59,900원", "santa-s-sleigh-40499"),
    (10370, "포인세티아", "69,900원", "poinsettia-10370"),
    (10340, "화환 장식", "149,900원", "wreath-10340"),
    (40187, "플라워 디스플레이", "12,900원", "flower-display-40187"),
    (40310, "식물 액세서리 팩", "14,900원", "botanical-accessories-40310"),
    (40683, "화단 플라워 그리팅 격자", "34,900원", "flower-trellis-display-40683"),
    (40588, "화병 플라워 포트", "34,900원", "flowerpot-40588"),
    (40522, "발렌타인 러브버드 & 플라워", "18,900원", "valentine-lovebirds-40522"),
    (40639, "새 둥지와 봄꽃", "18,900원", "bird-s-nest-40639"),
    (40648, "금전수 돈나무", "34,900원", "money-tree-40648")
]

HP_ITEMS = [
    (71043, "호그와트 캐슬 UCS", "649,900원", "hogwarts-castle-71043"),
    (76419, "호그와트 캐슬과 영지", "239,900원", "hogwarts-castle-and-grounds-76419"),
    (75978, "다이애건 앨리", "599,900원", "diagon-alley-75978"),
    (76417, "그린고트 마법은행 에디션", "579,900원", "gringotts-wizarding-bank-collectors-edition-76417"),
    (76405, "호그와트 익스프레스 에디션", "669,900원", "hogwarts-express-collectors-edition-76405"),
    (76391, "호그와트 아이콘 에디션", "399,900원", "hogwarts-icons-collectors-edition-76391"),
    (76421, "집요정 도비", "44,900원", "dobby-the-house-elf-76421"),
    (75968, "프리벳가 4번지", "109,900원", "4-privet-drive-75968"),
    (76389, "호그와트 비밀의 방", "209,900원", "hogwarts-chamber-of-secrets-76389"),
    (76415, "호그와트 전투", "124,900원", "the-battle-of-hogwarts-76415"),
    (76402, "호그와트: 덤블도어의 집무실", "119,900원", "hogwarts-dumbledore-s-office-76402"),
    (76413, "호그와트: 필요의 방", "74,900원", "hogwarts-room-of-requirement-76413"),
    (76386, "호그와트: 폴리주스 마법약", "29,900원", "hogwarts-polyjuice-potion-mistake-76386"),
    (76426, "호그와트 성 보트하우스", "52,900원", "hogwarts-castle-boathouse-76426"),
    (76430, "호그와트 성 부엉이장", "64,900원", "hogwarts-castle-owlery-76430"),
    (76431, "호그와트 성: 마법약 수업", "59,900원", "hogwarts-castle-potions-class-76431"),
    (76435, "호그와트 성: 대연회장", "269,900원", "hogwarts-castle-the-great-hall-76435"),
    (76428, "해그리드의 오두막", "104,900원", "hagrid-s-hut-an-unexpected-visit-76428"),
    (76407, "비명을 지르는 오두막", "129,900원", "the-shrieking-shack-whomping-willow-76407"),
    (76432, "금지된 숲: 마법 생물들", "44,900원", "forbidden-forest-magical-creatures-76432"),
    (76424, "날아다니는 포드 앵글리아", "22,900원", "flying-ford-anglia-76424"),
    (76434, "금지된 숲의 아라고그", "29,900원", "aragog-in-the-forbidden-forest-76434"),
    (76425, "프리벳가의 헤드위그", "29,900원", "hedwig-at-4-privet-drive-76425"),
    (76392, "호그와트 마법사의 체스", "99,900원", "hogwarts-wizard-s-chess-76392"),
    (76414, "익스펙토 패트로눔", "99,900원", "expecto-patronum-76414"),
    (76406, "헝가리 혼테일 드래곤", "74,900원", "hungarian-horntail-dragon-76406"),
    (76394, "덤블도어의 불사조 폭스", "59,900원", "fawkes-dumbledore-s-phoenix-76394"),
    (76429, "말하는 마법의 분류 모자", "149,900원", "talking-sorting-hat-76429"),
    (76433, "맨드레이크 화분", "99,900원", "mandrake-76433"),
    (76422, "다이애건 앨리 장난감가게", "134,900원", "diagon-alley-weasleys-wizard-wheezes-76422")
]

MC_ITEMS = [
    (76269, "어벤져스 타워", "669,900원", "avengers-tower-76269"),
    (76178, "데일리 뷰글", "469,900원", "daily-bugle-76178"),
    (76210, "헐크버스터", "719,900원", "hulkbuster-76210"),
    (76218, "생텀 생토럼", "369,900원", "sanctum-sanctorum-76218"),
    (76262, "캡틴 아메리카의 방패", "279,900원", "captain-america-s-shield-76262"),
    (76209, "토르의 망치 묠니르", "159,900원", "thor-s-hammer-76209"),
    (76285, "스파이더맨 마스크", "99,900원", "spider-man-s-mask-76285"),
    (76191, "인피니티 건틀렛", "114,900원", "infinity-gauntlet-76191"),
    (76223, "나노 건틀렛", "99,900원", "nano-gauntlet-76223"),
    (76280, "스파이더맨 대 샌드맨", "52,900원", "spider-man-vs-sandman-final-battle-76280"),
    (76261, "스파이더맨 최종 결전", "149,900원", "spider-man-final-battle-76261"),
    (76266, "엔드게임 최후의 결전", "149,900원", "endgame-final-battle-76266"),
    (76248, "어벤져스 퀸젯", "149,900원", "the-avengers-quinjet-76248"),
    (76247, "헐크버스터: 와칸다 전투", "67,900원", "the-hulkbuster-the-battle-of-wakanda-76247"),
    (76281, "엑스맨 X-Jet 제트기", "114,900원", "x-men-x-jet-76281"),
    (60380, "시티 다운타운", "279,900원", "downtown-60380"),
    (60368, "시티 북극 탐험선", "209,900원", "arctic-explorer-ship-60368"),
    (60367, "시티 여객 비행기", "149,900원", "passenger-airplane-60367"),
    (60321, "시티 소방서 본부", "149,900원", "fire-brigade-60321"),
    (60316, "시티 경찰서", "99,900원", "police-station-60316"),
    (60371, "시티 긴급구조대 본부", "89,900원", "emergency-vehicles-hq-60371"),
    (60337, "시티 익스프레스 여객열차", "229,900원", "express-passenger-train-60337"),
    (60198, "시티 화물 열차", "259,900원", "cargo-train-60198"),
    (60366, "시티 스키 & 클라이밍 센터", "149,900원", "ski-and-climbing-center-60366"),
    (60365, "시티 아파트", "119,900원", "apartment-building-60365"),
    (60364, "시티 스케이트 파크", "74,900원", "street-skate-park-60364"),
    (60381, "시티 캘린더", "34,900원", "city-advent-calendar-2023-60381"),
    (60430, "시티 성간 우주선", "29,900원", "interstellar-spaceship-60430"),
    (60433, "시티 모듈러 우주정거장", "149,900원", "modular-space-station-60433"),
    (60434, "시티 우주기지와 발사대", "189,900원", "space-base-and-rocket-launchpad-60434")
]

CATEGORIES_MAP = [
    ("Star Wars", SW_ITEMS),
    ("Icons", ICONS_ITEMS),
    ("Technic", TECH_ITEMS),
    ("Botanical", BOT_ITEMS),
    ("Harry Potter", HP_ITEMS),
    ("Marvel & City", MC_ITEMS)
]

LEGO_DATA = []
current_id = 1

for cat_name, items_list in CATEGORIES_MAP:
    for num, name, price, slug in items_list:
        LEGO_DATA.append({
            "id": current_id,
            "name": f"레고 {name} {num}",
            "category": cat_name,
            "price": price,
            "image": f"https://images.brickset.com/sets/images/{num}-1.jpg",
            "buy_url": f"https://www.lego.com/ko-kr/product/{slug}",
            "store": "레고 공식몰"
        })
        current_id += 1

@app.route('/')
def home():
    categories = [cat[0] for cat in CATEGORIES_MAP]
    return render_template('index.html', items=LEGO_DATA, categories=categories)

# 랭킹 조회 API
@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    sorted_board = sorted(LEADERBOARD, key=lambda x: x['score'], reverse=True)[:10]
    return jsonify({'leaderboard': sorted_board})

# 랭킹 점수 등록 API
@app.route('/api/leaderboard', methods=['POST'])
def add_leaderboard():
    data = request.json or {}
    name = data.get('name', '').strip()
    score = data.get('score', 0)
    if not name:
        name = "익명의브릭러"
    
    LEADERBOARD.append({"name": name[:10], "score": int(score)})
    sorted_board = sorted(LEADERBOARD, key=lambda x: x['score'], reverse=True)[:10]
    return jsonify({'success': True, 'leaderboard': sorted_board})

@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')
    if not user_message:
        return jsonify({'error': '메시지를 입력해주세요.'}), 400

    client = get_openai_client()
    if not client:
        return jsonify({'reply': '현재 OpenAI API 키가 설정되지 않아 챗봇 상담이 어렵습니다. 환경 변수를 확인해주세요.'})

    catalog_context = "\n".join([
        f"- {item['name']} (카테고리: {item['category']}, 가격: {item['price']}, 판매처: {item['store']}, 링크: {item['buy_url']})"
        for item in LEGO_DATA[:40]
    ])

    system_prompt = f"""
    당신은 친절한 레고 큐레이터이자 쇼핑 어시스턴트입니다.
    사용자의 질문이나 예산, 취향에 맞춰 알맞은 레고 제품을 추천해주세요.
    
    데이터베이스 대표 제품 예시:
    {catalog_context}
    
    답변 시 제품명, 가격, 공식 구매 링크를 깔끔하게 안내하세요.
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7
        )
        reply = response.choices[0].message.content
        return jsonify({'reply': reply})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)