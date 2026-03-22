import {globalShortcut} from 'electron';
import type { LunaUnload } from '@luna/core';
export type PlayStates = 'next' | 'previous' | 'pause' | 'playPause' | 'play';

export const unloads = new Set<LunaUnload>();

const actions = [
    ['MediaNextTrack', 'next'],
    ['MediaPreviousTrack', 'previous'],
    ['MediaStop', 'pause'],
    ['MediaPlayPause', 'playPause'],
]

for (const [accelerator, method] of actions) {
    globalShortcut.register(accelerator, () => {
        luna.sendtoRender('MediaKeysFixer:callMethod', method);
    });

    unloads.add(() => globalShortcut.unregister(accelerator))
}