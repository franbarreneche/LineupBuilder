import { Injectable, ɵ_sanitizeHtml } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Player, Team } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class LineupService {

  constructor() { }

  teamsSubject = new BehaviorSubject<Team[]>([]);
  selectedTeamSubject = new Subject<Team>();
  playersSubject = new BehaviorSubject<Player[]>([]);
  lineupSubject = new BehaviorSubject<Player[]>([]);
  store: {
    teams: Team[],
    selectedTeam: Team,
    players: Player[],
    lineup: Player[]
  };

  exampleTeams: Team[] = [
    { id: 1, name: "Barcelona" },
    { id: 2, name: "Real Madrid" },
    { id: 3, name: "Villareal" },
    { id: 4, name: "Valencia" },
    { id: 5, name: "Atletico Madrid" },
  ];
  examplePlayers: Player[] = [
    { id: 1, name: "Uno", team_id: 1 },
    { id: 2, name: "Dos", team_id: 1 },
    { id: 3, name: "Tres", team_id: 1 },
    { id: 4, name: "Cuatro", team_id: 2 },
    { id: 5, name: "Cinco", team_id: 2 },
    { id: 6, name: "Seis", team_id: 2 },
    { id: 7, name: "Siete", team_id: 3 },
    { id: 8, name: "Ocho", team_id: 3 },
    { id: 9, name: "Nueve", team_id: 3 },
    { id: 10, name: "Diez", team_id: 4 },
    { id: 11, name: "Once", team_id: 4 },
    { id: 12, name: "Doce", team_id: 4 },
    { id: 13, name: "Trece", team_id: 5 },
    { id: 14, name: "Catorce", team_id: 5 },
    { id: 15, name: "Quince", team_id: 5 },
  ];

  loadTeams(): void {
    this.store = {
      ...this.store,
      teams: this.exampleTeams
    };
    this.teamsSubject.next(this.store.teams);
  }

  getTeams(): Observable<Team[]> {
    return this.teamsSubject.asObservable();
  }

  getSelectdTeam(): Observable<Team> {
    return this.selectedTeamSubject.asObservable();
  }

  getPlayers(): Observable<Player[]> {
    return this.playersSubject.asObservable();
  }

  getLineup(): Observable<Player[]> {
    return this.lineupSubject.asObservable();
  }

  addPlayerToLineup(p: Player): void {
    this.store = {
      ...this.store,
      lineup: [...this.store.lineup, p]
    };
    this.lineupSubject.next(this.store.lineup);
  }

  removePlayerFromLineup(id: number) {
    this.store = {
      ...this.store,
      lineup: this.store.lineup.filter(player => player.id !== id)
    }
    this.lineupSubject.next(this.store.lineup);
  }

  setSelectedTeam(t: Team) {
    this.store = {
      ...this.store,
      selectedTeam: t,
      players: this.examplePlayers.filter(p => p.team_id === t.id)
    };
    this.selectedTeamSubject.next(this.store.selectedTeam);
    this.playersSubject.next(this.store.players);
  }
}
