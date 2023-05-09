import { createContext, type ReadSignal, type WriteSignal } from 'maverick.js';

import type { MediaMenuElement } from './menu';

export interface MenuContext {
  readonly _expanded: ReadSignal<boolean>;
  readonly _hint: WriteSignal<string>;
  _attachMenuButton(el: HTMLElement): void;
  _attachMenuItems(el: HTMLElement): void;
  _disable(disable: boolean): void;
  _disableMenuButton(disable: boolean): void;
  _addSubmenu(el: MediaMenuElement): void;
}

export const menuContext = createContext<MenuContext>();