import { Component } from "@angular/core"

@Component({
    selector: "twit-hashtag-ng2-app",
    template: `
        <nav class="navbar navbar-light bg-faded">
            <h1>NG2 Hashtag Search</h1>
        </nav>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>       
`
})

export class AppComponent {}