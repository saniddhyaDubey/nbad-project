import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  imports: [FormsModule, HttpClientModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  userUsername: string = "";
  userPassword: string = "";

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  submitForm() {
    const data = {
      username: this.userUsername,
      password: this.userPassword,
    };

    this.http.post("http://localhost:3000/login", data).subscribe({
      next: (response: any) => {
        if (response.status == 200) {
          localStorage.setItem("userToken", response.token);
          this.router.navigate(["/dashboard"]);
        } else {
          console.log("Wrong credentials!!!");
          this.router.navigate(["/login"]);
        }
      },
    });
  }
}
