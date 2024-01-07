import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  HostListener,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[appBetterHighligh]'
})
export class BetterHighlighDirective implements OnInit {

  @Input() defaultColor : string ;
  @Input() highlightColor :  string ;


  constructor(
    private eleRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {

  }
  @HostBinding('style.backgroundColor') backgroundColor : string = this.defaultColor;

  @HostListener('mouseover') mouseover() {
    //this.renderer.setStyle(this.eleRef.nativeElement, 'backgroundColor', 'blue');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave() {
   // this.renderer.setStyle(this.eleRef.nativeElement, 'backgroundColor', 'transparent');
   this.backgroundColor = this.defaultColor;
  }

}
