import { Component,NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
   statusnow:string = "Status @ "+ new Date().toLocaleTimeString()

   constructor(private ngZone: NgZone){
    ngZone.runOutsideAngular(()=>{
      setInterval(()=>{
          this.ngZone.run(()=> {
              console.log("running")
               this.statusnow = "Status @ "+ new Date().toLocaleTimeString()
          })
      },3000)
    })
   }
}
