import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PartyService } from '../../services/party.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-party-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './party-form.component.html',
  styleUrl: './party-form.component.scss'
})
export class PartyFormComponent {
  party: any = { name: '' };
  isEdit: boolean = false;
  form!: FormGroup;

  constructor(
    private partyService: PartyService,
    private route: ActivatedRoute,
    private router: Router,
    private fb:FormBuilder
  ) {
    this.form = new FormGroup({
      name: new FormControl("",[Validators.required]),
      description: new FormControl("",[Validators.required]),
      response: new FormControl("",[Validators.required])
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.partyService.getParty(+id).subscribe(data => {
        this.party = data;
      });
    }

    
  }

  saveParty(): void {
    if (this.form.valid) {
      // Handle form submission
      if (this.isEdit) {
        this.partyService.updateParty(this.party.id, this.party).subscribe(() => {
          this.router.navigate(['/parties']);
        });
      } else {
        this.partyService.createParty(this.party).subscribe(() => {
          this.router.navigate(['/parties']);
        });
      }
    }
    
  }
}
