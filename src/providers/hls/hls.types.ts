import type Hls from 'hls.js';
import type { HlsConfig } from 'hls.js';

import { VideoElementEngine, VideoElementProps } from '../video';

export const HLS_ELEMENT_TAG_NAME = `hls`;

export interface HlsElementProps extends VideoElementProps {
  /**
   * The `hls.js` configuration object.
   */
  hlsConfig?: Partial<HlsConfig>;

  /**
   * Whether the browser natively supports HLS, mostly only true in Safari. Only call this method
   * after the provider has connected to the DOM (wait for `ConnectEvent`).
   */
  readonly hasNativeHlsSupport: boolean;

  /**
   * Whether the current src is using HLS.
   *
   * @default false
   */
  readonly isCurrentlyHls: boolean;

  /**
   * Whether the `hls.js` instance has mounted the `HtmlMediaElement`.
   *
   * @default false
   */
  readonly isHlsEngineAttached: boolean;

  /**
   * Whether native HLS support is available and whether it should be used. Generally defaults
   * to `false` as long as `window.MediaSource` is defined to enforce consistency by
   * using `hls.js` where ever possible.
   *
   * @default false
   */
  readonly shouldUseNativeHlsSupport: boolean;

  /**
   * The underlying `HTMLMediaElement`.
   */
  readonly videoEngine: VideoElementEngine;
}

export type HlsElementEngine = Hls | undefined;
