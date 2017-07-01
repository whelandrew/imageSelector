import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	
	title: string = 'Random Image Selector';
	count: number = 0;
	ready: boolean = false;
	loading: boolean = false;
	
	directory = [];
	images = [];
  
	ngOnInit() {
	  
	}
  
  getDirectory(event): void {
	  this.directory = [];
	  this.ready = false;
	  
	  if(event.target.files && event.target.files[0])
	  {
		  this.directory = event.target.files;
		  this.refreshImages();
	  }
  }
  
  refreshImages(): void {
	  this.count = 0;
	  this.images = [];
	  this.loading = true;
	  this.loadImage();
  }
  
  loadImage(): void{
	  if(this.count < 12){
		var imgNum = Math.floor(Math.random() * this.directory.length);
		var display = this.directory[imgNum];
		var newImg = display;
		  
		var reader = new FileReader();		  
		reader.onload = (display) => {		
			newImg["image"] = reader.result;
			this.ready = true;
			this.images.push(newImg);
			this.count++;
			this.loadImage();
		}
		  
		reader.readAsDataURL(display);
		this.loading = false;
	  }
  }
}
