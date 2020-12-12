import { Directive, HostBinding, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {
  isopen= false;
  /* @HostListener('click') toggleclick(e:Event) {
    this.isopen = !this.isopen;
  } */
  constructor(private elementref : ElementRef, private rend :Renderer2) { }

  @HostListener('click') toggleclick() {
    if(this.isopen == false){
      const ele = this.elementref.nativeElement.children[1];
      this.rend.addClass(ele, 'show');
      this.isopen = true
    }else{
      const ele = this.elementref.nativeElement.children[1];
      this.rend.removeClass(ele, 'show');
      this.isopen = false
    }
  }
}
