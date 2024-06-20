import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
