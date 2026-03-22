import { ipcRenderer, PlayState, redux } from "@luna/lib";
import type { LunaUnload } from '@luna/core';
//import {React} from 'react';

export const unloads = new Set<LunaUnload>();
export type PlayStates = 'next' | 'previous' | 'pause' | 'playPause' | 'play';

ipcRenderer.on(unloads, 'MediaKeysFixer:callMethod', (name: PlayStates) => {
    if (name === 'playPause') {
        name = PlayState.playing ? 'pause' : 'play';
    } else if (name === 'previous') {
        redux.actions['playbackControls/SKIP_PREVIOUS']();
        return;
    }

    PlayState[name]();    
});

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