import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'button[doc-print]'
})
export class DocPrintDirective {
  @Input() printSectionId: string;

  @HostListener('click')
  public print(): void {
    const printContents = document.getElementById(this.printSectionId);
    const parentNode = printContents.parentNode;
    const headElement = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.innerText = `@media print { #${this.printSectionId} ~ * { display: none; }}`;

    headElement.prepend(style);
    document.getElementsByTagName('body')[0].prepend(printContents);

    window.print();

    parentNode.appendChild(printContents);
    headElement.removeChild(style);
  }
}
