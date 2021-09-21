import { animate, style, transition, trigger } from '@angular/animations';

export const sideBarAnimation = ({sideBlock, closeArea}: {sideBlock: string, closeArea: string}) => {
  return [
    trigger(sideBlock, [
      transition(':enter', [
        style({
          transform: 'translate3d(100%, 0, 0)'
        }),
        animate('400ms ease-in-out', style({
          transform: 'translate3d(0,0,0)'
        }))
      ]),
      transition(':leave', [
        animate('400ms ease-in-out', style({
          transform: 'translate3d(100%, 0, 0)'
        }))
      ])
    ]),
    trigger(closeArea, [

      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('400ms ease-in-out', style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate('400ms ease-in-out', style({
          opacity: 0
        }))
      ])
    ])
  ];
};
