import { Component } from '@angular/core';
import { PartyService } from '../../services/party.service';
import { Router, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-party-list',
  standalone: true,
  imports: [MatTableModule,RouterOutlet,HttpClientModule,CommonModule],
  templateUrl: './party-list.component.html',
  styleUrl: './party-list.component.scss'
})
export class PartyListComponent {
  parties: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private partyService: PartyService, private router: Router) {}

  ngOnInit(): void {
    this.partyService.getParties().subscribe(data => {
      this.parties = data;
    });
  }

  editParty(id: number): void {
    this.router.navigate(['/parties/edit', id]);
  }

  deleteParty(id: number): void {
    this.partyService.deleteParty(id).subscribe(() => {
      this.parties = this.parties.filter(p => p.id !== id);
    });
  }
}
