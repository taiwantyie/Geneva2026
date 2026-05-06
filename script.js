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
            <p class="organisation"><span>${item.organisation}</span>
                <a href="mailto:${item.contact}" target="_blank"><i class="fa-solid fa-envelope"></i></a>
                <a href="${item.website}" target="_blank"><i class="fa-solid fa-globe"></i></a>
            </p>
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
                time: 'May 16, 10:00 - 15:00',
                organisation: 'Taiwan Youth Initiatives in Europe',
                contact: 'home',
                website: 5,
                position: {
                    lat: 46.20852209083194,
                    lng: 6.138418739865669,
                },
            },
            {
                index: 2,
                title: 'Mini Taiwan Day',
                keyword: ['NightMarket', 'BubbleTea', 'TaiwaneseTradition'],
                location: 'Foound',
                address: 'Rue Jean-Dassier 7, 1201 Genève',
                id:'miniTaiwanDay2',
                time: 'May 16, 10:00 - 15:00',
                organisation: 'Taiwan Youth Initiatives in Europe',
                contact: 'home',
                website: 5,
                position: {
                    lat: 46.20852209083194,
                    lng: 6.238418739865669,
                },
            },
          ];
      initMap();