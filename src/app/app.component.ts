import {Component, OnInit} from '@angular/core';
import {WebApiPromiseService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{	
	title: string = 'Random Image Selector';
	count: number = 0;
	ready: boolean = false;
	loading: boolean = false;
	previousCall;
	imageURL: string  = "https://www.dropbox.com";
	
	
	directory = [];
	images = [];
	
	constructor(
        private imagePromiseService: WebApiPromiseService
		) 
		{}
  
	ngOnInit() {
	  this.imagePromiseService
          .getService(this.imageURL)
          .then(result => console.log(result))
          .catch(error => console.log(error));
	}
  
  getDirectory(event): void {	  
	  this.directory = [];
	  this.ready = false;
	  this.loading = true;
	  
	  if(event.target.files && event.target.files[0])
	  {
		  this.directory = event.target.files;
		  this.refreshImages();
	  }
  }
  
  checkTime(): boolean {
	  var time = new Date().getTime();
	  if(!this.previousCall || (time - this.previousCall >= 60000)){
		this.previousCall=time;
		return true;
	  }
	  
	  return false;
  }
  
  refreshImages(): void {
	  if(this.checkTime()) {
		this.count = 0;
		this.loading = true;
		this.images = [];
		this.loadImage();
	  }
	  else 
	  {
		  alert("Please wait 1 minute to refresh");
	  }
  }
  
  loadImage(): void{
	  if(this.count < 12) {
		var imgNum = Math.floor(Math.random() * this.directory.length);
		var display = this.directory[imgNum];
		var newImg = display;		
		var valid = true;
		
		if(display.type) {
			
			var validFileType = ".jpg , .png , .bmp, .gif";
			var extension = display.type.substring(display.type.lastIndexOf('.'));
			if(validFileType.toLowerCase().indexOf(extension) > 0)
				valid=false;
			
			for(var i=0;i<this.images.length;i++)
				if(this.images[i].name === newImg.name)
					valid = false;
				
			if(valid) {		
				newImg["pathName"] = display.webkitRelativePath.substring(0, Math.max(display.webkitRelativePath.lastIndexOf("/"), display.webkitRelativePath.lastIndexOf("\\")));
				//console.log(newImg);
				var reader = new FileReader();		  				
				reader.onload = (display) => {
					newImg["image"] = reader.result;
					this.images.push(newImg);		
					this.count++;					
					this.loadImage();
				}
				reader.readAsDataURL(display);
			}		
		}
		else 
		{
			this.loadImage();
		}
	  }
	  else 
	  {
		  this.ready = true;
		  this.loading = false;
	  }
  }
}
