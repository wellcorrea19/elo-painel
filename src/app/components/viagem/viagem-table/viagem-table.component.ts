import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../../services/api.service';
import { MatSort } from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import { SelectionModel } from '@angular/cdk/collections';

import Swal from 'sweetalert2';
import { Observable, ReplaySubject } from 'rxjs';

interface Viagem {
    idgps: string,
    situacao: string,
    // etapa: string,
    cnpjtransportadora:string,
    descricaotipo: string,
    nomelocaletapa: string,
    destinatario: string,
    previsaoentrega: string,
    protocolo: string,
    tracao: string,
    tempo: string
}

@Component({
    selector: 'app-viagem-table',
    templateUrl: './viagem-table.component.html',
    styleUrls: ['./viagem-table.component.scss']
})
export class ViagemTableComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @Output() evento: EventEmitter<any> = new EventEmitter<any>();
    selection = new SelectionModel<Viagem>(false, []);

    ids = [];
    data: Object;
    user;
    tempo: string;
    viagens: Viagem[] = [];
    dataSource = new MyDataSource(this.viagens);

    displayedColumns = ['detalhes', 'protocolo', 'tracao', 'descricaotipo', 'nomelocaletapa',
        'destinatario', 'previsaoentrega', 'tempo'];

    constructor(private api: ApiService) {
    }

    ngOnInit() {
        try {
            this.api.getUser().subscribe((user) => {
                this.user = user;
                this.api.getViagensTransportadora(user.cnpjtransportadora).toPromise().then(async data => {
                    await this.createViagens(data);
                })
            });
        } catch (error) {
            Swal.fire(error);
        }
    }

    /**
     * Cria o vetor de viagens para por na tabela
     * @param data é o que vem de resposta do banco
     */
    createViagens(data) {
        if (data.error) {
            Swal.fire(data.msg);
        } else {
            try {                
                for (const viagem of data.viagens) {
                    let result: any;
                    this.api.getViagensGps(viagem.idgps).toPromise().then(gps => {
                        for (let i = 0; i < gps['data'].length; i++) {
                            if (gps['data'][i].longitude !== null && gps['data'][i].latitude !== null && gps['data'][i].viagem_etapa_latitude !== null && gps['data'][i].viagem_etapa_longitude !== null) {
                                this.api.calculateTime( gps['data'][i].viagem_etapa_latitude,  gps['data'][i].viagem_etapa_longitude, gps['data'][i].latitude, gps['data'][i].longitude).subscribe(data => {
                                    result = { ...data };
                                    this.viagens = [...this.viagens,
                                    {
                                        idgps: viagem.idgps,
                                        situacao: viagem.situacao,
                                        // etapa: viagem.nomeetapa,
                                        cnpjtransportadora: viagem.cnpjtransportadora,
                                        nomelocaletapa: viagem.nomelocaletapa,
                                        descricaotipo: viagem.descricaotipo,
                                        destinatario: viagem.destinatario,
                                        previsaoentrega : viagem.previsaoentrega ,
                                        protocolo: viagem.protocolo,
                                        tracao: viagem.tracao,
                                        tempo: result.rows[0].elements[0].duration.text
                                    }];
                                    this.dataSource.setData(this.viagens);
                                    console.log(this.viagens);
                                });
                            } else {
                                this.viagens = [...this.viagens,
                                    {
                                        idgps: viagem.idgps,
                                        situacao: viagem.situacao,
                                        // etapa: viagem.nomeetapa,
                                        cnpjtransportadora: viagem.cnpjtransportadora,
                                        nomelocaletapa: viagem.nomelocaletapa,
                                        descricaotipo: viagem.descricaotipo,
                                        destinatario: viagem.destinatario,
                                        previsaoentrega : viagem.previsaoentrega ,
                                        protocolo: viagem.protocolo,
                                        tracao: viagem.tracao,
                                        tempo: "N/A"
                                    }];
                                    this.dataSource.setData(this.viagens);
                                    console.log(this.viagens);
                            }
                        }
                    })
                }
            } catch (error) {
                Swal.fire(error);
            }
        }
    }

    changeIcon(id) {
        this.evento.emit(id);
    }

}

class MyDataSource extends DataSource<Viagem> {
    private _dataStream = new ReplaySubject<Viagem[]>();

    constructor(initialData: Viagem[]) {
        super();
        this.setData(initialData);
    }

    connect(): Observable<Viagem[]> {
        return this._dataStream;
    }

    disconnect() { }

    setData(data: Viagem[]) {
        this._dataStream.next(data);
    }
}
