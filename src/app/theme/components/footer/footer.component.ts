import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public lat: number =25.574907035236375;
  public lng: number = -100.92503481539529;
  public zoom: number = 15;

  constructor() { }

  ngOnInit() { }

  subscribe(){ }

}
