import { DocPrintDirective } from './doc-print.directive';
import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <div id="id">Print Me</div>
    <button class="button" doc-print printSectionId="id"></button>
  `
})
class TestComponent {}

describe('DocPrintDirective', () => {
  let fixture, testComponentButton;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [DocPrintDirective, TestComponent]
    }).createComponent(TestComponent);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new DocPrintDirective();
    expect(directive).toBeTruthy();
  });

  it('should print', function() {
    spyOn(window, 'print');
    testComponentButton = fixture.debugElement.query(By.css('.button'));

    testComponentButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(window.print).toHaveBeenCalledTimes(1);
  });
});
