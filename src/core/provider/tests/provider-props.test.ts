import { expect, oneEvent } from '@open-wc/testing';
import sinon, { spy, stub } from 'sinon';

import { buildFakeMediaProvider, emitEvent } from '../../fakes/helpers';
import { MediaType } from '../../MediaType';
import { playerContext } from '../../player.context';
import { MediaTypeChangeEvent, ViewTypeChangeEvent } from '../../player.events';
import { ViewType } from '../../ViewType';

describe('provider props', () => {
  afterEach(() => {
    sinon.reset();
  });

  it('should have defined all provider state props', async () => {
    const provider = await buildFakeMediaProvider();

    Object.keys(playerContext).forEach(prop => {
      // Skip uuid because it generates a value as the component mounts.
      if ((prop as unknown) === 'uuid') return;
      expect(provider.context[prop], prop).to.equal(
        playerContext[prop].defaultValue,
      );
    });
  });

  it('should update provider when volume is set', async () => {
    const provider = await buildFakeMediaProvider();
    const volume = 0.75;
    const volumeSpy = spy(provider, 'setVolume');
    stub(provider, 'canPlay').get(() => true);
    provider.volume = volume;
    expect(volumeSpy).to.have.been.calledWith(volume);
  });

  it('should update provider when currentTime is set', async () => {
    const provider = await buildFakeMediaProvider();
    const currentTime = 420;
    const currentTimeSpy = spy(provider, 'setCurrentTime');
    stub(provider, 'canPlay').get(() => true);
    provider.currentTime = currentTime;
    expect(currentTimeSpy).to.have.been.calledWith(currentTime);
  });

  it('should update provider when paused is set', async () => {
    const provider = await buildFakeMediaProvider();
    const paused = false;
    const playSpy = spy(provider, 'play');
    const pauseSpy = spy(provider, 'pause');
    stub(provider, 'canPlay').get(() => true);
    provider.paused = paused;
    expect(playSpy).to.have.been.calledOnce;
    provider.paused = true;
    expect(pauseSpy).to.have.been.calledOnce;
  });

  it('should update provider when muted is set', async () => {
    const provider = await buildFakeMediaProvider();
    const muted = true;
    const mutedSpy = spy(provider, 'setMuted');
    stub(provider, 'canPlay').get(() => true);
    provider.muted = muted;
    expect(mutedSpy).to.have.been.calledWith(muted);
  });
});

describe('view type', () => {
  it('should update view type when context is updated [audio]', async () => {
    const provider = await buildFakeMediaProvider();
    provider.context.viewType = ViewType.Audio;
    expect(provider.viewType).to.equal(ViewType.Audio);
    expect(provider.isAudioView).to.be.true;
    expect(provider.isVideoView).to.be.false;
  });

  it('should update view type when context is updated [video]', async () => {
    const provider = await buildFakeMediaProvider();
    provider.context.viewType = ViewType.Video;
    expect(provider.viewType).to.equal(ViewType.Video);
    expect(provider.isAudioView).to.be.false;
    expect(provider.isVideoView).to.be.true;
  });

  it('should update view type when context is updated [unknown]', async () => {
    const provider = await buildFakeMediaProvider();
    provider.context.viewType = ViewType.Unknown;
    expect(provider.viewType).to.equal(ViewType.Unknown);
    expect(provider.isAudioView).to.be.false;
    expect(provider.isVideoView).to.be.false;
  });

  it('should reset when disconnected', async () => {
    const provider = await buildFakeMediaProvider();
    emitEvent(provider, new ViewTypeChangeEvent({ detail: ViewType.Video }));
    await oneEvent(provider, ViewTypeChangeEvent.TYPE);
    provider.disconnectedCallback();
    expect(provider.viewType).to.equal(ViewType.Unknown);
    expect(provider.isAudioView).to.be.false;
    expect(provider.isVideoView).to.be.false;
  });
});

describe('media type', () => {
  it('should update media type when context is updated [audio]', async () => {
    const provider = await buildFakeMediaProvider();
    provider.context.mediaType = MediaType.Audio;
    expect(provider.mediaType).to.equal(MediaType.Audio);
    expect(provider.isAudio).to.be.true;
    expect(provider.isVideo).to.be.false;
  });

  it('should update media type when context is updated [video]', async () => {
    const provider = await buildFakeMediaProvider();
    provider.context.mediaType = MediaType.Video;
    expect(provider.mediaType).to.equal(MediaType.Video);
    expect(provider.isAudio).to.be.false;
    expect(provider.isVideo).to.be.true;
  });

  it('should update media type when context is updated [unknown]', async () => {
    const provider = await buildFakeMediaProvider();
    provider.context.mediaType = MediaType.Unknown;
    expect(provider.mediaType).to.equal(MediaType.Unknown);
    expect(provider.isAudio).to.be.false;
    expect(provider.isVideo).to.be.false;
  });

  it('should reset when disconnected', async () => {
    const provider = await buildFakeMediaProvider();
    emitEvent(provider, new MediaTypeChangeEvent({ detail: MediaType.Video }));
    await oneEvent(provider, MediaTypeChangeEvent.TYPE);
    provider.disconnectedCallback();
    expect(provider.mediaType).to.equal(MediaType.Unknown);
    expect(provider.isAudio).to.be.false;
    expect(provider.isVideo).to.be.false;
  });
});
