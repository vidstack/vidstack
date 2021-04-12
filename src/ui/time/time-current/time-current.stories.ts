import '../../../core/fakes/vds-fake-media-provider';

import { html, TemplateResult } from 'lit-html';

import { ifNonEmpty } from '../../../shared/directives/if-non-empty';
import {
  buildStorybookControlsFromManifest,
  SB_THEME_COLOR,
} from '../../../shared/storybook';
import { TimeCurrentElementProps } from './time-current.types';
import { VDS_TIME_CURRENT_ELEMENT_TAG_NAME } from './vds-time-current';

export default {
  title: 'UI/Foundation/Time/Time Current',
  component: VDS_TIME_CURRENT_ELEMENT_TAG_NAME,
  argTypes: {
    ...buildStorybookControlsFromManifest(VDS_TIME_CURRENT_ELEMENT_TAG_NAME),
    seconds: {
      table: {
        disable: true,
      },
    },
    fakeCurrentTime: {
      control: 'number',
      defaultValue: 3750,
    },
  },
};

interface FakeProps {
  fakeCurrentTime: number;
}

type Args = FakeProps & TimeCurrentElementProps;

function Template({
  fakeCurrentTime,
  label,
  alwaysShowHours,
  padHours,
}: Args): TemplateResult {
  return html`
    <vds-fake-media-provider .currentTimeCtx="${fakeCurrentTime}">
      <vds-time-current
        label="${ifNonEmpty(label)}"
        ?always-show-hours="${alwaysShowHours}"
        ?pad-hours="${padHours}"
        style="color: ${SB_THEME_COLOR};"
      ></vds-time-current>
    </vds-fake-media-provider>
  `;
}

export const TimeCurrent = Template.bind({});
