import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-image',
  templateUrl: './simple-image.component.html',
  styleUrls: ['./simple-image.component.scss']
})
export class SimpleImageComponent implements OnInit {

  @Input() imageSrc = '/assets/images/table.jpg';
  @Input() title = 'The standard Lorem Ipsum passage, used since the 1500s';
  @Input() text = 'Lorem ipsum dolLor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\n' +
    '      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n' +
    '      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\n' +
    '      pariatur.\n' +
    '      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est\n' +
    '      laborum.';

  @Input() imagePos = 'right';

  constructor() { }

  ngOnInit(): void {
  }

}
