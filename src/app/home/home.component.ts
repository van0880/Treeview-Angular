import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RequestService } from '../services/request.service';
import { Data } from '../models/interface';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private request: RequestService, private renderer: Renderer2){}

  @ViewChild('block') block!: ElementRef
  @ViewChild('input') input!: ElementRef
  
 
  ngOnInit():void{
    this.getData()
    
  }


  getData(){
    this.request.getData<Data[]>("http://localhost:3000/cars").subscribe((item:Data[])=>{  
      const div = this.renderer.createElement('div')
      const html = this.createList(item, div)
      this.block.nativeElement.appendChild(html)
    })
  }

  createList(data:any, elem: HTMLElement){
    const ul = this.renderer.createElement('ul')
    elem.appendChild(ul)

    for(let i in data){  
      const li = this.renderer.createElement('li')
      const span = this.renderer.createElement('span')
      span.innerText = data[i].name
      li.appendChild(span)
      ul.appendChild(li)

      for(let key in data[i]){
        if(Array.isArray(data[i][key])){
          this.createList(data[i][key], li)
        }

      } 
      
    }
    return elem
  }

  searchValue(e: Event){
    const inputValue = (e.target as HTMLInputElement).value.toLowerCase()
    let liItems = document.querySelectorAll('li span')
    
    for(let i = 0; i < liItems.length; i++){
        let text = liItems[i].textContent?.toLowerCase()
        if(inputValue != "" && text?.includes(inputValue)){
          liItems[i].classList.add('color');
        }else {
          liItems[i].classList.remove('color');
        }
    }
    
  }

}
