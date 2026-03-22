import './index.native';
import { ipcRenderer, PlayState, redux } from "@luna/lib";
import type { LunaUnload } from '@luna/core';
import type { PlayStates } from './index.native';

export const unloads = new Set<LunaUnload>();

ipcRenderer.on(unloads, 'MediaKeysFixer:callMethod', (name: PlayStates) => {
    if (name === 'playPause') {
        name = PlayState.playing ? 'pause' : 'play';
    } else if (name === 'previous') {
        redux.actions['playbackControls/SKIP_PREVIOUS']();
        return;
    }

    PlayState[name]();    
});