import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-viagem',
    templateUrl: './viagem.component.html',
    styleUrls: ['./viagem.component.scss']
})
export class ViagemComponent implements OnInit {

    hour: string;
    interval: any;
    showFiller = false;

    markerWidth = 51;
    markerHeight = 26;

    icons = {
        fixo: {
            name: 'Frota',
            url: './assets/images/truckIconBlue.png',
            scaledSize: {
                width: this.markerWidth,
                height: this.markerHeight
            }
        },
        agregado: {
            name: 'Agregado',
            url: './assets/images/truckIconYellow.png',
            scaledSize: {
                width: this.markerWidth,
                height: this.markerHeight
            }
        },
        terceiro: {
            name: 'Terceiro',
            url: './assets/images/truckIconGreen.png',
            scaledSize: {
                width: this.markerWidth,
                height: this.markerHeight
            }
        }
    };
    click = {
        name: 'Click',
        url: './assets/images/truckClicked.png',
        scaledSize: {
            width: this.markerWidth,
            height: this.markerHeight
        }
    };

    ids = [];
    markers = [];
    user;

    lat = -10.183056;
    lng = -48.333611;
    zoom = 5;

    google: any;

    constructor(private api: ApiService) {
    }

    ngOnInit(): void {
        this.api.getUser().subscribe(async (user) => {
            this.user = user;
            this.hour = this.updateHour();
            await this.createMapMarkers();
            this.interval = setInterval(this.createMapMarkers, (5 * 60 * 1000));
        });

    }

    /**
     * Função que inicia quando abre o mapa, ela seta as legendas, as opções do mapa e os marcadores existentes.
     * @param map é o $event do mapa
     */
    public mapReady(map) {
        this.setMapLegend(map);
        this.setMapOptions(map);

    }

    /**
     * Coloca as opções no mapa
     * @param map é o $event do mapa
     */
    setMapOptions(map) {
        map.setOptions({
            streetViewControl: false,
        });
    }

    /**
     * Coloca as legendas no mapa
     * @param map é o $event do mapa
     */
    setMapLegend(map) {
        const legend = document.getElementById('legend') as HTMLElement;
        for (const key in this.icons) {
            const type = this.icons[key];
            const name = type.name;
            const icon = type.url;
            const div = document.createElement('div');
            div.innerHTML = '<img  src="' + icon + '" height="15px" width="20px"> ' + name;
            legend.appendChild(div);
        }
        map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(legend);
    }

    /**
     * Cria o array de marcadores para por no mapa
     */
    createMapMarkers = async () => {
        this.markers = [];
        this.ids = [];
        this.api.getViagensTransportadora(this.user.cnpjtransportadora).toPromise()
            .then(async data => {
                if (!data['error']) {
                    for (const viagem of data['viagens']) {
                        this.ids.push(viagem.idgps);
                    }
                    await this.api.getViagensGps(this.ids).toPromise().then(gps => {
                            this.hour = this.updateHour();
                            for (let i = 0; i < gps['data'].length; i++) {
                                this.markers.push({
                                    id: gps['data'][i].id,
                                    lat: gps['data'][i].latitude,
                                    lng: gps['data'][i].longitude,
                                    icon: this.selectIconType('fixo')
                                });
                            }
                        }
                    );
                }
            }).then(() => {
            const lastMarkerIndex = this.markers.length - 1;
            if (lastMarkerIndex > 0) {
                this.receberInformacao(this.markers[lastMarkerIndex].id);
            }
        });
    }

    updateHour = () => {
        const date = new Date();
        return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ' - ' +
            ('0' + (date.getDate())).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/'
            + date.getFullYear();
    }

    selectIconType(type) {
        if (type === 'fixo') {
            return this.icons.fixo;
        } else {
            if (type === 'agregado') {
                return this.icons.agregado;
            } else {
                return this.icons.terceiro;
            }
        }
    }

    async receberInformacao(id) {
        this.unmarkMakers();
        for (let i = 0; i < this.markers.length; i++) {
            if (this.markers[i].id === id) {
                this.markers[i].icon = this.click;
                this.recenterMap(this.markers[i].lat, this.markers[i].lng);
                this.zoom = 13;
            }
        }
    }

    recenterMap = (lt, lg) => {
        this.lat = Number(lt);
        this.lng = Number(lg);
    }

    unmarkMakers() {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].icon = this.icons.fixo;
        }
    }

    updatePage() {
        window.location.reload();
    }

    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}


