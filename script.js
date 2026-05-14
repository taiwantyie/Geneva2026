(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
        key: "AIzaSyALyHvHaYFFESVCIkibu6E1EFNGCwjIMKw",
        v: "weekly",
        // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
        // Add other bootstrap parameters as needed, using camel case.
      });
      async function initMap() {
          //  Request the needed libraries.
          const [{ Map }, { AdvancedMarkerElement }, {PinElement}] = await Promise.all([
              google.maps.importLibrary('maps'),
              google.maps.importLibrary('marker'),
              google.maps.importLibrary('marker'),
          ]);
          // Get the gmp-map element.
          const mapElement = document.getElementById("map");
          const panel = document.getElementById("mapList");
          const markers = new window.Map(); // 存 id → marker
          // Set map options.
          myMap = new google.maps.Map(mapElement, {
              mapTypeControl: false,
              center: { lat: 46.20387776163571, lng: 6.143124680664958 },
              zoom: 14,
              mapId: 'afe0e694ed7785dbc8023c26',
            //   styles: 
            //   [
            //     {"featureType": "administrative",
            //       "elementType": "labels.text.fill",
            //       "stylers": [{"color": "#00abab"}]},
            //     {"featureType": "landscape",
            //       "elementType": "all",
            //       "stylers": [{"color": "#818181"}]},
            //     {"featureType": "landscape",
            //         "elementType": "geometry.fill",
            //         "stylers": [{"color": "#f8fffd"}]
            //     },
            //     {"featureType": "poi",
            //       "elementType": "all",
            //       "stylers": [{"visibility": "off"}]
            //     },
            //     {"featureType": "poi.park",
            //       "elementType": "geometry.fill",
            //       "stylers": [{"color": "#c3f0e1"},
            //           {"visibility": "on"}]},
            //     {"featureType": "road",
            //       "elementType": "all",
            //       "stylers": [
            //           {"saturation": -100},
            //           {"lightness": 45},
            //           {"visibility": "simplified"}]},
            //     {"featureType": "road.highway",
            //       "elementType": "all",
            //       "stylers": [{"visibility": "simplified"}]},
            //     {"featureType": "road.highway",
            //         "elementType": "geometry.fill",
            //         "stylers": [{"color": "#B9B9B9"},
            //             {"visibility": "simplified"}]},
            //     {"featureType": "road.highway",
            //       "elementType": "labels.text",
            //       "stylers": [{"color": "#1e1e1e"}]},
            //     {"featureType": "road.arterial",
            //       "elementType": "geometry.fill",
            //       "stylers": [{"color": "#e6f4f0"}]},
            //     {"featureType": "road.arterial",
            //       "elementType": "labels.text.fill",
            //       "stylers": [{"color": "#818181"}]},
            //     {"featureType": "road.arterial",
            //       "elementType": "labels.icon",
            //       "stylers": [{"visibility": "off"}]},
            //     {"featureType": "transit",
            //       "elementType": "all",
            //       "stylers": [{"visibility": "off"}]},
            //     {"featureType": "water",
            //       "elementType": "all",
            //       "stylers": [{"color": "#64d2c3"},
            //             {"visibility": "on"}]},
            //     {"featureType": "water",
            //       "elementType": "geometry.fill",
            //       "stylers": [{"color": "#64d2c3"}]}]
          });
          // Get the inner map.
          // const innerMap = mapElement.innerMap;
          // Add a marker positioned at the map center (Uluru).
          totalEvents.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.id = item.id;

            keywordsHTML = item.keyword.map(k => `<span>${k}</span>`).join("");

            card.innerHTML = `
            <div class="header">
                <span class="index">${item.index}</span>
                <h2>${item.title}</h2>
                <p class="keywords">${keywordsHTML}</p>
              </div>
            <div class="content">
            <p class="location"><i class="fa-solid fa-location-dot"></i>${item.location} / ${item.address}</p>
            <p class="time"><i class="fa-solid fa-calendar-week"></i>${item.time}</p>
            <p class="organisation"><span>${item.organisation}</span></p>
            <a href="${item.website}" target="_blank" class="contact"><i class="fa-solid fa-globe"></i>More Information</a>
            </div>
            `;

            // 點 card → 展開 + 移動地圖
            card.addEventListener("click", () => {
              toggleCard(item.id);
              focusMarker(item.id);
            });

            panel.appendChild(card);

            const marker = new google.maps.marker.AdvancedMarkerElement({
                  map: myMap,
                  // content: buildContent(event),
                  position: item.position,
                  title: item.description,
              });

            const pinStyle = new PinElement({
                background: '#e94c67',
                borderColor: '#212121',
                glyphColor: '#e6f4f0',
                glyphText: item.index.toString(),
            });
            marker.append(pinStyle);
            markers.set(item.id, marker);

            // 點 marker → 打開對應 card
            marker.addListener("gmp-click", () => {
              toggleCard(item.id);
              scrollToCard(item.id);
            });
          });
          function toggleCard(id) {
            document.querySelectorAll(".card").forEach(card => {
            if (card.dataset.id === id) {
                card.classList.toggle("open");
            } else {
                card.classList.remove("open");
            }
            });
        }
        function focusMarker(id) {
            const marker = markers.get(id);
            if (!marker) return;

            myMap.panTo(marker.position);
            myMap.setZoom(16);
        }
        function scrollToCard(id) {
            const card = document.querySelector(`.card[data-id="${id}"]`);
            if (!card) return;

            card.scrollIntoView({
            behavior: "smooth",
            block: "center"
            });
        }
      }
      const totalEvents = [
            {
                index: 1,
                title: 'Mini Taiwan Day',
                keyword: ['NightMarket', 'BubbleTea', 'TaiwaneseTradition'],
                location: 'Foound',
                address: 'Rue Jean-Dassier 7, 1201 Genève',
                id:'miniTaiwanDay',
                time: 'May 16, 13:00 - 17:00',
                organisation: 'Taiwan Youth Initiatives in Europe',
                contact: 'https://www.instagram.com/p/DYHiJpjjWYN/',
                position: {
                    lat: 46.20852209083194,
                    lng: 6.138418739865669,
                },
            },
            {
                index: 1,
                title: 'Traditional Medicine and Health Promotion from Taiwan\'s Perspective',
                keyword: ['TraditionalMedicine', 'Workshop'],
                location: 'Foound',
                address: 'Rue Jean-Dassier 7, 1201 Genève',
                id:'TraditionalMedicineWorkshop',
                time: 'May 16, 13:30 - 14:30',
                organisation: 'Taiwan Youth Initiatives in Europe',
                contact: 'https://docs.google.com/forms/d/e/1FAIpQLSfOfku2xH1zcEU_t2pQstyYdn2qXY3OPXot6vjRxENBxBSgbA/viewform',
                position: {
                    lat: 46.20852209083194,
                    lng: 6.138418739865669,
                },
            },
            {
                index: 2,
                title: 'Taiwan Smart Medical & HealthTech Expo',
                keyword: ['Tech', 'AI', 'Expo'],
                location: 'Hotel President Wilson Hotel',
                address: 'Quai Wilson 47, 1211 Genève',
                id:'Expo',
                time: 'May 17, 13:00 - May 19, 14:00',
                organisation: 'Taiwan External Trade Development Council',
                contact: 'https://taiwancares.taitra.org.tw',
                position: {
                    lat: 46.214232826647304,
                    lng: 6.15196374910857,
                },
            },
            {
                index: 2,
                title: 'Taiwan Smart Medical & HealthTech Expo opening',
                keyword: ['MedicalTech', 'AI', 'Opening'],
                location: 'Hotel President Wilson Hotel',
                address: 'Quai Wilson 47, 1211 Genève',
                id:'ExpoOpening',
                time: 'May 17, 14:00 - 15:30',
                organisation: 'Taiwan External Trade Development Council',
                contact: 'https://taiwancares.taitra.org.tw',
                position: {
                    lat: 46.214232826647304,
                    lng: 6.15196374910857,
                },
            },
            {
                index: 3,
                title: 'Welcome Reception for Taiwanese Community',
                keyword: ['Taiwan', 'WHA', 'WelcomeReception'],
                location: 'Geneva Marriott Hotel',
                address: 'Chemin du Ruisseau 1, Cointrin, 1216 Genève',
                id:'WelcomeReception',
                time: 'May 17, 18:00 - 21:00',
                organisation: 'TECO Geneva: Bureau de Genève, Délégation Culturelle et Economique de Taipei',
                contact: 'https://www.surveycake.com/s/ewYg4',
                position: {
                    lat: 46.22139994635663,
                    lng: 6.103482657056722,
                },
            },
            {
                index: 4,
                title: 'WHO Walk the Talk',
                keyword: ['WHO', 'WHA', 'WalkTheTalk'],
                location: 'Place des Nations',
                address: 'Pl. des Nations, 1202 Genève',
                id:'WHOWalkTheTalk',
                time: 'May 17, 09:00 - 10:30',
                organisation: 'World Health Organization',
                contact: 'https://www.who.int/news-room/events/detail/2026/05/17/default-calendar/walk-the-talk-geneva-2026',
                position: {
                    lat: 46.2225911594683,
                    lng: 6.138846911030626,
                },
            },
            {
                index: 4,
                title: 'Team Taiwan - Walk for Taiwan',
                keyword: ['WalkingForTaiwan', 'WHO', 'WHA'],
                location: 'Place des Nations → Quai Wilson',
                address: 'Pl. des Nations, 1202 Genève',
                id:'TeamTaiwanWalk',
                time: 'May 17, 10:30 - 12:00',
                organisation: 'Walking for Taiwan Association in Europe',
                contact: 'https://www.facebook.com/share/17dDwmWoBw/?mibextid=wwXIfr',
                position: {
                    lat: 46.2225911594683,
                    lng: 6.138846911030626,
                },
            },
            {
                index: 2,
                title: 'Digital Health Forum: AI Governance and Digital Health Innovation',
                keyword: ['DigitalHealth', 'AI', 'Forum'],
                location: 'Geneva President Wilson Hotel',
                address: 'Quai Wilson 47, 1211 Genève',
                id:'DigitalHealthForum',
                time: 'May 18, 10:00 - 12:55',
                organisation: 'Taiwan Ministry of Health and Welfare',
                contact: 'https://docs.google.com/forms/d/e/1FAIpQLSdzhfB9N6mr9Cxwf9n4nxbKRoHBBDFFYuPSQbzzKsbyEJhlhw/viewform',
                position: {
                    lat: 46.214232826647304,
                    lng: 6.15196374910857,
                },
            },
            {
                index: 2,
                title: 'Cancer Policy and Innovation: From Early Detection to Equitable Treatment',
                keyword: ['CancerPolicy', 'Forum'],
                location: 'Geneva President Wilson Hotel, Ballroom',
                address: 'Quai Wilson 47, 1211 Genève',
                id:'CancerPolicyForum',
                time: 'May 18, 14:00 - 17:00',
                organisation: 'Taiwan Ministry of Health and Welfare',
                contact: 'https://docs.google.com/forms/d/e/1FAIpQLSdp9PJZxLYeWPlBjMt9_gOQYmTWcRP0A0uIvuucjCg9bz2A3A/viewform',
                position: {
                    lat: 46.214232826647304,
                    lng: 6.15196374910857,
                },
            },
            {
                index: 2,
                title: 'Global Health Diplomacy Forum',
                keyword: ['GlobalHealth', 'DigitalHealth', 'YouthEmpowerment'],
                location: 'Geneva President Wilson Hotel, Neptune Room',
                address: 'Quai Wilson 47, 1211 Genève',
                id:'GlobalHealthDiplomacyForum',
                time: 'May 18, 14:00 - 17:00',
                organisation: 'Taiwan Healthcare Youth Alliance',
                contact: 'https://hcya.org.tw/en/',
                position: {
                    lat: 46.214232826647304,
                    lng: 6.15196374910857,
                },
            },
            {
                index: 2,
                title: 'Global Hepatitis C Elimination: Experience and the Road Ahead',
                keyword: ['hepatitisC', 'Epidemiology', 'Forum'],
                location: 'Geneva President Wilson Hotel, Ballroom',
                address: 'Quai Wilson 47, 1211 Genève',
                id:'GlobalHepatitisCEliminationForum',
                time: 'May 19, 09:00 - 12:00',
                organisation: 'Taiwan Ministry of Health and Welfare',
                contact: 'https://docs.google.com/forms/d/e/1FAIpQLSdp9PJZxLYeWPlBjMt9_gOQYmTWcRP0A0uIvuucjCg9bz2A3A/viewform',
                position: {
                    lat: 46.214232826647304,
                    lng: 6.15196374910857,
                },
            },
            {
                index: 2,
                title: 'Smart Healthcare Implementation and Public Health System Upgrading',
                keyword: ['SmartHealthcare', 'PublicHealth', 'Forum'],
                location: 'Geneva President Wilson Hotel, Ballroom',
                address: 'Quai Wilson 47, 1211 Genève',
                id:'SmartHealthcareForum',
                time: 'May 19, 12:10 - 13:30',
                organisation: 'International Cooperation and Development Fund & Sistema de la Integración Centroamericana',
                contact: 'https://docs.google.com/forms/d/1Bh_rDzlv1ZbaJg8MvHwMPiUECICurT5ooCNuFG57LYE/viewform?edit_requested=true',
                position: {
                    lat: 46.214232826647304,
                    lng: 6.15196374910857,
                },
            },
            {
                index: 2,
                title: '79th WHA Parallel Event: AI for Universal Health Coverage, and UHC at a Crossroads',
                keyword: ['AI', 'UniversalHealthCoverage', 'Forum'],
                location: 'Geneva President Wilson Hotel, Ballroom',
                address: 'Quai Wilson 47, 1211 Genève',
                id:'AIUniversalHealthCoverageForum',
                time: 'May 19, 12:10 - 13:30',
                organisation: 'STUF United Fund Inc. & Global Health Council',
                contact: 'https://docs.google.com/forms/d/1Bh_rDzlv1ZbaJg8MvHwMPiUECICurT5ooCNuFG57LYE/viewform?edit_requested=true',
                position: {
                    lat: 46.214232826647304,
                    lng: 6.15196374910857,
                },
            },
            {
                index: 2,
                title: 'Pharmacy Supply Forum',
                keyword: ['PharmaceuticalSupply', 'PublicHealth', 'Forum'],
                location: 'Geneva President Wilson Hotel, Ballroom',
                address: 'Quai Wilson 47, 1211 Genève',
                id:'PharmaceuticalSupplyForum',
                time: 'May 19, 14:30 - 17:30',
                organisation: 'Taiwan Society of Health-System Pharmacists & The International Pharmaceutical Federation',
                contact: 'https://www.tshp.org.tw/ehc-tshp/s/index.htm',
                position: {
                    lat: 46.214232826647304,
                    lng: 6.15196374910857,
                },
            },
            {
                index: 5,
                title: 'Strengthening Medical Resilience: Bridging Healthcare Preparedness and Cross-border Disaster Emergency Response',
                keyword: ['MedicalResilience', 'Forum'],
                location: 'HUG Innovation Centre',
                address: 'Rue Alcide-Jentzer 17, 1205 Genève',
                id:'MedicalResilienceForum',
                time: 'May 20, 14:00 - 18:00',
                organisation: 'Taiwan Ministry of Health and Welfare & Geneva University Hospitals',
                contact: 'https://docs.google.com/forms/d/e/1FAIpQLSfWq2DpgCu0cPOW1QV-kEBL9qTLZfQhIcTwoUF9hUMOvHOwwQ/viewform',
                position: {
                    lat: 46.192112502530115,
                    lng: 6.147358862601293,
                },
            },
          ];
      initMap();