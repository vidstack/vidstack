import { LIB_PREFIX } from '../../../shared/constants';
import { safelyDefineCustomElement } from '../../../utils/dom';
import { TOGGLE_ELEMENT_TAG_NAME } from './toggle.types';
import { ToggleElement } from './ToggleElement';

export const VDS_TOGGLE_ELEMENT_TAG_NAME = `${LIB_PREFIX}-${TOGGLE_ELEMENT_TAG_NAME}` as const;

safelyDefineCustomElement(VDS_TOGGLE_ELEMENT_TAG_NAME, ToggleElement);

declare global {
  interface HTMLElementTagNameMap {
    [VDS_TOGGLE_ELEMENT_TAG_NAME]: ToggleElement;
  }
}
